import { type Metadata } from 'next'
import { Newsreader } from 'next/font/google'

import { Providers } from '@/app/providers'

import '@/styles/tailwind.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Richard Angapin',
    default: 'Richard Angapin - GTM Engineer, founder, and amateur freediver',
  },
  description:
    "I'm Richard, a GTM engineer and founder based in Gdynia, Poland. I build the outbound infrastructure that turns raw data into pipeline — enrichment workflows, sequencing systems, and the API integrations that help B2B teams reach the right people at the right time.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-white font-serif text-zinc-900 dark:bg-zinc-950 dark:text-zinc-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
