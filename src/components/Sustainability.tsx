import Image from "next/image";
import { photos } from "@/content/photos";
import { sustainability } from "@/content/site";
import { BlueprintArt } from "./BlueprintArt";
import { SectionLabel } from "./Button";
import { ContentFlag } from "./ContentFlag";
import { Media } from "./Media";
import { Reveal } from "./Reveal";

export function Sustainability() {
  return (
    <section id="sustainability" aria-labelledby="sustainability-title" className="relative isolate overflow-hidden bg-forest text-ivory">
      {/* Full-bleed renewable feedstock imagery */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <Image src={photos.field.src} alt="" fill sizes="100vw" placeholder="blur" quality={65} className="object-cover object-center opacity-80 saturate-[.8]" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/95 via-forest/70 to-forest-deep" />
        <div className="absolute inset-0 bg-forest/30 mix-blend-multiply" />
        <div className="absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]">
          <BlueprintArt variant="process" id="sustain" />
        </div>
      </div>

      <div className="container-x py-24 sm:py-32 lg:py-44">
        <Reveal>
          <SectionLabel index="05" tone="light">
            {sustainability.label}
          </SectionLabel>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.05} className="lg:col-span-8">
            <h2 id="sustainability-title" className="display text-[clamp(2.6rem,7vw,6.5rem)]">
              {sustainability.headline[0]}
              <br />
              <span className="text-gold">{sustainability.headline[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-ivory/80">{sustainability.body}</p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="group relative hidden lg:col-span-4 lg:block">
            <Media photo="valves" sizes="33vw" className="h-full min-h-[22rem]" imgClassName="grayscale" />
            <div className="pointer-events-none absolute inset-0 bg-forest/45 mix-blend-multiply" aria-hidden />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent" aria-hidden />
            <p className="absolute bottom-5 left-5 right-5 font-display text-lg font-semibold leading-snug">
              Practical infrastructure is where sustainable energy becomes real.
            </p>
          </div>
          <ul className="grid border-t border-ivory/20 lg:col-span-8">
            {sustainability.themes.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 0.08} className="grid gap-3 border-b border-ivory/20 py-8 sm:grid-cols-[8rem_1fr] sm:gap-8">
                <span className="eyebrow pt-1.5 tabular-nums text-sage">Theme 0{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">{t.title}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-ivory/75">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-ivory/60">
          These themes describe our intent. We do not publish emissions or environmental-impact figures without verified data and a stated methodology.
        </p>
        <ContentFlag status={sustainability.status} className="mt-4" />
      </div>
    </section>
  );
}
