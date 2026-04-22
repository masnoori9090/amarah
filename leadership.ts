/**
 * leadership.ts — team and press seed data.
 *
 * Leadership bios and press quotes seeded with realistic placeholders.
 * Replace with verified text before launch. Flag every unverified
 * quote with `// UNVERIFIED` so they are easy to grep.
 */

import type { Person, PressQuote } from "@/lib/types";

export const leadership: readonly Person[] = [
  {
    id: "omar-al-habtoor",
    name: "Omar Al Habtoor",
    role: "Founder & Chairman",
    bio: "Two decades leading premium developments across the GCC. Previously led residential strategy at a major Gulf developer. Sets Amarah's long-range vision and capital discipline.",
    // TODO: replace placeholder portrait with professional headshot
    portrait: "/leadership/placeholder-01.jpg",
  },
  {
    id: "layla-mansoori",
    name: "Layla Mansoori",
    role: "Chief Design Officer",
    bio: "AA Dipl. Former senior associate at David Chipperfield Architects. Leads all product and spatial direction — every plan that leaves Amarah passes through her studio.",
    portrait: "/leadership/placeholder-02.jpg",
  },
  {
    id: "hassan-reza",
    name: "Hassan Reza",
    role: "Chief Executive Officer",
    bio: "Fifteen years in real estate capital markets. Oversees delivery, sales, and the partnerships that bring each project to completion on schedule.",
    portrait: "/leadership/placeholder-03.jpg",
  },
  {
    id: "sara-bin-nasser",
    name: "Sara Bin Nasser",
    role: "Head of Client Experience",
    bio: "Built Amarah's concierge, onboarding, and residency programme. Previously Aman Hotels, Abu Dhabi. The reason owners stay, and refer.",
    portrait: "/leadership/placeholder-04.jpg",
  },
] as const;

// UNVERIFIED — illustrative press quotes for layout. Replace with real
// coverage or remove the section before launch.
export const press: readonly PressQuote[] = [
  {
    id: "wallpaper-2025",
    quote:
      "Amarah is writing a quieter grammar of Gulf luxury — one closer to Kyoto than to Monte Carlo.",
    source: "Wallpaper*",
    year: "2025",
  },
  {
    id: "ad-me",
    quote:
      "The most disciplined new developer to emerge from the UAE this decade.",
    source: "Architectural Digest Middle East",
    year: "2025",
  },
  {
    id: "monocle",
    quote:
      "A rare example of restraint in a market built on spectacle.",
    source: "Monocle",
    year: "2025",
  },
  {
    id: "dezeen",
    quote: "Every detail is quietly, almost stubbornly, correct.",
    source: "Dezeen",
    year: "2024",
  },
] as const;
