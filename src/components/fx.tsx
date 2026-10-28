"use client";

import { animate, m, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Thin flame-coloured reading-progress bar under the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <m.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-leaf via-flame to-flame" />;
}

/** Scroll-linked vertical drift for a photo layer. The wrapper oversizes the child so edges never show. */
export function Parallax({ children, amount = 10, className = "" }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Translate is relative to the oversized layer, so scale it back to stay within the overscan
  const k = (amount / (1 + (2 * amount) / 100)) * 0.9;
  const y = useTransform(scrollYProgress, [0, 1], [`-${k}%`, `${k}%`]);
  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <m.div style={{ top: `-${amount}%`, bottom: `-${amount}%`, ...(reduce ? {} : { y }) }} className="absolute inset-x-0">
        {children}
      </m.div>
    </div>
  );
}

/** Card with a soft highlight that follows the pointer. */
export function Spotlight({ children, className = "", tone = "light" }: { children: ReactNode; className?: string; tone?: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className={`group/spot relative isolate h-full ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            tone === "dark"
              ? "radial-gradient(420px circle at var(--x) var(--y), rgba(247,131,48,0.16), transparent 60%)"
              : "radial-gradient(420px circle at var(--x) var(--y), rgba(117,141,45,0.13), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}

/** Counts up to a number when scrolled into view. Renders the final value on the server. */
export function Counter({ to, duration = 1.6, className }: { to: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);
  const started = useRef(false);
  useEffect(() => {
    if (reduce || started.current) return;
    if (!inView) {
      setValue(0);
      return;
    }
    started.current = true;
    const controls = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);
  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {value}
    </span>
  );
}

/** Animated feedstock → processing → products flow line (desktop horizontal, mobile vertical). */
export function FlowLine({ vertical = false }: { vertical?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const d = vertical ? "M12 0 V100" : "M0 12 H100";
  return (
    <svg ref={ref} viewBox={vertical ? "0 0 24 100" : "0 0 100 24"} preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-hidden>
      <path d={d} stroke="currentColor" strokeOpacity=".18" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
      <m.path
        d={d}
        stroke="url(#flowgrad)"
        strokeWidth="2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <defs>
        <linearGradient id="flowgrad" x1="0" y1="0" x2={vertical ? "0" : "1"} y2={vertical ? "1" : "0"}>
          <stop offset="0" stopColor="#B5C98A" />
          <stop offset="1" stopColor="#F78330" />
        </linearGradient>
      </defs>
    </svg>
  );
}
