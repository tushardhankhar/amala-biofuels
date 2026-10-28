import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/ContactLinks";
import { ScrollProgress } from "@/components/fx";
import { company, seo } from "@/content/site";
import { siteUrl } from "@/lib/env";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
// Only used by the studio credit in the footer, so it isn't preloaded.
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument-serif", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s | ${company.shortName}` },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: company.shortName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: company.legalName,
    title: seo.title,
    description: seo.description,
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#02462D",
  width: "device-width",
  initialScale: 1,
};

/** Organization structured data: only facts supplied in the company brief; contact details once verified. */
function OrganizationJsonLd() {
  const c = company.contact;
  const verified = c.status === "verified";
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.shortName,
    url: siteUrl,
    logo: `${siteUrl}/brand/amala-logo.png`,
    description: seo.description,
    foundingDate: company.established,
    sameAs: [company.linkedin],
    address: { "@type": "PostalAddress", addressLocality: company.locality, addressRegion: company.region, addressCountry: company.country },
    ...(verified && c.email ? { email: c.email } : {}),
    ...(verified && c.phone ? { telephone: c.phone } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${manrope.variable} ${instrumentSerif.variable}`}>
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}[data-curtain]{display:none!important}`}</style>
        </noscript>
        <OrganizationJsonLd />
        <MotionProvider>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
