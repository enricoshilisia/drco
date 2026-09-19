import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, Portrait } from "@/components/ui";
import { advocates } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Our Advocates",
  description:
    "Meet the advocates of DRCO Kenyariri Advocates LLP, led by founding partner Dr. Christopher O. Kenyariri, LL.D — international economic and investment law consultant.",
  alternates: { canonical: "/advocates" },
};

export default function AdvocatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our People"
        title="Advocates who know your matter in full."
        intro="Every client works directly with a senior advocate. Meet the team."
        crumbs={[{ name: "Advocates", path: "/advocates" }]}
        photo={images.office[0]}
      />
      <section className="bg-ivory">
        <div className="container-x grid gap-10 py-24 sm:grid-cols-2 lg:grid-cols-3">
          {advocates.map((a) => (
            <Link key={a.slug} href={`/advocates/${a.slug}`} className="group flex flex-col gap-5">
              <Portrait name={a.name} className="transition-colors group-hover:bg-parchment" />
              <div className="flex flex-col gap-1">
                <h2 className="text-[22px] text-navy-900 group-hover:text-gold-700">{a.name}</h2>
                <span className="text-[13px] tracking-[0.03em] text-gold-700">
                  {a.role} · {a.focus}
                </span>
                <span className="mt-1.5 text-[13px] text-stone-light">{a.credentials}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
