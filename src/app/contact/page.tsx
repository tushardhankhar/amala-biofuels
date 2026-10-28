import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Eyebrow } from "@/components/Button";
import { PageHero } from "@/components/blocks";
import { mailHref, telHref, whatsappHref, WhatsAppIcon } from "@/components/ContactLinks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { LinkedInIcon } from "@/components/LinkedInIcon";
import { Reveal } from "@/components/Reveal";
import { company, contactPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Request a quote from Amala Biofuels, Jorhat, Assam. Share your application, consumption, product needs and delivery location with our team.",
  alternates: { canonical: "/contact" },
};

const mapLink = (lines: string[]) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${company.legalName}, ${lines.join(", ")}`)}`;

export default function ContactPage() {
  const c = company.contact;
  const wa = whatsappHref();
  const direct = [
    telHref && { href: telHref, icon: <Phone className="size-5" aria-hidden />, label: "Call", value: c.phone, external: false },
    mailHref && { href: mailHref, icon: <Mail className="size-5" aria-hidden />, label: "Email", value: c.email, external: false },
    wa && { href: wa, icon: <WhatsAppIcon className="size-5" />, label: "WhatsApp", value: "Send us a message", external: true },
  ].filter(Boolean) as { href: string; icon: React.ReactNode; label: string; value: string; external: boolean }[];

  return (
    <>
      <PageHero eyebrow="Contact Us" title="Contact Us" intro={contactPage.body} photo="valves" />

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Contact details */}
          <div className="space-y-4 lg:col-span-4">
            <Reveal>
              <Eyebrow>Get in touch</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold leading-tight tracking-tight text-forest">
                {contactPage.headline}
              </h2>
            </Reveal>

            {direct.length > 0 && (
              <ul className="grid gap-3">
                {direct.map((d) => (
                  <li key={d.label}>
                    <a
                      href={d.href}
                      {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-center gap-4 rounded-2xl bg-forest px-5 py-4 text-ivory transition-colors hover:bg-forest-deep"
                    >
                      <span className="grid size-10 place-items-center rounded-full bg-ivory/10">{d.icon}</span>
                      <span>
                        <span className="block text-xs text-ivory/65">{d.label}</span>
                        <span className="font-display font-bold">{d.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <ul className="grid gap-3">
              {company.addresses.map((a) => (
                <Reveal as="li" key={a.label} className="rounded-2xl border border-forest/10 bg-white p-5">
                  <p className="flex items-center gap-2 font-display text-sm font-bold text-forest">
                    <MapPin className="size-4 text-flame-deep" aria-hidden /> {a.label}
                  </p>
                  <address className="mt-2 not-italic leading-relaxed text-charcoal/80">
                    {company.legalName}
                    {a.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                  <a
                    href={mapLink(a.lines)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest underline-offset-4 hover:underline"
                  >
                    View on Google Maps <ArrowUpRight className="size-3.5" aria-hidden />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Reveal>
              ))}
            </ul>

            <a
              href={company.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-forest/10 bg-white px-5 py-4 text-sm font-semibold text-forest hover:border-forest/30"
            >
              <LinkedInIcon className="size-4" /> Follow us on LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          {/* Quote form */}
          <div id="quote" className="rounded-[2rem] bg-ivory p-6 shadow-[0_30px_60px_-40px_rgba(2,70,45,0.5)] ring-1 ring-forest/10 sm:p-10 lg:col-span-8">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-forest sm:text-3xl">Request a Quote</h2>
            <p className="mb-8 mt-2 text-charcoal/70">Share a few details and our team will respond with relevant information.</p>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
