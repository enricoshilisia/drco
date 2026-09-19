import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-navy-900">
      <div className="container-x flex flex-col items-start gap-6 py-32">
        <span className="eyebrow text-gold-500">404</span>
        <h1 className="text-4xl text-ivory sm:text-5xl">This page could not be found.</h1>
        <p className="max-w-[520px] text-lg font-light text-mist">The page may have moved. Try our practice areas, or get in touch directly.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/" className="btn-gold">Go home</Link>
          <Link href="/contact" className="btn-ghost-dark">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
