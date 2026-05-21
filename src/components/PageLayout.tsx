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
