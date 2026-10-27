"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { ButtonLink } from "./Button";
import { Wordmark } from "./Wordmark";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [tucked, setTucked] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Tuck the bar away while reading downwards; bring it back on any upward scroll
      if (Math.abs(y - last) > 6) {
        setTucked(y > last && y > 480);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section: the last nav target whose top has passed 40% of the viewport
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let current: string = nav[0].href;
      for (const n of nav) {
        const el = document.querySelector(n.href);
        if (el && el.getBoundingClientRect().top <= line) current = n.href;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Mobile menu: lock scroll, close on Escape, return focus
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      onFocusCapture={() => setTucked(false)}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,translate] duration-500 ease-[var(--ease-out-expo)] ${
        tucked && !open ? "-translate-y-full" : "translate-y-0"
      } ${
        solid ? "border-b border-ivory/10 bg-charcoal/92 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-gold focus:px-4 focus:py-2 focus:text-charcoal">
        Skip to content
      </a>
      <nav aria-label="Primary" className={`container-x flex items-center justify-between transition-[height] duration-500 ${scrolled ? "h-16" : "h-20"}`}>
        <Link href="#home" onClick={() => setOpen(false)}>
          <Wordmark />
          <span className="sr-only"> home</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative px-3.5 py-2 text-[13.5px] font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? "text-ivory" : "text-ivory/60 hover:text-ivory"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3.5 -bottom-px h-px origin-left bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <ButtonLink href="#contact" className="!min-h-10 !px-5">
              Discuss a Project
            </ButtonLink>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 place-items-center text-ivory lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ivory/10 bg-charcoal lg:hidden"
      >
        <ul className="container-x flex flex-col py-6">
          {nav.map((item, i) => (
            <li key={item.href} className="animate-fade-up border-b border-ivory/10" style={{ animationDelay: `${i * 40}ms` }}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active === item.href ? "true" : undefined}
                className="flex items-center justify-between py-5 font-display text-2xl font-semibold tracking-tight text-ivory aria-[current]:text-gold"
              >
                {item.label}
                <span className="eyebrow text-ivory/60">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="container-x pb-10">
          <ButtonLink href="#contact" className="w-full" onClick={() => setOpen(false)}>
            Discuss a Project
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
