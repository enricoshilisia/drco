import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal Disclaimer",
  description: `Terms of use and legal disclaimer for the ${site.name} website.`,
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Legal disclaimer" crumbs={[{ name: "Legal disclaimer", path: "/disclaimer" }]} />
      <section className="bg-ivory">
        <div className="container-x prose-legal max-w-[820px] py-20">
          <p>
            The content of this website is provided for general information only and does not constitute legal advice. You should not act
            or refrain from acting on the basis of any content without first obtaining advice on your specific circumstances.
          </p>
          <h2>No advocate–client relationship</h2>
          <p>
            Using this website, sending an enquiry or contacting us by email, phone or WhatsApp does not create an advocate–client
            relationship. Such a relationship is formed only once we have confirmed our engagement in writing.
          </p>
          <h2>Past results</h2>
          <p>Descriptions of previous matters do not guarantee a similar outcome in any future matter. Every case turns on its own facts.</p>
          <h2>Regulation</h2>
          <p>
            {site.legalName} is a firm of advocates regulated by the Law Society of Kenya. Information on this website is published in
            accordance with the Advocates (Practice) Rules.
          </p>
        </div>
      </section>
    </>
  );
}
