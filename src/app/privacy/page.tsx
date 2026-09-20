import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Privacy Notice",
  description: `How ${site.legalName} collects, uses, shares and protects personal data, and your rights under the Data Protection Act, 2019 of Kenya.`,
  alternates: { canonical: "/privacy" },
};

const UPDATED = "20 September 2026";

const sections = [
  { id: "who-we-are", label: "Who we are" },
  { id: "what-we-collect", label: "What we collect" },
  { id: "why-and-lawful-basis", label: "Why we use it" },
  { id: "sharing", label: "Who we share it with" },
  { id: "transfers", label: "Transfers outside Kenya" },
  { id: "retention", label: "How long we keep it" },
  { id: "security", label: "How we protect it" },
  { id: "cookies", label: "Cookies and this website" },
  { id: "your-rights", label: "Your rights" },
  { id: "complaints", label: "Complaints" },
  { id: "contact", label: "Contact us" },
];

export default function PrivacyPage() {
  const mail = (address: string) => (
    <a href={`mailto:${address}`} className="text-gold-700 underline underline-offset-2">
      {address}
    </a>
  );

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Data privacy notice"
        intro="How we collect, use and protect your personal data, and the rights you have under the Data Protection Act, 2019."
        crumbs={[{ name: "Data privacy notice", path: "/privacy" }]}
      />

      <section className="bg-ivory">
        <div className="container-x grid max-w-[1100px] gap-14 py-20 lg:grid-cols-[240px_1fr]">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="eyebrow mb-4 text-gold-700">On this page</h2>
            <ol className="flex flex-col gap-2.5 text-[14px]">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-stone hover:text-navy-900">
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-8 border-t border-line pt-4 text-[13px] text-stone-light">Last updated: {UPDATED}</p>
          </nav>

          <div className="prose-legal [&>h2]:scroll-mt-28">
            <p className="text-lg">
              {site.legalName} (“we”, “us”, “the firm”) is the data controller for the personal data described in this notice. We are
              committed to handling your information lawfully, transparently and confidentially, in accordance with the{" "}
              <strong>Data Protection Act, 2019</strong>, the regulations made under it, and the professional duty of confidentiality owed
              by advocates to their clients.
            </p>

            <h2 id="who-we-are">Who we are</h2>
            <p>
              We are a firm of advocates based at {site.address.building}, {site.address.street}, {site.address.city}, Kenya, regulated by
              the Law Society of Kenya. For any question about this notice or about your personal data, contact{" "}
              {mail(site.privacyEmail)}.
            </p>

            <h2 id="what-we-collect">What we collect</h2>
            <p>Depending on how you interact with us, we may collect:</p>
            <ul>
              <li>
                <strong>Enquiry details</strong> — your name, email address, telephone number, preferred contact method, the area of law
                concerned and the summary of your matter that you provide through our contact form.
              </li>
              <li>
                <strong>Subscription details</strong> — your email address, if you sign up for our legal updates.
              </li>
              <li>
                <strong>Client and matter information</strong> — where we go on to act for you, the information needed to advise and
                represent you, including identification documents required for client due diligence, and correspondence relating to your
                matter.
              </li>
              <li>
                <strong>Technical information</strong> — limited server records such as your IP address, used to protect the website from
                automated abuse and spam submissions.
              </li>
            </ul>
            <p>
              Please do not send sensitive documents or confidential details through the enquiry form. Share those only once we have
              confirmed our engagement in writing.
            </p>

            <h2 id="why-and-lawful-basis">Why we use it, and our lawful basis</h2>
            <ul>
              <li>
                <strong>To respond to your enquiry</strong> and arrange a consultation — on the basis of your consent and steps taken at
                your request before entering into an engagement.
              </li>
              <li>
                <strong>To carry out conflict-of-interest and client due diligence checks</strong> — to comply with our legal and
                professional obligations.
              </li>
              <li>
                <strong>To provide legal services</strong> and administer your matter — to perform our engagement with you.
              </li>
              <li>
                <strong>To send legal updates</strong> — only where you have subscribed, and you may unsubscribe at any time.
              </li>
              <li>
                <strong>To keep our website secure</strong> and prevent abuse — our legitimate interest in protecting the firm and those
                who contact us.
              </li>
            </ul>
            <p>We do not sell personal data, and we do not use it for automated decision-making or profiling.</p>

            <h2 id="sharing">Who we share it with</h2>
            <p>We disclose personal data only where it is necessary, and only to:</p>
            <ul>
              <li>advocates and staff within the firm working on your matter;</li>
              <li>courts, tribunals, regulators and opposing parties, where required to conduct your matter;</li>
              <li>
                Microsoft, which provides the email and document services we use, under the firm&apos;s Microsoft 365 agreement and its
                security and confidentiality obligations;
              </li>
              <li>
                experts, counsel, surveyors, valuers or agents instructed on your matter, where you have been informed or have agreed;
              </li>
              <li>our auditors, insurers and professional advisers, where necessary; and</li>
              <li>any person to whom we are required by law or court order to disclose it.</li>
            </ul>

            <h2 id="transfers">Transfers outside Kenya</h2>
            <p>
              Our email and document systems are provided by Microsoft and may store or process data on servers outside Kenya. Where
              personal data is transferred outside the country, we rely on the safeguards required by sections 48 and 49 of the Data
              Protection Act, 2019, including the contractual protections and security standards in our agreement with the provider.
            </p>

            <h2 id="retention">How long we keep it</h2>
            <ul>
              <li>
                <strong>Enquiries that do not become instructions</strong> — deleted within 12 months.
              </li>
              <li>
                <strong>Subscription details</strong> — kept until you unsubscribe.
              </li>
              <li>
                <strong>Client files</strong> — retained for the period required by law and by our professional obligations, and then
                securely destroyed.
              </li>
            </ul>

            <h2 id="security">How we protect it</h2>
            <p>
              Enquiries are delivered directly into the firm&apos;s Microsoft 365 mailboxes, which are protected by enterprise security
              controls including encryption in transit and at rest, multi-factor authentication and access restricted to those who need it.
              This website is served over an encrypted (HTTPS) connection. Everything you tell us is additionally protected by the duty of
              confidentiality owed by advocates to their clients.
            </p>

            <h2 id="cookies">Cookies and this website</h2>
            <p>
              This website does not use advertising or tracking cookies, and we do not run third-party analytics or advertising scripts.
              Two things on the site do involve other providers:
            </p>
            <ul>
              <li>
                <strong>Photographs</strong> are loaded from an external image service, which receives your IP address as part of serving
                the image.
              </li>
              <li>
                <strong>The map</strong> on our contact page is embedded from Google Maps, which may set its own cookies when the page
                loads. Google&apos;s own privacy policy governs that use.
              </li>
            </ul>

            <h2 id="your-rights">Your rights</h2>
            <p>Under the Data Protection Act, 2019 you have the right to:</p>
            <ul>
              <li>be informed of how your personal data is being used;</li>
              <li>access the personal data we hold about you;</li>
              <li>ask us to correct data that is inaccurate or incomplete;</li>
              <li>ask us to delete data we no longer have a lawful reason to keep;</li>
              <li>object to, or ask us to restrict, how we use your data; and</li>
              <li>withdraw consent at any time, where we rely on consent.</li>
            </ul>
            <p>
              To exercise any of these rights, write to {mail(site.privacyEmail)}. We will respond within the timelines set by the Act.
              Some rights are limited where we are required to retain information by law, by court rules, or by our professional
              obligations to current and former clients.
            </p>

            <h2 id="complaints">Complaints</h2>
            <p>
              If you are unhappy with how we have handled your personal data, please tell us first so we can put it right. You also have
              the right to lodge a complaint with the{" "}
              <a
                href="https://www.odpc.go.ke"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-700 underline underline-offset-2"
              >
                Office of the Data Protection Commissioner
              </a>
              .
            </p>

            <h2 id="contact">Contact us</h2>
            <p>
              {site.legalName}
              <br />
              {site.address.building}, {site.address.street}
              <br />
              {site.address.poBox}
              <br />
              {site.address.city}, {site.address.countryName}
              <br />
              Data protection enquiries: {mail(site.privacyEmail)}
              <br />
              General: {mail(site.email)} · {site.phone}
            </p>
            <p className="text-[13px] text-stone-light">
              We may update this notice from time to time. The date above shows when it was last revised. See also our{" "}
              <Link href="/disclaimer" className="text-gold-700 underline underline-offset-2">
                legal disclaimer
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
