# AGENTS.md - daily-novel

This repository publishes and archives the daily short novels generated in the local `yuhua` writing workspace.

## Purpose

- Keep a clean GitHub mirror of the daily novel project.
- Sync finished short stories, topic cards, reviews, and a machine-readable catalog from the local source workspace.
- Preserve a lightweight public/static reading structure without editing generated output by hand.

## Source of truth

Local source workspace:

- Novels: `/Users/djd/Documents/github/yuhua/draft/短篇小说日更/`
- Topic cards: `/Users/djd/Documents/github/yuhua/draft/短篇小说日更/题材卡/`
- Reviews: `/Users/djd/Documents/github/yuhua/review/短篇小说日更复盘/`

Do not invent missing novels. If today's source novel does not exist yet, sync previous finished content and report that today's manuscript is not ready.

## Repository structure

- `content/novels/YYYY/MM/*.md` — synced finished daily stories
- `content/cards/YYYY/MM/*.md` — synced daily topic cards
- `content/reviews/YYYY/MM/*.md` — synced daily reviews
- `content/catalog.json` — generated catalog with counts, titles, paths, and character stats
- `README.md` — generated human-facing index summary
- `scripts/sync_yuhua_daily_novel.py` — sync/generate script
- `scripts/validate_daily_novel.py` — repository integrity checks
- `scripts/build_site.py` — dependency-free static HTML export for GitHub Pages
- `Memory.md` — concise project memory / operation log

## Daily maintenance workflow

1. `git fetch origin`
2. Rebase or reset safely to `origin/main` if local changes are not meaningful.
3. Run `python3 scripts/sync_yuhua_daily_novel.py`.
4. Run `python3 scripts/validate_daily_novel.py`.
5. Run `python3 scripts/build_site.py`.
6. Commit and push only when files changed.
7. If validation/build fails, fix the repo before pushing; if it cannot be fixed, do not push broken content.

## Editorial rules

- Preserve original story text. Do not rewrite synced manuscripts during maintenance.
- Generated indexes may be updated freely by scripts.
- Keep filenames stable: `YYYY-MM-DD_title.md` for novels, `YYYY-MM-DD.md` for cards/reviews.
- Keep content Chinese-first.
- Prefer simple, durable Markdown over framework churn.

## Cron expectation

The OpenClaw cron job should run after the yuhua daily novel generation task, not before it. The current intended window is around 15:10 Asia/Shanghai.
