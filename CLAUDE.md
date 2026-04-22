# CLAUDE.md — Amarah Developments

> **Read this file in full before writing any code.** It is the contract.
> When the user asks you to "build the site" or "start the project," your
> first action is to confirm you have read this file and then produce a
> file-tree plan for approval before creating files.

---

## 0. One-paragraph brief

Amarah is a UAE-based luxury real-estate developer. Positioning: **"quiet
luxury"** — refined, architectural, calm, family-oriented, timeless.
Tagline: **"A Serene Lifestyle."** This site is a **lead-generation
site** for qualified buyers. The single most important conversion event
is a completed **Register Interest** form. Aesthetic reference points:
Aesop, Aman Resorts, David Chipperfield monographs, editorial
architecture press. Reference points to **avoid**: Emaar, Damac, typical
Dubai developer spectacle sites, gold gradients, particle effects, stock
"luxury" tropes.

---

## 1. Stack (non-negotiable)

- **Next.js 15 (App Router), TypeScript, React 19**
- **Tailwind CSS v4** with CSS variables for the brand tokens
- **Framer Motion** for all animation (no scroll libs, no GSAP)
- **next/font** with `Fraunces` (display) + `Manrope` (body sans) +
  `Amiri` (AR display) + `Noto Naskh Arabic` (AR body). Self-hosted via
  next/font — do not pull from Google CDN at runtime.
- **next/image** everywhere. No raw `<img>` tags except SVG.
- **Vercel** deployment. No localhost workflow — push, preview, iterate.
- **No shadcn, no component libraries.** All components are custom and
  live under `/components`. This site must not look like it came from a
  template ecosystem.
- **No database yet.** Form posts to a Next.js API route that logs
  submissions to the Vercel request log AND emails via Resend. See §7.

### What NOT to install

Do not add: shadcn, Radix UI, Headless UI, Chakra, MUI, DaisyUI, lodash,
moment, axios, swiper, gsap, locomotive-scroll, any carousel library, any
"AI-powered" boilerplate. If you feel the pull to install one of these,
stop and ask.

---

## 2. WordPress migration path — read this before architecting

The site launches on Vercel. It **will be ported to WordPress later**.
Therefore the CMS boundary must be explicit from day one:

- **All content lives in `/content/*.ts`** — typed data files exported
  as plain objects. Never hardcode copy, project data, leadership, or
  press inside JSX.
- **All copy lives in `/content/copy.en.ts` and `/content/copy.ar.ts`.**
  One object per language, same shape. The `useCopy()` hook selects
  based on locale.
- Every component that renders content receives it via props. No
  component fetches its own data in v1.
- Keep all dynamic data fetching inside `lib/content.ts` so the WP port
  is one-file: swap `import from '/content/...'` for `fetch(WP_REST)`.

This is the single most important architectural rule in this file.

---

## 3. Brand tokens — exact values

Put these in `app/globals.css` as CSS variables and mirror them in
`tailwind.config.ts`. Do not invent additional colours. Do not darken,
lighten, or "optimise" these values.

```css
:root {
  /* Primary */
  --chalk-dust: #ebe8df;   /* default page background */
  --burnt-bark: #30231a;   /* default text, dark surfaces */
  --ivory-husk: #d0b795;   /* single accent — buttons, underlines, marks */

  /* Secondary — use sparingly, only for section depth */
  --midnight-tide: #08202a;
  --obsidian:      #070707;
  --ivory-veil:    #fcfcfc;

  /* Derived (computed, not designed) */
  --bark-70: color-mix(in oklab, var(--burnt-bark) 70%, transparent);
  --bark-40: color-mix(in oklab, var(--burnt-bark) 40%, transparent);
  --bark-12: color-mix(in oklab, var(--burnt-bark) 12%, transparent);
}
```

**Typography** — self-hosted via next/font:
- `Fraunces` — display / section titles / hero. Weight 300 + 400. Use
  with `font-feature-settings: "ss01"` for the softer terminals. **Never
  use weight 600+ for display type — it breaks the refinement.**
- `Manrope` — UI, body, nav, buttons. Weight 300, 400, 500.
- `Amiri` — Arabic display (replaces Fraunces when `dir="rtl"`).
- `Noto Naskh Arabic` — Arabic body (replaces Manrope when `dir="rtl"`).

Body font-size: **16px** base, generous line-height (1.6+). Display
sizes use `clamp()` for fluid scaling. Example:
`font-size: clamp(3rem, 7vw, 8rem); line-height: 0.95;`

