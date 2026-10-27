import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing use of the ${company.legalName} website.`,
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <LegalPage title="Terms of Use" updated="">{/* set the approved effective date, e.g. updated="1 January 2027" */}
      <p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Information on this site</h2>
      <p>
        Content on this website is provided for general information about {company.legalName} and its areas of activity. It does not constitute an
        offer, a binding commitment, or technical, financial or investment advice. Services, availability and project scope are confirmed only in
        written agreements.
      </p>
      <h2>Intellectual property</h2>
      <p>The name, wordmark, text and imagery on this site belong to {company.legalName} or its licensors and may not be reused without permission.</p>
      <h2>Third-party links</h2>
      <p>Links to third-party sites, such as LinkedIn, are provided for convenience. We are not responsible for their content.</p>
      <h2>Liability</h2>
      <p>To the extent permitted by law, we are not liable for any loss arising from reliance on the information on this website.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India.</p>
    </LegalPage>
  );
}
