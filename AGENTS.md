# AGENTS.md - daily-novel

This repository is a Fumadocs / Next.js static documentation site for the local yuhua daily short-novel project.

## What this repo is for

- Publishing a readable GitHub Pages site for daily short stories.
- Syncing finished novels, topic cards, and writing reviews from the local yuhua workspace.
- Preserving original manuscripts while presenting them through the same Fumadocs-style framework used by `content-show`.

## Technical overview

- Framework: Next.js 16 App Router.
- Docs system: Fumadocs MDX.
- Package manager: pnpm.
- Static output: `next.config.js` exports to `out/` for GitHub Pages.
- Public route prefix on GitHub Pages: `/daily-novel`.
- Public docs routes:
  - `/novels`
  - `/cards`
  - `/reviews`

## Source of truth

Local source workspace:

- Novels: `/Users/djd/Documents/github/yuhua/draft/短篇小说日更/`
- Topic cards: `/Users/djd/Documents/github/yuhua/draft/短篇小说日更/题材卡/`
- Reviews: `/Users/djd/Documents/github/yuhua/review/短篇小说日更复盘/`

Generated Fumadocs pages:

- `content/docs/novels/*.mdx`
- `content/docs/cards/*.mdx`
- `content/docs/reviews/*.mdx`
- `lib/daily-novel-catalog.json`

## Commands

```bash
pnpm install
python3 scripts/sync_yuhua_daily_novel.py
python3 scripts/validate_daily_novel.py
pnpm build
```

## Daily maintenance rules

1. Preserve original story text. Do not rewrite manuscripts during repo maintenance.
2. Run sync before validation/build.
3. If today's source manuscript is missing, do not fabricate content; sync existing files only.
4. If build fails, fix the Fumadocs/Next.js project before pushing.
5. Commit and push only after validation/build pass.
6. Do not edit generated `out/`, `.next/`, `.source/`, or `node_modules/` directly.

## Cron expectation

The OpenClaw cron job should run after the yuhua 14:00 daily story generation task. Current intended schedule: 15:10 Asia/Shanghai.
