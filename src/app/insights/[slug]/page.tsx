import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, PageHero, Portrait } from "@/components/ui";
import { getAdvocate, getPost, getPractice, posts } from "@/lib/content";
import { images } from "@/lib/images";
import { JsonLd, orgId } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const photo = images.posts[p.slug] ?? images.library;
  const author = getAdvocate(p.author);
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/insights/${p.slug}` },
    authors: author ? [{ name: author.name, url: absoluteUrl(`/advocates/${author.slug}`) }] : undefined,
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      publishedTime: p.date,
      authors: author ? [author.name] : undefined,
      images: [{ url: photo.src, alt: photo.alt }],
    },
  };
}

export default async function PostPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const author = getAdvocate(p.author);
  const practice = getPractice(p.practice);
  const photo = images.posts[p.slug] ?? images.library;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.excerpt,
          image: photo.src,
          datePublished: p.date,
          dateModified: p.date,
          mainEntityOfPage: absoluteUrl(`/insights/${p.slug}`),
          author: author ? { "@type": "Person", name: author.name, url: absoluteUrl(`/advocates/${author.slug}`) } : undefined,
          publisher: { "@id": orgId },
        }}
      />
      <PageHero
        eyebrow={practice?.title ?? "Insights"}
        title={p.title}
        intro={p.excerpt}
        crumbs={[
          { name: "Insights", path: "/insights" },
          { name: p.title, path: `/insights/${p.slug}` },
        ]}
      />
      <article className="bg-ivory">
        <div className="container-x max-w-[820px] py-16">
          <div className="relative -mt-28 mb-12 aspect-[16/9] overflow-hidden rounded-[3px] shadow-[0_12px_28px_rgba(15,27,45,0.18)]">
            <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width:820px) 820px, 100vw" className="object-cover" />
          </div>
          <p className="mb-10 text-[13px] text-stone-light">
            <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })}</time> ·{" "}
            {p.readingMinutes} min read
          </p>
          <div className="prose-legal">
            {p.body.map((b, i) => (b.type === "h2" ? <h2 key={i}>{b.text}</h2> : <p key={i}>{b.text}</p>))}
          </div>
          {author && (
            <Link href={`/advocates/${author.slug}`} className="group mt-14 flex items-center gap-5 border-t border-line pt-8">
              <Portrait name={author.name} className="!w-20 [&>span]:text-2xl" />
              <span className="flex flex-col">
                <span className="text-xs tracking-[0.08em] text-gold-700 uppercase">Written by</span>
                <span className="font-serif text-xl text-navy-900 group-hover:text-gold-700">{author.name}</span>
                <span className="text-[13px] text-stone-light">{author.role}</span>
              </span>
            </Link>
          )}
          <p className="mt-10 border border-line bg-white p-5 text-[13px] leading-relaxed text-stone-light">
            This article is general information and not legal advice. Please contact us for advice on your specific circumstances.
          </p>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
