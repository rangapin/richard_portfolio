import { type Metadata } from 'next'

import { PageLayout } from '@/components/PageLayout'
import { Prose } from '@/components/Prose'
import { TextLink } from '@/components/TextLink'


export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm Richard Angapin. I build AI systems and automation infrastructure, and I figured out what I wanted to do by actually doing it.",
}

export default function About() {
  return (
    <PageLayout backHref="/" backLabel="Richard Angapin">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        I&apos;m Richard. I build AI systems and automation, and I got here the
        hard way.
      </h1>
      <Prose className="mt-8">
            <p>
              My name is Richard. I spent fifteen years in customer support —
              gaming, SaaS, high-pressure environments where you learn to solve
              problems fast or things break. I was good at it. But about eight
              months ago I left my job with a simple goal: upskill, and figure
              out what came next.
            </p>
            <p>
              I started where most technical people start — tinkering. I messed
              around with Claude Code, built things, shipped projects. Then came
              the part nobody warns you about: building something is the easy
              part. Marketing it is another discipline entirely. I had products
              and no idea how to get them in front of people.
            </p>
            <p>
              That&apos;s how I found Clay. And through Clay, GTM engineering.
            </p>
            <p>
              I&apos;d stumbled into a field I didn&apos;t know existed. GTM
              engineering as a formal role is only a few years old, but what
              hooked me wasn&apos;t the label — it was that it sat exactly at the
              intersection of where I&apos;d spent my career: technical enough to
              build, customer-facing enough to understand what actually matters.
              It became the place where I learned to ship real systems and take
              them to market. The more I saw what the best practitioners were
              building, the more I felt something I can only describe as genuine
              obsession — not with a job title, but with building things that
              work.
            </p>
            <p>
              So I enrolled in the Clay bootcamp. It wasn&apos;t cheap, and I
              had real doubts. I was starting from zero — not the comfortable
              kind of zero where you at least know the vocabulary, but the kind
              where you open a tool and genuinely don&apos;t understand what
              you&apos;re looking at. My instinct was to obsess over ROI. Would
              this pay off? How quickly? What if it didn&apos;t?
            </p>
            <p>
              My mentor reframed it with the simplest advice I got during the
              entire program: be proactive, and build something every day. Not
              study. Not consume. Build.
            </p>
            <p>
              It sounds obvious in hindsight. Most good advice does. But
              there&apos;s a difference between knowing something intellectually
              and actually doing it — shipping a workflow, breaking it, fixing
              it, shipping it again. Somewhere in that loop, the ROI question
              became irrelevant. Because I started to realise the real return
              wasn&apos;t a client or a job offer. It was a shift in how I saw
              myself.
            </p>
            <p>
              I went from &ldquo;I don&apos;t understand anything&rdquo; to
              &ldquo;I know how to do this.&rdquo;
            </p>
            <p>
              That transition doesn&apos;t happen by reading documentation. It
              happens when someone won&apos;t let you stay comfortable, when
              you&apos;re surrounded by people operating at the level
              you&apos;re trying to reach, and when the only way forward is to
              actually build the thing.
            </p>
            <p>
              A funny footnote: the Claude Code skills I&apos;d written off as
              a detour turned out to be the most durable thing I picked up. The
              work rewards people who can move across the stack — read a
              codebase, wire up APIs, automate the boring parts, and still talk
              to the human on the other end. That turned out to be the
              throughline, whatever job title sits on top of it.
            </p>
            <p>
              The bootcamp was expensive. I&apos;d make the same choice again
              without hesitating. Not because everything went smoothly — it
              didn&apos;t — but because the combination of mentorship,
              structure, and daily accountability compressed what could have
              taken years into months.
            </p>
            <p>
              I&apos;m not done learning. But I&apos;m no longer lost, and
              that&apos;s worth more than any degree.
            </p>
      </Prose>

      <h2 className="mt-16 text-sm font-semibold tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
        Work
      </h2>
      <ul role="list" className="mt-5 space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
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
