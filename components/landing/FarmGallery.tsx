import Image from "next/image";

/** Four small plantation photos (moved here from the hero) — a quick visual
 * glimpse of the farmland that backs up the "how it works" steps. */
const PHOTOS = [
  { src: "/images/india-farm-a.webp", caption: "Native saplings planted on our dedicated farmland" },
  { src: "/images/farm-planting-2.webp", caption: "Our farmers plant every tree by hand" },
  { src: "/images/india-farm-c.webp", caption: "Cared for through the vulnerable early years" },
  { src: "/images/field-sunset.jpg", caption: "A living forest that grows for fifty years" },
];

export default function FarmGallery() {
  return (
    <section className="bg-white py-10 md:py-20" aria-label="From our farmland">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-on-scroll">
          <p className="text-forest-600 text-sm font-semibold tracking-widest uppercase mb-3">
            From Our Farmland
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900">
            Real Trees, Real Ground
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PHOTOS.map((p, i) => (
            <figure
              key={p.src}
              className="animate-on-scroll group relative aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-black/5 shadow-sm"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Image
                src={p.src}
                alt={p.caption}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(180deg, rgba(7,26,13,0) 45%, rgba(7,26,13,0.85) 100%)" }}
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 text-white text-xs sm:text-sm font-light leading-snug">
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
