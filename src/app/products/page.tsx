import type { Metadata } from "next";
import { Info } from "lucide-react";
import { ButtonLink, Eyebrow } from "@/components/Button";
import { CtaBand, PageHero, ProductCard } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { products, productsIntro, productsNote } from "@/content/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Biodiesel, diesel-range products, light diesel oil (LDO), light and heavy hydrocarbon fractions, furnace oil and specialty fuel solutions from Amala Biofuels, Jorhat, Assam.",
  alternates: { canonical: "/products" },
};

const enquiryFields = [
  "Product of interest",
  "Intended application and equipment type",
  "Required quantity and estimated monthly consumption",
  "Delivery location",
  "Required specification or existing fuel sample/report (optional)",
];

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Products" title="Industrial Fuel Products" intro={productsIntro[0]} photo="storage">
        <ButtonLink href="/contact#quote" variant="light">
          Request a Quote
        </ButtonLink>
      </PageHero>

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>Product categories</Eyebrow>
              <h2 className="h2 mt-5 text-forest">Matched to the application, not the other way round.</h2>
            </div>
            <p className="lede text-charcoal/75 lg:col-span-5 lg:self-end">{productsIntro[1]}</p>
          </Reveal>

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal as="li" key={p.id} delay={(i % 3) * 0.05}>
                <ProductCard product={p} index={i} detailed />
              </Reveal>
            ))}
            <Reveal as="li" delay={0.1} className="lg:col-span-2">
              <div className="flex h-full flex-col justify-between gap-8 rounded-3xl bg-forest p-6 text-ivory sm:p-8">
                <div>
                  <p className="eyebrow text-[11px] text-leaf-soft">Product enquiries</p>
                  <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight">Help us recommend the right product</h3>
                  <p className="mt-3 text-ivory/75">An enquiry with these details lets our team respond with relevant information:</p>
                  <ul className="mt-5 grid gap-x-6 gap-y-2.5 text-[15px] lg:grid-cols-2">
                    {enquiryFields.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-flame" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ButtonLink href="/contact#quote" variant="light">
                    Request a Quote
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </ul>

          <Reveal className="mt-10 flex gap-3 rounded-2xl border border-forest/15 bg-ivory px-5 py-4 text-sm leading-relaxed text-charcoal/75">
            <Info className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden />
            <p>{productsNote}</p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
