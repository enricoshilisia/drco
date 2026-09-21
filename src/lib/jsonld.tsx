import { absoluteUrl, site } from "./site";

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const orgId = absoluteUrl("/#organization");

export function legalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    "@id": orgId,
    name: site.legalName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/opengraph-image"),
    telephone: [site.phone, site.phone2, site.mobile],
    email: site.email,
    foundingDate: String(site.foundingYear),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.building}, ${site.address.street}`,
      postOfficeBoxNumber: site.address.poBox,
      addressLocality: site.address.city,
      addressRegion: "Nairobi County",
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: site.openingHoursSpec.map((h) => ({ "@type": "OpeningHoursSpecification", ...h })),
    areaServed: site.areaServed.map((name) => ({ "@type": "Country", name })),
    sameAs: Object.values(site.social),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
