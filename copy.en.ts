/**
 * copy.en.ts — every English string on the site.
 *
 * Rules:
 *  - Never hardcode user-visible text in JSX. Import from here.
 *  - Keep the shape of copy.ar.ts identical to this file.
 *  - When adding a new string, add it here FIRST, then consume it.
 *  - Proper nouns (Amarah, Maison Liwa, etc.) do NOT translate.
 */

export const copyEn = {
  nav: {
    philosophy: "Philosophy",
    projects: "Projects",
    amenities: "Amenities",
    gallery: "Gallery",
    leadership: "Leadership",
    press: "Press",
    contact: "Contact",
    registerInterest: "Register Interest",
  },

  hero: {
    eyebrow: "Established developer. Select residences.",
    titleLine1: "A Serene",
    titleLine2: "Lifestyle.",
    sub: "Amarah builds homes that feel like sanctuaries — architecturally disciplined, materially uncompromising, quietly luxurious.",
    ctaPrimary: "Register Interest",
    ctaSecondary: "View Projects",
  },

  about: {
    label: "01 — About",
    title: "We do not construct buildings.\nWe compose living environments.",
    body: "At Amarah, a home is more than a place to live. It is a space that reflects care, craftsmanship, and a deeper sense of belonging. Our design philosophy is guided by the principle of quiet luxury — elegance expressed through thoughtful design, exceptional quality, and timeless materials rather than excess. We do not simply construct buildings. We create environments where comfort, serenity, and understated sophistication come together effortlessly.",
    stats: [
      { number: "12+", label: "Years in development" },
      { number: "480", label: "Residences delivered" },
      { number: "98%", label: "Owner satisfaction" },
      { number: "7", label: "Active projects" },
    ],
  },

  philosophy: {
    label: "02 — Philosophy",
    title: "Quiet luxury,\nmade architectural.",
    pillars: [
      {
        numeral: "I",
        title: "Considered Materiality",
        body: "Natural stone, honed travertine, smoked oak, brushed bronze. Every surface selected for how it ages, not just how it looks on day one.",
      },
      {
        numeral: "II",
        title: "Disciplined Geometry",
        body: "Plans resolved on a precise grid. Volumes proportioned to the body. Light treated as a primary material, not an afterthought.",
      },
      {
        numeral: "III",
        title: "Lived Calm",
        body: "Acoustically quieted interiors, generous thresholds, air that moves correctly. Spaces engineered for the nervous system as much as the eye.",
      },
      {
        numeral: "IV",
        title: "Lasting Value",
        body: "Built to stand beautifully over decades. We select trusted global partners and commission details twice before they meet a resident.",
      },
    ],
  },

  projects: {
    label: "03 — Selected Projects",
    title: "A portfolio of residences.",
    viewProject: "View project",
    // The project list itself lives in /content/projects.ts — this file
    // holds only the section chrome.
  },

  amenities: {
    label: "04 — Amenities",
    title: "The residence extends\nbeyond the threshold.",
    body: "Every Amarah development is designed as a complete ecosystem. Services, spaces, and rituals that most developers treat as features, we treat as standards.",
    items: [
      "Residents-only wellness floor with thermal suite",
      "25m ozonated lap pool, separate family pool",
      "Concierge and white-glove valet, 24/7",
      "Private dining room with guest chef programme",
      "Treatment rooms and meditation pavilion",
      "Curated library and co-working lounges",
      "Children's garden and supervised play atelier",
      "Electric fleet, charging and service bays",
      "Prayer rooms with acoustic separation",
      "Landscaped promenades by award-winning studios",
    ],
  },

  gallery: {
    label: "05 — Gallery",
    title: "Moments from our residences.",
  },

  leadership: {
    label: "06 — Leadership",
    title: "The people behind the practice.",
    // Team data in /content/leadership.ts — bios are localised there.
  },

  press: {
    label: "07 — In the Press",
    title: "Selected coverage.",
    // Quotes in /content/press.ts.
  },

  contact: {
    label: "08 — Register Interest",
    title: "Begin the conversation.",
    body: "Share a few details and a member of our residency team will be in touch within one business day. All enquiries are treated with discretion.",
    meta: {
      addressLabel: "Office",
      address: "Boulevard Plaza Tower 1, Downtown Dubai, UAE",
      phoneLabel: "Direct",
      phone: "+971 4 000 0000",
      emailLabel: "Email",
      email: "hello@amarah.ae",
    },
    form: {
      name: "Full name",
      email: "Email address",
      phone: "Phone (with country code)",
      project: "Project of interest",
      budget: "Indicative budget",
      message: "Tell us about your timing and requirements (optional)",
      submit: "Submit enquiry",
      submitting: "Sending…",
      success: "Thank you. We'll be in touch within one business day.",
      error: "Something went wrong. Please try again or email us directly.",
      privacy: "By submitting you agree to our privacy practices. We do not share data with third parties.",
    },
    projectOptions: [
      "Any — open to guidance",
      "Maison Liwa",
      "Serai Tower",
      "Dar Amarah",
      "Noor Courtyards",
      "Rayan Estates",
    ],
    budgetOptions: [
      "Under AED 5M",
      "AED 5M – 10M",
      "AED 10M – 25M",
      "AED 25M – 50M",
      "AED 50M+",
      "Prefer to discuss",
    ],
  },

  footer: {
    tagline: "A Serene Lifestyle.",
    address: "Boulevard Plaza Tower 1, Downtown Dubai, UAE",
    rights: "© 2026 Amarah Developments LLC. All rights reserved.",
    links: {
      privacy: "Privacy",
      terms: "Terms",
      rera: "RERA",
      careers: "Careers",
    },
  },
} as const;

export type Copy = typeof copyEn;
