import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/lib/images";
import { breadcrumbSchema, JsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

export function SectionHeading({
  eyebrow,
  title,
  tone = "light",
  as: Tag = "h2",
  children,
}: {
  eyebrow: string;
  title: string;
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-12 flex max-w-[640px] flex-col gap-3.5 lg:mb-14">
      <span className={`eyebrow ${tone === "light" ? "text-gold-700" : "text-gold-500"}`}>{eyebrow}</span>
      <Tag className={`text-3xl sm:text-4xl ${tone === "light" ? "text-navy-900" : "text-ivory"}`}>{title}</Tag>
      {children}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-[13px] text-mist">
          {all.map((it, i) => (
            <li key={it.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-parchment">{it.name}</span>
              ) : (
                <Link href={it.path} className="hover:text-gold-500">{it.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  photo,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs: { name: string; path: string }[];
  photo?: Photo;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      {photo && (
        <>
          <Image src={photo.src} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/40" />
        </>
      )}
      <div className="container-x relative pt-14 pb-20 lg:pt-20 lg:pb-24">
        <Breadcrumbs items={crumbs} />
        <div className="flex items-center gap-3.5">
          <span className="h-0.5 w-10 bg-gold-500" />
          <span className="eyebrow text-gold-500">{eyebrow}</span>
        </div>
        <h1 className="mt-6 max-w-[820px] text-4xl leading-[1.12] text-ivory sm:text-5xl">{title}</h1>
        {intro && <p className="mt-6 max-w-[620px] text-lg leading-[1.7] font-light text-mist">{intro}</p>}
      </div>
    </section>
  );
}

export function CtaBand({ title = "Discuss your matter with an advocate." }: { title?: string }) {
  return (
    <section className="bg-navy-900">
      <div className="container-x flex flex-col gap-8 py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-[540px] flex-col gap-3">
          <h2 className="text-3xl text-ivory">{title}</h2>
          <p className="text-base leading-[1.7] font-light text-mist">
            Consultations are confidential. We typically respond within one business day.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/contact#consultation" className="btn-gold">Request a Consultation</Link>
          <a href={site.phoneHref} className="btn-ghost-dark">{site.phone}</a>
        </div>
      </div>
    </section>
  );
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-lg text-navy-900 [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="text-2xl leading-none text-gold-600 transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-[760px] text-[15px] leading-[1.8] text-stone">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Portrait({ name, className = "" }: { name: string; className?: string }) {
  // Placeholder until professional headshots are supplied.
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <div className={`flex aspect-[3/4] w-full items-center justify-center rounded-[3px] bg-sand ${className}`} role="img" aria-label={name}>
      <span className="font-serif text-5xl text-gold-600/70">{initials}</span>
    </div>
  );
}

export function WhatsAppFab() {
  const text = encodeURIComponent(`Hello ${site.name}, I would like to enquire about a legal matter.`);
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full bg-[#1f8f4e] text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
