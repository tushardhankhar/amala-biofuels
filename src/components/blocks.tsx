import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ClipboardCheck,
  Droplet,
  Factory,
  Flame,
  FlaskConical,
  Fuel,
  Gauge,
  Handshake,
  Layers2,
  Layers3,
  MapPinned,
  Microscope,
  Target,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { photos, type PhotoKey } from "@/content/photos";
import { finalCta, quoteCta, type Industry, type Product, type WhyItem } from "@/content/site";
import { ButtonLink, Eyebrow } from "./Button";
import { Parallax, Spotlight } from "./fx";
import { whatsappHref, WhatsAppIcon } from "./ContactLinks";
import { Media } from "./Media";
import { Reveal } from "./Reveal";

export const icons: Record<Product["icon"] | WhyItem["icon"] | "microscope" | "clipboard", LucideIcon> = {
  droplet: Droplet,
  fuel: Fuel,
  flame: Flame,
  layers: Layers2,
  "layers-heavy": Layers3,
  factory: Factory,
  flask: FlaskConical,
  target: Target,
  gauge: Gauge,
  handshake: Handshake,
  map: MapPinned,
  microscope: Microscope,
  clipboard: ClipboardCheck,
};

export function IconBadge({ icon, tone = "light" }: { icon: keyof typeof icons; tone?: "light" | "dark" }) {
  const Icon = icons[icon];
  return (
    <span
      className={`relative grid size-12 shrink-0 place-items-center rounded-2xl transition-[transform,background-color,color] duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110 group-hover/spot:-rotate-6 group-hover/spot:scale-110 ${
        tone === "dark" ? "bg-ivory/10 text-ivory group-hover/spot:bg-flame group-hover/spot:text-forest-ink" : "bg-forest/[0.07] text-forest group-hover:bg-forest group-hover:text-ivory group-hover/spot:bg-forest group-hover/spot:text-ivory"
      }`}
    >
      <Icon className="size-[22px]" strokeWidth={1.75} aria-hidden />
      <span className="absolute -right-0.5 -top-0.5 size-2.5 animate-pulse-dot rounded-full bg-flame" aria-hidden />
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "split";
  action?: ReactNode;
}) {
  const light = tone === "light";
  if (align === "split") {
    return (
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <Reveal kind="blur" className="lg:col-span-7">
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          <h2 className={`h2 mt-5 ${light ? "text-ivory" : "text-forest"}`}>{title}</h2>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5">
          {intro && <p className={`lede ${light ? "text-ivory/75" : "text-charcoal/75"}`}>{intro}</p>}
          {action && <div className="mt-6">{action}</div>}
        </Reveal>
      </div>
    );
  }
  return (
    <Reveal kind="blur" className="max-w-3xl">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className={`h2 mt-5 ${light ? "text-ivory" : "text-forest"}`}>{title}</h2>
      {intro && <p className={`lede mt-5 ${light ? "text-ivory/75" : "text-charcoal/75"}`}>{intro}</p>}
      {action && <div className="mt-7">{action}</div>}
    </Reveal>
  );
}

/** Inner-page header: photo with dark-green overlay, breadcrumb, title and intro. */
export function PageHero({ eyebrow, title, intro, photo, children }: { eyebrow: string; title: string; intro: string; photo: PhotoKey; children?: ReactNode }) {
  const p = photos[photo];
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-ivory">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Parallax amount={12}>
          <Image src={p.src} alt="" fill priority placeholder="blur" sizes="100vw" quality={65} className="animate-ken-burns object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-forest-deep/40" />
        <div className="absolute inset-0 bg-forest/30 mix-blend-multiply" />
        <div className="absolute -left-40 -top-20 size-[30rem] animate-float rounded-full bg-leaf/20 blur-[120px]" />
      </div>
      <Contours className="opacity-70 [mask-image:linear-gradient(90deg,transparent,black_60%)]" />
      <div className="container-x pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <nav aria-label="Breadcrumb" className="animate-fade-up">
          <ol className="flex items-center gap-1.5 text-[13px] text-ivory/65">
            <li>
              <Link href="/" className="hover:text-ivory">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="text-ivory">
              {title}
            </li>
          </ol>
        </nav>
        <Eyebrow tone="light" className="mt-8 animate-fade-up [animation-delay:60ms]">
          {eyebrow}
        </Eyebrow>
        <h1 className="display mt-5 max-w-4xl text-[clamp(2.4rem,6vw,4.5rem)]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="block animate-mask-up [animation-delay:80ms]">{title}</span>
          </span>
        </h1>
        <p className="lede mt-6 max-w-2xl animate-fade-up text-ivory/80 [animation-delay:200ms]">{intro}</p>
        {children && <div className="mt-9 animate-fade-up [animation-delay:280ms]">{children}</div>}
      </div>
    </section>
  );
}

export function ProductCard({ product, index, detailed = false }: { product: Product; index: number; detailed?: boolean }) {
  return (
    <Spotlight className="rounded-3xl">
    <article
      id={detailed ? product.id : undefined}
      className="group relative flex h-full flex-col rounded-3xl border border-forest/10 bg-white p-6 transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-forest/25 hover:shadow-[0_24px_48px_-28px_rgba(2,70,45,0.45)] sm:p-7"
    >
      <div className="flex items-start justify-between">
        <IconBadge icon={product.icon} />
        <span className="font-display text-sm font-bold tabular-nums text-forest/30">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight text-forest">{product.name}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-charcoal/75">{detailed ? product.body : product.short}</p>
      {detailed ? (
        <div className="mt-6 space-y-4">
          <p className="rounded-2xl bg-cream/70 px-4 py-3 text-[13px] leading-snug text-charcoal/75">
            <span className="font-semibold text-forest">Specifications:</span> shared on request once confirmed for your application.
          </p>
          <ButtonLink href={`/contact?product=${encodeURIComponent(product.name)}#quote`} variant="outline-dark" className="w-full !min-h-11">
            Enquire now<span className="sr-only"> about {product.name}</span>
          </ButtonLink>
        </div>
      ) : (
        <Link
          href={`/products#${product.id}`}
          className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold text-forest after:absolute after:inset-0 after:rounded-3xl"
        >
          View details
          <ArrowRight className="size-4 text-flame transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </Link>
      )}
    </article>
    </Spotlight>
  );
}

