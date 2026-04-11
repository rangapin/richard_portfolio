# Richard's Portfolio

Personal portfolio and writing site built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com). Showcases projects, case studies, and articles.

## Getting started

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root and set your site's public URL:

```
NEXT_PUBLIC_SITE_URL=https://example.com
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — run the production build locally
- `npm run lint` — lint the project

## Project structure

Source lives in `/src`. Articles and case studies are authored in MDX under `src/app/articles` and `src/app/projects`.

## Tech stack

- [Next.js 15](https://nextjs.org/docs) (App Router)
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com/docs)
- [MDX](https://mdxjs.com) for articles and case studies
- [Headless UI](https://headlessui.com)

## License

Based on the [Spotlight](https://tailwindcss.com/plus) template by Tailwind Plus and licensed under the [Tailwind Plus license](https://tailwindcss.com/plus/license). Portfolio content is © Richard.
