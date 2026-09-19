import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: `How ${site.legalName} collects, uses and protects personal data in line with the Data Protection Act, 2019.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy notice" crumbs={[{ name: "Privacy notice", path: "/privacy" }]} />
      <section className="bg-ivory">
        <div className="container-x prose-legal max-w-[820px] py-20">
          <p>
            {site.legalName} (“we”) is committed to protecting your personal data in accordance with the Data Protection Act, 2019 and its
            regulations. This notice explains how we handle information submitted through this website.
          </p>
          <h2>What we collect</h2>
          <p>
            When you send an enquiry we collect your name, email address, phone number, the area of law concerned, your preferred contact
            method and the summary you provide. When you subscribe to updates we collect your email address.
          </p>
          <h2>Why we use it</h2>
          <p>
            We use this information to respond to your enquiry, carry out conflict checks, arrange consultations and — only where you have
            subscribed — send legal updates. Our lawful bases are your consent and steps taken at your request prior to entering into an
            engagement.
          </p>
          <h2>How it is stored</h2>
          <p>
            Enquiries are delivered to the firm’s Microsoft 365 mailboxes, which are protected by enterprise-grade security controls. We do
            not sell personal data or share it with third parties for marketing.
          </p>
          <h2>How long we keep it</h2>
          <p>
            Enquiries that do not lead to an engagement are deleted within 12 months. Client records are retained as required by law and
            professional obligations.
          </p>
          <h2>Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data, or object to its processing, by writing to{" "}
            <a href={`mailto:${site.email}`} className="text-gold-700 underline">{site.email}</a>. You may also lodge a complaint with the Office of the Data
            Protection Commissioner.
          </p>
        </div>
      </section>
    </>
  );
}
