import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the Firm",
  description:
    "DRCO Kenyariri Advocates LLP is a Nairobi law firm founded by Dr. Christopher O. Kenyariri, LL.D. Learn about our approach, values and commitment to clients across East Africa.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Candour", text: "We tell clients what they need to hear, not what they want to hear — about merits, cost and risk." },
  { title: "Discretion", text: "Confidentiality is the foundation of every instruction, from the first enquiry onwards." },
  { title: "Rigour", text: "Every matter is prepared as though it will be tested at its highest level." },
  { title: "Access", text: "Clients work directly with senior advocates, with clear updates at every stage." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Firm"
        title="Built on judgment, not volume."
        intro={`${site.legalName} combines international expertise with a personal, partner-led practice in Nairobi.`}
        crumbs={[{ name: "About", path: "/about" }]}
        photo={images.office[0]}
      />

      <section className="bg-ivory">
        <div className="container-x grid items-center gap-16 py-24 lg:grid-cols-2">
          <Reveal from="left" className="prose-legal">
            <h2 className="!mt-0 !text-3xl">Our story</h2>
            <p>
              The firm was founded by Dr. Christopher O. Kenyariri, who holds a Doctor of Laws (LL.D) from the University of South Africa,
              Pretoria, and consults on international economic law and investment law. That international perspective shapes how we
              advise every client — whether a foreign investor entering the Kenyan market, a family business planning succession, or an
              individual protecting their property.
            </p>
            <p>
              We deliberately limit the number of matters we take on, so that each receives the attention of an advocate who knows it in
              full. Our clients include individuals, families, investors, companies and public bodies across Kenya and the East African
              region.
            </p>
            <Link href="/advocates/dr-christopher-kenyariri" className="mt-2 inline-flex items-center gap-2 text-sm font-medium tracking-[0.03em] text-gold-700 uppercase">
              Meet our founding partner <ArrowRight />
            </Link>
          </Reveal>
          <Reveal from="right" delay={120} className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
            <Image src={images.chambers.src} alt={images.chambers.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="bg-navy-900">
        <div className="container-x py-24">
          <SectionHeading eyebrow="Our Values" title="How we work" tone="dark" />
          <div className="grid gap-px overflow-hidden rounded-[3px] bg-navy-600 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 110} className="flex flex-col gap-3 bg-navy-900 p-8">
                <span className="h-0.5 w-8 bg-gold-500" />
                <h3 className="text-2xl text-ivory">{v.title}</h3>
                <p className="text-[15px] leading-[1.7] text-mist">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-x py-24">
          <SectionHeading eyebrow="Our Chambers" title={`${site.address.street}, ${site.address.city}`} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {images.office.map((img, i) => (
              <Reveal key={img.src} delay={i * 110} className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
                <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
