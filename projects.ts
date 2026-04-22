/**
 * projects.ts — the Amarah portfolio.
 *
 * Placeholder renders and photography are clearly marked. Replace
 * `heroImage` with final renders before launch. Copy here is the
 * English version — Arabic mirror lives in /content/projects.ar.ts
 * when built (same shape, translated strings).
 */

import type { Project } from "@/lib/types";

// TODO: swap all Unsplash URLs for final project renders before launch.
// These are placeholders matched to each project's character only.

export const projects: readonly Project[] = [
  {
    id: "maison-liwa",
    index: "01",
    name: "Maison Liwa",
    location: "Dubai · Al Barari",
    status: "Now Selling",
    units: "24 residences",
    type: "Private villas",
    size: "6,400–11,200 sqft",
    description:
      "A collection of twenty-four private villas set within mature landscaping. Courtyard plans, sunken gardens, double-height living volumes.",
    // TODO: replace with final render
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "serai-tower",
    index: "02",
    name: "Serai Tower",
    location: "Dubai · Business Bay",
    status: "Launching Q3",
    units: "112 residences",
    type: "Sky apartments",
    size: "1,200–4,800 sqft",
    description:
      "A forty-two-storey residential tower on Business Bay. Floor-through apartments, three penthouse levels, residents' club on floor 30.",
    // TODO: replace with final render
    heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "dar-amarah",
    index: "03",
    name: "Dar Amarah",
    location: "Abu Dhabi · Saadiyat",
    status: "Phase II Released",
    units: "38 residences",
    type: "Beachfront estates",
    size: "8,100–14,500 sqft",
    description:
      "Thirty-eight beachfront estates on the eastern edge of Saadiyat. Private beach access, guest pavilions, staff quarters. Completed 2025.",
    // TODO: replace with final render
    heroImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "noor-courtyards",
    index: "04",
    name: "Noor Courtyards",
    location: "Dubai · Mohammed Bin Rashid City",
    status: "Now Selling",
    units: "62 residences",
    type: "Courtyard townhouses",
    size: "4,800–7,200 sqft",
    description:
      "Sixty-two courtyard townhouses organised around shaded lanes. A contemporary reading of the traditional Emirati courtyard typology.",
    // TODO: replace with final render
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "rayan-estates",
    index: "05",
    name: "Rayan Estates",
    location: "Ras Al Khaimah · Al Marjan",
    status: "Coming Soon",
    units: "18 residences",
    type: "Island villas",
    size: "9,600–16,000 sqft",
    description:
      "Eighteen island villas on Al Marjan, each with private jetty and lagoon frontage. The most private collection in the Amarah portfolio.",
    // TODO: replace with final render
    heroImage: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80",
  },
] as const;
