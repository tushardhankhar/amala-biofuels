import { enquiryTypes, type EnquiryType } from "@/content/site";

export type EnquiryInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  type: EnquiryType | "";
  location: string;
  scope: string;
  message: string;
  consent: boolean;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{7,20}$/;

const limits: Partial<Record<keyof EnquiryInput, number>> = {
  name: 120,
  company: 160,
  email: 200,
  phone: 20,
  location: 160,
  scope: 300,
  message: 4000,
};

/** Shared by the browser and the API route so both enforce the same rules. */
export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (!input.name.trim()) e.name = "Please enter your full name.";
  if (!input.company.trim()) e.company = "Please enter your company name.";
  if (!input.email.trim()) e.email = "Please enter your business email.";
  else if (!EMAIL.test(input.email.trim())) e.email = "Please enter a valid email address.";
  if (input.phone.trim() && !PHONE.test(input.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (!input.type || !enquiryTypes.includes(input.type as EnquiryType)) e.type = "Please choose an enquiry type.";
  if (input.message.trim().length < 10) e.message = "Please tell us a little more (at least 10 characters).";
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
    email: s("email"),
    phone: s("phone"),
    type: s("type") as EnquiryType | "",
    location: s("location"),
    scope: s("scope"),
    message: s("message"),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
  };
}
