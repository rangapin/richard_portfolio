# leerob.com-style Minimal Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Tailwind "Spotlight" portfolio template into a minimal, text-first site modeled on leerob.com — one narrow serif column, plain prose with inline underlined links, no navigation chrome.

**Architecture:** Restyle in place. Next.js App Router routes, MDX wiring, `getAllArticles`, and the RSS feed are untouched. New shared components (`TextLink`, `ThemeToggle`, `PageLayout`) are built first, then every page is converted to use them, then the now-unused template components are deleted. Each task leaves the site in a buildable state.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS v4, `@tailwindcss/typography`, MDX, `next-themes`, `next/font`.

**Verification note:** This project has no test suite, and adding one for a visual redesign is out of scope (YAGNI). Per-task verification is `npm run build` (which type-checks and lints), plus visual checks via `npm run dev` at milestones.

**Commit note:** Every commit message ends with the trailer:
`Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`
Work happens on the existing `leerob-style-redesign` branch.

---

## File Structure

**New files:**
- `src/components/TextLink.tsx` — styled inline link (internal via `next/link`, external/mailto via `<a>`).
- `src/components/ThemeToggle.tsx` — small standalone light/dark toggle.
- `src/components/PageLayout.tsx` — shared page shell: narrow column, optional top back-link, minimal footer with the toggle.

**Rewritten files:**
- `src/app/layout.tsx`, `src/styles/tailwind.css`, `typography.ts`
- `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/articles/page.tsx`, `src/app/projects/page.tsx`, `src/app/uses/page.tsx`, `src/app/not-found.tsx`
- `src/components/SimpleLayout.tsx`, `src/components/ArticleLayout.tsx`, `src/components/ProjectLayout.tsx`, `src/app/providers.tsx`

**Deleted files:**
- `src/app/speaking/page.tsx`, `src/app/thank-you/page.tsx`
- `src/components/Header.tsx`, `Layout.tsx`, `Footer.tsx`, `Card.tsx`, `Button.tsx`, `Section.tsx`, `SocialIcons.tsx`, `Container.tsx`
- `src/images/` (after confirming no imports remain)

---

## Task 1: Serif font + root layout

**Files:**
- Modify: `src/app/layout.tsx` (full replace)
- Modify: `src/styles/tailwind.css`

- [ ] **Step 1: Replace `src/app/layout.tsx`**

