"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

type Step = { n: string; title: string; body: string };
const ease = [0.16, 1, 0.3, 1] as const;

export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const show = inView || reduce;

  return (
    <ol ref={ref} className="relative mt-20 grid gap-0 md:grid-cols-4 md:gap-8">
      {/* Connecting line — horizontal on desktop, vertical on mobile */}
      <span aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-charcoal/10 md:inset-x-0 md:top-[7px] md:bottom-auto md:h-px md:w-auto" />
      <m.span
        aria-hidden
        data-reveal
        className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-forest md:hidden"
        initial={{ scaleY: 0 }}
        animate={show ? { scaleY: 1 } : undefined}
        transition={{ duration: 1.6, ease }}
      />
      <m.span
        aria-hidden
        data-reveal
        className="absolute inset-x-0 top-[7px] hidden h-px origin-left bg-forest md:block"
        initial={{ scaleX: 0 }}
        animate={show ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.6, ease }}
      />

      {steps.map((s, i) => (
        <m.li
          key={s.n}
          data-reveal
          className="relative pb-12 pl-12 md:pb-0 md:pl-0 md:pt-14"
          initial={{ opacity: 0, y: 18 }}
          animate={show ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.25 + i * 0.28, ease }}
        >
          <span aria-hidden className="absolute left-0 top-0.5 grid size-[15px] place-items-center border border-forest bg-ivory-deep md:top-0">
            <span className="size-[5px] bg-forest" />
          </span>
          <span className="display block text-5xl text-forest/20 tabular-nums lg:text-6xl">{s.n}</span>
          <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-charcoal">{s.title}</h3>
          <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-charcoal/65">{s.body}</p>
        </m.li>
      ))}
    </ol>
  );
}
