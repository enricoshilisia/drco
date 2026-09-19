"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  /** Stagger in ms, for items in a row or grid. */
  delay?: number;
  /** Direction the content slides in from. */
  from?: "up" | "left" | "right";
  className?: string;
};

// Scroll reveal: the element starts slightly offset and transparent, then
// slides into place the first time it scrolls into view. The hidden state is
// applied only when JavaScript runs (the `js` class on <html>), so visitors and
// crawlers without JS still see everything.
export function Reveal({ children, delay = 0, from = "up", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setShown(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${from} ${shown ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
