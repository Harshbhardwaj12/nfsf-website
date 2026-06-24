const COLS = [
  {
    title: "For the Environment",
    text: "Restore degraded land, increase green cover, and offset carbon emissions across India.",
    icon: (
      <path d="M12 22V8m0 0c0-3 2-5 5-5 0 3-2 5-5 5Zm0 0c0-3-2-5-5-5 0 3 2 5 5 5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "For the Farmers",
    text: "Provide steady income to marginal farmer families in Andhra Pradesh who plant and care for the trees.",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "For You",
    text: "Receive a verified digital certificate and an 80G tax deduction on your donation.",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
];

export default function WhyNFSF() {
  return (
    <section className="bg-white" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-forest-600 text-sm font-semibold tracking-widest uppercase">
            Why It Matters
          </span>
          <h2
            id="why-heading"
            className="text-forest-800 font-bold mt-3"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.15 }}
          >
            One Donation, Three Lives Changed
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {COLS.map((col) => (
            <div key={col.title} className="text-center">
              <div className="mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-2xl bg-forest-50 text-forest-700">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden="true">
                  {col.icon}
                </svg>
              </div>
              <h3 className="text-forest-800 font-semibold text-xl mb-3">{col.title}</h3>
              <p className="text-gray-600 leading-relaxed">{col.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
