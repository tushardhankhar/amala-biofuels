import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { photos } from "@/content/photos";
import { capabilities, company, hero } from "@/content/site";
import { BlueprintArt } from "./BlueprintArt";
import { ButtonLink } from "./Button";
import { ContentFlag } from "./ContentFlag";

/**
 * Optional approved hero video. Keep it short (8–12 s), muted and under ~2 MB.
 * The photograph stays as the poster so the first paint is instant.
 */
const heroVideo: string | null = null; // e.g. "/media/hero-loop.mp4"

function FlowLines() {
  const paths = [
    "M-20 690 C 260 690 320 520 600 520 S 900 610 1080 470 S 1340 350 1500 380",
    "M-20 750 C 300 750 380 590 660 590 S 980 690 1180 550 S 1380 470 1500 490",
  ];
  return (
    <svg
      className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_right,transparent_15%,black_65%)]"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} pathLength={1} className="flow-path" fill="none" stroke="#C8A66A" strokeOpacity={0.4 - i * 0.12} strokeWidth="1" style={{ animationDelay: `${0.5 + i * 0.25}s` }} />
          <path d={d} pathLength={1} className="flow-pulse" fill="none" stroke="#DCC394" strokeWidth="1.6" strokeLinecap="round" style={{ animationDelay: `${2.6 + i * 2}s` }} />
        </g>
      ))}
    </svg>
  );
}

export function Hero() {
  const photo = photos.hero;
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-charcoal text-ivory">
      {/* Photography */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-ken-burns">
          {heroVideo ? (
            <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="none" poster={photo.src.src} aria-hidden>
              <source src={heroVideo} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              placeholder="blur"
              quality={70}
              sizes="100vw"
              className="object-cover object-[68%_center] brightness-110 lg:object-[55%_center]"
            />
          )}
        </div>
        {/* Legibility: strong on the text side, cinematic falloff elsewhere */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-charcoal/5 lg:from-charcoal/90 lg:via-charcoal/45 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/5 to-charcoal/55" />
        <div className="absolute inset-0 bg-forest/20 mix-blend-multiply" />
        {/* Technical line art — barely there */}
        <div className="absolute inset-0 opacity-[0.12] [mask-image:linear-gradient(to_left,black,transparent_70%)]">
          <BlueprintArt variant="facility" id="hero" />
        </div>
        <FlowLines />
        <div className="grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>

      <div className="container-x flex flex-1 flex-col justify-end pb-12 pt-28 sm:pb-16 lg:justify-center lg:pb-8 lg:pt-28">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-9 xl:col-span-8">
            <p className="eyebrow flex animate-fade-up items-center gap-3 text-gold" style={{ animationDelay: "40ms" }}>
              <span className="h-px w-8 bg-gold" aria-hidden />
              <span>
                {company.legalName}
                <span className="hidden sm:inline"> · Renewable Energy</span>
              </span>
            </p>
            <h1 id="hero-title" className="display mt-7 text-[clamp(2.25rem,10.8vw,4.25rem)] leading-[0.95] sm:text-[clamp(4.25rem,9vw,6.5rem)] xl:text-[6.9rem]">
              {hero.headline.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.07em]">
                  <span className="block animate-mask-up" style={{ animationDelay: `${40 + i * 80}ms` }}>
                    {i === hero.headline.length - 1 ? <span className="text-gold">{line}</span> : line}
                  </span>
                </span>
              ))}
            </h1>
            <p className="mt-7 max-w-[34rem] animate-fade-up text-[17px] leading-relaxed text-ivory/80 sm:text-lg" style={{ animationDelay: "300ms" }}>
              {hero.body}
            </p>
            <div className="mt-10 flex animate-fade-up flex-col gap-4 sm:flex-row sm:items-center sm:gap-8" style={{ animationDelay: "380ms" }}>
              <ButtonLink href={hero.primaryCta.href} className="!min-h-14 !px-8 shadow-[0_10px_40px_-12px_rgba(200,166,106,0.6)]">
                {hero.primaryCta.label}
              </ButtonLink>
              <Link
                href={hero.secondaryCta.href}
                className="group inline-flex min-h-12 items-center gap-3 font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-ivory"
              >
                <span className="relative">
                  {hero.secondaryCta.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-0" />
                </span>
                <ArrowUpRight className="size-4 text-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
            <ContentFlag status={hero.status} className="mt-8" />
          </div>
        </div>
      </div>

      {/* Capability index rail */}
      <div className="container-x relative animate-fade-up" style={{ animationDelay: "520ms" }}>
        <nav aria-label="Capabilities overview" className="hidden grid-cols-3 border-t border-ivory/15 md:grid">
          {capabilities.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`group relative flex items-start justify-between gap-6 py-6 pr-6 transition-colors duration-300 hover:bg-ivory/[0.03] ${i > 0 ? "border-l border-ivory/15 pl-6" : ""}`}
            >
              <span className="absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" aria-hidden />
              <span>
                <span className="eyebrow tabular-nums text-gold">{c.index}</span>
                <span className="mt-2 block font-display text-[15px] font-semibold tracking-tight lg:text-base">{c.label}</span>
              </span>
              <ArrowUpRight className="mt-1 size-4 shrink-0 text-ivory/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" aria-hidden />
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-between border-t border-ivory/15 py-5 text-ivory/60 md:hidden">
          <span className="eyebrow">Jorhat · Assam</span>
          <a href="#about" className="flex items-center gap-3" aria-label="Scroll to About section">
            <span className="eyebrow">Scroll</span>
            <span className="relative block h-8 w-px overflow-hidden bg-ivory/20">
              <span className="absolute inset-0 animate-scroll-cue bg-gold" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
