import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

// The DRCO mark is navy and gold, so on the navy header and footer it sits on a
// small ivory tile — otherwise its navy squares disappear into the background.
export function Logo({ size = "md", tone = "light" }: { size?: "sm" | "md"; tone?: "light" | "dark" }) {
  const tile = size === "sm" ? "size-11 p-1" : "size-12 p-[5px] lg:size-14";
  const text = size === "sm" ? "text-base" : "text-[19px]";
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
      <span className={`${tile} relative block shrink-0 rounded-[3px] ${tone === "light" ? "bg-ivory" : "bg-transparent"}`}>
        <Image src="/logo.png" alt="" width={56} height={56} priority={size === "md"} className="size-full object-contain" />
      </span>
      <span className={`${text} font-serif leading-tight tracking-[0.02em] ${tone === "light" ? "text-ivory" : "text-navy-900"}`}>
        {site.name}
      </span>
    </Link>
  );
}
