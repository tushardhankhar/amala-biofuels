import Image from "next/image";
import { company } from "@/content/site";

/** Brand mark: hexagonal frame (molecular ring / engineered hardware) enclosing an "A" with a gold flow-line crossbar. */
export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 2.5 35.2 11.25v17.5L20 37.5 4.8 28.75v-17.5Z" fill="none" stroke="currentColor" strokeOpacity=".4" strokeWidth="1.3" />
      <path d="M12.2 29 20 10.5 27.8 29" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="miter" />
      <path d="M12.6 23.6c2.6-2 5.2 1.4 7.4 0s4.8-2 7.4 0" fill="none" stroke="#C8A66A" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** Swap in the approved logo by setting `company.logo` in content/site.ts. */
export function Wordmark({ tone = "light", size = "md" }: { tone?: "light" | "dark"; size?: "md" | "lg" }) {
  if (company.logo) {
    return <Image src={company.logo.src} width={company.logo.width} height={company.logo.height} alt={company.shortName} priority className="h-9 w-auto" />;
  }
  const fg = tone === "light" ? "text-ivory" : "text-charcoal";
  const lg = size === "lg";
  return (
    <span className={`flex items-center ${lg ? "gap-4" : "gap-3"} ${fg}`}>
      <LogoMark className={lg ? "size-14" : "size-9"} />
      <span className="flex flex-col leading-none">
        <span className={`font-display font-bold tracking-[0.06em] ${lg ? "text-[28px]" : "text-[18px]"}`}>AMALA</span>{" "}
        <span className={`mt-1.5 flex items-center gap-2 font-display font-medium uppercase opacity-70 ${lg ? "text-[11px] tracking-[0.42em]" : "text-[8.5px] tracking-[0.38em]"}`}>
          <span className="h-px w-3 bg-gold" aria-hidden />
          Biofuels
        </span>
      </span>
    </span>
  );
}
