import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/ui";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — Book a Consultation",
  description: `Book a confidential consultation with ${site.name} in ${site.address.locality}, Nairobi. Call ${site.phone}, message us on WhatsApp or send an enquiry online.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Discuss your matter with an advocate."
        intro="Send us a short summary and you will receive an instant confirmation with your reference number. An advocate responds within one business day."
        crumbs={[{ name: "Contact", path: "/contact" }]}
        photo={images.reception}
      />
      <section id="consultation" className="scroll-mt-24 bg-ivory">
        <div className="container-x grid gap-12 py-20 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="mb-6 text-3xl text-navy-900">Request a consultation</h2>
            <InquiryForm />
          </div>
          <aside className="flex flex-col gap-6">
            {site.bookingsUrl && (
              <div className="border border-gold-500 bg-white p-6">
                <h2 className="text-xl text-navy-900">Prefer to pick a time?</h2>
                <p className="mt-2 text-sm text-stone">Choose an available slot for an in-person or Microsoft Teams consultation.</p>
                <a href={site.bookingsUrl} target="_blank" rel="noopener noreferrer" className="btn-gold mt-4 w-full">
                  Book online
                </a>
              </div>
            )}
            <div className="flex flex-col gap-5 bg-navy-900 p-7 text-mist">
              <div>
                <h2 className="eyebrow mb-2 text-gold-500">Call</h2>
                <a href={site.phoneHref} className="font-serif text-2xl text-ivory hover:text-gold-500">{site.phone}</a>
              </div>
              <div>
                <h2 className="eyebrow mb-2 text-gold-500">Email</h2>
                <a href={`mailto:${site.email}`} className="text-ivory hover:text-gold-500">{site.email}</a>
              </div>
              <div>
                <h2 className="eyebrow mb-2 text-gold-500">WhatsApp</h2>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-ivory hover:text-gold-500">
                  Message us on WhatsApp
                </a>
              </div>
              <div>
                <h2 className="eyebrow mb-2 text-gold-500">Visit</h2>
                <address className="not-italic text-ivory">
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.city}
                </address>
              </div>
              <div>
                <h2 className="eyebrow mb-2 text-gold-500">Hours</h2>
                <ul className="text-sm">
                  {site.hours.map((h) => (
                    <li key={h.days}>
                      {h.days}: {h.time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <section aria-label="Map" className="h-[420px] w-full bg-sand">
        <iframe
          title={`Map to ${site.name}`}
          src={site.mapEmbedUrl}
          className="h-full w-full border-0 grayscale-[35%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
