# daily-novel Memory

## Stable facts

- Repository: `git@github.com:Transcendo/daily-novel.git`
- Local path: `/Users/djd/Documents/github/daily-novel`
- Site stack: Next.js 16 + Fumadocs MDX, copied/adapted from `content-show`.
- GitHub Pages base path: `/daily-novel`.
- Source workspace: `/Users/djd/Documents/github/yuhua`
- Sync script: `scripts/sync_yuhua_daily_novel.py`
- Validation script: `scripts/validate_daily_novel.py`

## Operation log

- 2026-04-26: Initial attempt used a hand-rolled static HTML page. This was wrong; the requirement was to follow `content-show`'s Fumadocs framework.
- 2026-04-26: Rebuilt the repo as a Fumadocs/Next.js site, with novels/cards/reviews under `content/docs/` and a generated catalog consumed by the homepage.
