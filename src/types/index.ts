/** Shared type definitions for the Lanre Bello site */

export interface NavLink {
  label: string;
  href: string;
}

export interface BrandCard {
  name: string;
  tag: string;
  color: string;
  image: string;
}

export interface TechCard {
  name: string;
  desc: string;
  tag: string;
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
