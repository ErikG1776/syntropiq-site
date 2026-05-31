# Syntropiq — Investor Page

Single-scroll investor-facing site for Syntropiq, *Trust-as-a-Service for the agent economy*.
Implemented in **Vite + React** from the Claude Design handoff bundle.

## Run it

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Deploy

The build output in `dist/` is a fully static site — drop it on any static host
(Vercel, Netlify, S3, GitHub Pages). On Vercel, framework preset = **Vite**,
build command = `npm run build`, output dir = `dist`.

## Structure

```
index.html               # app shell + Geist font links
src/
  main.jsx               # React entry
  styles.css             # design tokens (navy + gold palette) and global styles
  utils.js               # scrollToSection helper
  App.jsx                # Nav + Investor + Footer + Cmd-K
  components/
    Spiral.jsx           # phyllotaxis spiral motif (canvas + SVG), gold
    Icon.jsx             # line-icon set
    hooks.js             # useScrollReveal, useMagnetic
    primitives.jsx       # SectionHeader, Counter
    Nav.jsx              # sticky nav w/ scroll-spy, Logo, Footer
    CmdK.jsx             # ⌘K section jumper
    demos.jsx            # StreamingTerminal, GatingDemo, TrustTrajectory
    Investor.jsx         # the page: Hero · Problem · Solution · Approach · Market · Moat · Ask
```

## Page sections

1. **Hero** — animated gold spiral + streaming "governed inference" terminal, seed/market stats.
2. **Problem** — four-cell grid: no trust signal, no gate, no audit, no drift catch.
3. **Solution** — four governing primitives + interactive Allow/Review/Deny gating demo.
4. **Approach** — honest 3-stage roadmap (Recursa live → V1 Platform 2026 → Autonomous governance) + foresight chart.
5. **Market** — dark wedge section: regulated verticals + TAM ($15B) / SAM ($1.25B).
6. **Moat** — three reasons-to-believe, competitive table, quiet patent-pending line.
7. **The Ask** — "raising a seed round," request-information form (+ optional founder call).

## Notes for editing

- Brand tokens live in `src/styles.css` (`--gold #C8941F`, `--gold-bright #E0B654`, `--ink #0B1220`).
- The interactive demos use **illustrative** data — the page is explicitly not a live product
  interface (per the founder's brief; Recursa access is gated).
- Copy placeholders to swap with reality: EIN, the founder line, market figures.
