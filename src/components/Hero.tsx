import Image from "next/image";
import { photos } from "@/content/photos";
import { company, hero } from "@/content/site";
import { ButtonLink, Eyebrow } from "./Button";
import { Counter, Parallax } from "./fx";

const facts = [
  { value: <>{company.established}</>, label: "Established" },
  { value: <>{`${company.locality}, ${company.region}`}</>, label: "Manufacturing base" },
  {
    value: (
      <>
        <Counter to={Number(company.capacity.value)} /> {company.capacity.unit}
      </>
    ),
    label: company.capacity.label,
  },
];

/** Thin energy lines flowing across the hero. */
function FlowLines() {
  const paths = [
    "M-40 620 C 240 600 360 470 640 500 S 1040 640 1480 520",
    "M-40 680 C 280 660 420 540 700 570 S 1080 700 1480 600",
  ];
  return (
    <svg className="absolute inset-0 h-full w-full [mask-image:linear-gradient(90deg,transparent_10%,black_55%)]" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {paths.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="#B5C98A" strokeOpacity={0.18 - i * 0.05} strokeWidth="1" />
          <path d={d} fill="none" stroke="#F78330" strokeOpacity={0.55 - i * 0.2} strokeWidth="1.4" strokeLinecap="round" className="dash-flow" style={{ animationDuration: `${2.2 + i}s` }} />
        </g>
      ))}
    </svg>
  );
}

export function Hero() {
  const photo = photos.hero;
  return (
    <section aria-labelledby="hero-title" className="relative isolate z-10 bg-forest-deep text-ivory">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Parallax amount={12}>
        <div className="absolute inset-0 animate-ken-burns">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            placeholder="blur"
            quality={68}
            sizes="100vw"
            className="object-cover object-[70%_center] lg:object-[60%_center]"
          />
        </div>
        </Parallax>
        {/* Dark-green overlay, strongest behind the copy */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-deep/75 to-forest-deep/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-forest-deep/40" />
        <div className="absolute inset-0 bg-forest/30 mix-blend-multiply" />
        <div className="absolute -left-40 top-10 size-[34rem] animate-float rounded-full bg-leaf/20 blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 size-[26rem] animate-float rounded-full bg-flame/15 blur-[130px] [animation-delay:-5s]" />
        <FlowLines />
        <div className="grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>

      <div className="container-x flex flex-col justify-center pb-10 pt-14 sm:min-h-[min(calc(100svh-80px),46rem)] sm:pb-44 lg:min-h-0 lg:pb-36 lg:pt-24">
        <div className="max-w-[62rem]">
          <Eyebrow tone="light" className="animate-fade-up [animation-delay:40ms]">
            {hero.eyebrow}
          </Eyebrow>
          <h1 id="hero-title" className="display mt-6 text-[clamp(2.6rem,7.4vw,5.25rem)] leading-[1]">
            {hero.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span className={`block animate-mask-up ${i === 1 ? "text-flame" : ""}`} style={{ animationDelay: `${60 + i * 90}ms` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className="lede mt-6 max-w-[38rem] animate-fade-up text-ivory/85 [animation-delay:280ms]">{hero.body}</p>
          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:360ms] sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} variant="light" className="relative !min-h-14 overflow-hidden !px-7">
              <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline-light" className="!min-h-14 !px-7">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Company snapshot, overlapping the hero edge */}
      <div className="container-x relative animate-fade-up pb-10 [animation-delay:480ms] sm:absolute sm:inset-x-0 sm:bottom-0 sm:translate-y-1/2 sm:pb-0">
        <dl className="grid grid-cols-1 divide-y divide-forest/10 overflow-hidden rounded-3xl bg-ivory text-charcoal shadow-[0_30px_60px_-30px_rgba(1,49,33,0.55)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col-reverse gap-1 px-6 py-4 sm:gap-1.5 sm:px-7 sm:py-7">
              <dt className="text-[13.5px] leading-snug text-charcoal/70">{f.label}</dt>
              <dd className="font-display text-[22px] font-extrabold tracking-tight text-forest sm:text-[28px]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
