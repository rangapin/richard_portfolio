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
