// Single source of truth for firm details. Edit here — every page, email,
// sitemap entry and JSON-LD block reads from this file.

export const site = {
  name: "DRCO Kenyariri Advocates",
  legalName: "DRCO Kenyariri Advocates LLP",
  tagline: "Considered counsel for consequential matters.",
  description:
    "DRCO Kenyariri Advocates LLP is a Nairobi law firm representing individuals, families and enterprises across East Africa in litigation, corporate, property, family, employment and immigration matters.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.drcokenyariri.co.ke").replace(/\/$/, ""),
  locale: "en_KE",
  foundingYear: 2008,
  phone: "+254 700 000 000",
  phoneHref: "tel:+254700000000",
  whatsapp: "254700000000", // international format, digits only
  email: "info@drcokenyariri.co.ke",
  address: {
    street: "Merchant Square, Riverside Drive",
    locality: "Westlands",
    city: "Nairobi",
    postalCode: "00800",
    country: "KE",
  },
  geo: { lat: -1.2676, lng: 36.8108 },
  hours: [{ days: "Monday – Friday", time: "8:00 – 17:30" }, { days: "Saturday", time: "9:00 – 13:00 (by appointment)" }],
  openingHoursSpec: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:30" },
    { dayOfWeek: ["Saturday"], opens: "09:00", closes: "13:00" },
  ],
  areaServed: ["Kenya", "Uganda", "Tanzania"],
  // Microsoft Bookings page (included with Microsoft 365 Business). Leave empty to hide.
  bookingsUrl: process.env.NEXT_PUBLIC_BOOKINGS_URL ?? "",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Merchant+Square+Riverside+Drive+Nairobi&output=embed",
  social: {
    linkedin: "https://www.linkedin.com/company/drco-kenyariri-advocates",
    x: "https://x.com/drcokenyariri",
  },
  stats: [
    { value: "18+", label: "Years in practice" },
    { value: "600+", label: "Matters concluded" },
    { value: "3", label: "Countries admitted: KE, UG, TZ" },
    { value: "LSK", label: "Law Society of Kenya members" },
  ],
} as const;

export const nav = [
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/about", label: "About" },
  { href: "/advocates", label: "Advocates" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
