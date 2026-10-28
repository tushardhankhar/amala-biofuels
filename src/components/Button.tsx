import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "light" | "outline-light" | "outline-dark" | "flame";

const styles: Record<Variant, string> = {
  primary: "bg-forest text-ivory hover:bg-forest-deep",
  light: "bg-ivory text-forest hover:bg-white",
  flame: "bg-flame text-forest-ink hover:bg-[#ff9447]",
  "outline-light": "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/10",
  "outline-dark": "border border-forest/25 text-forest hover:border-forest hover:bg-forest/5",
};

export const buttonClass = (variant: Variant = "primary", extra = "") =>
  `group/btn inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 font-display text-[15px] font-bold tracking-[-0.005em] transition-[background-color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.97] ${styles[variant]} ${extra}`;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = true,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)} onClick={onClick}>
      {children}
      {arrow && (
        <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0.5" aria-hidden />
      )}
    </Link>
  );
}

export function Eyebrow({ children, tone = "dark", className = "" }: { children: ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === "light" ? "text-leaf-soft" : "text-leaf"} ${className}`}>
      <span className="size-2 rotate-45 rounded-[2px] bg-flame" aria-hidden />
      {children}
    </p>
  );
}

export function TextLink({ href, children, tone = "dark" }: { href: string; children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-display text-[15px] font-bold ${tone === "light" ? "text-ivory" : "text-forest"}`}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[var(--ease-out-expo)] group-hover:bg-[length:0%_1.5px]">
        {children}
      </span>
      <ArrowRight className="size-4 text-flame transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}
