/**
 * brand.ts — Amarah brand tokens, single source of truth.
 *
 * These values mirror the brand guide. Do not adjust without approval.
 * If a component needs a new shade, derive it from an existing token
 * via `color-mix()` in CSS rather than inventing a new hex.
 */

export const BRAND = {
  name: "Amarah",
  tagline: {
    en: "A Serene Lifestyle.",
    ar: "أسلوب حياة هادئ.",
  },
  domain: "amarah.ae",
  email: "hello@amarah.ae",

  colors: {
    // Primary
    chalkDust: "#ebe8df",    // default page bg
    burntBark: "#30231a",    // default text, dark surfaces
    ivoryHusk: "#d0b795",    // single accent — CTAs, underlines, marks

    // Secondary — sparing use, for section depth / pressrooms / footer
    midnightTide: "#08202a",
    obsidian: "#070707",
    ivoryVeil: "#fcfcfc",
  },

  fonts: {
    displayLatin: "Fraunces",            // weights: 300, 400
    bodyLatin: "Manrope",                // weights: 300, 400, 500
    displayArabic: "Amiri",              // weights: 400, 700
    bodyArabic: "Noto Naskh Arabic",     // weights: 400, 500
  },

  // Motion — single easing curve for the entire site
  motion: {
    easing: [0.22, 1, 0.36, 1] as const,
    durations: {
      quick: 0.25,    // hovers
      standard: 0.7,  // entrances
      slow: 0.9,      // hero reveal
    },
  },
} as const;

export type BrandTokens = typeof BRAND;
