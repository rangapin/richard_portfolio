import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoAchilleus from '@/images/logos/achilleus.svg'
import logoEcommercePipeline from '@/images/logos/ecommerce-pipeline.svg'
import logoSecurityLeads from '@/images/logos/security-leads.svg'
import logoMpcRecruitment from '@/images/logos/mpc-recruitment.svg'

const gtmProjects = [
  {
    name: 'MPC Recruitment Outbound System',
    description:
      'Multi-table Clay architecture that scrapes LinkedIn job postings, qualifies companies, finds decision makers based on company size, enriches contacts through a 5-provider email waterfall, generates personalized cold emails, and pushes campaign-ready data to Smartlead — with cache tables to eliminate duplicate enrichment across runs.',
    link: { href: '/projects/mpc-recruitment-outbound-system', label: 'Case study' },
    logo: logoMpcRecruitment,
  },
  {
    name: 'E-commerce Lead Generation Pipeline',
    description:
      'Full Clay workflow that takes raw company names through e-commerce qualification (BuiltWith + Claygent), contact discovery, a 5-provider email waterfall, and AI-generated personalized opening lines — 42 verified emails from 64 contacts at ~330 credits total.',
    link: { href: '/projects/ecommerce-lead-generation-pipeline', label: 'Case study' },
    logo: logoEcommercePipeline,
  },
]

const techProjects = [
  {
    name: 'Achilleus',
    description:
      'SaaS tool for website security monitoring. Helps digital agencies track SSL certificates, security headers, and email authentication across all client domains — before clients find out the hard way.',
    link: { href: '/projects/achilleus', label: 'Case study' },
    logo: logoAchilleus,
  },
  {
    name: 'Security Lead Scorer',
    description:
      'Python CLI tool that scans domains for SSL issues, missing security headers, and DNS misconfigurations, then scores them 0–100 by security posture. Higher score = worse security = better prospect. Generates talking points for outreach automatically.',
    link: { href: '/projects/security-lead-scorer', label: 'Case study' },
    logo: logoSecurityLeads,
  },
]

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ProjectCard({ project }: { project: (typeof gtmProjects)[0] }) {
  return (
    <Card as="li">
      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image
          src={project.logo}
          alt=""
          className="h-8 w-8"
          unoptimized
        />
      </div>
      <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
        <Card.Link href={project.link.href}>{project.name}</Card.Link>
      </h2>
      <Card.Description>{project.description}</Card.Description>
      <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
        <LinkIcon className="h-6 w-6 flex-none" />
        <span className="ml-2">{project.link.label}</span>
      </p>
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description: "Things I've built. So far.",
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I've built. So far."
      intro="GTM workflows built in Clay, and tools written in code. Two different outputs, same underlying obsession with making systems work."
    >
      <div className="space-y-20">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            GTM & Outbound
          </h2>
          <ul
            role="list"
            className="mt-8 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
          >
            {gtmProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Tools & Code
          </h2>
          <ul
            role="list"
            className="mt-8 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
          >
            {techProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </ul>
        </div>
      </div>
    </SimpleLayout>
  )
}
