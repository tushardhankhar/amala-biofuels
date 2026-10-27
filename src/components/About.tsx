import { about } from "@/content/site";
import { ButtonLink, SectionLabel } from "./Button";
import { ContentFlag } from "./ContentFlag";
import { Media } from "./Media";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-6">
          <Media photo="about" sizes="(min-width:1024px) 50vw, 100vw" className="group aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]" />
          <Reveal delay={0.3} className="absolute -bottom-8 right-4 w-[min(78%,20rem)] bg-charcoal p-6 text-ivory shadow-2xl sm:right-8 lg:-right-10">
            <p className="eyebrow text-[10px] text-gold">Headquartered in</p>
            <p className="mt-2 font-display text-2xl font-semibold tracking-tight">Jorhat, Assam</p>
            <p className="mt-2 text-sm leading-relaxed text-ivory/70">Building renewable fuel infrastructure from North-East India.</p>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center pt-6 lg:col-span-5 lg:col-start-8 lg:pt-0">
          <Reveal>
            <SectionLabel index="01">{about.label}</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="about-title" className="display mt-8 text-[clamp(2.25rem,4.6vw,4rem)] text-charcoal">
              {about.headline[0]} <span className="text-forest">{about.headline[1]}</span>
            </h2>
          </Reveal>
          {about.body.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.05}>
              <p className={`mt-6 leading-relaxed ${i === 0 ? "text-lg text-charcoal/85" : "text-charcoal/70"}`}>{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <dl className="mt-12 grid grid-cols-3 border-y border-charcoal/12">
              {about.facts.map((f, i) => (
                <div key={f.label} className={`py-5 ${i > 0 ? "border-l border-charcoal/12 pl-4 sm:pl-6" : ""}`}>
                  <dt className="eyebrow text-[10px] text-charcoal/60">{f.label}</dt>
                  <dd className="mt-2 font-display text-sm font-semibold leading-snug text-charcoal sm:text-base">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.25} className="mt-10 flex flex-wrap items-center gap-5">
            <ButtonLink href={about.cta.href} variant="dark">
              {about.cta.label}
            </ButtonLink>
            <ContentFlag status={about.status} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
