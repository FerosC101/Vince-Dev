# VINCE/ — Field Archive

Personal portfolio of Vince Anjo Villar. React 19 + React Router 7, built with Vite.

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve the production build
```

## Hosting

It's a single-page app, so every route must fall back to `index.html`.

- **Vercel** — import the repo; framework preset *Vite*. `vercel.json` already contains the rewrite.
- **Netlify** — build `npm run build`, publish `dist`. `public/_redirects` already contains the rewrite.
- **Cloudflare Pages** — build `npm run build`, output `dist`. SPA fallback is automatic.
- **GitHub Pages** — has no rewrites. Swap `BrowserRouter` for `HashRouter` in `src/App.jsx` and set `base: "/<repo>/"` in `vite.config.js` if not deploying to a user site.

## Structure

Design principle: **show the work, label it, explain only when asked.**

```
src/
  config.js               links + settings (email, GitHub, LinkedIn, deployment)
  data/projects.jsx       facts: every entry V/001–V/020, report sections, meta (verified)
  data/cases.jsx          presentation: one-liner, question, hero, screens, grid tile per project
  data/records.js         experience, recognition, log, graveyard
  components/Spreads.jsx  the five homepage spreads — each with its own visual language
  components/Sections.jsx collage, experience, recognition, tech strip, about, graveyard, log
  components/Visual.jsx   Shot (click to expand), Drawing, ClauseCard, TypeFlow, PendingSlots, Sig
  lib/plates.js           generated SVG figures (landscape, streams, flow, bars, sketch, chart)
  pages/                  Home, Work, Project (case), About, Log, Recognition, Graveyard
public/work/              real screenshots of the running projects
public/images/            portrait
```

- Homepage features the slugs in `FEATURED_SLUGS` (`projects.jsx`); everything else goes to **OTHER THINGS/**.
- Case pages: hero → the question → one screen per idea → result → details behind **Technical notes / System details / Process / Results / Stack +**.
- Screenshots in `public/work/` were captured from each project's own build (AILA, AURA, ALVIN, KAIA, Code Golf, Outplay, Rani, Persona) or taken from its repo (LegacyLens, HERA). Replace any of them by keeping the file name.
- Bench mode: press **B** or use the footer toggle.

Routes: `/`, `/work`, `/work/:slug`, `/about`, `/log`, `/recognition`, `/graveyard`.

## Archive entries

`src/data/projects.jsx` holds 20 entries, V/001–V/020, numbered by start date, newest first.
Each was written from the project's own README, docs and git history in `~/Codes`, plus the CV.

- `kind: "report"` — full field report; all ten sections shown, unfiled ones as DATA PENDING.
- `kind: "record"` — short record; only filed sections are shown.
- `featured: true` — shown on the home page (the rest are on `/work`).
- Periods come from first → last commit; `period: null` shows DATE PENDING.
- Contribution lines are commit counts from `git log`.
- Artemis is described only from the standalone builds (`GArtemis`, `artemis-mini`), never from internal code.

## Filling in pending data

Nothing is guessed. Anything not in the CV renders as **DATA PENDING**.

- **Links** — set `email`, `github`, `githubUser`, `linkedin`, `deployment` in `src/config.js`. Setting `githubUser` makes bench mode show real public push activity; until then it reads `NO LIVE SOURCE CONNECTED`.
- **Project report sections** — add JSX under `sections` in `src/data/projects.jsx`, keyed by `observation`, `context`, `hypothesis`, `constraints`, `system`, `experiment`, `failure`, `revision`, `result`, `survived`. A missing key renders as a pending block and the contents list updates itself. List a key in `partial` to mark it PARTIAL.
- **HarvestGuard** — fill in the `harvestguard` entry and remove `pending: true`.
- **New project** — add an object to the top of `PROJECTS` with the next V/ number; the index, routes and newer/older links follow.
- **Log** — add to the top of `LOG` in `records.js`; `category` must be one of `LOG_CATEGORIES`.
- **Graveyard** — push `{ id: "G/001", name, cause, why, survived }` into `GRAVEYARD`.
- **Photos** — replace the `.photo-slot` elements (About portrait, REC/001 photographs) with `<img>`. Keep them desaturated.

## Evidence marks

```jsx
<EvidenceMark code="V/024" domain="LLM · POLICY" date="26.07" status="FILED" cls="CLASS: SYSTEM" />
```

The barcode is derived from `code + domain`, so a mark is identical wherever it appears. Field reports can download it as a standalone SVG for print, stickers or slides.

## Bench mode

`VIEW: ARCHIVE / BENCH` in the masthead, the `B` key, or `?view=bench`. It shows the real framework and build time, current experiments, live GitHub activity (if connected) and document stats, and labels every `data-spec` component on a drafting grid.
