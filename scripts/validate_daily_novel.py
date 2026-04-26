#!/usr/bin/env python3
from __future__ import annotations
import json, re, sys
from pathlib import Path
REPO=Path(__file__).resolve().parents[1]; CATALOG=REPO/'content'/'catalog.json'
def fail(msg): print(f'ERROR: {msg}', file=sys.stderr); raise SystemExit(1)
def main():
    if not CATALOG.exists(): fail('content/catalog.json is missing; run sync script first')
    data=json.loads(CATALOG.read_text(encoding='utf-8')); novels=data.get('novels', [])
    if not novels: fail('catalog has zero novels')
    dates=[n.get('date') for n in novels]
    if dates != sorted(dates): fail('novels must be sorted by date ascending')
    if len(dates) != len(set(dates)): fail('duplicate novel dates found')
    for item in novels:
        p=REPO/item['path']
        if not p.exists(): fail(f"missing novel file: {item['path']}")
        text=p.read_text(encoding='utf-8', errors='ignore')
        if item.get('charsNonspace',0) < 1000: fail(f"novel too short or bad stats: {item['path']}")
        if not re.search(r'[\u4e00-\u9fff]', text): fail(f"novel has no Chinese text: {item['path']}")
    if data.get('totals',{}).get('novels') != len(novels): fail('totals.novels does not match catalog length')
    print(f'OK: {len(novels)} novels validated')
if __name__ == '__main__': main()
