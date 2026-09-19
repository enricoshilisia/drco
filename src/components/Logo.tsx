import Link from "next/link";
import { site } from "@/lib/site";

// Placeholder monogram until the firm's logo is supplied. To use the real logo,
// add it to /public/logo.svg and replace the monogram <span> with next/image.
export function Logo({ size = "md", tone = "light" }: { size?: "sm" | "md"; tone?: "light" | "dark" }) {
  const box = size === "sm" ? "size-8 text-[13px]" : "size-10 text-[15px]";
  const text = size === "sm" ? "text-base" : "text-[19px]";
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
      <span
        className={`${box} flex shrink-0 items-center justify-center rounded-[2px] border-[1.5px] border-gold-500 font-serif tracking-wide text-gold-500`}
        aria-hidden="true"
      >
        DK
      </span>
      <span className={`${text} font-serif leading-tight tracking-[0.02em] ${tone === "light" ? "text-ivory" : "text-navy-900"}`}>
        {site.name}
      </span>
    </Link>
  );
}
