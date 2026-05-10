/** Shared type definitions for the Lanre Bello site */

export interface NavLink {
  label: string;
  href: string;
}

export interface Shareholder {
  name: string;
  role: string;
}

export interface BrandCard {
  name: string;
  subtitle: string;
  desc: string;
  color: string;
  href: string;
  image: string;
  logo: string;
  logoW: number;
  logoH: number;
  ceo: string;
  shareholders: Shareholder[];
}

export interface TechTeamMember {
  name: string;
  role: string;
}

export interface TechCard {
  name: string;
  subtitle: string;
  desc: string;
  color: string;
  /** Null until logo asset arrives — renders a monogram placeholder */
  logo: string | null;
  logoW: number;
  logoH: number;
  href: string;
  ceo?: string;
  team?: TechTeamMember[];
  operatedBy?: string;
}

export interface StatBlock {
  digits: [string, string];
  heading: string;
  description: string;
  images: string[];
}

export interface Principle {
  number: string;
  title: string;
  body: string;
}
