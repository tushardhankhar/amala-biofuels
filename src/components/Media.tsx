import Image from "next/image";
import { photos, type PhotoKey } from "@/content/photos";
import { Parallax } from "./fx";
import { ImageReveal } from "./Reveal";

type Props = {
  photo: PhotoKey;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Clip-and-settle reveal on scroll (default on) */
  reveal?: boolean;
  /** "dark" grades daylight photography to sit inside cinematic dark sections */
  tone?: "natural" | "dark";
  /** Scroll-linked drift (default on) */
  parallax?: boolean;
};

/** Responsive photograph (AVIF/WebP via next/image, blurred placeholder, no layout shift). */
export function Media({ photo, sizes, priority, className = "", imgClassName = "", reveal = true, tone = "natural", parallax = true }: Props) {
  const p = photos[photo];
  const position = className.includes("absolute") ? "" : "relative";
  const photo_ = (
    <Image
      src={p.src}
      alt={p.alt}
      fill
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      quality={72}
      className={`object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.035] ${tone === "dark" ? "brightness-[.8] contrast-[1.08] saturate-[.7]" : ""} ${imgClassName}`}
    />
  );
  const img = parallax ? <Parallax amount={8}>{photo_}</Parallax> : photo_;
  return (
    <div className={`${position} overflow-hidden bg-forest-deep ${className}`}>
      {reveal ? <ImageReveal className="absolute inset-0">{img}</ImageReveal> : img}
      {tone === "dark" && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-forest/10 to-charcoal/10 mix-blend-multiply" aria-hidden />
      )}
    </div>
  );
}
