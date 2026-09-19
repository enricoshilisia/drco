import Link from "next/link";
import { practiceAreas } from "@/lib/content";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

const linkCls = "text-[13px] text-slate transition-colors hover:text-gold-500";
const headCls = "mb-1 text-[13px] font-semibold tracking-[0.05em] text-parchment uppercase";

export function Footer() {
  return (
    <footer className="bg-navy-950">
      <div className="container-x grid gap-10 pt-14 pb-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Logo size="sm" />
          <p className="max-w-sm text-[13px] leading-relaxed text-slate">
            Advocates of the High Court of Kenya. Serving clients across Kenya, Uganda and Tanzania.
          </p>
          <div className="max-w-sm pt-2">
            <NewsletterForm />
          </div>
        </div>
        <nav aria-label="Practice areas" className="flex flex-col gap-3">
          <span className={headCls}>Practice</span>
          {practiceAreas.map((p) => (
            <Link key={p.slug} href={`/practice-areas/${p.slug}`} className={linkCls}>
              {p.title}
            </Link>
          ))}
        </nav>
        <nav aria-label="Firm" className="flex flex-col gap-3">
          <span className={headCls}>Firm</span>
          <Link href="/about" className={linkCls}>About</Link>
          <Link href="/advocates" className={linkCls}>Advocates</Link>
          <Link href="/insights" className={linkCls}>Insights</Link>
          <Link href="/faq" className={linkCls}>FAQ</Link>
          <Link href="/contact" className={linkCls}>Contact</Link>
        </nav>
        <address className="flex flex-col gap-3 not-italic">
          <span className={headCls}>Contact</span>
          <span className="text-[13px] leading-relaxed text-slate">
            {site.address.building}, {site.address.street}
            <br />
            {site.address.poBox}
            <br />
            {site.address.city}, {site.address.countryName}
          </span>
          <a href={site.phoneHref} className={linkCls}>{site.phone}</a>
          <a href={site.phone2Href} className={linkCls}>{site.phone2}</a>
          <a href={site.mobileHref} className={linkCls}>Cell {site.mobile}</a>
          <a href={`mailto:${site.email}`} className={linkCls}>{site.email}</a>
          {site.hours.map((h) => (
            <span key={h.days} className="text-[13px] text-slate">
              {h.days}: {h.time}
            </span>
          ))}
        </address>
      </div>
      <div className="border-t border-navy-700">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-slate-dim sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
          <span className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-gold-500">Privacy notice</Link>
            <Link href="/disclaimer" className="hover:text-gold-500">Legal disclaimer</Link>
            <span>Regulated by the Law Society of Kenya</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
