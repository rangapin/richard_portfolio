import { PageLayout } from '@/components/PageLayout'
import { Prose } from '@/components/Prose'
import { type ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

export function ArticleLayout({
  article,
  children,
}: {
  article: ArticleWithSlug
  children: React.ReactNode
}) {
  return (
    <PageLayout backHref="/articles" backLabel="Writing">
      <article>
        <header className="flex flex-col">
          <time
            dateTime={article.date}
            className="text-sm text-zinc-400 dark:text-zinc-500"
          >
            {formatDate(article.date)}
          </time>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {article.title}
          </h1>
        </header>
        <Prose className="mt-8" data-mdx-content>
          {children}
        </Prose>
      </article>
    </PageLayout>
  )
}
