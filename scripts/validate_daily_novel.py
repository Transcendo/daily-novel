#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
CATALOG = REPO / 'lib' / 'daily-novel-catalog.json'


def fail(message: str) -> None:
    print(f'ERROR: {message}', file=sys.stderr)
    raise SystemExit(1)


def main() -> None:
    if not (REPO / 'package.json').exists():
        fail('package.json missing; this must be a Fumadocs/Next.js repo')
    pkg = json.loads((REPO / 'package.json').read_text(encoding='utf-8'))
    deps = {**pkg.get('dependencies', {}), **pkg.get('devDependencies', {})}
    for dep in ['next', 'fumadocs-ui', 'fumadocs-mdx']:
        if dep not in deps:
            fail(f'missing Fumadocs/Next dependency: {dep}')
    if not CATALOG.exists():
        fail('lib/daily-novel-catalog.json missing; run sync script')
    data = json.loads(CATALOG.read_text(encoding='utf-8'))
    novels = data.get('novels', [])
    if not novels:
        fail('catalog has zero novels')
    dates = [x['date'] for x in novels]
    if dates != sorted(dates):
        fail('novels must be sorted ascending by date')
    if len(dates) != len(set(dates)):
        fail('duplicate novel dates')
    for section in ['novels', 'cards', 'reviews']:
        if not (REPO / 'content' / 'docs' / section / 'index.mdx').exists():
            fail(f'missing landing page for {section}')
        if not (REPO / 'content' / 'docs' / section / 'meta.json').exists():
            fail(f'missing meta.json for {section}')
    for item in novels:
        p = REPO / item['path']
        if not p.exists():
            fail(f'missing novel page: {item["path"]}')
        text = p.read_text(encoding='utf-8', errors='ignore')
        if item.get('charsNonspace', 0) < 1000:
            fail(f'novel too short or bad stats: {item["path"]}')
        if not re.search(r'[\u4e00-\u9fff]', text):
            fail(f'novel has no Chinese text: {item["path"]}')
    print(f'OK: Fumadocs repo with {len(novels)} novels validated')


if __name__ == '__main__':
    main()
