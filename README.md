# Daily Novel

Daily Novel is a Fumadocs / Next.js archive for the yuhua daily short-novel writing routine.

It publishes:

- daily short stories
- topic cards
- writing reviews

## Local workflow

```bash
python3 scripts/sync_yuhua_daily_novel.py
python3 scripts/validate_daily_novel.py
pnpm build
```

## Source

The source manuscripts live in the local yuhua workspace:

- `/Users/djd/Documents/github/yuhua/draft/短篇小说日更/`
- `/Users/djd/Documents/github/yuhua/draft/短篇小说日更/题材卡/`
- `/Users/djd/Documents/github/yuhua/review/短篇小说日更复盘/`

The generated public docs live under `content/docs/`.
