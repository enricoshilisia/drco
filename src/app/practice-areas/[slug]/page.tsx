import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/InquiryForm";
import { PracticeIcon } from "@/components/icons";
import { FaqList, PageHero, Portrait } from "@/components/ui";
import { advocates, getPractice, practiceAreas } from "@/lib/content";
import { images } from "@/lib/images";
import { faqSchema, JsonLd, orgId } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return practiceAreas.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/practice-areas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPractice(slug);
  if (!p) return {};
  const photo = images.practice[p.slug];
  return {
    title: `${p.title} Lawyers in Nairobi, Kenya`,
    description: `${p.short} Speak to an experienced advocate about your ${p.title.toLowerCase()} matter.`,
    keywords: p.keywords,
    alternates: { canonical: `/practice-areas/${p.slug}` },
    openGraph: { title: `${p.title} | Nairobi Advocates`, description: p.short, images: photo ? [{ url: photo.src, alt: photo.alt }] : undefined },
  };
}

export default async function PracticePage({ params }: PageProps<"/practice-areas/[slug]">) {
  const { slug } = await params;
  const p = getPractice(slug);
  if (!p) notFound();

  const team = advocates.filter((a) => a.practiceSlugs.includes(p.slug));
  const photo = images.practice[p.slug] ?? images.library;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: p.title,
            serviceType: p.title,
            description: p.intro,
            url: absoluteUrl(`/practice-areas/${p.slug}`),
            provider: { "@id": orgId },
            areaServed: ["Kenya", "Uganda", "Tanzania"],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: p.title,
              itemListElement: p.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
            },
          },
          faqSchema(p.faqs),
        ]}
      />
      <PageHero
        eyebrow="Practice Area"
        title={p.title}
        intro={p.short}
        crumbs={[
          { name: "Practice Areas", path: "/practice-areas" },
          { name: p.title, path: `/practice-areas/${p.slug}` },
        ]}
        photo={photo}
      />

      <section className="bg-ivory">
        <div className="container-x grid gap-16 py-20 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <p className="text-xl leading-[1.75] text-ink-soft">{p.intro}</p>

            <h2 className="mt-14 text-3xl text-navy-900">How we help</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.services.map((s) => (
                <li key={s} className="flex items-start gap-3 border border-line bg-white px-5 py-4 text-[15px] text-ink-soft">
                  <PracticeIcon name={p.icon} className="mt-0.5 size-5 shrink-0 text-gold-600" />
                  {s}
                </li>
              ))}
            </ul>

            <h2 className="mt-14 text-3xl text-navy-900">Why clients choose us</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {p.whyUs.map((w) => (
                <li key={w} className="flex gap-4 text-base leading-[1.7] text-ink-soft">
                  <span className="mt-3 h-0.5 w-6 shrink-0 bg-gold-500" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>

            <div className="relative mt-14 aspect-[16/8] overflow-hidden rounded-[3px]">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
            </div>

            <h2 className="mt-14 mb-6 text-3xl text-navy-900">Common questions</h2>
            <FaqList faqs={p.faqs} />
          </div>

          <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
            {team.length > 0 && (
              <div className="border border-line bg-white p-6">
                <h2 className="eyebrow mb-5 text-gold-700">Your advocates</h2>
                <ul className="flex flex-col gap-5">
                  {team.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/advocates/${a.slug}`} className="group flex items-center gap-4">
                        <Portrait name={a.name} className="!w-16 !text-lg [&>span]:text-xl" />
                        <span className="flex flex-col">
                          <span className="font-serif text-lg text-navy-900 group-hover:text-gold-700">{a.name}</span>
                          <span className="text-[13px] text-stone-light">{a.role}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="bg-navy-900 p-6">
              <h2 className="text-2xl text-ivory">Speak to an advocate</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist">Confidential. We respond within one business day.</p>
              <Link href="#consultation" className="btn-gold mt-5 w-full">Request a Consultation</Link>
            </div>
          </aside>
        </div>
      </section>

      <section id="consultation" className="scroll-mt-24 bg-sand">
        <div className="container-x max-w-[880px] py-20">
          <h2 className="mb-2 text-3xl text-navy-900">Tell us about your {p.title.toLowerCase()} matter</h2>
          <p className="mb-8 text-stone">You will receive an instant confirmation email with your reference number.</p>
          <InquiryForm defaultPractice={p.slug} />
        </div>
      </section>
    </>
  );
}
