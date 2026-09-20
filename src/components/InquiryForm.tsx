"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useState } from "react";
import { submitInquiry, type FormState } from "@/app/actions";
import { practiceAreas } from "@/lib/content";

const initial: FormState = { status: "idle" };

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1.5 text-[13px] text-red-700">{errors[0]}</p>;
}

export function InquiryForm({ defaultPractice = "" }: { defaultPractice?: string }) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const [startedAt] = useState(() => Date.now());
  const [consented, setConsented] = useState(false);
  const pathname = usePathname();
  const fe = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[3px] border border-gold-500 bg-white p-8">
        <p className="eyebrow text-gold-700">Enquiry received</p>
        <h3 className="mt-3 text-2xl text-navy-900">Thank you. An advocate will be in touch shortly.</h3>
        {state.reference && state.reference !== "DK-RECEIVED" && (
          <p className="mt-4 text-stone">
            Your reference is <strong className="font-semibold text-navy-900">{state.reference}</strong>. A confirmation has been sent to your
            email.
          </p>
        )}
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-5 rounded-[3px] border border-line bg-white p-6 sm:p-8">
      {/* Spam protection: hidden honeypot + time trap */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="started_at" value={startedAt} />
      <input type="hidden" name="sourcePage" value={pathname} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-soft">
            Full name
          </label>
          <input id="name" name="name" autoComplete="name" required className="field" aria-invalid={!!fe.name} />
          <FieldError errors={fe.name} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-soft">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required className="field" aria-invalid={!!fe.email} />
          <FieldError errors={fe.email} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-soft">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+254 7XX XXX XXX" required className="field" aria-invalid={!!fe.phone} />
          <FieldError errors={fe.phone} />
        </div>
        <div>
          <label htmlFor="practice" className="mb-1.5 block text-sm font-medium text-ink-soft">
            Area of law
          </label>
          <select id="practice" name="practice" defaultValue={defaultPractice} required className="field" aria-invalid={!!fe.practice}>
            <option value="" disabled>
              Select…
            </option>
            {practiceAreas.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
            <option value="other">Other / not sure</option>
          </select>
          <FieldError errors={fe.practice} />
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink-soft">Preferred contact method</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {["Phone", "Email", "WhatsApp"].map((m) => (
            <label key={m} className="flex min-h-11 items-center gap-2 text-[15px] text-stone">
              <input type="radio" name="preferredContact" value={m} defaultChecked={m === "Phone"} className="size-4 accent-gold-600" />
              {m}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-soft">
          Briefly describe your matter
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="field resize-y"
          placeholder="Key facts, parties involved and any deadlines. Please avoid sharing highly sensitive details at this stage."
          aria-invalid={!!fe.message}
        />
        <FieldError errors={fe.message} />
      </div>

      <label className="flex items-start gap-3 text-[15px] text-stone">
        <input type="checkbox" name="urgent" className="mt-1 size-4 accent-gold-600" />
        <span>This is urgent (e.g. a court date, arrest or deadline within 7 days)</span>
      </label>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-stone">
        <input
          type="checkbox"
          name="consent"
          required
          checked={consented}
          onChange={(e) => setConsented(e.target.checked)}
          className="mt-1 size-4 accent-gold-600"
          aria-invalid={!!fe.consent}
        />
        <span>
          I consent to {`DRCO Kenyariri Advocates`} processing my information to respond to this enquiry, as described in the{" "}
          <Link href="/privacy" className="text-gold-700 underline underline-offset-2">
            privacy notice
          </Link>
          . I understand that submitting this form does not create an advocate–client relationship.
        </span>
      </label>
      <FieldError errors={fe.consent} />

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-[2px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-2 sm:items-start">
        <button
          type="submit"
          disabled={pending || !consented}
          aria-describedby={!consented ? "consent-hint" : undefined}
          className="btn-navy w-full sm:w-auto disabled:cursor-not-allowed disabled:bg-navy-900/40"
        >
          {pending ? "Sending…" : "Request a Consultation"}
        </button>
        {!consented && (
          <p id="consent-hint" className="text-[13px] text-stone-light">
            Please tick the box above to confirm you have read the privacy notice.
          </p>
        )}
      </div>
    </form>
  );
}
