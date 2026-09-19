import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PracticeIcon, QuoteMark } from "@/components/icons";
import { CtaBand, FaqList, Portrait, SectionHeading } from "@/components/ui";
import { advocates, generalFaqs, posts, practiceAreas, results, testimonial } from "@/lib/content";
import { images } from "@/lib/images";
import { faqSchema, JsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export default function Home() {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return (
    <>
      <JsonLd data={faqSchema(generalFaqs)} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy-900">
        <Image src={images.hero.src} alt={images.hero.alt} fill priority sizes="100vw" className="-z-10 object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/30" />
        <div className="container-x flex flex-col items-start gap-7 py-24 lg:py-32">
          <div className="flex items-center gap-3.5">
            <span className="h-0.5 w-10 bg-gold-500" />
            <span className="eyebrow text-gold-500">Advocates &amp; Legal Consultants · Nairobi</span>
          </div>
          <h1 className="max-w-[780px] text-[40px] leading-[1.1] text-ivory sm:text-[58px]">{site.tagline}</h1>
          <p className="max-w-[580px] text-lg leading-[1.7] font-light text-mist">
            {site.name} represents individuals, families, investors and enterprises across East Africa in international investment,
            litigation, commercial and property matters — with the discretion and rigour each case deserves.
          </p>
          <div className="mt-3 flex flex-wrap gap-4">
            <Link href="/contact#consultation" className="btn-gold">Schedule a Consultation</Link>
            <Link href="/practice-areas" className="btn-ghost-dark">Our Practice Areas</Link>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section aria-label="Firm at a glance" className="border-b border-line bg-white">
        <div className="container-x grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {site.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="font-serif text-[34px] text-navy-900">{s.value}</span>
              <span className="text-[13px] tracking-[0.03em] text-stone-light">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="bg-ivory">
        <div className="container-x py-24">
          <SectionHeading eyebrow="What We Do" title="Practice Areas" />
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((p) => (
              <Link key={p.slug} href={`/practice-areas/${p.slug}`} className="card group flex flex-col gap-4 px-7 py-9">
                <PracticeIcon name={p.icon} className="size-[30px] text-gold-600" />
                <h3 className="text-xl font-medium text-navy-900">{p.title}</h3>
                <p className="text-[15px] leading-[1.7] text-stone">{p.short}</p>
                <span className="mt-auto flex items-center gap-2 pt-2 text-[13px] font-medium tracking-[0.03em] text-gold-700 uppercase">
                  Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-navy-900">
        <div className="container-x grid items-center gap-16 py-24 lg:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] border border-navy-600">
            <Image src={images.chambers.src} alt={images.chambers.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-6">
            <span className="eyebrow text-gold-500">Our Firm</span>
            <h2 className="text-[34px] leading-[1.25] text-ivory">Built on judgment, not volume.</h2>
            <p className="text-base leading-[1.8] font-light text-mist">
              Founded in Nairobi by Dr. Christopher O. Kenyariri, the firm brings doctoral-level expertise in international economic and
              investment law together with a full-service practice for individuals, families and companies. We take on a deliberately
              limited number of matters at any time, so every client works directly with an advocate who knows their case in full.
            </p>
            <p className="text-base leading-[1.8] font-light text-mist">
              We regularly advise on cross-border commercial, investment and property matters across East Africa.
            </p>
            <Link href="/about" className="mt-2 flex items-center gap-2.5 text-sm font-medium tracking-[0.03em] text-gold-500 uppercase hover:text-gold-400">
              About the Firm <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="bg-ivory">
        <div className="container-x py-24">
          <SectionHeading eyebrow="Track Record" title="Representative Results" />
          <div className="grid gap-7 md:grid-cols-3">
            {results.map((r) => (
              <article key={r.tag} className="flex flex-col gap-3.5 border-t-2 border-gold-500 bg-white px-7 py-8">
                <span className="text-xs tracking-[0.08em] text-gold-700 uppercase">{r.tag}</span>
                <p className="text-base leading-[1.7] text-ink-soft">{r.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-xs text-stone-light">Past results do not guarantee a similar outcome in any future matter.</p>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-sand">
        <figure className="mx-auto flex max-w-[900px] flex-col items-center gap-6 px-5 py-24 text-center">
          <QuoteMark className="text-gold-500" />
          <blockquote className="max-w-[720px] font-serif text-2xl leading-[1.6] text-[#23211c] italic">{testimonial.quote}</blockquote>
          <figcaption className="flex flex-col gap-0.5">
            <span className="text-[15px] font-semibold text-[#23211c]">{testimonial.who}</span>
            <span className="text-[13px] text-stone-light">{testimonial.context}</span>
          </figcaption>
        </figure>
      </section>

      {/* OFFICE */}
      <section className="bg-ivory">
        <div className="container-x py-24">
          <SectionHeading eyebrow="Our Chambers" title="A calm, private setting for confidential counsel.">
            <p className="text-base leading-[1.7] text-stone">
              Meet us at our offices in {site.address.locality}, {site.address.city}, or by Microsoft Teams wherever you are.
            </p>
          </SectionHeading>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2">
            {images.office.map((img, i) => (
              <div
                key={img.src}
                className={`relative overflow-hidden rounded-[3px] ${i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : "aspect-[4/3]"} ${i === 3 ? "col-span-2" : ""}`}
              >
                <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVOCATES */}
      <section className="bg-white">
        <div className="container-x py-24">
          <SectionHeading eyebrow="Our People" title="Advocates" />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {advocates.map((a) => (
              <Link key={a.slug} href={`/advocates/${a.slug}`} className="group flex flex-col gap-4">
                <Portrait name={a.name} className="transition-colors group-hover:bg-parchment" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-[19px] font-medium text-navy-900 group-hover:text-gold-700">{a.name}</h3>
                  <span className="text-[13px] tracking-[0.03em] text-gold-700">
                    {a.role} · {a.focus}
                  </span>
                  <span className="mt-1.5 text-[13px] text-stone-light">{a.credentials}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="bg-ivory">
        <div className="container-x py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Insights" title="Latest legal updates" />
            <Link href="/insights" className="mb-12 flex items-center gap-2 text-sm font-medium tracking-[0.03em] text-gold-700 uppercase lg:mb-14">
              All insights <ArrowRight />
            </Link>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {latest.map((p) => (
              <Link key={p.slug} href={`/insights/${p.slug}`} className="card group flex flex-col overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image src={(images.posts[p.slug] ?? images.library).src} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <time dateTime={p.date} className="text-xs tracking-[0.08em] text-gold-700 uppercase">
                    {new Date(p.date).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                  <h3 className="text-xl leading-snug text-navy-900 group-hover:text-gold-700">{p.title}</h3>
                  <p className="text-[15px] leading-[1.7] text-stone">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="container-x grid gap-12 py-24 lg:grid-cols-[1fr_2fr]">
          <SectionHeading eyebrow="Questions" title="Frequently asked" />
          <FaqList faqs={generalFaqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
