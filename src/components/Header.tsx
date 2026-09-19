"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <header
      className={`sticky top-0 z-50 bg-navy-900 transition-shadow ${scrolled ? "shadow-[0_6px_24px_rgba(0,0,0,0.25)]" : ""}`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-navy-900">
        Skip to content
      </a>
      <div className="container-x flex items-center justify-between py-4 lg:py-[22px]">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm tracking-[0.04em] uppercase transition-colors hover:text-gold-500 ${active ? "text-gold-500" : "text-parchment/90"}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/contact#consultation" className="btn-gold !px-5 !py-2.5 text-[13px]">
            Book a Consultation
          </Link>
        </nav>
        <button
          type="button"
          className="flex size-11 items-center justify-center text-parchment lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>
      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="border-t border-navy-600 lg:hidden">
        <div className="container-x flex flex-col py-4">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-3 text-sm tracking-[0.04em] text-parchment uppercase">
              {item.label}
            </Link>
          ))}
          <Link href="/contact#consultation" onClick={() => setOpen(false)} className="btn-gold mt-3">
            Book a Consultation
          </Link>
        </div>
      </nav>
    </header>
  );
}
