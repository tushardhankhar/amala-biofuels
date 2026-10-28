import { enquiryIndustries, enquiryProducts } from "@/content/site";

export type EnquiryInput = {
  name: string;
  company: string;
  phone: string;
  email: string;
  product: string;
  industry: string;
  quantity: string;
  location: string;
  message: string;
  consent: boolean;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{7,20}$/;

const limits: Partial<Record<keyof EnquiryInput, number>> = {
  name: 120,
  company: 160,
  phone: 20,
  email: 200,
  quantity: 200,
  location: 200,
  message: 4000,
};

/** Shared by the browser and the API route so both enforce the same rules. */
export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (!input.name.trim()) e.name = "Please enter your full name.";
  if (!input.company.trim()) e.company = "Please enter your company or organisation.";
  if (!input.phone.trim()) e.phone = "Please enter a phone number.";
  else if (!PHONE.test(input.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (!input.email.trim()) e.email = "Please enter your business email.";
  else if (!EMAIL.test(input.email.trim())) e.email = "Please enter a valid email address.";
  if (!(enquiryProducts as readonly string[]).includes(input.product)) e.product = "Please choose a product of interest.";
  if (!(enquiryIndustries as readonly string[]).includes(input.industry)) e.industry = "Please choose your industry or application.";
  if (!input.consent) e.consent = "Please confirm you agree to us processing your details.";

  for (const [key, max] of Object.entries(limits) as [keyof EnquiryInput, number][]) {
    const v = input[key];
    if (typeof v === "string" && v.length > max && !e[key]) e[key] = `Please keep this under ${max} characters.`;
  }
  return e;
}

export function normaliseEnquiry(raw: Record<string, unknown>): EnquiryInput {
  const s = (k: string) => (typeof raw[k] === "string" ? (raw[k] as string) : "");
  return {
    name: s("name"),
    company: s("company"),
    phone: s("phone"),
    email: s("email"),
    product: s("product"),
    industry: s("industry"),
    quantity: s("quantity"),
    location: s("location"),
    message: s("message"),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
  };
}
