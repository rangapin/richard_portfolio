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
