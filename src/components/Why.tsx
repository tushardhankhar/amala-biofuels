import { Factory, Handshake, Network, ShieldCheck } from "lucide-react";
import { why } from "@/content/site";
import { SectionLabel } from "./Button";
import { ContentFlag } from "./ContentFlag";
import { Reveal } from "./Reveal";

const icons = { factory: Factory, handshake: Handshake, network: Network, shield: ShieldCheck };

export function Why() {
  return (
    <section aria-labelledby="why-title" className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionLabel index="04">{why.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="why-title" className="display mt-8 text-[clamp(2.1rem,4.2vw,3.6rem)] text-charcoal">
                {why.headline[0]} <span className="text-forest">{why.headline[1]}</span>
              </h2>
            </Reveal>
            <figure className="mt-12 hidden border-l-2 border-gold pl-6 lg:block">
              <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight text-charcoal">
                Fuel is only as dependable as the infrastructure that moves it.
              </blockquote>
              <figcaption className="eyebrow mt-5 text-[10px] text-charcoal/60">Our operating principle</figcaption>
            </figure>
            <ContentFlag status={why.status} className="mt-6" />
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {why.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.title} delay={i * 0.04} className="group grid grid-cols-[auto_1fr] gap-x-6 border-t border-charcoal/12 py-10 last:border-b sm:gap-x-10">
                <span className="eyebrow pt-2 tabular-nums text-charcoal/55">0{i + 1}</span>
                <div>
                  <Icon className="size-6 text-forest transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5" strokeWidth={1.4} aria-hidden />
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-charcoal sm:text-[1.7rem]">{item.title}</h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-charcoal/65">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
