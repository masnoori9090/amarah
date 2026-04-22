# Amarah — Claude Code build kit

This is the spec kit for building the Amarah Developments website with
Claude Code in VS Code. Five files, read in this order:

1. **CLAUDE.md** — the full build spec. Claude Code reads this file at
   the root of the project. It is the contract.
2. **brand.ts** — brand tokens (colours, fonts, motion curves).
3. **copy.en.ts** — every English string on the site.
4. **projects.ts** — the five project portfolio entries (seed data).
5. **leadership.ts** — team + press quotes (seed data).
6. **types.ts** — the TypeScript contract between content and components.

---

## How to use this with Claude Code

```bash
# 1. Create the project folder and open it in VS Code
mkdir amarah && cd amarah && code .

# 2. Drop these files in:
#    - CLAUDE.md        → project root
#    - brand.ts         → /content/brand.ts
#    - copy.en.ts       → /content/copy.en.ts
#    - projects.ts      → /content/projects.ts
#    - leadership.ts    → /content/leadership.ts  (contains press too)
#    - types.ts         → /lib/types.ts

# 3. Start Claude Code in the terminal
claude

# 4. First prompt:
#    "Read CLAUDE.md in full. Then produce a numbered build plan for my
#     approval. Do not create any files until I approve the plan."
```

---

## What's still missing (supply before "done")

- **Arabic copy.** `copy.ar.ts` needs to be built — same shape as
  `copy.en.ts`, every string translated. Budget an hour of a native
  Arabic speaker's time, not Google Translate.
- **Project renders.** Five placeholder Unsplash URLs are in
  `projects.ts`. Every one needs a real final render before launch.
- **Leadership photos.** Four professional headshots at 4:5 ratio.
- **Gallery images.** 8–12 architectural photos of actual Amarah work.
- **Real press quotes.** The press section is marked `UNVERIFIED`. If
  real coverage doesn't exist yet, remove the section instead of
  shipping illustrative quotes — it is legally and reputationally safer.
- **Phone + email.** Placeholders in `copy.en.ts`. Replace with real.
- **RERA registration number** if the developer is RERA-registered —
  UAE real estate buyers look for this in the footer.
- **Resend account** — sign up, verify the `amarah.ae` domain
  (SPF + DKIM), put the API key in Vercel env vars.

---

## The WordPress migration plan

The CLAUDE.md spec builds a Next.js site on Vercel with a strict
boundary between content and components. Every piece of content lives
in `/content/*.ts` files with typed interfaces in `/lib/types.ts`.

When you're ready to port to WordPress, the work is:

1. Set up WordPress with Advanced Custom Fields (ACF) + ACF to REST API.
2. Model each content type (Project, Person, PressQuote, Copy) as a
   custom post type or options page matching the interfaces in
   `lib/types.ts`.
3. Replace the imports in `lib/content.ts`:
   ```ts
   // Before
   import { projects } from "@/content/projects";
   // After
   const projects = await fetch(`${WP_URL}/wp-json/wp/v2/projects`).then(r => r.json());
   ```
4. Replace `/api/enquiry/route.ts` with a POST to the WPForms or CF7 REST
   endpoint. The payload shape is already WordPress-friendly
   (flat JSON, snake_case keys) — see the comment at the top of that
   file.

Layout, styling, animations, RTL logic — none of it changes. That's
why the content boundary matters from day one.

---

## Design philosophy, short version

"Quiet luxury, made architectural." The references are Aesop, Aman
Resorts, David Chipperfield. The anti-references are Emaar, Damac,
typical Dubai developer spectacle. If a design decision would be at
home on a casino website, it does not belong on amarah.ae.
