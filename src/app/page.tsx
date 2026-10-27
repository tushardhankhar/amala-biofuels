import { About } from "@/components/About";
import { Capabilities } from "@/components/Capabilities";
import { Enquiry } from "@/components/Enquiry";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Sustainability } from "@/components/Sustainability";
import { Why } from "@/components/Why";
import { company, seo } from "@/content/site";
import { siteUrl } from "@/lib/env";

/** Organization structured data — only fields that are publicly verifiable. */
function OrganizationJsonLd() {
  const c = company.contact;
  const verified = c.status === "verified";
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.shortName,
    url: siteUrl,
    description: seo.description,
    sameAs: [company.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: company.locality,
      addressRegion: company.region,
      addressCountry: company.country,
      ...(verified && c.address ? { streetAddress: c.address } : {}),
    },
    ...(verified && c.email ? { email: c.email } : {}),
    ...(verified && c.phone ? { telephone: c.phone } : {}),
    ...(company.logo ? { logo: `${siteUrl}${company.logo.src}` } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Capabilities />
        <Process />
        <Why />
        <Sustainability />
        <Projects />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}
