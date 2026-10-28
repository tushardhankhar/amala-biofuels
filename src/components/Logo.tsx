import Image from "next/image";
import mark from "@/assets/brand/amala-mark.png";
import wordmark from "@/assets/brand/amala-wordmark.png";
import wordmarkReverse from "@/assets/brand/amala-wordmark-reverse.png";

/**
 * Amala Biofuels logo, cut from the supplied artwork (flame-and-leaf mark + wordmark).
 * "horizontal" sets the original mark beside the original wordmark for headers;
 * "reverse" swaps the wordmark to ivory for dark backgrounds. Artwork is never redrawn.
 */
export function Logo({ tone = "color", size = "md", priority }: { tone?: "color" | "reverse"; size?: "sm" | "md" | "lg"; priority?: boolean }) {
  const h = { sm: "h-9", md: "h-11", lg: "h-14" }[size];
  return (
    <span className={`flex items-center gap-2.5 ${h}`}>
      <Image src={mark} alt="" priority={priority} className="h-full w-auto" sizes="80px" />
      <Image
        src={tone === "reverse" ? wordmarkReverse : wordmark}
        alt="Amala Biofuels"
        priority={priority}
        className="h-[78%] w-auto"
        sizes="200px"
      />
    </span>
  );
}
