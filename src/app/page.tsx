import { type Metadata } from 'next'

import { PageLayout } from '@/components/PageLayout'
import { TextLink } from '@/components/TextLink'

export const metadata: Metadata = {
  title:
    'Richard Angapin - Builder of AI systems, founder, and amateur freediver',
}

const projects = [
  { name: 'HackerScope AI', href: '/projects/hackerscope-ai' },
  { name: 'Achilleus', href: '/projects/achilleus' },
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
          I&apos;m a builder of AI systems and automation infrastructure, based
          in Gdynia, Poland. I design and ship products and internal tools that
          turn messy inputs into reliable output — chaining APIs, AI models, and
          data pipelines into systems that run on their own. My work spans AI
          research tools, security tooling, and go-to-market automation.
        </p>
        <p>
          Before this, I spent fifteen years in customer support across online
          gaming and SaaS — high-pressure environments where you solve problems
          fast or things break. I taught myself to build, then to take what
          I&apos;d built to market. That&apos;s{' '}
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
