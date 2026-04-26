---
name: content-show-editorial-standard
description: Use when drafting, reviewing, rewriting, or publishing Content Show AI knowledge content, especially AI glossary pages, topic explainers, source notes, learning-path pages, and MDX content under `AI Knowledge/` or `content/docs/`. Apply this skill to enforce source-backed writing, reader-friendly explanations, fact/interpretation boundaries, MDX metadata, internal links, and review checks for the Content Show site.
---

# Content Show Editorial Standard

## Purpose

Use this skill to produce Content Show content that is accurate, readable, source-backed, and easy for general readers to navigate.

Favor content quality over framework changes. Research drafts and planning notes belong in `AI Knowledge/`; public site pages belong in `content/docs/`.

## Workflow

1. Identify the content type: glossary card, core glossary page, topic landing page, source note, or learning path update.
2. Check current site context before writing: related entries in `lib/ai-glossary.ts`, existing pages under `content/docs/`, and source notes under `AI Knowledge/`.
3. Collect credible sources before making claims. For fast-changing topics, verify current facts instead of relying on memory.
4. Draft in plain Chinese for general readers first, then add technical nuance.
5. Add internal links so the page connects to the learning path and adjacent concepts.
6. Review with the checklist below before finishing.

## Source Rules

Prefer sources in this order:

1. Primary sources: official documentation, specifications, original papers, institutional reports.
2. Near-primary sources: university courses, long-maintained educational resources, standards bodies.
3. Secondary sources: reputable explainers or industry reports with clear dates and scope.
4. User-provided screenshots or summaries: use only as leads, not as sole evidence.

Never present marketing claims as settled facts. For contested or speculative topics, label the claim as debate, interpretation, forecast, or open question.

## Core Page Structure

For a core glossary page, use this structure unless there is a strong local reason to vary it:

1. Frontmatter with `title`, `description`, `category`, `tags`, `lastReviewed`, `stability`, `sources`, `image`, and `imageCredit`.
2. Short definition in the first paragraph.
3. One visual or diagram with a brief caption.
4. A callout with the one-sentence takeaway.
5. "先记住这 3 点" with three concise cards or bullets.
6. "给普通人的解释" in approachable language.
7. A comparison section for adjacent concepts.
8. "常见误解" with practical corrections.
9. "延伸阅读" with at least three internal links when possible.
10. "参考来源" with source links and the final review date.

For topic landing pages, keep the page as a map: what this area covers, how terms relate, why it matters, and where to go next.

## Judgment Boundaries

Separate these categories explicitly:

- Fact: supported by a cited source or stable technical definition.
- Interpretation: an editorial explanation used to help readers understand.
- Dispute: an area where credible sources disagree or standards are unsettled.
- Speculation: future-facing claims, forecasts, or unresolved frontier issues.
- Product marketing: vendor language that should be translated into neutral capability and limitation terms.

Use `stability` consistently:

- `stable`: definitions unlikely to shift soon.
- `evolving`: active product, practice, or research area.
- `speculative`: frontier, governance, or future-facing concept.

## MDX Requirements

For public core glossary pages:

- Add or confirm the term metadata in `lib/ai-glossary.ts`.
- Create the page under `content/docs/glossary/<slug>.mdx`.
- Add the slug to `content/docs/glossary/meta.json`.
- Include at least two credible sources and `lastReviewed`.
- Include an original or properly credited image or diagram.
- Add internal links to relevant topic pages and glossary pages.

For research notes:

- Place drafts under `AI Knowledge/`.
- Keep source links at the end.
- Mark what is ready for public MDX adaptation and what still needs verification.

## Review Checklist

Before finishing, verify:

- The first paragraph answers "what is it?" without hype.
- The page distinguishes similar concepts instead of only defining one term.
- Claims are backed by sources, and fast-changing claims have dates.
- Speculative topics are not written as settled facts.
- Internal links support the reader's next step.
- Terminology matches existing `lib/ai-glossary.ts` naming and categories.
- The content answers: what it is, how it differs from related terms, and why a general reader should care.
- The public MDX page can build with existing components and does not require UI changes.

## Completion Standard

A main term is ready when it has a publishable draft, two or more credible sources, adjacent-concept distinctions, common misunderstandings, and at least three internal links.

A related term is ready when its card definition, misunderstanding, and `relatedTerms` improve the learning path without needing a full article.
