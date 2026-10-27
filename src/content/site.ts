/**
 * Single source of truth for all website copy and company facts.
 *
 * VERIFICATION POLICY
 * -------------------
 * Every block carries a `status`:
 *   - "verified"  → confirmed in writing by Amala Biofuels. Safe to publish.
 *   - "draft"     → positioning copy written for the site. Needs company approval.
 *   - "missing"   → no confirmed information yet. Rendered as a labelled placeholder
 *                   in development / review builds and hidden or neutralised in production.
 *
 * Do not add projects, capacities, certifications, client names, financial or
 * environmental figures unless the company has supplied and approved them.
 */

import type { PhotoKey } from "./photos";

export type ContentStatus = "verified" | "draft" | "missing";

export const company = {
  legalName: "Amala Biofuels Private Limited",
  shortName: "Amala Biofuels",
  tagline: "Engineering Possibilities. Advancing Sustainable Energy.",
  linkedin: "https://in.linkedin.com/company/amala-biofuels",
  /** Publicly listed location (LinkedIn). Confirm the registered address before launch. */
  locality: "Jorhat",
  region: "Assam",
  country: "IN",
  contact: {
    status: "missing" as ContentStatus,
    // Fill these with the company-approved details, then set status to "verified".
    address: "", // e.g. "Registered office line 1, Line 2, Jorhat, Assam 785001"
    email: "", // e.g. "business@yourdomain.in"
    phone: "", // e.g. "+91 00000 00000"
  },
  /** Optional logo. Put the approved SVG/PNG in /public/media and set the path. */
  logo: null as null | { src: string; width: number; height: number },
  /** Approved year of incorporation, e.g. "2023". Shown in the footer once set. */
  established: "",
};

export const nav = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#infrastructure", label: "Infrastructure" },
  { href: "#sustainability", label: "Sustainability" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  status: "draft" as ContentStatus,
  eyebrow: "Amala Biofuels Private Limited · Renewable Energy",
  headline: ["Engineering a", "Cleaner Energy", "Future."],
  body: "Biofuel infrastructure, B100 supply and distribution networks — built to help accelerate India's transition towards more sustainable energy.",
  primaryCta: { label: "Explore Our Capabilities", href: "#capabilities" },
  secondaryCta: { label: "Partner With Us", href: "#contact" },
};

export const about = {
  status: "draft" as ContentStatus,
  label: "Who we are",
  headline: ["Building the Foundations", "of Sustainable Energy."],
  body: [
    "Amala Biofuels Private Limited is focused on developing biofuel infrastructure and enabling the movement of renewable fuels through connected production, distribution, and business partnerships.",
    "With a vision rooted in a more sustainable energy future, we aim to connect engineering capabilities with practical energy infrastructure solutions.",
  ],
  facts: [
    { label: "Headquarters", value: "Jorhat, Assam" },
    { label: "Focus", value: "Biofuel infrastructure" },
    { label: "Sector", value: "Renewable energy" },
  ],
  cta: { label: "Discover Amala Biofuels", href: "#capabilities" },
};

export type Capability = {
  id: string;
  index: string;
  status: ContentStatus;
  label: string;
  title: string;
  headline: string;
  intro: string;
  /** Scope items. Keep only those the company confirms it offers. */
  scope: string[];
  note?: string;
  cta: { label: string; enquiryType: EnquiryType };
  photo: PhotoKey;
  /** Used in the Projects & Capabilities matrix */
  partners: string;
};

export const capabilities: Capability[] = [
  {
    id: "refineries",
    index: "01",
    status: "draft",
    label: "Turnkey Biodiesel Refineries",
    title: "Turnkey Biodiesel Refineries",
    headline: "From Project Vision to Operational Infrastructure.",
    intro:
      "Support for organisations planning biodiesel refinery infrastructure — bringing project planning, engineering coordination and implementation together under one accountable partner.",
    scope: [
      "Project planning and feasibility inputs",
      "Engineering coordination",
      "Equipment integration",
      "Installation oversight",
      "Commissioning support",
    ],
    note: "Scope shown is indicative and subject to confirmation for each project.",
    cta: { label: "Discuss a Refinery Project", enquiryType: "Refinery Project" },
    photo: "refinery",
    partners: "Project developers, industrial groups and investors planning processing capacity",
  },
  {
    id: "distribution",
    index: "02",
    status: "draft",
    label: "Biofuel Distribution & B100",
    title: "Biofuel Distribution & B100",
    headline: "Connecting Fuel Supply With Business Demand.",
    intro:
      "Working with industrial and commercial buyers to connect renewable fuel supply with real operational demand, through structured supply arrangements and distribution partnerships.",
    scope: [
      "Bulk supply enquiries",
      "Distribution partnerships",
      "Logistics coordination",
      "B100 availability — on request",
    ],
    note: "Availability, volumes and delivery regions are confirmed per enquiry.",
    cta: { label: "Enquire About Fuel Supply", enquiryType: "B100 Supply" },
    photo: "storage",
    partners: "Industrial and commercial fuel buyers, fleet operators and distributors",
  },
  {
    id: "pump-network",
    index: "03",
    status: "draft",
    label: "Biofuel Pump Network",
    title: "Biofuel Pump Network",
    headline: "Expanding Access to Renewable Fuel.",
    intro:
      "Developing a network of biofuel retail points with partners who share a long-term view of renewable fuel access — from site evaluation to partnership structuring.",
    scope: [
      "Network development — planned expansion",
      "Prospective site and partner evaluation",
      "Infrastructure partnership opportunities",
    ],
    note: "The network is presented as planned expansion. Operational locations will be listed only once confirmed.",
    cta: { label: "Explore Partnership Opportunities", enquiryType: "Pump Network" },
    photo: "nozzle",
    partners: "Site owners, fuel retailers and infrastructure partners",
  },
];

