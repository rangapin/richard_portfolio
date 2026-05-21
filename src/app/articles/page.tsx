import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { TextLink } from '@/components/TextLink'
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Writing on GTM engineering, outbound systems, and building in public.',
}

export default async function ArticlesIndex() {
  let articles = await getAllArticles()

  return (
    <SimpleLayout
      title="Writing"
      intro="Notes on GTM engineering, outbound systems, and building in public."
    >
      <ul className="space-y-6">
        {articles.map((article) => (
          <li
            key={article.slug}
            className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <TextLink href={`/articles/${article.slug}`}>
              {article.title}
            </TextLink>
            <time
              dateTime={article.date}
              className="shrink-0 text-sm text-zinc-400 dark:text-zinc-500"
            >
              {formatDate(article.date)}
            </time>
          </li>
        ))}
      </ul>
    </SimpleLayout>
  )
}
