import { Check } from "lucide-react";
import { ButtonLink, Eyebrow, TextLink } from "@/components/Button";
import { Contours, CtaBand, IndustryTile, Marquee, Orbs, ProductCard, SectionHeading, WhyCard } from "@/components/blocks";
import { Counter, FlowLine, Spotlight } from "@/components/fx";
import { Hero } from "@/components/Hero";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { about, capabilities, company, homeWhyIds, industries, products, why } from "@/content/site";

const flow = [
  {
    step: "Feedstocks",
    title: "Suitable oil-based raw materials",
    items: ["Used cooking oil", "Palm stearin", "Acidic oils", "Fatty acids", "Other suitable oil-based materials"],
  },
  {
    step: "Processing & R&D",
    title: "In-house process development",
    items: ["Manufacturing & processing", "Research & experimentation", "Technical evaluation", "Quality assessment"],
  },
  {
    step: "Industrial fuels",
    title: "Products suited to the application",
    items: ["Biodiesel", "Diesel-range products", "Light diesel oil (LDO)", "Hydrocarbon fractions", "Furnace oil (FO)"],
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Company introduction */}
      <section aria-labelledby="intro-title" className="overflow-x-clip bg-ivory pb-20 pt-20 sm:pb-28 sm:pt-36 lg:pt-40">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal kind="blur">
              <Eyebrow>Who we are</Eyebrow>
              <h2 id="intro-title" className="h2 mt-5 text-forest">
                From biodiesel origins to industrial fuel solutions.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede mt-6 text-charcoal/80">{about.body[0]}</p>
              <p className="mt-4 leading-relaxed text-charcoal/70">{about.body[2]}</p>
              <div className="mt-8">
                <TextLink href="/about">More about Amala Biofuels</TextLink>
              </div>
            </Reveal>
          </div>
          <div className="relative lg:col-span-6">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(117,141,45,0.2),transparent_60%)]" aria-hidden />
            <Media photo="plant" sizes="(min-width:1024px) 46vw, 100vw" className="aspect-[4/3] rounded-3xl" />
            <Reveal kind="scale" delay={0.25} className="absolute -bottom-8 left-4 right-4 rounded-2xl bg-forest p-5 text-ivory shadow-xl sm:left-auto sm:right-6 sm:w-80">
              <p className="eyebrow text-[11px] text-leaf-soft">Our evolution</p>
              <ol className="relative mt-4 space-y-3 text-sm">
                <span className="absolute bottom-1.5 left-[3px] top-1.5 w-px bg-ivory/20" aria-hidden />
                {about.evolution.map((e, i) => (
                  <li key={e.title} className="relative flex items-center gap-3">
                    <span className={`relative size-[7px] rounded-full bg-flame ${i === about.evolution.length - 1 ? "animate-pulse-dot" : ""}`} aria-hidden />
                    <span className="font-semibold">{e.title}</span>
                    <span className="ml-auto text-xs text-ivory/60">{e.when === "Research & development" ? "R&D" : e.when}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee items={products.map((p) => p.name)} />

      {/* Products preview */}
      <section aria-labelledby="products-title" className="bg-cream py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            align="split"
            eyebrow="Our products"
            title={<span id="products-title">A diverse industrial fuel portfolio.</span>}
            intro="Biodiesel, diesel-range products, LDO, hydrocarbon fractions, furnace oil and application-focused fuel solutions, subject to availability and applicable specifications."
            action={
              <ButtonLink href="/products" variant="primary">
                Explore Our Products
              </ButtonLink>
            }
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <Reveal as="li" kind="scale" key={p.id} delay={(i % 4) * 0.07} className={i === products.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
            <Reveal as="li" kind="scale" delay={0.21} className="hidden lg:block">
              <div className="relative isolate flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-forest p-7 text-ivory">
                <Orbs />
                <p className="font-display text-xl font-extrabold leading-snug tracking-tight">Not sure which product suits your equipment?</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ivory/75">Share your application and burner or equipment details.</p>
                <div className="mt-6">
                  <TextLink href="/contact#quote" tone="light">
                    Ask our team
                  </TextLink>
                </div>
              </div>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* Feedstock → processing → fuel */}
      <section aria-labelledby="flow-title" className="relative isolate overflow-hidden bg-forest-deep py-20 text-ivory sm:py-28">
        <Contours />
        <Orbs />
        <div className="container-x">
          <SectionHeading
            align="split"
            tone="light"
            eyebrow="How we work"
            title={<span id="flow-title">From suitable feedstock to industrial fuel.</span>}
            intro="Our operations began with converting waste-derived oils and lipid-based feedstocks into biodiesel, and have grown through in-house process development into a broader fuel portfolio."
          />
          <ol className="mt-16 grid lg:grid-cols-3 lg:gap-6">
            {flow.map((f, i) => (
              <Reveal as="li" kind="scale" key={f.step} delay={i * 0.18} className="relative">
                {i > 0 && (
                  <>
                    <span className="absolute -left-6 top-[42px] hidden h-6 w-6 text-ivory lg:block">
                      <FlowLine />
                    </span>
                    <span className="mx-auto block h-10 w-6 text-ivory lg:hidden">
                      <FlowLine vertical />
                    </span>
                  </>
                )}
                <Spotlight tone="dark" className="rounded-3xl">
                  <div className="h-full rounded-3xl bg-ivory/[0.06] p-6 ring-1 ring-ivory/10 backdrop-blur-sm sm:p-8">
                    <div className="flex items-center gap-4">
                      <span className="grid size-[52px] shrink-0 place-items-center rounded-2xl bg-flame font-display text-lg font-extrabold text-forest-ink">
                        0{i + 1}
                      </span>
                      <div>
                        <p className="eyebrow text-[11px] text-leaf-soft">{f.step}</p>
                        <h3 className="mt-1 font-display text-lg font-extrabold leading-snug tracking-tight">{f.title}</h3>
                      </div>
                    </div>
                    <ul className="mt-6 space-y-2.5 border-t border-ivory/10 pt-6">
                      {f.items.map((it) => (
                        <li key={it} className="flex items-center gap-3 text-[15px] text-ivory/80">
                          <Check className="size-4 shrink-0 text-flame" aria-hidden />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Industries preview */}
      <section aria-labelledby="industries-title" className="bg-cream py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            align="split"
            eyebrow="Industries we serve"
            title={<span id="industries-title">Fuel for the way your operation runs.</span>}
            intro="Requirements vary by process, burner design, operating conditions and fuel-handling systems. We start by understanding the application."
            action={<TextLink href="/industries">All industries</TextLink>}
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal as="li" kind="scale" key={ind.id} delay={(i % 3) * 0.08}>
                <IndustryTile industry={ind} index={i} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities & R&D */}
      <section aria-labelledby="capabilities-title" className="bg-ivory py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Capabilities & R&D"
                title={<span id="capabilities-title">Manufacturing experience, backed by in-house research.</span>}
                intro="Different applications call for different fuel characteristics. Our processing, research and evaluation work together to find products suited to the intended use."
              />
              <div className="mt-10 grid grid-cols-5 gap-3">
                <Media photo="lab" sizes="(min-width:1024px) 24vw, 60vw" className="col-span-3 aspect-[4/5] rounded-3xl" imgClassName="object-[60%_80%]" />
                <Media photo="valves" sizes="(min-width:1024px) 16vw, 40vw" className="col-span-2 mt-12 aspect-[3/4] rounded-3xl" imgClassName="grayscale" />
              </div>
            </div>
          </div>
          <ol className="grid gap-4 self-start sm:grid-cols-2 lg:col-span-7 lg:mt-2">
            {capabilities.map((cap, i) => (
              <Reveal as="li" kind="scale" key={cap.title} delay={(i % 2) * 0.08}>
                <Spotlight className="rounded-3xl">
                  <div className="h-full rounded-3xl border border-forest/10 bg-white p-6 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(2,70,45,0.45)] sm:p-7">
                    <span className="font-display text-sm font-bold tabular-nums text-flame-deep">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-4 font-display text-xl font-extrabold tracking-tight text-forest">{cap.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-charcoal/75">{cap.body}</p>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
            <Reveal as="li" kind="scale" delay={0.1} className="relative isolate overflow-hidden rounded-3xl bg-forest p-6 text-ivory sm:col-span-2 sm:p-8">
              <Orbs />
              <Contours />
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow text-[11px] text-leaf-soft">Capacity</p>
                  <p className="mt-3 font-display text-[clamp(3.5rem,8vw,5.5rem)] font-extrabold leading-none tracking-tight">
                    <Counter to={Number(company.capacity.value)} />
                    <span className="ml-3 align-middle text-xl text-ivory/70 sm:text-2xl">tonnes per day</span>
                  </p>
                </div>
                <p className="max-w-[15rem] text-[15px] leading-relaxed text-ivory/75">{company.capacity.label}.</p>
              </div>
            </Reveal>
          </ol>
        </div>
      </section>

      {/* Why Amala */}
      <section aria-labelledby="why-title" className="relative isolate overflow-hidden bg-forest-ink py-20 text-ivory sm:py-28">
        <Orbs />
        <div className="container-x">
          <SectionHeading
            align="split"
            tone="light"
            eyebrow="Why Amala Biofuels"
            title={<span id="why-title">A practical partner for industrial fuel.</span>}
            action={
              <TextLink href="/why-choose-us" tone="light">
                Why choose us
              </TextLink>
            }
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homeWhyIds.map((id, i) => {
              const item = why.find((w) => w.id === id)!;
              return (
                <Reveal as="li" kind="scale" key={id} delay={(i % 3) * 0.08}>
                  <WhyCard item={item} tone="dark" />
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
