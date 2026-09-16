# Sofia Peñaloza — Portfolio

Product design portfolio, rebuilt as a static React site (previously a Google Sites page).

## Stack

- [Vite](https://vite.dev) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Router](https://reactrouter.com) for the home page and individual case study routes
- [Motion](https://motion.dev) for scroll reveals and the hero entrance
- [Phosphor Icons](https://phosphoricons.com)
- Self-hosted [Outfit](https://fonts.google.com/specimen/Outfit) via `@fontsource/outfit`

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Content

- `src/data/work.ts` — case studies grouped by industry. The `overview` field for each is
  Sofia's own copy; `challenge`, `process`, and `outcome` are demo placeholder content and
  should be replaced with real specifics.
- `src/data/career.ts` — the timeline shown on the "Career journey" page.
- `src/data/learnings.ts` — certifications shown in "Latest learnings".
- `src/data/site.ts` — contact email, CV link, and LinkedIn URL. All placeholders, replace
  before publishing.

Case study and card images currently load from `picsum.photos` as placeholders (see
`gallerySeeds` in `work.ts`). Swap these for real project images once available.
