import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { getAdvocate, getPractice, posts } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Legal Insights — Kenyan Law Explained",
  description: "Practical articles on Kenyan and East African law: investment, property, corporate compliance, employment, family and succession.",
  alternates: { canonical: "/insights" },
};

const fmt = (d: string) => new Date(d).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" });

export default function InsightsPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Legal insights"
        intro="Clear, practical notes on the legal developments that matter to individuals, investors and businesses in East Africa."
        crumbs={[{ name: "Insights", path: "/insights" }]}
        photo={images.library}
      />
      <section className="bg-ivory">
        <div className="container-x grid gap-8 py-24 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 110} className="flex"><Link href={`/insights/${p.slug}`} className="card group flex w-full flex-col overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image src={(images.posts[p.slug] ?? images.library).src} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="text-xs tracking-[0.08em] text-gold-700 uppercase">{getPractice(p.practice)?.title}</span>
                <h2 className="text-xl leading-snug text-navy-900 group-hover:text-gold-700">{p.title}</h2>
                <p className="text-[15px] leading-[1.7] text-stone">{p.excerpt}</p>
                <p className="mt-auto pt-3 text-[13px] text-stone-light">
                  {getAdvocate(p.author)?.name} · <time dateTime={p.date}>{fmt(p.date)}</time> · {p.readingMinutes} min read
                </p>
              </div>
            </Link></Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
