"use client";

import { useEffect, useRef } from "react";

// Counts from 0 to the number in `value` (e.g. "600+") when scrolled into view.
// Server HTML contains the final value, so search engines and no-JS visitors see
// the real figure. Every counter takes the same duration, so large and small
// numbers land together; the ease-out makes them slow down as they arrive.
const DURATION_MS = 2000;
const REDUCED_DURATION_MS = 1400; // counting is mild motion, so shorten rather than skip
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export function CountUp({ value, delay = 0, className }: { value: string; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+)(.*)$/);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? REDUCED_DURATION_MS : DURATION_MS;
    const startDelay = reduced ? 0 : delay;

    const target = Number(match[1]);
    const suffix = match[2];
    el.textContent = `0${suffix}`;

    let raf = 0;
    let timer = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        el.textContent = `${Math.round(target * easeOutQuart(t))}${suffix}`;
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(run, startDelay);
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
