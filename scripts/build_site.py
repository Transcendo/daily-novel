#!/usr/bin/env python3
from __future__ import annotations
import html, json, re, shutil
from pathlib import Path
REPO=Path(__file__).resolve().parents[1]; SITE=REPO/'site'; CATALOG=REPO/'content'/'catalog.json'
def md_to_html(text):
    blocks=[]; para=[]
    def flush():
        nonlocal para
        if para: blocks.append('<p>'+'<br>'.join(para)+'</p>'); para=[]
    for line in text.splitlines():
        if line.startswith('# '): flush(); blocks.append(f'<h1>{html.escape(line[2:].strip())}</h1>')
        elif line.startswith('## '): flush(); blocks.append(f'<h2>{html.escape(line[3:].strip())}</h2>')
        elif not line.strip(): flush()
        else: para.append(html.escape(line))
    flush(); return '\n'.join(blocks)
def page(title, body):
    css=':root{color-scheme:light dark;--bg:#0b0d12;--fg:#f2f5f8;--muted:#9aa4b2;--card:#151922;--line:#2a3140;--accent:#d9b46c}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:var(--bg);color:var(--fg);line-height:1.72}main{max-width:880px;margin:0 auto;padding:48px 20px 80px}a{color:var(--accent);text-decoration:none}.card{border:1px solid var(--line);border-radius:18px;padding:18px 20px;background:var(--card);margin:14px 0}.meta{color:var(--muted);font-size:14px}h1,h2{line-height:1.25}'
    return '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+html.escape(title)+'</title><style>'+css+'</style></head><body><main>'+body+'</main></body></html>'
def slug_for(item): return item['date']+'_'+re.sub(r'[^0-9A-Za-z\u4e00-\u9fff_-]+','-',item['title']).strip('-')
def main():
    data=json.loads(CATALOG.read_text(encoding='utf-8'))
    if SITE.exists(): shutil.rmtree(SITE)
    (SITE/'novels').mkdir(parents=True)
    cards=[]
    for item in reversed(data['novels']):
        href='novels/'+slug_for(item)+'.html'
        cards.append(f"<div class='card'><h2><a href='{href}'>{html.escape(item['date']+' '+item['title'])}</a></h2><div class='meta'>{item['charsNonspace']} non-space chars · {item['charsChinese']} Chinese chars</div></div>")
    body=f"<h1>Daily Novel</h1><p class='meta'>Last sync: {html.escape(data['generatedAt'])}</p>"+'\n'.join(cards)
    (SITE/'index.html').write_text(page('Daily Novel', body), encoding='utf-8')
    for item in data['novels']:
        src=REPO/item['path']; body="<p><a href='../index.html'>← Back</a></p>"+md_to_html(src.read_text(encoding='utf-8', errors='ignore'))
        (SITE/'novels'/(slug_for(item)+'.html')).write_text(page(item['title'], body), encoding='utf-8')
    print(f'Built {SITE}')
if __name__ == '__main__': main()
