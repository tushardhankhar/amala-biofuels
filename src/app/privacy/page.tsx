import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${company.legalName} collects and uses information submitted through this website.`,
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="">{/* set the approved effective date, e.g. updated="1 January 2027" */}
      <p>
        This policy explains how {company.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal data submitted through this website,
        in line with India&rsquo;s Digital Personal Data Protection Act, 2023 and other applicable law.
      </p>
      <h2>Information we collect</h2>
      <p>When you submit a business enquiry we collect the details you provide: name, company, business email, phone number, enquiry type, project location, requirement or scope, and your message.</p>
      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry and discuss potential business with you.</li>
        <li>To keep a record of business correspondence.</li>
        <li>To protect this website against spam and misuse.</li>
      </ul>
      <p>We do not sell your personal data. We do not use enquiry details for unrelated marketing without your consent.</p>
      <h2>Service providers</h2>
      <p>Enquiries are delivered using an email delivery provider and may be stored in our business email and CRM systems. These providers process data on our behalf.</p>
      <h2>Retention</h2>
      <p>We keep enquiry information only for as long as needed for the purposes above, or as required by law.</p>
      <h2>Your rights</h2>
      <p>You may request access to, correction of, or erasure of your personal data, or withdraw consent, by contacting us using the details on our website.</p>
      <h2>Contact</h2>
      <p>
        {company.legalName}, {company.locality}, {company.region}, India.
        {company.contact.email ? ` Email: ${company.contact.email}.` : ""}
      </p>
    </LegalPage>
  );
}
