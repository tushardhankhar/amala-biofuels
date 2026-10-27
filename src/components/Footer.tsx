import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { capabilities, company } from "@/content/site";
import { LinkedInIcon } from "./LinkedInIcon";
import { StudioCredit } from "./StudioCredit";
import { Wordmark } from "./Wordmark";

const companyLinks = [
  { href: "/#about", label: "About Us" },
  { href: "/#infrastructure", label: "How We Work" },
  { href: "/#sustainability", label: "Sustainability" },
  { href: "/#projects", label: "Projects & Capabilities" },
  { href: "/#contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/credits", label: "Image Credits" },
];

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow flex items-center gap-2.5 text-[10px] text-gold">
        <span className="h-px w-4 bg-gold/60" aria-hidden />
        {title}
      </p>
      <ul className="mt-6 space-y-3.5 text-[15px] sm:text-sm">{children}</ul>
    </div>
  );
}

const link = "text-ivory/75 transition-colors duration-300 hover:text-gold";

export function Footer() {
  const year = new Date().getFullYear();
  const c = company.contact;
  return (
    <footer className="relative isolate overflow-hidden bg-charcoal text-ivory">
      <svg className="absolute inset-x-0 top-0 h-24 w-full" viewBox="0 0 1440 96" preserveAspectRatio="none" aria-hidden>
        <path d="M0 48 H520 Q560 48 580 28 T640 8 H1440" pathLength={1} className="flow-path" fill="none" stroke="#C8A66A" strokeOpacity=".4" />
      </svg>
      <div className="absolute -right-40 top-40 -z-10 size-[36rem] rounded-full bg-forest/40 blur-[140px]" aria-hidden />

      <div className="container-x pt-24 sm:pt-28">
        {/* Closing statement + CTA */}
        <div className="grid gap-10 border-b border-ivory/12 pb-14 sm:pb-16 lg:grid-cols-12 lg:items-end">
          <p className="display text-[clamp(2.1rem,4.6vw,4rem)] leading-[1.02] lg:col-span-8">
            Engineering Possibilities.
            <br />
            <span className="text-gold">Advancing Sustainable Energy.</span>
          </p>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/#contact"
              className="group flex w-full items-center justify-between gap-4 rounded-full border border-gold/40 py-2 pl-6 pr-2 font-display text-base font-semibold tracking-tight transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-charcoal sm:inline-flex sm:w-auto sm:text-lg"
            >
              Start a conversation
              <span className="grid size-11 place-items-center rounded-full bg-gold text-charcoal transition-colors duration-300 group-hover:bg-charcoal group-hover:text-gold">
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 sm:grid-cols-3 sm:py-16 lg:grid-cols-12 lg:gap-x-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-4">
            <Link href="/" className="inline-block">
              <Wordmark size="lg" />
              <span className="sr-only"> home</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/65">
              {company.legalName} — biofuel infrastructure, B100 supply and fuel distribution partnerships, from Assam, India.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href={company.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-11 place-items-center rounded-full border border-ivory/15 text-ivory/75 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <LinkedInIcon className="size-4" />
                <span className="sr-only">Amala Biofuels on LinkedIn (opens in a new tab)</span>
              </a>
              <span className="eyebrow text-[10px] text-ivory/55">
                {company.locality} · {company.region} · India
              </span>
            </div>
          </div>

          <nav aria-label="Capabilities" className="lg:col-span-3 lg:col-start-6">
            <Col title="Capabilities">
              {capabilities.map((cap) => (
                <li key={cap.id}>
                  <Link href={`/#${cap.id}`} className={link}>
                    {cap.title}
                  </Link>
                </li>
              ))}
            </Col>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <Col title="Company">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </Col>
          </nav>

          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <Col title="Contact">
              <li className="flex items-start gap-3 text-ivory/75">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <span>{c.address || `${company.locality}, ${company.region}, India`}</span>
              </li>
              {c.email && (
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                  <a href={`mailto:${c.email}`} className={link}>
                    {c.email}
                  </a>
                </li>
              )}
              {c.phone && (
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                  <a href={`tel:${c.phone.replace(/\s/g, "")}`} className={link}>
                    {c.phone}
                  </a>
                </li>
              )}
              <li className="pt-1">
                <Link href="/#contact" className={`group inline-flex items-center gap-2 font-medium ${link}`}>
                  Business enquiry form
                  <ArrowUpRight className="size-4 text-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            </Col>
          </div>
        </div>

        {/* Legal + studio credit */}
        <div className="flex flex-col gap-7 border-t border-ivory/12 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 text-xs text-ivory/60 sm:flex-row sm:items-center sm:gap-8">
            <p>
              © {year} {company.legalName}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4 sm:justify-between lg:justify-start">
            <StudioCredit />
            <a
              href="#main"
              className="hidden size-11 shrink-0 place-items-center rounded-full border border-ivory/15 text-ivory/70 transition-colors duration-300 hover:border-gold hover:text-gold sm:grid"
            >
              <ArrowUp className="size-4" aria-hidden />
              <span className="sr-only">Back to top</span>
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
