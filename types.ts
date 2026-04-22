/**
 * types.ts — the contract between /content and /components.
 *
 * When a field is added to a content file, add it here first and let
 * TypeScript guide the component update. The WordPress port will
 * populate these same interfaces from WP REST responses.
 */

export type Locale = "en" | "ar";

export type ProjectStatus =
  | "Now Selling"
  | "Launching Q3"
  | "Phase II Released"
  | "Coming Soon"
  | "Sold Out";

export interface Project {
  id: string;                    // slug, used in routing if we add detail pages
  index: string;                 // "01", "02" — display-only
  name: string;
  location: string;
  status: ProjectStatus;
  units: string;                 // "24 residences"
  type: string;                  // "Private villas"
  size: string;                  // "6,400–11,200 sqft"
  description: string;
  heroImage: string;             // URL or public-relative path
}

export interface Person {
  id: string;
  name: string;
  role: string;
  bio: string;
  portrait: string;
}

export interface PressQuote {
  id: string;
  quote: string;
  source: string;
  year: string;
}

export interface EnquiryPayload {
  full_name: string;
  email: string;
  phone: string;
  project: string;
  budget: string;
  message: string;
  locale: Locale;
}
