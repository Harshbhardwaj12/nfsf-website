import Image from "next/image";

const IMAGES = [
  { src: "/images/hands-sapling.jpg", alt: "Hands holding a young sapling ready to plant" },
  { src: "/images/farmer-field.jpg", alt: "A farmer working in a green field" },
  { src: "/images/forest-mist.jpg", alt: "A restored forest in morning mist" },
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