---

## 4. File tree — build exactly this

```
amarah/
├── CLAUDE.md                    # this file
├── README.md                    # human handoff, not for Claude Code
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── .env.example                 # RESEND_API_KEY, RESEND_TO_EMAIL
├── public/
│   ├── logo/
│   │   ├── amarah-mark.svg      # tower icon only
│   │   ├── amarah-wordmark.svg  # AMARAH wordmark only
│   │   └── amarah-lockup.svg    # icon + wordmark stacked
│   ├── fonts/                   # self-hosted font files
│   └── og.jpg                   # 1200x630 social card
├── app/
│   ├── layout.tsx               # fonts, metadata, <html lang dir>
│   ├── page.tsx                 # single-page site — assembles sections
│   ├── globals.css              # tokens, base styles, grain texture
│   ├── [locale]/                # /en and /ar routes — see §6
│   │   └── page.tsx
│   └── api/
│       └── enquiry/
│           └── route.ts         # POST handler, Resend + log
├── components/
│   ├── Nav.tsx
│   ├── LocaleSwitcher.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Philosophy.tsx
│   ├── Projects.tsx             # horizontal scroll, see §5
│   ├── ProjectCard.tsx
│   ├── Amenities.tsx
│   ├── Gallery.tsx              # masonry, lightbox on click
│   ├── Leadership.tsx
│   ├── Press.tsx
│   ├── ContactForm.tsx          # the money component
│   ├── Footer.tsx
│   ├── SectionLabel.tsx         # "01 — About" style label, reused
│   ├── AmarahMark.tsx           # inline SVG component for the tower
│   └── motion/
│       ├── Reveal.tsx           # fade + y-translate on intersection
│       └── SplitText.tsx        # word-by-word reveal for headlines
├── content/
│   ├── copy.en.ts               # every EN string
│   ├── copy.ar.ts               # every AR string — same shape
│   ├── projects.ts              # project portfolio
│   ├── leadership.ts            # team
│   ├── press.ts                 # press quotes
│   └── gallery.ts               # image manifest
├── lib/
│   ├── content.ts               # getCopy(locale), getProjects(), etc.
│   ├── types.ts                 # Project, Person, PressQuote types
│   └── cn.ts                    # classnames util
└── styles/
    └── (nothing — everything in globals.css)
```

**Do not create files outside this tree without asking.** No `utils/`
explosion, no `hooks/` folder with seven one-line hooks, no `constants/`
directory.

---

## 5. Sections — what must be built

All sections live on a single page (`app/[locale]/page.tsx`). Order and
behaviour are specified. Every section uses `<SectionLabel>` (the
"01 — About" treatment) and vertical rhythm of `min-h-screen` for the
first three sections, natural height after.

### Hero
- Full viewport height. Chalk Dust background.
- Eyebrow line (uppercase Manrope 300, letter-spaced), large Fraunces
  display title on two lines, short subtitle, two buttons: primary
  (Burnt Bark fill) "Register Interest" → scrolls to `#contact`;
  secondary (text + underline) "View Projects" → scrolls to `#projects`.
- **Animation:** on page load, run `SplitText` on the title
  word-by-word with 80ms stagger, 900ms duration, `[0.22, 1, 0.36, 1]`
  ease. Eyebrow and subtitle fade up after title completes. **Run
  once, never on scroll.**
- The Amarah tower mark sits top-left of the hero at small size, acting
  as an anchor. It does not animate.

### About (§01)
- Two-column on desktop: left is title + body copy, right is the four
  stat tiles (12+ years / 480 residences / 98% / 7 projects). On
  mobile, single column.
- Stats use Fraunces 300 at very large size for the number, Manrope for
  the label.

### Philosophy (§02)
- Four pillars as a 2×2 grid on desktop, stacked on mobile. Each
  pillar: a roman numeral (Fraunces), a title, a 2–3 sentence body.
- Background: subtle Burnt Bark tint (`bark-12`) OR keep Chalk Dust —
  whichever reads more elegantly once built. Decide visually, not
  theoretically.

### Projects (§03) — the set piece
- **Horizontal scroll section.** On desktop, fix the section vertically
  while the user scrolls and translate the card rail horizontally —
  classic editorial treatment. On mobile, normal vertical scroll with
  cards stacked.
- Each `<ProjectCard>` is a 3:4 portrait image with project name
  (Fraunces), location (Manrope), status pill (Ivory Husk bg, Burnt
  Bark text), units / type / size metadata, and a "View project" link.
