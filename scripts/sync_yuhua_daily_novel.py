#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import shutil
from datetime import datetime, timezone, timedelta
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
SOURCE_ROOT = Path('/Users/djd/Documents/github/yuhua')
NOVEL_SRC = SOURCE_ROOT / 'draft' / '短篇小说日更'
CARD_SRC = NOVEL_SRC / '题材卡'
REVIEW_SRC = SOURCE_ROOT / 'review' / '短篇小说日更复盘'
DOCS = REPO / 'content' / 'docs'
DATE_TITLE_RE = re.compile(r'^(\d{4}-\d{2}-\d{2})_(.+)\.md$')
DATE_RE = re.compile(r'^(\d{4}-\d{2}-\d{2})\.md$')


def nonspace_len(text: str) -> int:
    return len(re.findall(r'\S', text))


def zh_len(text: str) -> int:
    return len(re.findall(r'[\u4e00-\u9fff]', text))


def q(text: str) -> str:
    return str(text).replace('\\', '\\\\').replace('"', '\\"')


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')


def read(path: Path) -> str:
    return path.read_text(encoding='utf-8', errors='ignore').strip()


def frontmatter(title: str, description: str, date: str, typ: str, extra: dict | None = None) -> str:
    lines = [
        '---',
        f'title: "{q(title)}"',
        f'description: "{q(description)}"',
        f'date: "{date}"',
        f'type: {typ}',
    ]
    for key, value in (extra or {}).items():
        if isinstance(value, str):
            lines.append(f'{key}: "{q(value)}"')
        else:
            lines.append(f'{key}: {value}')
    lines.append('---')
    return '\n'.join(lines) + '\n\n'


def card_grid(items: list[dict], label: str) -> str:
    rows = []
    for item in reversed(items):
        desc = item.get('description') or label
        rows.append(f'  <Card title="{q(item["date"] + " · " + item["title"])}" description="{q(desc)}" href="{item["href"]}" />')
    return '<Cards>\n' + '\n'.join(rows) + '\n</Cards>\n'


def sync_novels() -> list[dict]:
    items: list[dict] = []
    if not NOVEL_SRC.exists():
        raise FileNotFoundError(f'Missing novel source: {NOVEL_SRC}')
    for src in sorted(NOVEL_SRC.glob('*.md')):
        if src.name.upper() == 'INDEX.MD':
            continue
        m = DATE_TITLE_RE.match(src.name)
        if not m:
            continue
        date, title = m.groups()
        text = read(src)
        chars = nonspace_len(text)
        zhs = zh_len(text)
        dest = DOCS / 'novels' / f'{date}.mdx'
        body = frontmatter(
            title=title,
            description=f'{date} 每日短篇小说《{title}》。',
            date=date,
            typ='novel',
            extra={'charsNonspace': chars, 'charsChinese': zhs},
        ) + text + '\n'
        write(dest, body)
        items.append({
            'date': date,
            'title': title,
            'href': f'/novels/{date}',
            'path': str(dest.relative_to(REPO)),
            'charsNonspace': chars,
            'charsChinese': zhs,
            'description': f'{chars} 非空字符 / {zhs} 中文字',
        })
    return items


def sync_daily_notes(src_dir: Path, section: str, typ: str, title_prefix: str) -> list[dict]:
    items: list[dict] = []
    if not src_dir.exists():
        return items
    for src in sorted(src_dir.glob('*.md')):
        if src.name.upper() == 'README.MD':
            continue
        m = DATE_RE.match(src.name)
        if not m:
            continue
        date = m.group(1)
        text = read(src)
        title = f'{title_prefix} {date}'
        dest = DOCS / section / f'{date}.mdx'
        body = frontmatter(title, f'{date} 的{title_prefix}。', date, typ) + f'# {title}\n\n' + text + '\n'
        write(dest, body)
        items.append({
            'date': date,
            'title': title,
            'href': f'/{section}/{date}',
            'path': str(dest.relative_to(REPO)),
            'charsNonspace': nonspace_len(text),
            'charsChinese': zh_len(text),
        })
    return items


def main() -> None:
    for section in ['novels', 'cards', 'reviews']:
        path = DOCS / section
        if path.exists():
            shutil.rmtree(path)
        path.mkdir(parents=True, exist_ok=True)

    novels = sync_novels()
    cards = sync_daily_notes(CARD_SRC, 'cards', 'card', '题材卡')
    reviews = sync_daily_notes(REVIEW_SRC, 'reviews', 'review', '复盘')

    write(DOCS / 'novels' / 'index.mdx', frontmatter('小说归档', '按日期整理的每日短篇小说成稿。', '', 'landing') + '# 小说归档\n\n这里按日期保存雨桦每日短篇小说的完整成稿。每篇保留原文，不在同步过程中重写。\n\n' + card_grid(novels, '短篇小说'))
    write(DOCS / 'cards' / 'index.mdx', frontmatter('题材卡', '每日短篇写作前的题材卡。', '', 'landing') + '# 题材卡\n\n每日成稿前的题材、触发物、人物和结尾设计。\n\n' + card_grid(cards, '题材卡'))
    write(DOCS / 'reviews' / 'index.mdx', frontmatter('写作复盘', '每日短篇完成后的简短复盘。', '', 'landing') + '# 写作复盘\n\n每天晚上对当天短篇做简短判断：哪里成立，哪里还虚，下一篇要压什么问题。\n\n' + card_grid(reviews, '复盘'))

    write(DOCS / 'meta.json', json.dumps({'title': 'Daily Novel', 'root': True, 'pages': ['novels', 'cards', 'reviews']}, ensure_ascii=False, indent=2) + '\n')
    write(DOCS / 'novels' / 'meta.json', json.dumps({'title': '小说归档', 'pages': ['index'] + [x['date'] for x in reversed(novels)]}, ensure_ascii=False, indent=2) + '\n')
    write(DOCS / 'cards' / 'meta.json', json.dumps({'title': '题材卡', 'pages': ['index'] + [x['date'] for x in reversed(cards)]}, ensure_ascii=False, indent=2) + '\n')
    write(DOCS / 'reviews' / 'meta.json', json.dumps({'title': '写作复盘', 'pages': ['index'] + [x['date'] for x in reversed(reviews)]}, ensure_ascii=False, indent=2) + '\n')

    cst = timezone(timedelta(hours=8))
    source_files = list(NOVEL_SRC.glob('*.md')) + list(CARD_SRC.glob('*.md')) + list(REVIEW_SRC.glob('*.md'))
    latest_mtime = max((p.stat().st_mtime for p in source_files if p.exists()), default=datetime.now(cst).timestamp())
    catalog = {
        'generatedAt': datetime.fromtimestamp(latest_mtime, cst).isoformat(timespec='seconds'),
        'sourceRoot': str(SOURCE_ROOT),
        'novels': novels,
        'cards': cards,
        'reviews': reviews,
        'totals': {
            'novels': len(novels),
            'cards': len(cards),
            'reviews': len(reviews),
            'novelCharsNonspace': sum(x['charsNonspace'] for x in novels),
            'novelCharsChinese': sum(x['charsChinese'] for x in novels),
        },
    }
    write(REPO / 'lib' / 'daily-novel-catalog.json', json.dumps(catalog, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(catalog['totals'], ensure_ascii=False))


if __name__ == '__main__':
    main()
