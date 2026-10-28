"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { contactPage, enquiryIndustries, enquiryProducts } from "@/content/site";
import { validateEnquiry, type EnquiryErrors, type EnquiryInput } from "@/lib/enquiry-schema";

const empty: EnquiryInput = {
  name: "",
  company: "",
  phone: "",
  email: "",
  product: "",
  industry: "",
  quantity: "",
  location: "",
  message: "",
  consent: false,
};

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success" } | { kind: "error"; message: string };

const field =
  "w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-[15px] text-charcoal placeholder:text-charcoal/40 transition-[border-color,box-shadow] focus:border-forest focus:outline-none focus:ring-4 focus:ring-forest/10 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-600/10";

export function EnquiryForm() {
  const [values, setValues] = useState<EnquiryInput>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Pre-select product / industry from links such as /contact?product=Biodiesel
  useEffect(() => {
    startedAt.current = Date.now();
    const q = new URLSearchParams(window.location.search);
    const product = q.get("product");
    const industry = q.get("industry");
    setValues((v) => ({
      ...v,
      product: product && (enquiryProducts as readonly string[]).includes(product) ? product : v.product,
      industry: industry && (enquiryIndustries as readonly string[]).includes(industry) ? industry : v.industry,
    }));
  }, []);

  const set = <K extends keyof EnquiryInput>(k: K, v: EnquiryInput[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status.kind === "submitting") return;
    const errs = validateEnquiry(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot.current?.value ?? "", startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: EnquiryErrors };
      if (res.ok && data.ok === true) {
        setStatus({ kind: "success" });
        setValues(empty);
      } else {
        if (data.errors) setErrors(data.errors);
        setStatus({ kind: "error", message: data.error || "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach our server. Please check your connection and try again." });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  // Shown only after the server confirms the enquiry was delivered
  if (status.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="flex min-h-[30rem] flex-col items-start justify-center outline-none">
        <span className="grid size-14 place-items-center rounded-full bg-forest/10">
          <CheckCircle2 className="size-8 text-forest" strokeWidth={1.6} aria-hidden />
        </span>
        <h3 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-forest">Enquiry received</h3>
        <p className="mt-4 max-w-md leading-relaxed text-charcoal/75">{contactPage.successMessage}</p>
        <button
          type="button"
          className="mt-8 font-display text-sm font-bold text-forest underline underline-offset-4"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus({ kind: "idle" });
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const Err = ({ k }: { k: keyof EnquiryInput }) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-[13px] text-red-700">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof EnquiryInput) => ({
    id: k,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });
  const Label = ({ k, children, optional }: { k: string; children: React.ReactNode; optional?: boolean }) => (
    <label htmlFor={k} className="mb-2 block text-sm font-semibold text-charcoal">
      {children}
      {optional ? <span className="ml-1 font-normal text-charcoal/55">(optional)</span> : <span className="text-flame-deep"> *</span>}
    </label>
  );
  const Select = ({ k, options, placeholder }: { k: "product" | "industry"; options: readonly string[]; placeholder: string }) => (
    <div className="relative">
      <select {...a11y(k)} required className={`${field} appearance-none pr-10 ${values[k] ? "" : "text-charcoal/45"}`} value={values[k]} onChange={(e) => set(k, e.target.value)}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-charcoal">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-forest" aria-hidden />
    </div>
  );

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-x-5 gap-y-5 sm:grid-cols-2" aria-describedby="form-note">
      <div>
        <Label k="name">Full name</Label>
        <input {...a11y("name")} autoComplete="name" required className={field} value={values.name} onChange={(e) => set("name", e.target.value)} />
        <Err k="name" />
      </div>
      <div>
        <Label k="company">Company / organisation</Label>
        <input {...a11y("company")} autoComplete="organization" required className={field} value={values.company} onChange={(e) => set("company", e.target.value)} />
        <Err k="company" />
      </div>
      <div>
        <Label k="phone">Phone number</Label>
        <input {...a11y("phone")} type="tel" inputMode="tel" autoComplete="tel" required className={field} value={values.phone} onChange={(e) => set("phone", e.target.value)} />
        <Err k="phone" />
      </div>
      <div>
        <Label k="email">Business email</Label>
        <input {...a11y("email")} type="email" inputMode="email" autoComplete="email" required className={field} value={values.email} onChange={(e) => set("email", e.target.value)} />
        <Err k="email" />
      </div>
      <div>
        <Label k="product">Product of interest</Label>
        <Select k="product" options={enquiryProducts} placeholder="Select a product" />
        <Err k="product" />
      </div>
      <div>
        <Label k="industry">Industry / intended application</Label>
        <Select k="industry" options={enquiryIndustries} placeholder="Select an industry" />
        <Err k="industry" />
      </div>
      <div>
        <Label k="quantity" optional>
          Quantity / monthly consumption
        </Label>
        <input {...a11y("quantity")} placeholder="e.g. litres or tonnes per month" className={field} value={values.quantity} onChange={(e) => set("quantity", e.target.value)} />
        <Err k="quantity" />
      </div>
      <div>
        <Label k="location" optional>
          Delivery location
        </Label>
        <input {...a11y("location")} autoComplete="address-level2" placeholder="City, State" className={field} value={values.location} onChange={(e) => set("location", e.target.value)} />
        <Err k="location" />
      </div>
      <div className="sm:col-span-2">
        <Label k="message" optional>
          Additional requirements
        </Label>
        <textarea
          {...a11y("message")}
          rows={4}
          placeholder="Equipment or burner type, required specification, existing fuel details…"
          className={`${field} resize-y`}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
        />
        <Err k="message" />
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input ref={honeypot} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-charcoal/75">
          <input
            {...a11y("consent")}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 size-[18px] shrink-0 cursor-pointer accent-[#02462D]"
          />
          <span>
            I agree that Amala Biofuels may use these details to respond to my enquiry, as described in the{" "}
            <Link href="/privacy" className="font-semibold text-forest underline underline-offset-4">
              Privacy Policy
            </Link>
            .<span className="text-flame-deep"> *</span>
          </span>
        </label>
        <Err k="consent" />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status.kind === "submitting"}
          className="group/btn inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-forest px-8 font-display text-base font-bold text-ivory transition-[background-color,transform] duration-300 hover:bg-forest-deep active:scale-[0.97] disabled:cursor-wait disabled:opacity-70"
        >
          {status.kind === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Request a Quote
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden />
            </>
          )}
        </button>
        <p id="form-note" className="text-[13px] text-charcoal/60">
          <span className="text-flame-deep">*</span> Required fields
        </p>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="outline-none sm:col-span-2">
        {status.kind === "error" && (
          <p role="alert" className="flex items-start gap-3 rounded-xl border border-red-600/30 bg-red-50 px-4 py-3 text-sm text-red-800">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