- Images are placeholders for now — use Unsplash URLs chosen from
  architectural photography (search terms: "modern villa interior",
  "luxury apartment terrace", "minimal residential architecture"). Any
  placeholder image must have an `// TODO: replace with final render`
  comment adjacent to it.

### Amenities (§04)
- Single column, editorial list treatment. Title on the left, body
  paragraph, then a two-column list of 10 amenity items. Each item
  prefixed with a thin Ivory Husk line, Manrope 400 text.

### Gallery (§05)
- Masonry grid, 3 columns desktop, 2 tablet, 1 mobile. 8–12 images.
- Clicking an image opens a **custom lightbox** (no library). ESC or
  backdrop click closes. Arrow keys navigate.
- Images lazy-loaded via `next/image` with `placeholder="blur"`.

### Leadership (§06)
- Four people, displayed as a 2×2 grid of large portrait cards. Each
  card: portrait photo (4:5), name (Fraunces), role (Manrope small
  uppercase), 1–2 sentence bio.

### Press (§07)
- Four pull-quotes. Large Fraunces italic, centred, with attribution
  below. On desktop, show two per row; on mobile, one per row. Subtle
  fade-in-on-view.

### Contact (§08) — the money section
- Two-column on desktop: left is title + body + meta (phone, email,
  office address), right is the form.
- Fields (all required except message):
  - Full name (text)
  - Email (email, validate)
  - Phone with country code (tel)
  - Project of interest (select — options from `content/projects.ts`)
  - Indicative budget (select — fixed options in copy file)
  - Message (textarea, optional)
- Submit: button shows loading state, then success message replaces the
  form. On error, show a single friendly error message below submit
  and keep the form state intact.
- Client-side: validate with a tiny schema (zod). Server-side: validate
  again before sending email.

### Footer
- Chalk Dust on Burnt Bark (inverted). Logo wordmark, tagline "A Serene
  Lifestyle.", office address, four text links (Privacy, Terms, RERA,
  Careers — all `href="#"` for now), copyright.

---

## 6. Localisation (EN / AR with RTL) — build this properly

- Use Next.js App Router with `[locale]` segment. Supported values:
  `en`, `ar`. Default: `en`. Root `/` redirects to `/en`.
- `app/[locale]/layout.tsx` sets `<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>`.
- `LocaleSwitcher` component lives in the nav. It swaps the route
  prefix, preserving the current anchor if any.
- **Every string on the site must be in `copy.en.ts` AND `copy.ar.ts`**
  with the same key structure. No mixed-language fallbacks.
- When `dir="rtl"`:
  - Fonts swap to Amiri (display) + Noto Naskh Arabic (body) via a
    `html[dir="rtl"]` CSS selector.
  - Tailwind logical properties (`ps-`, `pe-`, `ms-`, `me-`, `start-`,
    `end-`) are **mandatory** — no `pl-` / `pr-` / `left-` / `right-`
    anywhere in the codebase. This is the kind of rule I will grep for
    and fail the build on if violated.
  - Icons that carry directional meaning (arrows, chevrons) are
    mirrored via `[dir="rtl"] .icon-arrow { transform: scaleX(-1); }`.
  - The horizontal projects scroll reverses direction.
- AR numerals: use Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩) in copy.ar.ts where
  they feel natural (stat numbers, section labels). Phone numbers stay
  in Latin digits.

---

## 7. Contact form backend

The Vercel v1 implementation:

- Route: `app/api/enquiry/route.ts`, POST only, `runtime = 'edge'` is
  fine.
- Validate body with zod. Reject with 400 on invalid.
- Send via Resend (`resend` npm package). Template is a simple
  well-typed HTML email — recipient is `process.env.RESEND_TO_EMAIL`,
  from is `hello@amarah.ae` (placeholder domain — update before live).
- Also `console.log(JSON.stringify(submission))` so entries appear in
  Vercel logs even if Resend fails.
- Return `{ ok: true }` on success; never echo the submission back.
- Rate limit: one submission per IP per 30 seconds using a simple
  in-memory Map (resets on cold start — acceptable for v1).

**WordPress migration note:** when the site ports to WP, this route is
replaced with a fetch to the WP REST endpoint (likely via the WPForms
or Contact Form 7 API). Keep the request body shape identical to what
WordPress will expect — flat JSON, string values only, snake_case keys.
Document the exact payload shape in a comment at the top of the route
file.