export function IndustryTile({ industry, index }: { industry: Industry; index: number }) {
  const href = `/contact?industry=${encodeURIComponent(industry.name)}#quote`;
  return (
    <Link
      href={href}
      className="group relative isolate flex min-h-[19rem] flex-col justify-end overflow-hidden rounded-3xl bg-forest p-6 text-ivory sm:p-7"
    >
      {industry.photo ? (
        <>
          <Media photo={industry.photo} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="!absolute inset-0 -z-10" reveal={false} />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-ink via-forest-ink/70 to-forest-ink/10 transition-opacity duration-500 group-hover:opacity-90" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_10%,rgba(247,131,48,0.25),transparent_55%)]" />
      )}
      <span className="absolute right-6 top-6 grid size-11 place-items-center rounded-full border border-ivory/25 bg-forest-ink/30 backdrop-blur transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-[-45deg] group-hover:border-flame group-hover:bg-flame group-hover:text-forest-ink">
        <ArrowRight className="size-4" aria-hidden />
      </span>
      <span className="font-display text-sm font-bold tabular-nums text-ivory/60">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-2 font-display text-[22px] font-extrabold leading-tight tracking-tight">{industry.name}</h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ivory/80">{industry.body}</p>
      <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold text-ivory">
        Discuss this application
        <ArrowRight className="size-4 text-flame transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}

export function WhyCard({ item, tone = "light" }: { item: WhyItem; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <Spotlight tone={tone} className="rounded-3xl">
    <div
      className={`h-full rounded-3xl p-6 transition-[transform,box-shadow,background-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 sm:p-7 ${
        dark ? "bg-ivory/[0.06] ring-1 ring-ivory/10 hover:bg-ivory/[0.09]" : "border border-forest/10 bg-white hover:shadow-[0_24px_48px_-28px_rgba(2,70,45,0.45)]"
      }`}
    >
      <IconBadge icon={item.icon} tone={tone} />
      <h3 className={`mt-6 font-display text-[19px] font-extrabold leading-snug tracking-tight ${dark ? "text-ivory" : "text-forest"}`}>{item.title}</h3>
      <p className={`mt-3 text-[15px] leading-relaxed ${dark ? "text-ivory/75" : "text-charcoal/75"}`}>{item.body}</p>
    </div>
    </Spotlight>
  );
}

export function CtaBand({ headline = finalCta.headline, body = finalCta.body }: { headline?: string; body?: string }) {
  const wa = whatsappHref();
  return (
    <section className="bg-ivory py-16 sm:py-24">
      <div className="container-x">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-forest px-6 py-12 text-ivory sm:px-12 sm:py-16 lg:px-16">
          <div className="absolute -right-24 -top-24 -z-10 size-80 animate-float rounded-full bg-flame/25 blur-3xl" aria-hidden />
          <div className="absolute -bottom-32 left-1/3 -z-10 size-96 animate-float rounded-full bg-leaf/30 blur-3xl [animation-delay:-7s]" aria-hidden />
          <Contours />
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.08] tracking-tight">{headline}</h2>
              <p className="lede mt-4 max-w-xl text-ivory/80">{body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
              <ButtonLink href={quoteCta.href} variant="light">
                {quoteCta.label}
              </ButtonLink>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-ivory/40 px-6 font-display font-bold hover:border-ivory"
                >
                  <WhatsAppIcon /> Enquire on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <ButtonLink href="/products" variant="outline-light">
                  Explore Our Products
                </ButtonLink>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Topographic contour lines that drift slowly sideways. Decorative only. */
export function Contours({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const lines = Array.from({ length: 9 }, (_, i) => {
    const y = 40 + i * 46;
    const a = 18 + (i % 3) * 8;
    return `M0 ${y} C 150 ${y - a}, 250 ${y + a}, 400 ${y} S 650 ${y - a}, 800 ${y} S 1050 ${y + a}, 1200 ${y} S 1450 ${y - a}, 1600 ${y}`;
  });
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <svg viewBox="0 0 1600 460" preserveAspectRatio="none" className="absolute inset-y-0 left-0 h-full w-[200%] animate-drift">
        {lines.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={tone === "light" ? "#B5C98A" : "#02462D"} strokeOpacity={tone === "light" ? 0.12 : 0.08} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
    </div>
  );
}

/** Slow-moving soft colour glows for dark sections. */
export function Orbs({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div className="absolute -left-32 top-1/4 size-[28rem] animate-float rounded-full bg-leaf/25 blur-[120px]" />
      <div className="absolute -right-24 bottom-0 size-[24rem] animate-float rounded-full bg-flame/15 blur-[120px] [animation-delay:-6s]" />
    </div>
  );
}

/** Continuous ticker of product names. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap px-6 font-display text-[clamp(1.25rem,2.4vw,2rem)] font-extrabold tracking-tight sm:px-10">
          {t}
          <span className="ml-12 size-2.5 rotate-45 rounded-[2px] bg-flame sm:ml-20" aria-hidden />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group relative overflow-hidden bg-forest py-6 text-ivory sm:py-8 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
