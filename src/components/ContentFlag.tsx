import type { ContentStatus } from "@/content/site";
import { showContentFlags } from "@/lib/env";

const copy: Record<Exclude<ContentStatus, "verified">, string> = {
  draft: "Draft copy · awaiting company approval",
  missing: "Missing · needs verified information",
};

/** Review-only marker. Renders nothing in production unless NEXT_PUBLIC_SHOW_CONTENT_FLAGS=true. */
export function ContentFlag({ status, className = "" }: { status: ContentStatus; className?: string }) {
  if (!showContentFlags || status === "verified") return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 border border-dashed border-gold/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gold ${className}`}
    >
      <span className="size-1.5 rounded-full bg-gold" aria-hidden />
      {copy[status]}
    </span>
  );
}
