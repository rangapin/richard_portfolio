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
