import { capabilities, type Capability } from "@/content/site";
import { SectionLabel } from "./Button";
import { ContentFlag } from "./ContentFlag";
import { EnquiryLink } from "./EnquiryLink";
import { Media } from "./Media";
import { Reveal } from "./Reveal";

function Scope({ c }: { c: Capability }) {
  return (
    <>
      <ul className="mt-8 border-t border-ivory/12">
        {c.scope.map((s) => (
          <li key={s} className="flex items-center gap-4 border-b border-ivory/12 py-3.5 text-[15px] text-ivory/85">
            <span className="size-1.5 shrink-0 bg-gold" aria-hidden />
            {s}
          </li>
        ))}
      </ul>
      {c.note && <p className="mt-4 text-xs leading-relaxed text-ivory/55">{c.note}</p>}
    </>
  );
}

function Heading({ c }: { c: Capability }) {
  return (
    <>
      <Reveal>
        <p className="eyebrow flex items-center gap-3 text-gold">
          <span className="tabular-nums">{c.index}</span>
          <span className="h-px w-6 bg-gold/60" aria-hidden />
          {c.title}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h3 id={`${c.id}-title`} className="display mt-6 text-[clamp(1.9rem,3.4vw,3.1rem)] leading-[1.03]">
          {c.headline}
        </h3>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-xl leading-relaxed text-ivory/70">{c.intro}</p>
      </Reveal>
    </>
  );
}

/** Split layout — image and copy side by side, alternating. */
function SplitCapability({ c, flip }: { c: Capability; flip: boolean }) {
  return (
    <article id={c.id} aria-labelledby={`${c.id}-title`} className="group grid scroll-mt-24 items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <div className={`relative lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}>
        <Media photo={c.photo} tone="dark" sizes="(min-width:1024px) 58vw, 100vw" className="aspect-[4/3] sm:aspect-[16/11]" />
        <span className="display pointer-events-none absolute bottom-4 left-5 text-[clamp(3.5rem,8vw,7rem)] leading-none text-ivory/80 mix-blend-overlay" aria-hidden>
          {c.index}
        </span>
      </div>
      <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : ""}`}>
        <Heading c={c} />
        <Reveal delay={0.15}>
          <Scope c={c} />
        </Reveal>
        <Reveal delay={0.2} className="mt-9 flex flex-wrap items-center gap-5">
          <EnquiryLink type={c.cta.enquiryType} variant="ghost-light">
            {c.cta.label}
          </EnquiryLink>
          <ContentFlag status={c.status} />
        </Reveal>
      </div>
    </article>
  );
}

/** Full-bleed layout — copy panel over cinematic photography. */
function FeatureCapability({ c }: { c: Capability }) {
  return (
    <article id={c.id} aria-labelledby={`${c.id}-title`} className="group relative isolate scroll-mt-16 overflow-hidden">
      <Media photo={c.photo} sizes="100vw" className="absolute inset-0 -z-20" imgClassName="object-[75%_center] brightness-110" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/75 to-transparent lg:via-charcoal/55" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/40" aria-hidden />
      <div className="container-x grid min-h-[44rem] items-center py-24 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Heading c={c} />
          <Reveal delay={0.15}>
            <Scope c={c} />
          </Reveal>
          <Reveal delay={0.2} className="mt-9 flex flex-wrap items-center gap-5">
            <EnquiryLink type={c.cta.enquiryType}>{c.cta.label}</EnquiryLink>
            <ContentFlag status={c.status} />
          </Reveal>
        </div>
      </div>
    </article>
  );
}

export function Capabilities() {
  const split = capabilities.slice(0, 2);
  const feature = capabilities[2];
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="relative bg-charcoal text-ivory">
      <div className="container-x pb-24 pt-24 sm:pb-32 sm:pt-32 lg:pt-40">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionLabel index="02" tone="light">
                Core capabilities
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="capabilities-title" className="display mt-8 text-[clamp(2.25rem,5vw,4.5rem)]">
                Three connected disciplines across the <span className="text-gold">renewable fuel chain.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="leading-relaxed text-ivory/65">
              Refinery development, fuel supply and retail access, planned together so each part of the value chain supports the next.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-28 sm:space-y-36">
          {split.map((c, i) => (
            <SplitCapability key={c.id} c={c} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
      {feature && <FeatureCapability c={feature} />}
    </section>
  );
}
