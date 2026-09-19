import type { Metadata } from "next";
import { CtaBand, FaqList, PageHero } from "@/components/ui";
import { generalFaqs, practiceAreas } from "@/lib/content";
import { images } from "@/lib/images";
import { faqSchema, JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about consultations, fees, confidentiality and Kenyan law across our practice areas.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const all = [...generalFaqs, ...practiceAreas.flatMap((p) => p.faqs)];
  return (
    <>
      <JsonLd data={faqSchema(all)} />
      <PageHero eyebrow="Questions" title="Frequently asked questions" crumbs={[{ name: "FAQ", path: "/faq" }]} photo={images.library} />
      <section className="bg-ivory">
        <div className="container-x flex max-w-[900px] flex-col gap-14 py-20">
          <div>
            <h2 className="mb-6 text-3xl text-navy-900">Working with us</h2>
            <FaqList faqs={generalFaqs} />
          </div>
          {practiceAreas.map((p) => (
            <div key={p.slug}>
              <h2 className="mb-6 text-3xl text-navy-900">{p.title}</h2>
              <FaqList faqs={p.faqs} />
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
