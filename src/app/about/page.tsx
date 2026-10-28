import type { Metadata } from "next";
import { Eyebrow } from "@/components/Button";
import { CtaBand, PageHero, SectionHeading } from "@/components/blocks";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { about, company } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Amala Biofuels Private Limited is an industrial fuel manufacturing and processing company in Jorhat, Assam, established in 2022 as a biodiesel plant and grown through in-house R&D.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title={about.title} intro={about.intro} photo="plant" />

      {/* Company profile */}
      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Eyebrow>Company profile</Eyebrow>
                <h2 className="h2 mt-5 text-forest">Built on manufacturing. Driven by research.</h2>
              </Reveal>
              <Media photo="process" sizes="(min-width:1024px) 38vw, 100vw" className="mt-10 aspect-[4/3] rounded-3xl" />
              <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { k: "Established", v: company.established },
                  { k: "Based in", v: company.locality },
                  { k: "Capacity*", v: `${company.capacity.value} ${company.capacity.unit}` },
                ].map((f) => (
                  <div key={f.k} className="flex flex-col-reverse rounded-2xl bg-cream px-3 py-4">
                    <dt className="text-xs text-charcoal/65">{f.k}</dt>
                    <dd className="font-display text-xl font-extrabold text-forest">{f.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-charcoal/60">*{company.capacity.label}.</p>
            </div>
          </div>
          <div className="space-y-6 lg:col-span-7 lg:pt-2">
            {about.body.map((para, i) => (
              <Reveal key={i} delay={0.04}>
                <p className={i === 0 ? "lede text-charcoal/85" : "leading-[1.8] text-charcoal/75"}>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Evolution */}
      <section aria-labelledby="evolution-title" className="bg-forest-deep py-20 text-ivory sm:py-28">
        <div className="container-x">
          <SectionHeading tone="light" eyebrow="Our evolution" title={<span id="evolution-title">From biodiesel plant to industrial fuel solutions.</span>} />
          <ol className="relative mt-14 grid gap-4 lg:grid-cols-3">
            <span className="absolute left-0 right-0 top-[27px] hidden h-px bg-ivory/15 lg:block" aria-hidden />
            {about.evolution.map((e, i) => (
              <Reveal as="li" key={e.title} delay={i * 0.08} className="relative">
                <span className="relative z-10 grid size-14 place-items-center rounded-full bg-flame font-display text-lg font-extrabold text-forest-ink">
                  {i + 1}
                </span>
                <div className="mt-6 rounded-3xl bg-ivory/[0.06] p-6 ring-1 ring-ivory/10 sm:p-7">
                  <p className="eyebrow text-[11px] text-leaf-soft">{e.when}</p>
                  <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight">{e.title}</h3>
                  <p className="mt-3 leading-relaxed text-ivory/75">{e.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Vision</Eyebrow>
            <p className="mt-6 font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-bold leading-[1.4] tracking-tight text-forest">{about.vision}</p>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Mission</Eyebrow>
            </Reveal>
            <ol className="mt-6 divide-y divide-forest/10 border-y border-forest/10">
              {about.mission.map((m, i) => (
                <Reveal as="li" key={m.title} delay={0.03 * i} className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr]">
                  <span className="font-display text-sm font-bold tabular-nums text-flame-deep">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-lg font-extrabold tracking-tight text-forest">{m.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-charcoal/75">{m.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="bg-cream py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Core values" title={<span id="values-title">What guides our work.</span>} />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 4) * 0.05} className="rounded-3xl border border-forest/10 bg-white p-6">
                <span className="block size-2.5 rotate-45 rounded-[2px] bg-flame" aria-hidden />
                <h3 className="mt-5 font-display text-lg font-extrabold tracking-tight text-forest">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-charcoal/75">{v.body}</p>
              </Reveal>
            ))}
            <Reveal as="li" delay={0.15} className="flex flex-col justify-end rounded-3xl bg-forest p-6 text-ivory">
              <p className="font-display text-lg font-extrabold leading-snug">{company.tagline}</p>
            </Reveal>
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