export const process = {
  status: "draft" as ContentStatus,
  label: "How we work",
  headline: "From Concept to Capability.",
  disclaimer: "Illustrative workflow. Engagement stages vary by project and are confirmed at proposal stage.",
  steps: [
    { n: "01", title: "Understand", body: "Project requirements, business objectives, and feasibility." },
    { n: "02", title: "Plan", body: "Define the technical, commercial, and operational scope." },
    { n: "03", title: "Develop", body: "Coordinate engineering, infrastructure, and implementation." },
    { n: "04", title: "Support", body: "Establish ongoing operational and commercial coordination, where offered." },
  ],
};

export const why = {
  status: "draft" as ContentStatus,
  label: "Why Amala Biofuels",
  headline: ["A partner built around", "infrastructure, not just product."],
  items: [
    {
      icon: "factory",
      title: "Infrastructure-focused approach",
      body: "We look at fuel as a system — production, storage, movement and access — and plan around the infrastructure that makes it dependable.",
    },
    {
      icon: "handshake",
      title: "Long-term business partnerships",
      body: "Our model is built on durable relationships with industrial buyers, distributors and project partners rather than one-off transactions.",
    },
    {
      icon: "network",
      title: "Connected production and distribution",
      body: "A strategy that links refinery development with distribution and retail access, so supply and demand are planned together.",
    },
    {
      icon: "shield",
      title: "Responsible energy development",
      body: "A commitment to developing renewable fuel infrastructure carefully, transparently and in line with applicable regulation.",
    },
  ],
} as const;

export const sustainability = {
  status: "draft" as ContentStatus,
  label: "Sustainability",
  headline: ["Progress That", "Considers Tomorrow."],
  body: "Building a more sustainable energy ecosystem requires practical infrastructure, responsible operations, and collaboration across the fuel value chain.",
  themes: [
    {
      title: "Responsible Resource Utilisation",
      body: "Approaching feedstock, energy and water as resources to be used carefully across the value chain.",
    },
    {
      title: "Renewable Fuel Infrastructure",
      body: "Investing in the physical systems — processing, storage and access — that renewable fuels depend on.",
    },
    {
      title: "Long-Term Energy Transition",
      body: "Planning for a gradual, practical transition, built with partners over years rather than quarters.",
    },
  ],
};

export type Project = {
  name: string;
  location: string;
  type: string;
  status: "Operational" | "Under development" | "Planned";
  scope: string;
  specs: { label: string; value: string }[];
  /** Approved project photograph (static import from src/assets) */
  photo: import("next/image").StaticImageData;
  alt: string;
};

/**
 * Only add projects the company has confirmed, with approved photography.
 * The gallery renders automatically once this list has entries.
 */
export const projects: Project[] = [];

export const enquiryTypes = ["Refinery Project", "B100 Supply", "Pump Network", "Partnership", "Other"] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

export const enquiry = {
  label: "Business enquiries",
  headline: "Let's Build What's Next.",
  body: "Tell us about your fuel supply requirements, infrastructure plans, or potential business partnership.",
  cta: "Submit Business Enquiry",
};

export const seo = {
  title: "Amala Biofuels Private Limited | Biofuel Infrastructure & B100 Supply, Assam",
  description:
    "Amala Biofuels Private Limited, Jorhat, Assam — biodiesel refinery projects, B100 biodiesel supply enquiries, biofuel distribution partnerships and biofuel pump network development in India.",
  keywords: [
    "Amala Biofuels Private Limited",
    "biodiesel infrastructure India",
    "turnkey biodiesel refinery projects",
    "B100 biodiesel supply",
    "biofuel distribution partnerships",
    "biofuel infrastructure Assam",
  ],
};
