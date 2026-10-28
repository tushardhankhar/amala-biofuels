import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Eyebrow } from "@/components/Button";
import { CtaBand, PageHero } from "@/components/blocks";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { industries, industriesIntro, industryCta } from "@/content/site";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Industrial fuel solutions from Amala Biofuels for manufacturing, tea estates and tea processing, hot-mix and asphalt plants, boilers and furnaces, infrastructure and construction.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  const withPhoto = industries.filter((i) => i.photo);
  const other = industries.find((i) => !i.photo);
  return (
    <>
      <PageHero eyebrow="Industries We Serve" title="Industries We Serve" intro={industriesIntro} photo="tea" />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-x space-y-6 sm:space-y-8">
          {withPhoto.map((ind, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={ind.id}
                id={ind.id}
                className="grid overflow-hidden rounded-[2rem] border border-forest/10 bg-white lg:grid-cols-2"
              >
                <Media
                  photo={ind.photo!}
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className={`aspect-[16/10] lg:aspect-auto lg:min-h-[22rem] ${flip ? "lg:order-2" : ""}`}
                />
                <Reveal className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
                  <span className="font-display text-sm font-bold tabular-nums text-flame-deep">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold leading-tight tracking-tight text-forest">{ind.name}</h2>
                  <p className="lede mt-4 text-charcoal/75">{ind.body}</p>
                  <Link
                    href={`/contact?industry=${encodeURIComponent(ind.name)}#quote`}
                    className="group mt-7 inline-flex items-center gap-2 self-start font-display font-bold text-forest"
                  >
                    Discuss your requirements
                    <ArrowRight className="size-4 text-flame transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Link>
                </Reveal>
              </article>
            );
          })}

          {other && (
            <Reveal>
              <article id={other.id} className="rounded-[2rem] bg-cream p-6 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:p-14">
                <div className="max-w-2xl">
                  <Eyebrow>{String(withPhoto.length + 1).padStart(2, "0")}</Eyebrow>
                  <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold leading-tight tracking-tight text-forest">{other.name}</h2>
                  <p className="lede mt-4 text-charcoal/75">{other.body}</p>
                </div>
                <Link
                  href={`/contact?industry=${encodeURIComponent(other.name)}#quote`}
                  className="group mt-7 inline-flex min-h-12 shrink-0 items-center gap-2.5 rounded-full bg-forest px-6 font-display font-bold text-ivory hover:bg-forest-deep lg:mt-0"
                >
                  Tell us about your operation
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </article>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBand headline="Tell us about your application." body={industryCta} />
    </>
  );
}
