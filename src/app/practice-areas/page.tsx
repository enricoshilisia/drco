import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PracticeIcon } from "@/components/icons";
import { CtaBand, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { practiceAreas } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Practice Areas — International Investment, Litigation, Corporate, Property & Family Law",
  description:
    "Explore our practice areas: international trade & investment law, litigation, corporate & commercial, real estate & conveyancing, family & succession, employment and immigration law in Kenya.",
  alternates: { canonical: "/practice-areas" },
};

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Practice areas"
        intro="Focused expertise across the matters that most affect individuals, families and enterprises in East Africa."
        crumbs={[{ name: "Practice Areas", path: "/practice-areas" }]}
        photo={images.library}
      />
      <section className="bg-ivory">
        <div className="container-x grid gap-8 py-24 md:grid-cols-2">
          {practiceAreas.map((p, i) => {
            const photo = images.practice[p.slug] ?? images.library;
            return (
              <Reveal key={p.slug} delay={(i % 2) * 120} className="flex"><Link href={`/practice-areas/${p.slug}`} className="card group flex w-full flex-col overflow-hidden">
                <div className="relative aspect-[16/8]">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-8">
                  <div className="flex items-center gap-4">
                    <PracticeIcon name={p.icon} className="size-7 text-gold-600" />
                    <h2 className="text-2xl text-navy-900">{p.title}</h2>
                  </div>
                  <p className="text-[15px] leading-[1.7] text-stone">{p.short}</p>
                  <ul className="grid gap-1.5 text-sm text-ink-soft sm:grid-cols-2">
                    {p.services.slice(0, 4).map((s) => (
                      <li key={s} className="flex gap-2">
                        <span aria-hidden="true" className="text-gold-600">—</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto flex items-center gap-2 pt-2 text-[13px] font-medium tracking-[0.03em] text-gold-700 uppercase">
                    Explore {p.title} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link></Reveal>
            );
          })}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
