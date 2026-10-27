import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { capabilities, projects } from "@/content/site";
import { SectionLabel } from "./Button";
import { EnquiryLink } from "./EnquiryLink";
import { Reveal } from "./Reveal";

const statusTone = {
  Operational: "bg-forest text-ivory",
  "Under development": "border border-forest text-forest",
  Planned: "border border-charcoal/30 text-charcoal/70",
};

function ProjectGallery() {
  return (
    <div className="mt-20 grid gap-x-6 gap-y-14 md:grid-cols-2">
      {projects.map((p, i) => (
        <Reveal as="div" key={p.name} delay={(i % 2) * 0.08} className={`group ${i % 3 === 0 ? "md:col-span-2" : ""}`}>
          <article>
            <div className={`relative overflow-hidden bg-forest-deep ${i % 3 === 0 ? "aspect-[21/9]" : "aspect-[4/3]"}`}>
              <Image src={p.photo} alt={p.alt} fill placeholder="blur" sizes={i % 3 === 0 ? "100vw" : "(min-width:768px) 50vw, 100vw"} className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
            </div>
            <div className="mt-5 flex flex-wrap items-start justify-between gap-4 border-b border-charcoal/12 pb-5">
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-1 text-sm text-charcoal/60">
                  {p.location} · {p.type}
                </p>
              </div>
              <span className={`eyebrow px-2.5 py-1 text-[10px] ${statusTone[p.status]}`}>{p.status}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/70">{p.scope}</p>
            {p.specs.length > 0 && (
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {p.specs.map((s) => (
                  <div key={s.label} className="flex justify-between gap-4 border-b border-charcoal/8 py-1.5">
                    <dt className="text-charcoal/55">{s.label}</dt>
                    <dd className="text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-ivory py-24 text-charcoal sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="06">Projects &amp; capabilities</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="projects-title" className="display mt-8 text-[clamp(2.25rem,5vw,4.5rem)]">
                Where we can <span className="text-forest">engage.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="leading-relaxed text-charcoal/70">
              An overview of the project types we work on and who we work with. Every engagement is scoped individually and confirmed in writing.
            </p>
          </Reveal>
        </div>

        {/* Engagement matrix */}
        <div className="mt-16" role="table" aria-label="Capabilities overview">
          <div role="row" className="eyebrow hidden grid-cols-12 gap-6 border-b border-charcoal pb-4 text-[10px] text-charcoal/60 lg:grid">
            <span role="columnheader" className="col-span-4">Capability</span>
            <span role="columnheader" className="col-span-4">Scope</span>
            <span role="columnheader" className="col-span-3">Typical partners</span>
            <span role="columnheader" className="col-span-1 text-right">Enquire</span>
          </div>
          {capabilities.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06}>
              <div role="row" className="group grid gap-4 border-b border-charcoal/15 py-8 transition-colors duration-500 hover:bg-ivory-deep/70 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-12 lg:gap-6 lg:px-2">
                <div role="cell" className="flex items-baseline gap-4 sm:col-span-2 lg:col-span-4">
                  <span className="eyebrow tabular-nums text-forest">{c.index}</span>
                  <a href={`#${c.id}`} className="font-display text-2xl font-semibold leading-tight tracking-tight underline-offset-4 hover:underline">
                    {c.title}
                  </a>
                </div>
                <div role="cell" className="lg:col-span-4">
                  <ul className="flex flex-wrap gap-2">
                    {c.scope.map((s) => (
                      <li key={s} className="border border-charcoal/15 px-2.5 py-1 text-[13px] text-charcoal/75">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <p role="cell" className="text-[15px] leading-relaxed text-charcoal/70 lg:col-span-3">
                  <span className="eyebrow mb-1 block text-[10px] text-charcoal/55 lg:hidden">Typical partners</span>
                  {c.partners}
                </p>
                <div role="cell" className="sm:col-span-2 lg:col-span-1 lg:text-right">
                  <a
                    href="#contact"
                    data-enquiry={c.cta.enquiryType}
                    aria-label={`${c.cta.label}`}
                    className="inline-grid size-11 place-items-center border border-charcoal/20 transition-colors duration-300 group-hover:border-forest group-hover:bg-forest group-hover:text-ivory"
                  >
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {projects.length > 0 && <ProjectGallery />}

        {/* Conversion panel */}
        <Reveal className="mt-20 grid items-center gap-8 bg-charcoal px-6 py-10 text-ivory sm:px-10 md:grid-cols-12 lg:px-14 lg:py-14">
          <div className="md:col-span-8">
            <p className="eyebrow text-gold">Have a project in mind?</p>
            <p className="display mt-4 text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.05]">
              Share your requirements and our team will respond with next steps.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <EnquiryLink>Discuss Your Project</EnquiryLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
