import Image from "next/image";

const IMAGES = [
  { src: "/images/farm-planting-2.webp", alt: "Farmers planting saplings together in a field in India" },
  { src: "/images/farm-planting-3.webp", alt: "A farmer tending newly planted trees in Andhra Pradesh" },
  { src: "/images/farm-planting-4.webp", alt: "A plantation site with young trees taking root" },
];

export default function ImageStrip() {
  return (
    <section className="bg-white" aria-label="Photos from our plantation work">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {IMAGES.map((img) => (
          <div key={img.src} className="relative aspect-[4/3] sm:aspect-square">
            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
