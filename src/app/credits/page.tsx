import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { photos, type Photo } from "@/content/photos";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Image Credits",
  description: `Photography credits and licences for the ${company.legalName} website.`,
  alternates: { canonical: "/credits" },
};

export default function Credits() {
  const credited: Photo[] = Object.values(photos).filter((p) => p.credit);
  return (
    <LegalPage title="Image Credits" updated={new Date().toISOString().slice(0, 10)} template={false}>
      <p>
        Photographs on this website are openly licensed images used as representative imagery. They do not depict the{" "}
        {company.legalName} facility, products, staff or customers.
      </p>
      <ul className="!list-none !pl-0 divide-y divide-forest/10 border-y border-forest/10">
        {credited.map((p) => (
          <li key={p.credit!.source} className="py-5">
            <p className="font-display font-bold text-forest">{p.credit!.title}</p>
            <p className="mt-1 text-sm">
              {p.credit!.author} ·{" "}
              {p.credit!.licenseUrl ? (
                <a href={p.credit!.licenseUrl} className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                  {p.credit!.license}
                </a>
              ) : (
                p.credit!.license
              )}{" "}
              ·{" "}
              <a href={p.credit!.source} className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                Source
              </a>
              {p.credit!.license.startsWith("CC") && " · cropped and colour-graded"}
            </p>
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}
