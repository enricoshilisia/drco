import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand, Portrait } from "@/components/ui";
import { advocates, getAdvocate, getPractice } from "@/lib/content";
import { JsonLd, orgId } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return advocates.map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/advocates/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getAdvocate(slug);
  if (!a) return {};
  return {
    title: `${a.name} — ${a.role}, ${a.focus}`,
    description: a.bio[0].slice(0, 160),
    alternates: { canonical: `/advocates/${a.slug}` },
    openGraph: { type: "profile", title: `${a.name} | ${a.role}` },
  };
}

export default async function AdvocatePage({ params }: PageProps<"/advocates/[slug]">) {
  const { slug } = await params;
  const a = getAdvocate(slug);
  if (!a) notFound();
  const practices = a.practiceSlugs.map(getPractice).filter((p) => p !== undefined);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: a.name,
          jobTitle: a.role,
          description: a.bio[0],
          url: absoluteUrl(`/advocates/${a.slug}`),
          email: a.email,
          worksFor: { "@id": orgId },
          knowsAbout: practices.map((p) => p.title),
          hasCredential: a.education.map((e) => ({ "@type": "EducationalOccupationalCredential", name: e })),
        }}
      />
      <section className="bg-navy-900">
        <div className="container-x pt-14 pb-16">
          <Breadcrumbs items={[{ name: "Advocates", path: "/advocates" }, { name: a.name, path: `/advocates/${a.slug}` }]} />
        </div>
      </section>
      <section className="bg-ivory">
        <div className="container-x grid gap-14 pb-24 lg:grid-cols-[360px_1fr]">
          <div className="-mt-10 flex flex-col gap-6">
            <Portrait name={a.name} className="border border-line shadow-[0_12px_28px_rgba(15,27,45,0.12)]" />
            <div className="flex flex-col gap-3 border border-line bg-white p-6 text-sm">
              <a href={`mailto:${a.email}`} className="text-gold-700 hover:underline">{a.email}</a>
              <Link href="/contact#consultation" className="btn-navy mt-2 w-full">Book a consultation</Link>
            </div>
          </div>
          <div className="pt-4 lg:pt-12">
            <span className="eyebrow text-gold-700">{a.role}</span>
            <h1 className="mt-3 text-4xl text-navy-900 sm:text-5xl">{a.name}</h1>
            <p className="mt-3 text-stone-light">{a.credentials}</p>
            <div className="prose-legal mt-10">
              {a.bio.map((b) => (
                <p key={b.slice(0, 32)}>{b}</p>
              ))}
            </div>
            <div className="mt-10 grid gap-10 sm:grid-cols-3">
              <div>
                <h2 className="eyebrow mb-4 text-gold-700">Practice</h2>
                <ul className="flex flex-col gap-2 text-[15px]">
                  {practices.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/practice-areas/${p.slug}`} className="text-navy-900 hover:text-gold-700">{p.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="eyebrow mb-4 text-gold-700">Education</h2>
                <ul className="flex flex-col gap-2 text-[15px] text-ink-soft">
                  {a.education.map((e) => <li key={e}>{e}</li>)}
                </ul>
              </div>
              <div>
                <h2 className="eyebrow mb-4 text-gold-700">Admissions</h2>
                <ul className="flex flex-col gap-2 text-[15px] text-ink-soft">
                  {a.admissions.map((e) => <li key={e}>{e}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
