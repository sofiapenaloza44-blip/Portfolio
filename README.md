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

## End-to-end tests

[Playwright](https://playwright.dev) drives the built site in a real browser (home page content,
navigating into a case study, the career journey page).

```bash
npx playwright install   # first time only, downloads a matching browser
npm run test:e2e         # headless run (builds, serves, and tests)
npm run test:e2e:ui      # interactive UI mode
```

The suite builds the site and serves it with `vite preview` automatically (see
`playwright.config.ts`), so there's no separate server to start first.

If you're running in an environment with a pre-installed Chromium that doesn't match this
project's pinned Playwright version (so `npx playwright install` isn't an option), set
`PLAYWRIGHT_CHROMIUM_PATH` to that browser's executable and the config will use it instead of
downloading one.

### Running against the live site

To run the same suite against the deployed GitHub Pages site instead of a local build, set
`PLAYWRIGHT_BASE_URL` — this also skips building/serving a local copy:

```bash
PLAYWRIGHT_BASE_URL=https://sofiapenaloza44-blip.github.io/Portfolio/ npm run test:e2e
```

Or point the CLI's own tools (codegen, the inspector) at the live site directly, no config needed:

```bash
npx playwright codegen https://sofiapenaloza44-blip.github.io/Portfolio/
npx playwright open https://sofiapenaloza44-blip.github.io/Portfolio/
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
