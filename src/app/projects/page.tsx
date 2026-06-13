import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { TextLink } from '@/components/TextLink'

const gtmProjects = [
  {
    name: 'MPC Recruitment Outbound System',
    description:
      'Multi-table Clay architecture that scrapes LinkedIn job postings, qualifies companies, finds decision makers based on company size, enriches contacts through a 5-provider email waterfall, generates personalized cold emails, and pushes campaign-ready data to Smartlead — with cache tables to eliminate duplicate enrichment across runs.',
    link: { href: '/projects/mpc-recruitment-outbound-system', label: 'Case study' },
  },
  {
    name: 'E-commerce Lead Generation Pipeline',
    description:
      'Full Clay workflow that takes raw company names through e-commerce qualification (BuiltWith + Claygent), contact discovery, a 5-provider email waterfall, and AI-generated personalized opening lines — 42 verified emails from 64 contacts at ~330 credits total.',
    link: { href: '/projects/ecommerce-lead-generation-pipeline', label: 'Case study' },
  },
  {
    name: 'BODACC iGaming Signal Workflow',
    description:
      'Signal-based outbound that monitors French public legal data for corporate transformation events at iGaming B2B vendors, scores companies by transformation intensity, and generates personalized cold emails in French referencing real legal events.',
    link: { href: '/projects/bodacc-igaming-signal-workflow', label: 'Case study' },
  },
]

const techProjects = [
  {
    name: 'HackerScope AI',
    description:
      'An AI-powered startup research and validation platform. AI-assisted research workflows turn market signals into structured business ideas, chaining multiple APIs and AI systems to automate research, analysis, and content generation. Built with Next.js, Supabase, Claude, Exa, and Stripe.',
    link: { href: '/projects/hackerscope-ai', label: 'Case study' },
  },
  {
    name: 'Achilleus',
    description:
      'A SaaS security-monitoring product for web agencies. It monitored agency-managed sites for security issues so problems could be caught before clients noticed them. Built with Laravel, Next.js, and Claude Code.',
    link: { href: '/projects/achilleus', label: 'Case study' },
  },
  {
    name: 'Security Lead Scorer',
    description:
      'Python CLI tool that scans domains for SSL issues, missing security headers, and DNS misconfigurations, then scores them 0–100 by security posture. Higher score = worse security = better prospect. Generates talking points for outreach automatically.',
    link: { href: '/projects/security-lead-scorer', label: 'Case study' },
  },
  {
    name: 'The Line',
    description:
      'Community forum for the international freediving community. A place for freedivers to connect, share training knowledge, discuss competitions, and help each other progress in the sport.',
    link: { href: '/projects/the-line', label: 'Case study' },
  },
]

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

export const metadata: Metadata = {
  title: 'Projects',
  description: "Things I've built. So far.",
}

export default function Projects() {
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
          <ul role="list" className="mt-5 space-y-6">
            {gtmProjects.map((project) => (
              <ProjectItem key={project.name} project={project} />
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-sm font-semibold tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
            Tools &amp; Code
          </h2>
          <ul role="list" className="mt-5 space-y-6">
            {techProjects.map((project) => (
              <ProjectItem key={project.name} project={project} />
            ))}
          </ul>
        </section>
      </div>
    </SimpleLayout>
  )
}
