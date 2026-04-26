#!/usr/bin/env python3
from __future__ import annotations
import json, re
from datetime import datetime, timezone, timedelta
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
SOURCE_ROOT = Path('/Users/djd/Documents/github/yuhua')
NOVEL_SRC = SOURCE_ROOT / 'draft' / '短篇小说日更'
CARD_SRC = NOVEL_SRC / '题材卡'
REVIEW_SRC = SOURCE_ROOT / 'review' / '短篇小说日更复盘'
DATE_TITLE_RE = re.compile(r'^(\d{4})-(\d{2})-(\d{2})_(.+)\.md$')
DATE_RE = re.compile(r'^(\d{4})-(\d{2})-(\d{2})\.md$')

def nonspace_len(text): return len(re.findall(r'\S', text))
def zh_len(text): return len(re.findall(r'[\u4e00-\u9fff]', text))
def read_text(path): return path.read_text(encoding='utf-8', errors='ignore')

def write_if_changed(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and path.read_text(encoding='utf-8') == text:
        return False
    path.write_text(text, encoding='utf-8')
    return True

def copy_if_changed(src, dst):
    return write_if_changed(dst, read_text(src))

def collect_novels():
    items=[]
    if not NOVEL_SRC.exists(): raise FileNotFoundError(f'Novel source directory not found: {NOVEL_SRC}')
    for src in sorted(NOVEL_SRC.glob('*.md')):
        if src.name.upper() == 'INDEX.MD': continue
        m = DATE_TITLE_RE.match(src.name)
        if not m: continue
        yyyy, mm, dd, title = m.groups(); date=f'{yyyy}-{mm}-{dd}'
        dst = REPO/'content'/'novels'/yyyy/mm/src.name
        text=read_text(src); copy_if_changed(src,dst)
        items.append({'date':date,'title':title,'source':str(src),'path':str(dst.relative_to(REPO)),'charsNonspace':nonspace_len(text),'charsChinese':zh_len(text),'bytes':len(text.encode('utf-8'))})
    return items

def collect_date_files(src_dir, kind):
    items=[]
    if not src_dir.exists(): return items
    for src in sorted(src_dir.glob('*.md')):
        if src.name.upper() == 'README.MD': continue
        m=DATE_RE.match(src.name)
        if not m: continue
        yyyy,mm,dd=m.groups(); date=f'{yyyy}-{mm}-{dd}'
        dst=REPO/'content'/kind/yyyy/mm/src.name
        text=read_text(src); copy_if_changed(src,dst)
        items.append({'date':date,'source':str(src),'path':str(dst.relative_to(REPO)),'charsNonspace':nonspace_len(text),'charsChinese':zh_len(text)})
    return items

def generate_readme(catalog):
    novels=catalog['novels']; total=catalog['totals']; latest=novels[-1] if novels else None
    lines=['# Daily Novel','', 'Daily archive for the yuhua short-novel writing routine.','', '## Current status','',
        f"- Novels: **{total['novels']}**", f"- Topic cards: **{total['cards']}**", f"- Reviews: **{total['reviews']}**",
        f"- Novel text: **{total['novelCharsNonspace']} non-space chars** / **{total['novelCharsChinese']} Chinese chars**",
        f"- Last sync: `{catalog['generatedAt']}`"]
    if latest: lines.append(f"- Latest novel: **{latest['date']} {latest['title']}**")
    lines += ['', '## Novels','', '| Date | Title | Length | File |','| --- | --- | ---: | --- |']
    for item in reversed(novels): lines.append(f"| {item['date']} | {item['title']} | {item['charsNonspace']} | [{item['path']}]({item['path']}) |")
    lines += ['', '## Automation','', '```bash','python3 scripts/sync_yuhua_daily_novel.py','python3 scripts/validate_daily_novel.py','python3 scripts/build_site.py','```','']
    return '\n'.join(lines)

def main():
    novels=collect_novels(); cards=collect_date_files(CARD_SRC,'cards'); reviews=collect_date_files(REVIEW_SRC,'reviews')
    cst=timezone(timedelta(hours=8))
    source_paths = [Path(x['source']) for x in (novels + cards + reviews)]
    latest_mtime = max((p.stat().st_mtime for p in source_paths if p.exists()), default=datetime.now(cst).timestamp())
    generated_at = datetime.fromtimestamp(latest_mtime, cst).isoformat(timespec='seconds')
    catalog={'generatedAt':generated_at,'sourceRoot':str(SOURCE_ROOT),'novels':novels,'cards':cards,'reviews':reviews,'totals':{'novels':len(novels),'cards':len(cards),'reviews':len(reviews),'novelCharsNonspace':sum(x['charsNonspace'] for x in novels),'novelCharsChinese':sum(x['charsChinese'] for x in novels),'cardCharsNonspace':sum(x['charsNonspace'] for x in cards),'reviewCharsNonspace':sum(x['charsNonspace'] for x in reviews)}}
    write_if_changed(REPO/'content'/'catalog.json', json.dumps(catalog, ensure_ascii=False, indent=2)+'\n')
    write_if_changed(REPO/'README.md', generate_readme(catalog))
    print(json.dumps(catalog['totals'], ensure_ascii=False))
if __name__ == '__main__': main()
