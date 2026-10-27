import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { company } from "@/content/site";
import { showContentFlags } from "@/lib/env";
import { Footer } from "./Footer";
import { Wordmark } from "./Wordmark";

export function LegalPage({ title, updated, children, template = true }: { title: string; updated: string; children: React.ReactNode; template?: boolean }) {
  return (
    <>
      <header className="bg-charcoal">
        <div className="container-x flex h-20 items-center justify-between">
          <Link href="/">
            <Wordmark />
          <span className="sr-only"> home</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-ivory/70 hover:text-ivory">
            <ArrowLeft className="size-4" aria-hidden /> Back to site
          </Link>
        </div>
      </header>
      <main id="main" className="bg-ivory py-20 sm:py-28">
        <article className="container-x max-w-3xl">
          <p className="eyebrow text-forest">{template ? "Legal" : "Information"}</p>
          <h1 className="display mt-6 text-5xl text-charcoal sm:text-6xl">{title}</h1>
          {updated && <p className="mt-4 text-sm text-charcoal/60">Last updated: {updated}</p>}
          {template && showContentFlags && (
            <p className="mt-8 border border-dashed border-gold px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-[#8a6d35]">
              Template · must be reviewed by the company&rsquo;s legal adviser before publication
            </p>
          )}
          <div className="mt-12 space-y-6 leading-relaxed text-charcoal/75 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-charcoal [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
