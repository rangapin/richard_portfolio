# Design: leerob.com-style minimal redesign

**Date:** 2026-05-21
**Status:** Approved (design), pending implementation plan

## Goal

Transform the portfolio from the Tailwind "Spotlight" template (cards, widgets,
sticky header, photo strips, teal accent) into a minimal, text-first site
modeled on [leerob.com](https://leerob.com/): a single narrow centered column,
serif typography, plain prose with inline underlined links, and no navigation
chrome.

The site stays a multi-page Next.js App Router app — every existing page is
kept as its own route — but each page is restyled into the minimal aesthetic.

## Approach

Restyle in place (chosen over a fresh rebuild or a theme-only swap). Keep the
Next.js routes, MDX wiring, `getAllArticles`, and the RSS feed untouched.
Rewrite each page's contents, simplify the shared layout components, and delete
the components that minimalism makes redundant.

## Design decisions

### Typography & color

- **Font:** Load **Newsreader** (screen-optimized serif, Google Fonts) via
  `next/font/google`, exposed as a CSS variable and set as the default family
  site-wide. Headings use a heavier weight (600/700); body uses 400.
- **Color:** Drop the teal accent entirely. Light theme: near-black text
  (`zinc-900`) on white. Dark theme: `zinc-100`/`zinc-200` text on near-black
  (`zinc-950`/black) background.
- **Links:** Same color as surrounding body text, distinguished only by an
  underline. The underline is faded by default and solidifies on hover. No
  colored links anywhere in the site.

### Layout

- One centered column, **~600px wide** (`max-w-[37.5rem]`), with generous top
  spacing and comfortable horizontal padding on mobile.
- Remove the sticky header, the avatar scroll animation, the fixed background
  panel, and the bordered footer.
- A **minimal footer** appears on every page and contains exactly one element:
  a small, low-contrast light/dark theme toggle. It is the only home for the
  toggle now that the header is gone.

### Navigation (no header)

- **Homepage:** no nav element. It links into the rest of the site through its
  prose and bulleted list.
- **Sub-pages:** a small plain-text link at the top — `← Richard Angapin` —
  links back to the homepage. This replaces the header on every non-home page.

### Dark mode

- Keep `next-themes` (`ThemeProvider`, `attribute="class"`,
  `disableTransitionOnChange`) and the existing `ThemeWatcher` in
  `providers.tsx`.
- The theme toggle is extracted from the deleted `Header` into a small
  standalone component, rendered inside the minimal footer. It stays
  unobtrusive (low-contrast icon, no pill/shadow/ring).

## Component changes

### New / replaced

- **`PageLayout`** (new component) — the shared wrapper for every page:
  centered ~600px column, the optional top `← Richard Angapin` home link, and
  the minimal footer with the theme toggle. Takes a prop to toggle the home
  link (off for the homepage, on everywhere else). Every page reaches it either
  directly (homepage, 404) or through `SimpleLayout`/`ArticleLayout`/
  `ProjectLayout`, which render their content inside `PageLayout`.
- **`ThemeToggle`** (new component) — extracted from `Header`, a small
  standalone toggle. Renders nothing meaningful until mounted (avoids
  hydration mismatch, same pattern as the current implementation).
- **Minimal footer** — either a new `Footer` body or a small component used by
  `PageLayout`. Holds only the `ThemeToggle`.

### Restyled (kept)

- **`Container.tsx` / `SimpleLayout.tsx`** — collapsed into the single narrow
  column. `SimpleLayout` keeps its `title` + `intro` API but renders them
  minimally (serif heading, no oversized template styling) inside `PageLayout`.
  `Container`'s outer/inner split is folded into `PageLayout`; the standalone
  `Container` component is removed if nothing else imports it.
- **`ArticleLayout.tsx` / `ProjectLayout.tsx`** — serif prose in the narrow
  column; the floating round back button is replaced by a plain `← back` text
  link; teal removed. The `previousPathname`-based back behavior is preserved.
- **`typography.ts`** (the `prose` config) — serif body, link color set to the
  body text color with an underline (no teal), small square bullet markers
  (leerob-style), spacing tuned for the narrow column. Dark (`invert`) variant
  updated to match.
- **`src/styles/tailwind.css`** — register the serif font variable; adjust
  `@theme` as needed for the new type scale / family.
- **`src/app/layout.tsx`** (root) — load the `next/font` serif, apply the font
  class and new background/text colors to `<body>`, and render `children`
  directly (no `Layout` wrapper). Metadata kept (description may be lightly
  updated).

### Deleted

- `Header.tsx` — replaced by no-header design.
- `Layout.tsx` — its job (header + main + footer + background panel) is gone.
  The root `src/app/layout.tsx` renders `children` directly; per-page chrome
  moves to `PageLayout`.
- `Card.tsx` — used only by home/articles/projects/uses/speaking, all of which
  are rewritten to plain lists.
- `Button.tsx` — used only by the homepage (CV download) and `not-found`; both
  rewritten to plain text links.
- `Section.tsx` — used only by `uses` and `speaking`, both rewritten/deleted.
- `SocialIcons.tsx` — social links become plain text; icons no longer used.
- The old bordered `Footer` body is replaced by the minimal footer.
- `src/app/speaking/page.tsx` — deleted entirely. It contains only fictional
  template content and is not linked from anywhere.
- `src/app/thank-you/page.tsx` — deleted. It existed only as the newsletter
  form's success page; the newsletter is removed.

> Deletions of `Button` and `Section` are conditional on no remaining importers
> after the rewrites. Confirmed during this design: their only importers are
> pages being rewritten or deleted, so both are safe to delete.

## Page-by-page changes

### Homepage (`src/app/page.tsx`) — full rewrite

Removes the `Photos`, `Newsletter`, `Resume`/`Role`, `Article` card grid, and
`SocialLink` icon blocks. New structure:

1. `<h1>` — "Richard Angapin" (the name only).
2. 2–3 short prose paragraphs with inline underlined links.
3. A "Some things I've built:" bulleted list (small square markers) linking to
   the project case-study pages.
4. A closing paragraph linking to `/articles`, `/uses`, GitHub, LinkedIn, and a
   `mailto:` reach-out link.

The "things I've built" list is a **hand-curated** list of links the author
maintains directly in the page — it is not auto-generated. `/articles` and
`/projects` remain the full auto-generated indexes.

**Draft copy** (author to refine wording; structure is fixed):

> **Richard Angapin**
>
> I'm a GTM engineer and founder based in Gdynia, Poland. I build the outbound
> infrastructure that turns raw data into pipeline — enrichment workflows,
> sequencing systems, and the API integrations that help B2B teams reach the
> right people.
>
> Before GTM, I spent fifteen years in customer support across online gaming
> and SaaS. I taught myself to build, then taught myself to take what I'd built
> to market. That's [the longer story](/about). I'm also an amateur freediver.
>
> Some things I've built:
> - BODACC iGaming Signal Workflow
> - E-commerce Lead Generation Pipeline
> - MPC Recruitment Outbound System
> - Security Lead Scorer
> - The Line
>
> You can [read my writing](/articles), see [what I use](/uses), or find me on
> [GitHub](https://github.com/rangapin) and
> [LinkedIn](https://www.linkedin.com/in/rangapin/).
> [Reach out](mailto:richard.angapin@outlook.com) if you'd like to work
> together.

### About (`src/app/about/page.tsx`) — rewrite

- Keep the full existing bio prose, set in the serif narrow column.
- Remove the portrait `Image` and the two-column grid.
- Fold the work history (Quable, ROI Hunter, Run It Once Poker, PokerStars)
  into a short plain text list at the end of the page.
- Social links (GitHub, LinkedIn, email) become plain underlined text links.
- Top `← Richard Angapin` home link.

### Articles index (`src/app/articles/page.tsx`) — rewrite

Plain list: each entry is the article title (link) and its date. No cards, no
descriptions-in-cards, no border-left decoration. `getAllArticles` unchanged.

### Projects index (`src/app/projects/page.tsx`) — rewrite

Plain list: each entry is the project name (link) and a one-line description.
Keep the "GTM & Outbound" / "Tools & Code" split as plain text subheadings. No
cards, no logos, no images.

### Uses (`src/app/uses/page.tsx`) — rewrite

Plain restyle: section subheadings (Workstation, Development tools, etc.) with
each tool as a name (optionally linked) plus its description. No cards. Content
unchanged.

### Article & project case studies (MDX) — no content change

`src/app/articles/*/page.mdx` and `src/app/projects/*/page.mdx` render through
the restyled `ArticleLayout` / `ProjectLayout`. The case-study screenshots in
`public/projects/**` are kept.

### 404 (`src/app/not-found.tsx`) — restyle

Minimal: serif heading, short text, plain text link home. No `Button`.

## Out of scope / untouched

- MDX configuration (`next.config.mjs`, `mdx-components.tsx`).
- `getAllArticles` and the article frontmatter format.
- The RSS feed (`src/app/feed.xml/route.ts`).
- Case-study MDX content and the project screenshot assets.
- `providers.tsx` logic (only consumed differently; `ThemeWatcher` stays).

## Success criteria

- Every route renders in the single ~600px serif column with no sticky header.
- No teal anywhere; links are body-colored + underlined.
- Light/dark toggle works from the minimal footer and persists.
- Homepage matches the leerob.com structure: name → prose → bulleted list →
  closing links.
- The Speaking and thank-you routes no longer exist; no dead imports remain.
- `next build` and `next lint` pass.
```
