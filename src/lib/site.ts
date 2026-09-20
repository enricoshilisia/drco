// Single source of truth for firm details. Edit here — every page, email,
// sitemap entry and JSON-LD block reads from this file.

export const site = {
  name: "DRCO Kenyariri Advocates",
  legalName: "DRCO Kenyariri Advocates LLP",
  tagline: "Considered counsel for consequential matters.",
  description:
    "DRCO Kenyariri Advocates LLP is a Nairobi law firm representing individuals, families and enterprises across East Africa in litigation, corporate, property, family, employment and immigration matters.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.drcokenyaririadvocatesllp.africa").replace(/\/$/, ""),
  locale: "en_KE",
  foundingYear: 2008,
  phone: "+254 (0) 20 22 48 942",
  phoneHref: "tel:+254202248942",
  phone2: "+254 (0) 20 22 47 871",
  phone2Href: "tel:+254202247871",
  mobile: "+254 (0) 720 020 444",
  mobileHref: "tel:+254720020444",
  whatsapp: "254720020444", // international format, digits only
  email: "info@drcokenyaririadvocatesllp.africa",
  // Address for data-protection requests under the Data Protection Act, 2019.
  privacyEmail: "legal@drcokenyaririadvocatesllp.africa",
  address: {
    building: "105 Sandalwood Garden",
    street: "Argwings Kodhek Road",
    poBox: "P.O. Box 2121-00202 KNH",
    city: "Nairobi",
    postalCode: "00202",
    country: "KE",
    countryName: "Kenya",
  },
  geo: { lat: -1.2985, lng: 36.7894 },
  hours: [{ days: "Monday – Friday", time: "8:00 – 17:30" }, { days: "Saturday", time: "9:00 – 13:00 (by appointment)" }],
  openingHoursSpec: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:30" },
    { dayOfWeek: ["Saturday"], opens: "09:00", closes: "13:00" },
  ],
  areaServed: ["Kenya", "Uganda", "Tanzania"],
  // Microsoft Bookings page (included with Microsoft 365 Business). Leave empty to hide.
  bookingsUrl: process.env.NEXT_PUBLIC_BOOKINGS_URL ?? "",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Sandalwood+Garden,+Argwings+Kodhek+Road,+Nairobi&output=embed",
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
