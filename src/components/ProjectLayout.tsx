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
