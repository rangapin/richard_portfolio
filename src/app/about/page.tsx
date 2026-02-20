import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm Richard Angapin. GTM engineer, founder, and someone who figured out what they wanted to do by actually doing it.",
}

export default function About() {
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
            <p>
              My name is Richard. I spent fifteen years in customer support —
              gaming, SaaS, high-pressure environments where you learn to solve
              problems fast or things break. I was good at it. But about eight
              months ago I left my job with a simple goal: upskill, and figure
              out what came next.
            </p>
            <p>
              I started where most technical people start — tinkering. I messed
              around with Claude Code, built things, shipped Achilleus, a
              security monitoring tool for digital agencies. Then came the part
              nobody warns you about: building something is the easy part.
              Marketing it is another discipline entirely. I had a product and
              no idea how to get it in front of people.
            </p>
            <p>
              That&apos;s how I found Clay. And through Clay, GTM engineering.
            </p>
            <p>
              I&apos;d stumbled into a field I didn&apos;t know existed. GTM
              engineering as a formal role is only a few years old, but it sits
              exactly at the intersection of where I&apos;d spent my career —
              technical enough to build, customer-facing enough to understand
              what actually matters. And the more I got exposed to the
              community, to what the best practitioners were actually building,
              the more I felt something I can only describe as genuine obsession.
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
              a detour turned out to be genuinely useful in GTM. The field
              rewards people who can move across the stack, and it turns out the
              tech person who pivoted into GTM is exactly the profile the market
              is looking for.
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
