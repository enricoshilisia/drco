"use client";

import { useActionState, useState } from "react";
import { subscribeNewsletter, type FormState } from "@/app/actions";

const initial: FormState = { status: "idle" };

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletter, initial);
  const [startedAt] = useState(() => Date.now());

  if (state.status === "success") {
    return <p role="status" className="text-sm text-gold-500">{state.message ?? "Thank you — you're subscribed."}</p>;
  }

  return (
    <form action={action} className="flex flex-col gap-2">
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <input type="hidden" name="started_at" value={startedAt} />
      <label htmlFor="newsletter-email" className="text-[13px] text-slate">
        Legal updates, occasionally. No spam.
      </label>
      <div className="flex">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="min-h-11 w-full min-w-0 rounded-l-[2px] border border-navy-600 bg-navy-900 px-3 text-sm text-ivory placeholder:text-slate-dim focus:border-gold-500 focus:outline-none"
        />
        <button type="submit" disabled={pending} className="min-h-11 shrink-0 rounded-r-[2px] bg-gold-500 px-4 text-[13px] font-semibold tracking-wide text-navy-900 uppercase hover:bg-gold-400 disabled:opacity-60">
          {pending ? "…" : "Subscribe"}
        </button>
      </div>
      {state.status === "error" && <p role="alert" className="text-[13px] text-red-300">{state.message}</p>}
    </form>
  );
}
