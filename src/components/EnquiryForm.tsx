"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { enquiry, enquiryTypes, type EnquiryType } from "@/content/site";
import { validateEnquiry, type EnquiryErrors, type EnquiryInput } from "@/lib/enquiry-schema";
import { ENQUIRY_EVENT } from "./EnquiryLink";

const empty: EnquiryInput = { name: "", company: "", email: "", phone: "", type: "", location: "", scope: "", message: "", consent: false };

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success" } | { kind: "error"; message: string };

const field =
  "peer w-full border-0 border-b border-ivory/20 bg-transparent px-0 pb-3 pt-2 text-[15px] text-ivory placeholder:text-ivory/40 transition-colors focus:border-gold focus:outline-none focus:ring-0 aria-[invalid=true]:border-red-400";

export function EnquiryForm() {
  const [values, setValues] = useState<EnquiryInput>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    const onType = (e: Event) => {
      const type = (e as CustomEvent<EnquiryType>).detail;
      setValues((v) => ({ ...v, type }));
      setErrors((er) => ({ ...er, type: undefined }));
    };
    // Plain anchors elsewhere on the page can pre-select a type via data-enquiry
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("[data-enquiry]");
      if (a?.dataset.enquiry) window.dispatchEvent(new CustomEvent(ENQUIRY_EVENT, { detail: a.dataset.enquiry }));
    };
    window.addEventListener(ENQUIRY_EVENT, onType);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener(ENQUIRY_EVENT, onType);
      document.removeEventListener("click", onClick);
    };
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

  if (status.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="flex min-h-[28rem] flex-col items-start justify-center border border-ivory/10 p-8 outline-none sm:p-12">
        <CheckCircle2 className="size-10 text-gold" strokeWidth={1.4} aria-hidden />
        <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight">Thank you — your enquiry has been received.</h3>
        <p className="mt-4 max-w-md leading-relaxed text-ivory/65">Our team will review the details and respond to the email address you provided.</p>
        <button
          type="button"
          className="mt-8 text-sm font-medium text-gold underline-offset-4 hover:underline"
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
      <p id={`${k}-error`} className="mt-2 text-xs text-red-300">
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
    <label htmlFor={k} className="eyebrow block text-[10px] text-ivory/55">
      {children}
      {optional ? <span className="ml-1 normal-case tracking-normal text-ivory/50">(optional)</span> : <span className="text-gold"> *</span>}
    </label>
  );

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-x-8 gap-y-8 sm:grid-cols-2" aria-describedby="form-note">
      <div>
        <Label k="name">Full name</Label>
        <input {...a11y("name")} autoComplete="name" required className={field} value={values.name} onChange={(e) => set("name", e.target.value)} />
        <Err k="name" />
      </div>
      <div>
        <Label k="company">Company name</Label>
        <input {...a11y("company")} autoComplete="organization" required className={field} value={values.company} onChange={(e) => set("company", e.target.value)} />
        <Err k="company" />
      </div>
      <div>
        <Label k="email">Business email</Label>
        <input {...a11y("email")} type="email" inputMode="email" autoComplete="email" required className={field} value={values.email} onChange={(e) => set("email", e.target.value)} />
        <Err k="email" />
      </div>
      <div>
        <Label k="phone" optional>
          Phone number
        </Label>
        <input {...a11y("phone")} type="tel" inputMode="tel" autoComplete="tel" className={field} value={values.phone} onChange={(e) => set("phone", e.target.value)} />
        <Err k="phone" />
      </div>

      <fieldset className="sm:col-span-2" aria-describedby={errors.type ? "type-error" : undefined}>
        <legend className="eyebrow text-[10px] text-ivory/55">
          Enquiry type<span className="text-gold"> *</span>
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {enquiryTypes.map((t) => (
            <label key={t} className="relative cursor-pointer">
              <input type="radio" name="type" value={t} checked={values.type === t} onChange={() => set("type", t)} className="peer sr-only" />
              <span className="inline-flex min-h-11 items-center border border-ivory/20 px-4 text-sm text-ivory/75 transition-colors duration-300 hover:border-ivory/50 peer-checked:border-gold peer-checked:bg-gold peer-checked:text-charcoal peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
                {t}
              </span>
            </label>
          ))}
        </div>
        <Err k="type" />
      </fieldset>

      <div>
        <Label k="location" optional>
          Project location
        </Label>
        <input {...a11y("location")} autoComplete="address-level2" placeholder="City, State" className={field} value={values.location} onChange={(e) => set("location", e.target.value)} />
        <Err k="location" />
      </div>
      <div>
        <Label k="scope" optional>
          Estimated requirement / scope
        </Label>
        <input {...a11y("scope")} placeholder="e.g. monthly volume, plant size" className={field} value={values.scope} onChange={(e) => set("scope", e.target.value)} />
        <Err k="scope" />
      </div>
      <div className="sm:col-span-2">
        <Label k="message">Message</Label>
        <textarea {...a11y("message")} rows={4} required className={`${field} resize-y`} value={values.message} onChange={(e) => set("message", e.target.value)} />
        <Err k="message" />
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input ref={honeypot} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ivory/65">
          <input
            {...a11y("consent")}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-1 size-4 shrink-0 cursor-pointer accent-[#C8A66A]"
          />
          <span>
            I agree that Amala Biofuels may use the details above to respond to this enquiry, as described in the{" "}
            <Link href="/privacy" className="text-ivory underline underline-offset-4 hover:text-gold">
              Privacy Policy
            </Link>
            .<span className="text-gold"> *</span>
          </span>
        </label>
        <Err k="consent" />
      </div>

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status.kind === "submitting"}
          className="group/btn inline-flex min-h-14 items-center justify-center gap-3 bg-gold px-8 font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-charcoal transition-[background-color,transform] duration-300 hover:bg-gold-soft active:scale-[0.97] disabled:cursor-wait disabled:opacity-70"
        >
          {status.kind === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              {enquiry.cta}
              <ArrowUpRight className="size-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden />
            </>
          )}
        </button>
        <p id="form-note" className="text-xs text-ivory/60">
          <span className="text-gold">*</span> Required fields
        </p>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="outline-none sm:col-span-2">
        {status.kind === "error" && (
          <p role="alert" className="flex items-start gap-3 border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
