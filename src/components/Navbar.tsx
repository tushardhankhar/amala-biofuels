"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { company, nav, quoteCta } from "@/content/site";
import { ButtonLink } from "./Button";
import { telHref } from "./ContactLinks";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

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

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 bg-ivory/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled || open ? "shadow-[0_1px_0_rgba(2,70,45,0.08),0_12px_32px_-18px_rgba(2,70,45,0.35)]" : ""
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-ivory">
        Skip to content
      </a>
      <nav aria-label="Primary" className={`container-x flex items-center justify-between gap-6 transition-[height] duration-300 ${scrolled ? "h-[68px]" : "h-20"}`}>
        <Link href="/" className="shrink-0">
          <Logo size={scrolled ? "sm" : "md"} priority />
          <span className="sr-only"> home</span>
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative block rounded-full px-3.5 py-2 text-[14.5px] font-semibold transition-colors duration-300 ${
                    active ? "text-forest" : "text-charcoal/70 hover:bg-forest/[0.05] hover:text-forest"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-flame transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {telHref && (
            <a href={telHref} className="hidden size-11 place-items-center rounded-full text-forest hover:bg-forest/5 md:grid">
              <Phone className="size-[18px]" aria-hidden />
              <span className="sr-only">Call {company.shortName}</span>
            </a>
          )}
          <span className="hidden sm:block">
            <ButtonLink href={quoteCta.href} className="!min-h-11 !px-5">
              {quoteCta.label}
            </ButtonLink>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 place-items-center rounded-full text-forest hover:bg-forest/5 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-68px)] overflow-y-auto border-t border-forest/10 bg-ivory xl:hidden">
        <ul className="container-x flex flex-col py-4">
          {nav.map((item, i) => (
            <li key={item.href} className="animate-fade-up border-b border-forest/10" style={{ animationDelay: `${i * 35}ms` }}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex items-center justify-between py-4 font-display text-[22px] font-bold tracking-tight text-charcoal aria-[current=page]:text-forest"
              >
                {item.label}
                <span className={`size-2 rotate-45 rounded-[2px] ${isActive(item.href) ? "bg-flame" : "bg-forest/15"}`} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <div className="container-x flex flex-col gap-3 pb-10">
          <ButtonLink href={quoteCta.href} className="w-full" onClick={() => setOpen(false)}>
            {quoteCta.label}
          </ButtonLink>
          {telHref && (
            <a href={telHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-forest/25 font-display font-bold text-forest">
              <Phone className="size-4" aria-hidden /> Call us
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
