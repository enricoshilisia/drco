# DRCO Kenyariri Advocates LLP — Website

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. Every page is statically pre-rendered for speed and SEO. Enquiry emails are sent through the firm's **Microsoft 365** account via Microsoft Graph.

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## What's included

**Pages:** Home · Practice areas (index + 7 detail pages) · About · Advocates (index + profiles) · Insights/blog (index + articles) · Contact (form, map, hours) · FAQ · Privacy notice (Data Protection Act, 2019) · Legal disclaimer · 404.

**Client email automation (Microsoft 365):**
1. The client submits the consultation form on `/contact` or on any practice-area page.
2. The server validates the input, blocks spam (a hidden honeypot field, a minimum fill time and a per-IP rate limit) and requires the client's privacy consent.
3. A **reference number** is generated (e.g. `DK-260919-4F2A`).
4. **Firm notification:** a branded email goes to the right inbox for the practice area (`INQUIRY_ROUTES`). Reply-To is set to the client, so an advocate just clicks *Reply*. If the client ticks *urgent*, the subject is flagged `[URGENT]` and the email is sent as high importance.
5. **Client acknowledgment:** the client instantly gets a branded confirmation with their reference, what happens next and, if configured, a Microsoft Bookings link.
6. **Newsletter sign-ups** (in the footer) send a notification to the firm and a welcome email to the subscriber.

**SEO:** per-page titles, descriptions and canonical URLs · Open Graph and Twitter cards · generated share image · `sitemap.xml` · `robots.txt` · web manifest · JSON-LD structured data (`LegalService`/`LocalBusiness` with address, geo and hours, plus `Service`, `Person`, `Article`, `FAQPage` and `BreadcrumbList`) · semantic HTML · local keywords ("lawyer Nairobi", etc.) · optimised AVIF/WebP images · Google and Bing verification slots.

**Other features:** WhatsApp click-to-chat button · sticky header with a mobile menu · accessible markup (skip link, labelled form fields, focus styles, WCAG contrast) · security headers.

## Microsoft 365 email setup (about 10 minutes, needs a Global Admin)

1. Go to **entra.microsoft.com → App registrations → New registration**. Name it "Website Mailer", choose single tenant, and register it.
2. Copy the **Application (client) ID** into `MS_CLIENT_ID` and the **Directory (tenant) ID** into `MS_TENANT_ID`.
3. Go to **Certificates & secrets → New client secret** and copy the *Value* into `MS_CLIENT_SECRET`. Set a reminder to renew it before it expires.
4. Go to **API permissions → Add → Microsoft Graph → Application permissions → `Mail.Send`**, then click **Grant admin consent**.
5. Set `MS_SENDER_MAILBOX` to the mailbox the site sends from, e.g. a shared mailbox `website@…`, which needs no extra licence.
6. **Recommended:** restrict the app so it can only send as that mailbox. In Exchange Online PowerShell:
   ```powershell
   New-DistributionGroup -Name "Website Mailer Senders" -Type Security -Members website@drcokenyaririadvocatesllp.africa
   New-ApplicationAccessPolicy -AppId <MS_CLIENT_ID> -PolicyScopeGroupId "Website Mailer Senders" -AccessRight RestrictAccess -Description "Website mailer"
   ```

If the `MS_*` variables are missing (for example in local development), emails are logged to the console instead of sent, so the form still works.

## Editing content

| What | File |
|---|---|
| Firm name, phone, email, address, hours, stats, WhatsApp, social links | `src/lib/site.ts` |
| Practice areas, advocates, results, testimonial, FAQs, articles | `src/lib/content.ts` |
| Photos | `src/lib/images.ts` |
| Colours and fonts | `src/app/globals.css`, `src/app/layout.tsx` |
| Logo | `src/components/Logo.tsx` (currently a "DK" monogram), `src/app/icon.svg` |
| Email wording | `src/lib/email-templates.ts` |

## Before going live: replace demo content

The site ships with polished demo content so it can be presented. Confirm or replace the following with the firm:

- **Contact details:** confirm the map pin and the email domain in `site.ts`.
- **Stats strip** ("18+ years", "600+ matters", "3 countries") and **founding year**.
- **Advocates:** David Otieno and Amina Hassan are sample profiles. Also complete Dr. Kenyariri's education and admissions.
- **Representative results and testimonial:** these must be real and anonymised, and must comply with LSK advertising rules.
- **Articles:** review them, or replace them with the firm's own.

## Images you need to supply

The Unsplash photos are free to use under the Unsplash licence, but the site will feel much stronger with real photography. Put files in `public/images/` and point `src/lib/images.ts` at `/images/<file>.jpg`.

| # | Image | Where it's used | Suggested size |
|---|---|---|---|
| 1 | **Firm logo** (SVG preferred, plus a square version for the favicon) | Header, footer, emails, favicon, share image | vector / 512×512 |
| 2 | **Professional headshot of Dr. Christopher O. Kenyariri** | Advocates, profile page, article bylines | 1200×1600 (3:4), plain background |
| 3 | **Headshots of every other advocate**, same style and lighting | Advocates pages | 1200×1600 (3:4) |
| 4 | **Office exterior / building** (e.g. the building entrance or signage) | Contact hero, About | 2400×1600 |
| 5 | **Reception / waiting area** | Office gallery, Contact | 2000×1500 |
| 6 | **Boardroom / meeting room** | Home "Our Firm", office gallery | 2000×2500 (portrait) |
| 7 | **Advocates at work** (a meeting, reviewing documents, candid) | Office gallery, About | 2000×1500 |
| 8 | **Team group photo** | About page | 2400×1400 |
| 9 | **The firm's library or bookshelves** (optional) | Page headers | 2400×1400 |
| 10 | **Nairobi skyline** (optional, the Unsplash one is fine) | Home hero | 2400×1400 |

Until real headshots arrive, advocates show an elegant monogram card. Avoid using stock photos of people as your named advocates.

## Deploying

Any Node host works: Vercel (the simplest), Azure App Service or a VPS. Set the environment variables in the host. The in-memory rate limiter suits a single server; on serverless or multi-instance hosting, move it to Redis (e.g. Upstash).
