import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "gold" | "ghost-light" | "ghost-dark" | "dark";

const styles: Record<Variant, string> = {
  gold: "bg-gold text-charcoal hover:bg-gold-soft",
  dark: "bg-charcoal text-ivory hover:bg-forest",
  "ghost-light": "border border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory/5",
  "ghost-dark": "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal/5",
};

export const buttonClass = (variant: Variant = "gold", extra = "") =>
  `group/btn inline-flex min-h-12 items-center justify-center gap-3 px-6 font-display text-[13px] font-semibold uppercase tracking-[0.12em] transition-[background-color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.97] ${styles[variant]} ${extra}`;

export function ButtonLink({
  href,
  children,
  variant = "gold",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)} onClick={onClick}>
      {children}
      <ArrowUpRight
        className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}

export function SectionLabel({ children, index, tone = "dark" }: { children: ReactNode; index?: string; tone?: "dark" | "light" }) {
  return (
    <div className={`eyebrow flex items-center gap-4 ${tone === "light" ? "text-gold" : "text-forest"}`}>
      {index && <span className="tabular-nums opacity-70">{index}</span>}
      <span className="h-px w-10 bg-current opacity-60" aria-hidden />
      <span>{children}</span>
    </div>
  );
}
