"use client";

import { useEffect, useRef } from "react";

// Counts from 0 to the number in `value` (e.g. "600+") when scrolled into view.
// Server HTML contains the final value, so search engines and no-JS visitors see
// the real figure. Every counter takes the same duration, so large and small
// numbers land together; the ease-out makes them slow down as they arrive.
const DURATION_MS = 2000;
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export function CountUp({ value, delay = 0, className }: { value: string; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+)(.*)$/);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = Number(match[1]);
    const suffix = match[2];
    el.textContent = `0${suffix}`;

    let raf = 0;
    let timer = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / DURATION_MS, 1);
        el.textContent = `${Math.round(target * easeOutQuart(t))}${suffix}`;
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(run, delay);
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {value}
    </span>
  );
}
