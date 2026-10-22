# Scroll-Driven Hero – Welcome ITZ FIZZ

React 18 (Vite) + Tailwind CSS + GSAP/ScrollTrigger. No Next.js.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/
```

## Deploy to GitHub Pages
1. Push to a GitHub repo on the `main` branch.
2. Repo > Settings > Pages > Source: **GitHub Actions**.
3. The included workflow builds and publishes `dist/` automatically.

## How it works
- **Intro:** GSAP timeline – staggered letter reveal, car fade-in, stats one by one.
- **Scroll:** one pinned ScrollTrigger timeline with `scrub: 1`
  (animation progress = scroll progress, smoothed by 1s of interpolation).
- **Performance:** only `transform`/`opacity` are animated; no manual scroll listeners;
  `will-change` hints; `prefers-reduced-motion` respected.
