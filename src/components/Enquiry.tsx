import { company, enquiry } from "@/content/site";
import { SectionLabel } from "./Button";
import { ContentFlag } from "./ContentFlag";
import { EnquiryForm } from "./EnquiryForm";
import { LinkedInIcon } from "./LinkedInIcon";
import { Reveal } from "./Reveal";

export function Enquiry() {
  const c = company.contact;
  const rows = [
    c.address && { label: "Office", value: c.address },
    c.email && { label: "Email", value: c.email, href: `mailto:${c.email}` },
    c.phone && { label: "Telephone", value: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}` },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-forest-deep py-24 text-ivory sm:py-32 lg:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel index="07" tone="light">
              {enquiry.label}
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="contact-title" className="display mt-8 text-[clamp(2.5rem,5.5vw,5rem)]">
              Let&rsquo;s Build <span className="text-gold">What&rsquo;s Next.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ivory/70">{enquiry.body}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-14 border-t border-ivory/10">
              {rows.map((r) => (
                <div key={r.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-ivory/10 py-5 text-sm">
                  <dt className="eyebrow pt-0.5 text-[10px] text-ivory/60">{r.label}</dt>
                  <dd className="leading-relaxed">
                    {r.href ? (
                      <a href={r.href} className="hover:text-gold">
                        {r.value}
                      </a>
                    ) : (
                      r.value
                    )}
                  </dd>
                </div>
              ))}
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-ivory/10 py-5 text-sm">
                <dt className="eyebrow pt-0.5 text-[10px] text-ivory/60">Location</dt>
                <dd>
                  {company.locality}, {company.region}, India
                </dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-ivory/10 py-5 text-sm">
                <dt className="eyebrow pt-0.5 text-[10px] text-ivory/60">LinkedIn</dt>
                <dd>
                  <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold">
                    <LinkedInIcon className="size-4" /> Amala Biofuels
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            </dl>
            <ContentFlag status={c.status} className="mt-5" />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative lg:col-span-6 lg:col-start-7">
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
