import type { Metadata } from "next";
import { CtaBand, IconBadge, PageHero } from "@/components/blocks";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { company, why } from "@/content/site";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description:
    "Manufacturing and processing expertise, in-house R&D, application-focused product development and a Northeast India base: why industrial buyers work with Amala Biofuels.",
  alternates: { canonical: "/why-choose-us" },
};

export default function WhyPage() {
  const [lead, ...rest] = why;
  return (
    <>
      <PageHero
        eyebrow="Why Choose Us"
        title="Why Choose Amala Biofuels"
        intro="Manufacturing experience, in-house research and an application-first approach, from a regional base in Jorhat, Assam."
        photo="process"
      />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-x">
          <div className="grid gap-4 lg:grid-cols-12">
            <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-forest p-7 text-ivory sm:p-10 lg:col-span-7">
              <IconBadge icon={lead.icon} tone="dark" />
              <h2 className="mt-8 max-w-lg font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-extrabold leading-[1.1] tracking-tight">{lead.title}</h2>
              <p className="lede mt-5 max-w-xl text-ivory/80">{lead.body}</p>
              <div className="absolute -bottom-24 -right-24 -z-10 size-72 rounded-full bg-flame/20 blur-3xl" aria-hidden />
            </Reveal>
            <Media photo="lab" sizes="(min-width:1024px) 40vw, 100vw" className="aspect-[4/3] rounded-[2rem] lg:col-span-5 lg:aspect-auto" />
          </div>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item, i) => (
              <Reveal as="li" key={item.id} delay={(i % 3) * 0.06}>
                <div className={`h-full rounded-3xl p-6 sm:p-7 ${item.id === "capacity" ? "bg-cream" : "border border-forest/10 bg-white"}`}>
                  <IconBadge icon={item.icon} />
                  <h2 className="mt-6 font-display text-xl font-extrabold leading-snug tracking-tight text-forest">{item.title}</h2>
                  {item.id === "capacity" ? (
                    <>
                      <p className="mt-4 font-display text-5xl font-extrabold tracking-tight text-forest">
                        {company.capacity.value}
                        <span className="ml-2 text-lg text-forest/70">tonnes per day</span>
                      </p>
                      <p className="mt-2 text-[15px] text-charcoal/75">{company.capacity.label}.</p>
                    </>
                  ) : (
                    <p className="mt-3 text-[15px] leading-relaxed text-charcoal/75">{item.body}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
