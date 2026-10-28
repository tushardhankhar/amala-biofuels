import { showContentFlags } from "@/lib/env";

export function LegalPage({ title, updated, children, template = true }: { title: string; updated: string; children: React.ReactNode; template?: boolean }) {
  return (
    <section className="bg-ivory py-16 sm:py-24">
      <article className="container-x max-w-3xl">
        <p className="eyebrow text-leaf">{template ? "Legal" : "Information"}</p>
        <h1 className="display mt-5 text-[clamp(2.4rem,6vw,3.75rem)] text-forest">{title}</h1>
        {updated && <p className="mt-4 text-sm text-charcoal/60">Last updated: {updated}</p>}
        {template && showContentFlags && (
          <p className="mt-8 rounded-lg border border-dashed border-flame px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-flame-deep">
            Template · must be reviewed by the company&rsquo;s legal adviser before publication
          </p>
        )}
        <div className="mt-12 space-y-6 leading-relaxed text-charcoal/80 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-forest [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </article>
    </section>
  );
}
