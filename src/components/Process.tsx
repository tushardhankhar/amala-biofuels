import { process } from "@/content/site";
import { SectionLabel } from "./Button";
import { ContentFlag } from "./ContentFlag";
import { ProcessTimeline } from "./ProcessTimeline";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <section id="infrastructure" aria-labelledby="process-title" className="bg-ivory-deep py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="03">{process.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="process-title" className="display mt-8 text-[clamp(2.25rem,5vw,4.5rem)] text-charcoal">
                {process.headline}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-sm leading-relaxed text-charcoal/60">{process.disclaimer}</p>
            <ContentFlag status={process.status} className="mt-4" />
          </Reveal>
        </div>

        <ProcessTimeline steps={process.steps} />
      </div>
    </section>
  );
}
