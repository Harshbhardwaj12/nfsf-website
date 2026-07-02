/**
 * ImageStrip.tsx — Full-width three-column strip of plantation photos
 * showcasing on-the-ground planting work.
 */

import Image from "next/image";

const IMAGES = [
  { src: "/images/farm-planting-2.webp", alt: "Farmers planting saplings together in a field in India" },
  { src: "/images/farm-planting-3.webp", alt: "A farmer tending newly planted trees on our dedicated farmland" },
  { src: "/images/farm-planting-4.webp", alt: "A plantation site with young trees taking root" },
];

/** Renders a three-column strip of plantation photographs. */
export default function ImageStrip() {
  return (
    <section className="bg-white" aria-label="Photos from our plantation work">
      <div className="grid grid-cols-3">
        {IMAGES.map((img) => (
          <div key={img.src} className="relative aspect-square">
            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
