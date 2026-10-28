import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { company, nav, products } from "@/content/site";
import { mailHref, telHref } from "./ContactLinks";
import { LinkedInIcon } from "./LinkedInIcon";
import { Logo } from "./Logo";
import { StudioCredit } from "./StudioCredit";

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/credits", label: "Image Credits" },
];

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-[11px] text-leaf-soft">{title}</p>
      <ul className="mt-5 space-y-3 text-[15px] sm:text-sm">{children}</ul>
    </div>
  );
}

const link = "text-ivory/75 transition-colors duration-300 hover:text-ivory";

export function Footer() {
  const year = new Date().getFullYear();
  const c = company.contact;
  return (
    <footer className="relative isolate overflow-hidden bg-forest-ink text-ivory">
      <div className="absolute -right-48 -top-40 -z-10 size-[40rem] rounded-full bg-forest/60 blur-[140px]" aria-hidden />

      <div className="container-x pt-4 sm:pt-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 sm:grid-cols-3 sm:py-16 lg:grid-cols-12 lg:gap-x-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-4">
            <Link href="/" className="inline-block">
              <Logo tone="reverse" size="lg" />
              <span className="sr-only"> home</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">
              {company.legalName} is an industrial fuel manufacturing and processing company based in Jorhat, Assam. Established in {company.established}{" "}
              as a biodiesel plant, it has grown through in-house R&amp;D into application-focused industrial fuels.
            </p>
            <a
              href={company.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-grid size-11 place-items-center rounded-full border border-ivory/20 text-ivory/80 transition-colors duration-300 hover:border-ivory hover:text-ivory"
            >
              <LinkedInIcon className="size-4" />
              <span className="sr-only">{company.shortName} on LinkedIn (opens in a new tab)</span>
            </a>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
            <Col title="Company">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </Col>
          </nav>

          <nav aria-label="Products" className="lg:col-span-2">
            <Col title="Products">
              {products.map((p) => (
                <li key={p.id}>
                  <Link href={`/products#${p.id}`} className={link}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </Col>
          </nav>

          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <Col title="Contact">
              {company.addresses.map((a) => (
                <li key={a.label} className="flex items-start gap-3 text-ivory/75">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-flame" aria-hidden />
                  <span>
                    <span className="block font-semibold text-ivory">{a.label}</span>
                    {a.lines.join(", ")}
                  </span>
                </li>
              ))}
              {telHref && (
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-flame" aria-hidden />
                  <a href={telHref} className={link}>
                    {c.phone}
                  </a>
                </li>
              )}
              {mailHref && (
                <li className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-flame" aria-hidden />
                  <a href={mailHref} className={link}>
                    {c.email}
                  </a>
                </li>
              )}
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
              className="hidden size-11 shrink-0 place-items-center rounded-full border border-ivory/15 text-ivory/70 transition-colors duration-300 hover:border-ivory hover:text-ivory sm:grid"
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
