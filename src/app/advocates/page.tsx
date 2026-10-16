import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, Portrait } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { advocates } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Our Advocates",
  description:
    "Meet the advocates of DRCO Kenyariri Advocates LLP, led by founding partner Dr. Christopher O. Kenyariri, LLD — international economic and investment law consultant.",
  alternates: { canonical: "/advocates" },
};

export default function AdvocatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our People"
        title="Advocates who know your matter in full."
        intro="Every instruction is led personally by our founding partner, from first consultation to conclusion."
        crumbs={[{ name: "Advocates", path: "/advocates" }]}
        photo={images.office[0]}
      />
      <section className="bg-ivory">
        <div
          className={`container-x grid gap-10 py-24 ${
            advocates.length === 1 ? "items-start lg:grid-cols-[360px_1fr] lg:gap-16" : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {advocates.map((a, i) =>
            advocates.length === 1 ? (
              <Fragment key={a.slug}>
                <Reveal from="left">
                  <Portrait name={a.name} className="border border-line" />
                </Reveal>
                <Reveal from="right" delay={120} className="flex flex-col gap-4">
                  <h2 className="text-3xl text-navy-900 sm:text-4xl">{a.name}</h2>
                  <span className="text-[13px] tracking-[0.03em] text-gold-700 uppercase">
                    {a.role} · {a.focus}
                  </span>
                  <span className="text-[15px] text-stone-light">{a.credentials}</span>
                  {a.bio.map((b) => (
                    <p key={b.slice(0, 24)} className="max-w-[640px] text-base leading-[1.8] text-ink-soft">
                      {b}
                    </p>
                  ))}
                  <div className="mt-2 flex flex-wrap gap-4">
                    <Link href={`/advocates/${a.slug}`} className="btn-navy">
                      Full profile
                    </Link>
                    <a href={`mailto:${a.email}`} className="btn border border-line font-medium text-navy-900 hover:border-gold-500">
                      {a.email}
                    </a>
                  </div>
                </Reveal>
              </Fragment>
            ) : (
              <Reveal key={a.slug} delay={i * 120}><Link href={`/advocates/${a.slug}`} className="group flex flex-col gap-5">
                <Portrait name={a.name} className="transition-colors group-hover:bg-parchment" />
                <div className="flex flex-col gap-1">
                  <h2 className="text-[22px] text-navy-900 group-hover:text-gold-700">{a.name}</h2>
                  <span className="text-[13px] tracking-[0.03em] text-gold-700">
                    {a.role} · {a.focus}
                  </span>
                  <span className="mt-1.5 text-[13px] text-stone-light">{a.credentials}</span>
                </div>
              </Link></Reveal>
            ),
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