```tsx
import { type Metadata } from 'next'
import { Newsreader } from 'next/font/google'

import { Providers } from '@/app/providers'

import '@/styles/tailwind.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Richard Angapin',
    default: 'Richard Angapin - GTM Engineer, founder, and amateur freediver',
  },
  description:
    "I'm Richard, a GTM engineer and founder based in Gdynia, Poland. I build the outbound infrastructure that turns raw data into pipeline — enrichment workflows, sequencing systems, and the API integrations that help B2B teams reach the right people at the right time.",
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-white font-serif text-zinc-900 dark:bg-zinc-950 dark:text-zinc-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Register the serif font in `src/styles/tailwind.css`**

Add a `--font-serif` line as the first entry inside the existing `@theme {` block. Replace:

```css
@theme {
  --text-xs: 0.8125rem;
```

with:

```css
@theme {
  --font-serif: var(--font-newsreader), ui-serif, Georgia, Cambria,
    'Times New Roman', serif;

  --text-xs: 0.8125rem;
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: compiles successfully, no type or lint errors. (The site temporarily renders with no header/footer — expected; `PageLayout` is added in later tasks.)

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/styles/tailwind.css
git commit -m "Load Newsreader serif and drop the template layout shell"
```

---

## Task 2: TextLink component

**Files:**
- Create: `src/components/TextLink.tsx`

- [ ] **Step 1: Create `src/components/TextLink.tsx`**

```tsx
import Link from 'next/link'
import clsx from 'clsx'

const linkClasses =
  'underline decoration-zinc-300 underline-offset-2 transition-colors hover:decoration-zinc-700 dark:decoration-zinc-600 dark:hover:decoration-zinc-300'

export function TextLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  const classes = clsx(linkClasses, className)
  const isExternal = /^(https?:|mailto:)/.test(href)

  if (isExternal) {
    const isMailto = href.startsWith('mailto:')
    return (
      <a
        href={href}
        target={isMailto ? undefined : '_blank'}
        rel={isMailto ? undefined : 'noopener noreferrer'}
        className={classes}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: compiles successfully, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/TextLink.tsx
git commit -m "Add TextLink component for inline underlined links"
```

---

## Task 3: ThemeToggle component

**Files:**
- Create: `src/components/ThemeToggle.tsx`

- [ ] **Step 1: Create `src/components/ThemeToggle.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

function SunIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  )
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      onClick={() => setTheme(otherTheme)}
      className="text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
    >
      <SunIcon className="h-5 w-5 dark:hidden" />
      <MoonIcon className="hidden h-5 w-5 dark:block" />
    </button>
  )
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: compiles successfully, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ThemeToggle.tsx
git commit -m "Add minimal ThemeToggle component"
```

---

## Task 4: PageLayout component

**Files:**
- Create: `src/components/PageLayout.tsx`

The shared page shell: a centered ~600px column with an optional top back-link and a minimal footer holding only the theme toggle. Pages that have a back-link pass `backHref`/`backLabel`; the homepage omits both.

- [ ] **Step 1: Create `src/components/PageLayout.tsx`**

```tsx
import Link from 'next/link'

import { ThemeToggle } from '@/components/ThemeToggle'

export function PageLayout({
  backHref,
  backLabel,
  children,
}: {
  backHref?: string
  backLabel?: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[37.5rem] flex-col px-6 py-16 sm:py-20">
      {backHref && backLabel && (
        <Link
          href={backHref}
          className="mb-12 inline-block text-sm text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
        >
          ← {backLabel}
        </Link>
      )}
      <main className="flex-auto">{children}</main>
      <footer className="mt-24 flex">
        <ThemeToggle />
      </footer>
    </div>
  )
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: compiles successfully, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/PageLayout.tsx
git commit -m "Add PageLayout shell with back-link and footer toggle"
```

---

## Task 5: Restyle the prose typography config

**Files:**
- Modify: `typography.ts`

Removes the teal accent (links become body-colored with a faded underline), makes links non-bold, and switches bullets to small squares. Affects all MDX content via the `prose` class.

- [ ] **Step 1: Update the light-theme prose color variables**

In `typography.ts`, in the `DEFAULT.css` block, replace these six lines:

```ts
          '--tw-prose-body': theme('colors.zinc.600'),
          '--tw-prose-headings': theme('colors.zinc.900'),
          '--tw-prose-links': theme('colors.teal.500'),
          '--tw-prose-links-hover': theme('colors.teal.600'),
          '--tw-prose-underline': theme('colors.teal.500 / 0.2'),
          '--tw-prose-underline-hover': theme('colors.teal.500'),
```

with:

```ts
          '--tw-prose-body': theme('colors.zinc.800'),
          '--tw-prose-headings': theme('colors.zinc.900'),
          '--tw-prose-links': theme('colors.zinc.900'),
          '--tw-prose-links-hover': theme('colors.zinc.900'),
          '--tw-prose-underline': theme('colors.zinc.300'),
          '--tw-prose-underline-hover': theme('colors.zinc.500'),
```

- [ ] **Step 2: Update the light-theme bullets variable**

Replace:

```ts
          '--tw-prose-bullets': theme('colors.zinc.900'),
```

with:

```ts
          '--tw-prose-bullets': theme('colors.zinc.300'),
```

- [ ] **Step 3: Update the dark-theme (invert) prose color variables**

Replace these six lines:

```ts
          '--tw-prose-invert-body': theme('colors.zinc.400'),
          '--tw-prose-invert-headings': theme('colors.zinc.200'),
          '--tw-prose-invert-links': theme('colors.teal.400'),
          '--tw-prose-invert-links-hover': theme('colors.teal.400'),
          '--tw-prose-invert-underline': theme('colors.teal.400 / 0.3'),
          '--tw-prose-invert-underline-hover': theme('colors.teal.400'),
```

with:

```ts
          '--tw-prose-invert-body': theme('colors.zinc.300'),
          '--tw-prose-invert-headings': theme('colors.zinc.100'),
          '--tw-prose-invert-links': theme('colors.zinc.100'),
          '--tw-prose-invert-links-hover': theme('colors.zinc.100'),
          '--tw-prose-invert-underline': theme('colors.zinc.600'),
          '--tw-prose-invert-underline-hover': theme('colors.zinc.400'),
```

- [ ] **Step 4: Update the dark-theme bullets variable**

Replace:

```ts
          '--tw-prose-invert-bullets': theme('colors.zinc.200'),
```

with:

```ts
          '--tw-prose-invert-bullets': theme('colors.zinc.600'),
```

- [ ] **Step 5: Make links non-bold and add an underline offset**

Replace the entire `a` block:

```ts
          a: {
            color: 'var(--tw-prose-links)',
            fontWeight: theme('fontWeight.semibold'),
            textDecoration: 'underline',
            textDecorationColor: 'var(--tw-prose-underline)',
            transitionProperty: 'color, text-decoration-color',
            transitionDuration: theme('transitionDuration.150'),
            transitionTimingFunction: theme('transitionTimingFunction.in-out'),
          },
```

with:

```ts
          a: {
            color: 'var(--tw-prose-links)',
            textDecoration: 'underline',
            textDecorationColor: 'var(--tw-prose-underline)',
            textUnderlineOffset: '2px',
            transitionProperty: 'color, text-decoration-color',
            transitionDuration: theme('transitionDuration.150'),
            transitionTimingFunction: theme('transitionTimingFunction.in-out'),
          },
```

- [ ] **Step 6: Switch unordered-list bullets to squares**

Replace:

```ts
          ul: {
            listStyleType: 'disc',
          },
```

with:

```ts
          ul: {
            listStyleType: 'square',
          },
```

- [ ] **Step 7: Verify the build**

Run: `npm run build`
Expected: compiles successfully, no errors.

- [ ] **Step 8: Commit**

```bash
git add typography.ts
git commit -m "Restyle prose: body-colored links, square bullets, no teal"
```

---

## Task 6: Rewrite the homepage

**Files:**
- Modify: `src/app/page.tsx` (full replace)

- [ ] **Step 1: Replace `src/app/page.tsx`**

```tsx
import { type Metadata } from 'next'

import { PageLayout } from '@/components/PageLayout'
import { TextLink } from '@/components/TextLink'

export const metadata: Metadata = {
  title: 'Richard Angapin - GTM Engineer, founder, and amateur freediver',
}

const projects = [
  {
    name: 'BODACC iGaming Signal Workflow',
    href: '/projects/bodacc-igaming-signal-workflow',
  },
  {
    name: 'E-commerce Lead Generation Pipeline',
    href: '/projects/ecommerce-lead-generation-pipeline',
  },
  {
    name: 'MPC Recruitment Outbound System',
    href: '/projects/mpc-recruitment-outbound-system',
  },
  { name: 'Security Lead Scorer', href: '/projects/security-lead-scorer' },
  { name: 'The Line', href: '/projects/the-line' },
]

export default function Home() {
  return (
    <PageLayout>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        Richard Angapin
      </h1>
      <div className="mt-6 space-y-6 text-base leading-7 text-zinc-800 dark:text-zinc-300">
        <p>
          I&apos;m a GTM engineer and founder based in Gdynia, Poland. I build
          the outbound infrastructure that turns raw data into pipeline —
          enrichment workflows, sequencing systems, and the API integrations
          that help B2B teams reach the right people.
        </p>
        <p>
          Before GTM, I spent fifteen years in customer support across online
          gaming and SaaS. I taught myself to build, then taught myself to take
          what I&apos;d built to market. That&apos;s{' '}
          <TextLink href="/about">the longer story</TextLink>. I&apos;m also an
          amateur freediver.
        </p>
        <p>Some things I&apos;ve built:</p>
        <ul className="list-[square] space-y-2 pl-5 marker:text-zinc-400 dark:marker:text-zinc-600">
          {projects.map((project) => (
            <li key={project.href}>
              <TextLink href={project.href}>{project.name}</TextLink>
            </li>
          ))}
        </ul>
        <p>
          You can <TextLink href="/articles">read my writing</TextLink>, see{' '}
          <TextLink href="/uses">what I use</TextLink>, or find me on{' '}
          <TextLink href="https://github.com/rangapin">GitHub</TextLink> and{' '}
          <TextLink href="https://www.linkedin.com/in/rangapin/">
            LinkedIn
          </TextLink>
          .{' '}
          <TextLink href="mailto:richard.angapin@outlook.com">
            Reach out
          </TextLink>{' '}
          if you&apos;d like to work together.
        </p>
      </div>
    </PageLayout>
  )
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: compiles successfully, no errors.

- [ ] **Step 3: Visual check**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: a single narrow serif column — "Richard Angapin" heading, prose paragraphs with underlined links, a square-bulleted project list, and a small theme toggle at the bottom. Click the toggle: the page switches between light and dark. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "Rewrite homepage in minimal leerob style"
```

---

## Task 7: Restyle SimpleLayout

**Files:**
- Modify: `src/components/SimpleLayout.tsx` (full replace)

- [ ] **Step 1: Replace `src/components/SimpleLayout.tsx`**

```tsx
import { PageLayout } from '@/components/PageLayout'

export function SimpleLayout({
  title,
  intro,
  children,
}: {
  title: string
  intro?: string
  children?: React.ReactNode
}) {
  return (
    <PageLayout backHref="/" backLabel="Richard Angapin">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </h1>
      {intro && (
        <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      )}
      {children && <div className="mt-12">{children}</div>}
    </PageLayout>
  )
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: compiles successfully, no errors. (`articles`, `projects`, `uses`, and `thank-you` still render through `SimpleLayout` and still use `Card`; that is fine — they are rewritten in later tasks.)

- [ ] **Step 3: Commit**

```bash
git add src/components/SimpleLayout.tsx
git commit -m "Restyle SimpleLayout to the minimal page shell"
```

---

## Task 8: Rewrite the articles index

**Files:**
- Modify: `src/app/articles/page.tsx` (full replace)

- [ ] **Step 1: Replace `src/app/articles/page.tsx`**

```tsx
import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { TextLink } from '@/components/TextLink'
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Writing on GTM engineering, outbound systems, and building in public.',
}

export default async function ArticlesIndex() {
  let articles = await getAllArticles()

  return (
    <SimpleLayout
      title="Writing"
      intro="Notes on GTM engineering, outbound systems, and building in public."
    >
      <ul className="space-y-6">
        {articles.map((article) => (
          <li
            key={article.slug}
            className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <TextLink href={`/articles/${article.slug}`}>
              {article.title}
            </TextLink>
            <time
              dateTime={article.date}
              className="shrink-0 text-sm text-zinc-400 dark:text-zinc-500"
            >
              {formatDate(article.date)}
            </time>
          </li>
        ))}
      </ul>
    </SimpleLayout>
  )
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: compiles successfully, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/articles/page.tsx
git commit -m "Rewrite articles index as a minimal list"
```

---

## Task 9: Rewrite the projects index

**Files:**
- Modify: `src/app/projects/page.tsx`

Surgical edits — the `gtmProjects` / `techProjects` data arrays keep their `name`, `description`, and `link` values; only the `logo` property, the imports, and the rendering change.

- [ ] **Step 1: Replace the imports**

Replace lines 1–10 (the import block):

```tsx
import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoEcommercePipeline from '@/images/logos/ecommerce-pipeline.svg'
import logoSecurityLeads from '@/images/logos/security-leads.svg'
import logoMpcRecruitment from '@/images/logos/mpc-recruitment.svg'
import logoBodaccIgaming from '@/images/logos/bodacc-igaming.svg'
import logoTheLine from '@/images/logos/the-line.svg'
```

with:

```tsx
import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { TextLink } from '@/components/TextLink'
```

- [ ] **Step 2: Remove the `logo` properties from both data arrays**

Delete these five lines (one inside each project object):

```tsx
    logo: logoMpcRecruitment,
```
```tsx
    logo: logoEcommercePipeline,
```
```tsx
    logo: logoBodaccIgaming,
```
```tsx
    logo: logoSecurityLeads,
```
```tsx
    logo: logoTheLine,
```

Leave `name`, `description`, and `link` in each object unchanged.

- [ ] **Step 3: Delete the `LinkIcon` function**

Remove the entire `LinkIcon` function (the `function LinkIcon(props: ...) { ... }` block, including its long `<path>`).

- [ ] **Step 4: Replace the `ProjectCard` function**

Replace the entire `ProjectCard` function with:

```tsx
function ProjectItem({ project }: { project: (typeof gtmProjects)[0] }) {
  return (
    <li>
      <TextLink href={project.link.href}>{project.name}</TextLink>
      <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {project.description}
      </p>
    </li>
  )
}
```

- [ ] **Step 5: Replace the `Projects` component body**

Replace the entire `return ( ... )` inside `export default function Projects()` with:

```tsx
  return (
    <SimpleLayout
      title="Projects"
      intro="GTM workflows built in Clay, and tools written in code — two outputs, one obsession with making systems work."
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-sm font-semibold tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
            GTM &amp; Outbound
          </h2>
          <ul className="mt-5 space-y-6">
            {gtmProjects.map((project) => (
              <ProjectItem key={project.name} project={project} />
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-sm font-semibold tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
            Tools &amp; Code
          </h2>
          <ul className="mt-5 space-y-6">
            {techProjects.map((project) => (
              <ProjectItem key={project.name} project={project} />
            ))}
          </ul>
        </section>
      </div>
    </SimpleLayout>
  )
```

- [ ] **Step 6: Verify the build**

Run: `npm run build`
Expected: compiles successfully, no errors. If the build reports an unused variable, confirm no `logo`/`Image`/`Card`/`LinkIcon` references remain.

- [ ] **Step 7: Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "Rewrite projects index as minimal sectioned lists"
```

---

## Task 10: Rewrite the uses page

**Files:**
- Modify: `src/app/uses/page.tsx`

Surgical edits — all `<Tool>` entries (the actual content) stay; only the imports, the two helper components, the wrapper spacing, and the `SimpleLayout` title/intro change.

- [ ] **Step 1: Replace the imports**

Replace lines 1–3:

```tsx
import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
```

with:

```tsx
import { SimpleLayout } from '@/components/SimpleLayout'
import { TextLink } from '@/components/TextLink'
```

- [ ] **Step 2: Replace the `ToolsSection` helper**

Replace the entire `ToolsSection` function with:

```tsx
function ToolsSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="text-sm font-semibold tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
        {title}
      </h2>
      <ul className="mt-5 space-y-6">{children}</ul>
    </section>
  )
}
```

- [ ] **Step 3: Replace the `Tool` helper**

Replace the entire `Tool` function with:

```tsx
function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <li>
      {href ? (
        <TextLink href={href}>{title}</TextLink>
      ) : (
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </span>
      )}
      <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {children}
      </p>
    </li>
  )
}
```

- [ ] **Step 4: Update the `SimpleLayout` props and wrapper spacing**

In the `Uses` component's return, replace:

```tsx
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="Here's the gear and software I rely on daily to run outbound systems, build projects, and stay sharp."
    >
      <div className="space-y-20">
```

with:

```tsx
    <SimpleLayout
      title="Uses"
      intro="The gear and software I rely on daily to run outbound systems, build projects, and stay sharp."
    >
      <div className="space-y-12">
```

Leave every `<ToolsSection>` and `<Tool>` element between that `<div>` and its closing `</div>` exactly as-is.

- [ ] **Step 5: Verify the build**

Run: `npm run build`
Expected: compiles successfully, no errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/uses/page.tsx
git commit -m "Rewrite uses page as minimal sectioned lists"
```

---

## Task 11: Rewrite the about page

**Files:**
- Modify: `src/app/about/page.tsx`

Surgical edits — the twelve biography `<p>` paragraphs (currently the children of the `<div className="mt-6 space-y-7 ...">`) are preserved verbatim; only the imports, the helper components, and the structural wrappers change.

- [ ] **Step 1: Replace the imports**

Replace lines 1–11 (the import block) with:

```tsx
import { type Metadata } from 'next'

import { PageLayout } from '@/components/PageLayout'
import { Prose } from '@/components/Prose'
import { TextLink } from '@/components/TextLink'
```

- [ ] **Step 2: Delete the `SocialLink` and `MailIcon` helper functions**

Remove the entire `SocialLink` function and the entire `MailIcon` function. Leave the `export const metadata` block.

- [ ] **Step 3: Replace the opening of the `return` (down to the bio wrapper)**

Replace this block:

```tsx
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I'm Richard. I build GTM systems, and I got here the hard way.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
```

with:

```tsx
  return (
    <PageLayout backHref="/" backLabel="Richard Angapin">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        I&apos;m Richard. I build GTM systems, and I got here the hard way.
      </h1>
      <Prose className="mt-8">
```

(The twelve `<p>...</p>` paragraphs that follow stay exactly where they are.)

- [ ] **Step 4: Replace the closing of the `return` (after the last paragraph)**

Replace this block — everything from the bio `</div>` after the final `</p>` to the end of the component:

```tsx
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://github.com/rangapin" icon={GitHubIcon}>
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/rangapin/"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:richard.angapin@outlook.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              richard.angapin@outlook.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
```

with:

```tsx
      </Prose>

      <h2 className="mt-16 text-sm font-semibold tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
        Work
      </h2>
      <ul className="mt-5 space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
        <li className="flex justify-between gap-4">
          <span className="text-zinc-900 dark:text-zinc-100">Quable</span>
          <span>2023 — 2025</span>
        </li>
        <li className="flex justify-between gap-4">
          <span className="text-zinc-900 dark:text-zinc-100">ROI Hunter</span>
          <span>2022</span>
        </li>
        <li className="flex justify-between gap-4">
          <span className="text-zinc-900 dark:text-zinc-100">
            Run It Once Poker
          </span>
          <span>2019 — 2022</span>
        </li>
        <li className="flex justify-between gap-4">
          <span className="text-zinc-900 dark:text-zinc-100">PokerStars</span>
          <span>2010 — 2019</span>
        </li>
      </ul>

      <p className="mt-12 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        Find me on{' '}
        <TextLink href="https://github.com/rangapin">GitHub</TextLink> and{' '}
        <TextLink href="https://www.linkedin.com/in/rangapin/">
          LinkedIn
        </TextLink>
        , email{' '}
        <TextLink href="mailto:richard.angapin@outlook.com">
          richard.angapin@outlook.com
        </TextLink>
        , or download my{' '}
        <TextLink href="/richard.angapin_gtm.pdf">CV</TextLink>.
      </p>
    </PageLayout>
  )
}
```

- [ ] **Step 5: Verify the build**

Run: `npm run build`
Expected: compiles successfully, no errors. If an unused-import error appears, confirm no `Container`, `Image`, `clsx`, `GitHubIcon`, `LinkedInIcon`, or `portraitImage` references remain.

- [ ] **Step 6: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "Rewrite about page in minimal style with work history"
```

---

## Task 12: Restyle ArticleLayout, ProjectLayout, and clean providers

**Files:**
- Modify: `src/components/ArticleLayout.tsx` (full replace)
- Modify: `src/components/ProjectLayout.tsx` (full replace)
- Modify: `src/app/providers.tsx` (full replace)

Both layouts become server components (no `'use client'`, no router). The floating round back-button is replaced by `PageLayout`'s text back-link, so `AppContext`/`previousPathname` is no longer used and is removed from `providers.tsx`.

- [ ] **Step 1: Replace `src/components/ArticleLayout.tsx`**

```tsx
import { PageLayout } from '@/components/PageLayout'
import { Prose } from '@/components/Prose'
import { type ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

export function ArticleLayout({
  article,
  children,
}: {
  article: ArticleWithSlug
  children: React.ReactNode
}) {
  return (
    <PageLayout backHref="/articles" backLabel="Writing">
      <article>
        <header className="flex flex-col">
          <time
            dateTime={article.date}
            className="text-sm text-zinc-400 dark:text-zinc-500"
          >
            {formatDate(article.date)}
          </time>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {article.title}
          </h1>
        </header>
        <Prose className="mt-8" data-mdx-content>
          {children}
        </Prose>
      </article>
    </PageLayout>
  )
}
```

- [ ] **Step 2: Replace `src/components/ProjectLayout.tsx`**

```tsx
import { PageLayout } from '@/components/PageLayout'
import { Prose } from '@/components/Prose'
import { TextLink } from '@/components/TextLink'

export function ProjectLayout({
  project,
  children,
}: {
  project: { title: string; description: string; link?: string }
  children: React.ReactNode
}) {
  return (
    <PageLayout backHref="/projects" backLabel="Projects">
      <article>
        <header className="flex flex-col">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {project.title}
          </h1>
          <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {project.description}
          </p>
          {project.link && (
            <p className="mt-3 text-sm">
              <TextLink href={project.link}>View project →</TextLink>
            </p>
          )}
        </header>
        <Prose className="mt-8" data-mdx-content>
          {children}
        </Prose>
      </article>
    </PageLayout>
  )
}
```

- [ ] **Step 3: Replace `src/app/providers.tsx`**

```tsx
'use client'

import { useEffect } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'

function ThemeWatcher() {
  let { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      let systemTheme = media.matches ? 'dark' : 'light'
      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <ThemeWatcher />
      {children}
    </ThemeProvider>
  )
}
```

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: compiles successfully, no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ArticleLayout.tsx src/components/ProjectLayout.tsx src/app/providers.tsx
git commit -m "Restyle article/project layouts and drop unused AppContext"
```

---

## Task 13: Restyle the 404 page

**Files:**
- Modify: `src/app/not-found.tsx` (full replace)

- [ ] **Step 1: Replace `src/app/not-found.tsx`**

```tsx
import { PageLayout } from '@/components/PageLayout'
import { TextLink } from '@/components/TextLink'

export default function NotFound() {
  return (
    <PageLayout backHref="/" backLabel="Richard Angapin">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        Page not found
      </h1>
      <p className="mt-6 text-base leading-7 text-zinc-800 dark:text-zinc-300">
        Sorry, I couldn&apos;t find the page you&apos;re looking for.{' '}
        <TextLink href="/">Head back home</TextLink>.
      </p>
    </PageLayout>
  )
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: compiles successfully, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "Restyle 404 page in minimal style"
```

---

## Task 14: Delete the Speaking and thank-you routes

**Files:**
- Delete: `src/app/speaking/page.tsx` (and the `speaking` directory)
- Delete: `src/app/thank-you/page.tsx` (and the `thank-you` directory)

- [ ] **Step 1: Delete the two route directories**

```bash
git rm -r src/app/speaking src/app/thank-you
```

- [ ] **Step 2: Confirm nothing links to them**

Run: `git grep -nE "/speaking|/thank-you" -- src` (or use the Grep tool for `/speaking|/thank-you` under `src`).
Expected: no results. (The newsletter form that pointed to `/thank-you` was already removed in the Task 6 homepage rewrite.)

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: compiles successfully; `/speaking` and `/thank-you` no longer appear in the route list.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Delete placeholder Speaking page and orphaned thank-you page"
```

---

## Task 15: Delete unused components and assets; final verification

**Files:**
- Delete: `src/components/Header.tsx`, `Layout.tsx`, `Footer.tsx`, `Card.tsx`, `Button.tsx`, `Section.tsx`, `SocialIcons.tsx`, `Container.tsx`
- Delete: `src/images/` (after confirming no imports remain)

- [ ] **Step 1: Confirm the components are unused**

Run (Grep tool, or `git grep`): search `src` for
`@/components/(Header|Layout|Footer|Card|Button|Section|SocialIcons|Container)`.
Expected: no results. If any file still imports one of these, that file was missed in an earlier task — fix it before continuing.

- [ ] **Step 2: Delete the unused components**

```bash
git rm src/components/Header.tsx src/components/Layout.tsx src/components/Footer.tsx src/components/Card.tsx src/components/Button.tsx src/components/Section.tsx src/components/SocialIcons.tsx src/components/Container.tsx
```

- [ ] **Step 3: Confirm the image assets are unused, then delete them**

Run (Grep tool, or `git grep`): search `src` for `@/images`.
Expected: no results. If confirmed empty, delete the folder:

```bash
git rm -r src/images
```

If any `@/images` import remains, do not delete `src/images` — report the remaining importer instead.

- [ ] **Step 4: Full build**

Run: `npm run build`
Expected: compiles successfully, no type or lint errors. Route list contains `/`, `/about`, `/articles`, `/articles/*`, `/projects`, `/projects/*`, `/uses`, `/feed.xml`, and the 404 — and no `/speaking` or `/thank-you`.

- [ ] **Step 5: Visual verification**

Run: `npm run dev` and check each page at `http://localhost:3000`:
- `/` — name, prose, square-bulleted project list, footer toggle, no header.
- `/about` — `← Richard Angapin` link, serif bio, "Work" list, contact line.
- `/articles` — `← Richard Angapin` link, title + date list.
- `/projects` — two sections, project name + description per item.
- `/uses` — sectioned tool lists.
- One article (e.g. `/articles/what-gtm-engineers-actually-earn`) — `← Writing` link, serif prose, no teal links.
- One project (e.g. `/projects/security-lead-scorer`) — `← Projects` link, "View project →" link, serif prose.
- A bad URL (e.g. `/nope`) — minimal 404.
- Toggle light/dark on a couple of pages and confirm it persists across navigation.

Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Delete unused template components and image assets"
```

---

## Self-Review

**Spec coverage:**
- Typography & color (serif, no teal, body-colored underlined links) → Tasks 1, 5.
- Layout (~600px column, no header, minimal footer) → Tasks 1, 4.
- Navigation (no header, inline links, sub-page back-links) → Tasks 4, 6–13.
- Dark mode kept (toggle in footer) → Tasks 3, 4.
- Homepage rewrite → Task 6.
- About / Articles / Projects / Uses rewrites → Tasks 8–11.
- Article & project case-study layouts → Task 12.
- 404 → Task 13.
- Deletions (Header, Card, Button, Section, SocialIcons, Container, Layout, Footer, Speaking, thank-you, images) → Tasks 14, 15.
- RSS feed, MDX wiring, `getAllArticles`, case-study content → untouched (not in any task).

**Placeholder scan:** No TBD/TODO; every code step contains complete code. Surgical-edit tasks (9, 10, 11) name the exact blocks to replace and explicitly state which content is preserved.

**Type consistency:** `PageLayout` props `backHref?`/`backLabel?` are used consistently in `SimpleLayout`, `ArticleLayout`, `ProjectLayout`, and `not-found`. `TextLink` takes `href: string` everywhere it is called. `ProjectItem` reads `project.link.href` (the projects-page array shape); `ProjectLayout` reads `project.link` (a plain string, the MDX shape) — these are intentionally different types in different files.
