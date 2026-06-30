"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Stat = {
  target: number;
  /** decimals to keep while counting (0 for whole numbers) */
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
  icon: ReactNode;
};

const STATS: Stat[] = [
  {
    target: 50000,
    suffix: "+",
    label: "Trees Planted",
    icon: (
      <>
        <path d="M10.67 25.33a5.33 5.33 0 0 1-2.99-9.76A4.67 4.67 0 0 1 12 8.04V8a4 4 0 1 1 8 0v.05a4.67 4.67 0 0 1 4.32 7.53A5.33 5.33 0 0 1 21.33 25.33z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M16 25.33V30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    target: 200,
    suffix: "+",
    label: "Farmer Families Supported",
    icon: (
      <>
        <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="21" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 25c0-4 3.2-7 7-7s7 3 7 7M19 22c0-2.5 2-4.5 5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    target: 92,
    suffix: "%",
    label: "Survival Rate",
    icon: (
      <path d="M16 4l9 4v6c0 6-4 10.5-9 13-5-2.5-9-7-9-13V8l9-4z M11.5 16l3 3 6-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    target: 1200,
    suffix: " T",
    label: "CO₂ Offset",
    icon: (
      <>
        <path d="M9 22a5 5 0 0 1 0-10 7 7 0 0 1 13-2.5A4.5 4.5 0 0 1 22 22H9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 17h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
];

function format(n: number, decimals: number) {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function StatItem({ stat, run }: { stat: Stat; run: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(eased * stat.target);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, stat.target]);

  return (
    <div className="group flex flex-col items-center text-center px-2 pt-2 md:pt-0">
      <span className="mb-2 md:mb-3 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-forest-50 text-forest-700 ring-1 ring-forest-100 transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-forest-100">
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 md:w-7 md:h-7" aria-hidden="true">
          {stat.icon}
        </svg>
      </span>
      <span className="font-serif text-2xl md:text-[2.75rem] font-bold text-forest-700 leading-none mb-1 md:mb-2 tabular-nums">
        {stat.prefix ?? ""}
        {format(value, stat.decimals ?? 0)}
        {stat.suffix}
      </span>
      <span className="text-gray-500 text-[0.7rem] md:text-sm uppercase tracking-wide">{stat.label}</span>
    </div>
  );
}

export default function TrustBar() {
  const ref = useRef<HTMLElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white border-b border-gray-100" aria-label="Our impact in numbers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 md:gap-y-8 gap-x-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
