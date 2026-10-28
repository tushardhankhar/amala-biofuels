"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const variants: Record<"up" | "fade" | "mask" | "blur" | "scale", Variants> = {
  up: { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } },
  blur: { hidden: { opacity: 0, y: 28, filter: "blur(10px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } },
  scale: { hidden: { opacity: 0, y: 30, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  mask: { hidden: { clipPath: "inset(0 0 100% 0)" }, show: { clipPath: "inset(0 0 0% 0)" } },
};

type Props = {
  children: ReactNode;
  delay?: number;
  kind?: keyof typeof variants;
  className?: string;
  as?: "div" | "li" | "span";
};

/** Scroll-triggered entrance. Content is fully visible when motion is reduced or JS is off. */
export function Reveal({ children, delay = 0, kind = "up", className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Tag = m[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      data-reveal
      className={className}
      variants={variants[kind]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: kind === "mask" ? 0.9 : kind === "blur" ? 0.9 : 0.7, delay, ease }}
    >
      {children}
    </Tag>
  );
}

/**
 * Image entrance: a solid curtain wipes away while the photo settles from a slight zoom.
 * The image itself is never clipped, so the browser's lazy-loading always sees it.
 */
export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <m.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -10% 0px" }}>
      <m.div
        data-reveal
        className="absolute inset-0"
        variants={{ hidden: { scale: 1.12 }, show: { scale: 1 } }}
        transition={{ duration: 1.4, delay, ease }}
      >
        {children}
      </m.div>
      <m.div
        aria-hidden
        data-curtain
        className="pointer-events-none absolute inset-0 origin-top bg-forest-deep"
        variants={{ hidden: { scaleY: 1 }, show: { scaleY: 0 } }}
        transition={{ duration: 1, delay, ease }}
      />
    </m.div>
  );
}