Required env vars in `.env.example`:
```
RESEND_API_KEY=
RESEND_TO_EMAIL=hello@amarah.ae
NEXT_PUBLIC_SITE_URL=https://amarah.ae
```

---

## 8. Motion discipline

This section exists because luxury brands die on the altar of
"engaging" animations. Rules:

- **Easing is always `[0.22, 1, 0.36, 1]`** (expo-out-ish). Do not use
  `ease-in-out`, do not use spring unless explicitly asked.
- **Durations: 600–900ms** for entrances, 200–300ms for hovers. Never
  under 200ms, never over 1200ms.
- **No parallax.** No tilt-on-hover. No magnetic cursors. No floating
  shapes. No particles. No typewriter effects on body text. No
  "reveal on scroll" on every paragraph — only on section titles and
  the first-view contents of each section.
- The page-load hero animation runs **once**, full stop. Store a flag
  if necessary to prevent re-run on locale switch.
- Respect `prefers-reduced-motion`: all transforms become opacity-only,
  all durations halved.

---

## 9. Accessibility

- All interactive elements are semantic (`button`, `a`, `label`).
- Form fields have visible labels, not placeholder-only.
- Colour contrast: Burnt Bark on Chalk Dust passes AAA for body, check
  Ivory Husk buttons pass AA for their use case.
- Keyboard: full tab order, visible focus ring (Ivory Husk, 2px,
  offset 3px). Gallery lightbox closes on ESC, nav on arrows.
- Images have meaningful `alt` attributes (never empty, never "image").
- The Arabic site is not a translation afterthought — audit it with
  the same rigour as the English.

---

## 10. Performance budget

- Lighthouse mobile performance score ≥ 90 on the deployed preview.
- First Contentful Paint < 1.8s on Slow 4G throttle.
- No single image over 400KB after Next Image optimisation.
- No client component that isn't strictly necessary — most sections
  should be server components; only Nav, LocaleSwitcher, ContactForm,
  Projects (horizontal scroll), and Gallery (lightbox) need
  `"use client"`.
- Run `next build` before saying the site is "done." Zero type errors,
  zero ESLint errors.

---

## 11. Workflow with Claude Code

1. **Plan first.** On any new session, your first response after
   reading this file is a numbered build plan. Do not create files
   until the plan is approved.
2. **Commit after every section.** One git commit per section built,
   conventional commit format (`feat(hero): …`, `feat(projects): …`).
3. **Push to Vercel live preview after every commit.** No localhost
   workflow. If something looks wrong, I fix it on the Vercel preview
   URL, not by running `next dev`.
4. **Ask before improvising.** If you want to add a dependency, a
   route, a page, a third section style, or "improve" the brand tokens
   — stop and ask. I would rather answer ten questions than unwind one
   opinionated detour.
5. **Never hallucinate content.** Placeholder copy goes in a
   `// LOREM` comment. Real copy comes from me via the
   `/content/copy.*.ts` files.
6. **If a required asset doesn't exist** (logo SVG, fonts, images),
   stub it with a clearly marked placeholder and list every
   outstanding asset at the end of your response so I can supply them.

---

## 12. Launch checklist — do not ship without every box ticked

- [ ] All sections built, EN and AR
- [ ] RTL audited — no `pl-/pr-/left-/right-` in codebase
- [ ] Forms submit, email arrives, success state shown
- [ ] Lighthouse mobile ≥ 90
- [ ] All images have real `alt` text in both locales
- [ ] `public/og.jpg` is a real brand image, not a placeholder
- [ ] `<title>` and `<meta description>` are real, unique, and in both
      locales
- [ ] Favicon set (use the tower mark, dark on light)
- [ ] No `console.log` left in code except inside `/api/enquiry`
- [ ] No `TODO` comments left unresolved
- [ ] Domain pointed, HTTPS, redirects `/` → `/en`, `www` normalised
- [ ] Resend domain verified (SPF/DKIM) or the emails silently fail
- [ ] Git repo clean, `.env.local` not committed
- [ ] README.md updated with the eventual WordPress migration notes

---

## 13. What "done" looks like

A client who has never heard of Amarah opens the site, spends 90
seconds on it, and walks away with two things: **(1)** a sense that
this developer operates at a different standard of care than their
competitors, and **(2)** enough conviction to fill the form.

If the site is beautiful but nobody submits, it has failed. If the
site is ugly but converts, we rebuild it. Aim for both. The quiet
luxury aesthetic is the mechanism, not the goal.
