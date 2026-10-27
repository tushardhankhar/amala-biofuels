import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { capabilities, company } from "@/content/site";
import { LinkedInIcon } from "./LinkedInIcon";
import { Wordmark } from "./Wordmark";

const companyLinks = [
  { href: "/#about", label: "About Us" },
  { href: "/#infrastructure", label: "How We Work" },
  { href: "/#sustainability", label: "Sustainability" },
  { href: "/#projects", label: "Projects & Capabilities" },
  { href: "/#contact", label: "Contact" },
];

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-[10px] text-ivory/60">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

const link = "text-ivory/75 transition-colors duration-300 hover:text-gold";

export function Footer() {
  const year = new Date().getFullYear();
  const c = company.contact;
  return (
    <footer className="relative overflow-hidden bg-charcoal text-ivory">
      <svg className="absolute inset-x-0 top-0 h-24 w-full" viewBox="0 0 1440 96" preserveAspectRatio="none" aria-hidden>
        <path d="M0 48 H520 Q560 48 580 28 T640 8 H1440" pathLength={1} className="flow-path" fill="none" stroke="#C8A66A" strokeOpacity=".4" />
      </svg>

      <div className="container-x pt-28">
        {/* Closing statement + CTA */}
        <div className="grid gap-10 border-b border-ivory/12 pb-16 lg:grid-cols-12 lg:items-end">
          <p className="display text-[clamp(2rem,4.6vw,4rem)] leading-[1.02] lg:col-span-8">
            Engineering Possibilities.
            <br />
            <span className="text-gold">Advancing Sustainable Energy.</span>
          </p>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-4 border-b border-gold pb-2 font-display text-lg font-semibold tracking-tight transition-colors hover:text-gold"
            >
              Start a conversation
              <ArrowUpRight className="size-5 text-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-block" aria-label={`${company.legalName}, home`}>
              <Wordmark size="lg" />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/65">
              {company.legalName} — biofuel infrastructure, B100 supply and fuel distribution partnerships, from Assam, India.
            </p>
          </div>

          <nav aria-label="Capabilities" className="lg:col-span-3 lg:col-start-5">
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

          <div className="lg:col-span-3">
            <Col title="Contact">
              <li className="flex items-start gap-3 text-ivory/75">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <span>{c.address || `${company.locality}, ${company.region}, India`}</span>
              </li>
              {c.email && (
                <li>
                  <a href={`mailto:${c.email}`} className={link}>
                    {c.email}
                  </a>
                </li>
              )}
              {c.phone && (
                <li>
                  <a href={`tel:${c.phone.replace(/\s/g, "")}`} className={link}>
                    {c.phone}
                  </a>
                </li>
              )}
              <li>
                <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 ${link}`}>
                  <LinkedInIcon className="size-4" /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <Link href="/#contact" className={link}>
                  Business enquiry form
                </Link>
              </li>
            </Col>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-ivory/12 py-8 text-xs text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-ivory">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-ivory">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/credits" className="hover:text-ivory">
                Image Credits
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
