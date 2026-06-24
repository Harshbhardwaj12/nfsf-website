const STEPS = [
  {
    n: "1",
    title: "Choose your trees",
    text: "Pick how many trees you'd like to plant — each one is ₹300.",
  },
  {
    n: "2",
    title: "Pay securely",
    text: "Complete your donation through our secure payment process.",
  },
  {
    n: "3",
    title: "Get your certificate",
    text: "Receive a verified digital certificate with a unique ID, instantly.",
  },
  {
    n: "4",
    title: "Your tree is planted",
    text: "Local farmers plant and care for your tree in Andhra Pradesh.",
  },
];

export default function ProcessSteps() {
  return (
    <section id="how-it-works" className="bg-forest-50" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-forest-600 text-sm font-semibold tracking-widest uppercase">
            Simple &amp; Transparent
          </span>
          <h2
            id="process-heading"
            className="text-forest-800 font-bold mt-3"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.15 }}
          >
            How It Works
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STEPS.map((step) => (
            <div key={step.n} className="text-center">
              <div className="mx-auto mb-5 flex items-center justify-center w-14 h-14 rounded-full bg-forest-700 text-white text-xl font-bold">
                {step.n}
              </div>
              <h3 className="text-forest-800 font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
