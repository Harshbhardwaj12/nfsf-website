const STATS = [
  { value: "50,000+", label: "Trees Planted" },
  { value: "200+", label: "Farmer Families Supported" },
  { value: "92%", label: "Survival Rate" },
  { value: "1,200 T", label: "CO₂ Offset" },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-gray-100" aria-label="Our impact in numbers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center px-2 pt-4 md:pt-0">
              <span className="text-3xl md:text-4xl font-bold text-forest-700 leading-none mb-2">
                {stat.value}
              </span>
              <span className="text-gray-500 text-xs md:text-sm uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
