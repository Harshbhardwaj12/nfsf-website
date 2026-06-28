"use client";

import { useEffect, useRef, useState } from "react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Where are the trees actually planted?",
    a: "On our own dedicated farmland, tended by our network of farmers. You don't need land, time, or know-how — we handle the planting and the years of care that follow.",
  },
  {
    q: "What do I get for ₹300?",
    a: "One native tree planted and cared for on your behalf, plus a personalised digital certificate you can keep, share, or gift. As the tree grows it draws down carbon and revives soil and biodiversity for decades.",
  },
  {
    q: "How is my tree cared for after planting?",
    a: "Our farmers water, weed, and protect each sapling through its vulnerable early years. We photograph plantings and send periodic updates so you can see your impact take root.",
  },
  {
    q: "Can I gift a tree to someone?",
    a: "Yes — when you donate, switch on “This is a gift” and add the recipient's name, an occasion, and a short message. We personalise the certificate so you can hand over a living gift for a birthday, Diwali, an anniversary, or in someone's memory.",
  },
  {
    q: "How do I know the donation is genuine?",
    a: "Every certificate carries a unique ID you can check on our public verification page at any time. Enter the ID and you'll see the donor, tree count, and date on record.",
  },
  {
    q: "Which species do you plant?",
    a: "Indigenous, climate-appropriate species such as Neem, Pongamia, Tamarind, and native fruit trees — chosen to thrive locally, shade and enrich the soil, and support wildlife and farmer livelihoods.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>(".animate-on-scroll").forEach((c) => c.classList.add("in-view"));
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-white" aria-labelledby="faq-heading">
      <div ref={sectionRef} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-forest-600 mb-3">
            Questions, Answered
          </span>
          <h2
            id="faq-heading"
            className="font-serif tracking-tight text-forest-900"
            style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", lineHeight: 1.15 }}
          >
            Frequently Asked{" "}
            <span className="italic text-forest-700">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="animate-on-scroll rounded-2xl border border-forest-100 bg-mist-50/50 overflow-hidden transition-shadow hover:shadow-card"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left min-h-[44px]"
                >
                  <span className="font-medium text-forest-900 text-[15px] sm:text-base">{item.q}</span>
                  <span
                    className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-white ring-1 ring-forest-100 text-forest-700 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
