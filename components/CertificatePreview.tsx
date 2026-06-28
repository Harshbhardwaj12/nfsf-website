import Image from "next/image";
import { type Donation } from "@/lib/supabase";
import { type GiftDetails } from "@/lib/gift";
import { type CertDesignId, CERT_DESIGNS, DEFAULT_CERT_DESIGN } from "@/lib/certDesigns";

/**
 * Lightweight HTML preview of the donor's certificate. Mirrors the generated
 * PDF (lib/certificate.ts) closely enough to set expectations, and supports the
 * same selectable themes. Purely presentational.
 */
export default function CertificatePreview({
  donation,
  gift,
  design = DEFAULT_CERT_DESIGN,
}: {
  donation: Donation;
  gift?: GiftDetails | null;
  design?: CertDesignId;
}) {
  const dateStr = new Date(donation.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const isGift = !!(gift?.isGift && gift.recipientName);
  const photo = CERT_DESIGNS.find((d) => d.id === "photo")?.photo ?? "/images/forest-path.jpg";

  const meta: [string, string][] = [
    ["Date", dateStr],
    isGift && gift?.treeName
      ? ["Tree named", gift.treeName]
      : ["Planted on", "Our dedicated farmland"],
    ["Trees", `${donation.trees}`],
    ["Contribution", `₹${donation.amount.toLocaleString("en-IN")}`],
  ];

  const paper = design === "ivory" ? "bg-[#fcfdfb]" : "bg-[#fffdf7]";
  const accent = design === "ivory" ? "text-forest-700" : "text-earth-600";

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden ring-1 ring-forest-200 shadow-card ${paper} select-none`}
      style={{ aspectRatio: "297 / 210" }}
      aria-label="Certificate preview"
    >
      <div className="absolute inset-[3%] rounded-lg ring-1 ring-forest-300/50 pointer-events-none z-10" />

      <div className="relative h-full flex flex-col">
        {/* ── Header (varies by theme) ── */}
        {design === "photo" ? (
          <div className="relative flex items-center justify-center py-[4.5%] overflow-hidden">
            <Image src={photo} alt="" fill sizes="700px" className="object-cover" />
            <div className="absolute inset-0 bg-forest-950/55" />
            <span className="relative inline-flex items-center rounded bg-white/95 px-2 py-1">
              <Image src="/logo.png" alt="NFSF" width={120} height={36} className="h-[clamp(14px,3.2vw,26px)] w-auto" />
            </span>
          </div>
        ) : design === "ivory" ? (
          <div className="flex flex-col items-center pt-[4%] pb-[2%]">
            <Image src="/logo.png" alt="NFSF" width={120} height={36} className="h-[clamp(14px,3.2vw,26px)] w-auto" />
            <div className="h-px w-[20%] bg-forest-300 mt-[2.5%]" />
          </div>
        ) : (
          <div className="bg-forest-950 flex items-center justify-center py-[3%]">
            <span className="inline-flex items-center rounded bg-white px-2 py-1">
              <Image src="/logo.png" alt="NFSF" width={120} height={36} className="h-[clamp(14px,3.2vw,26px)] w-auto" />
            </span>
          </div>
        )}

        {/* ── Body (shared) ── */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-[6%] py-[2%]">
          <p className="font-serif italic text-forest-700" style={{ fontSize: "clamp(0.8rem, 2.6vw, 1.6rem)" }}>
            Certificate of Tree Plantation
          </p>
          <div className={`h-px w-10 my-[2%] ${design === "ivory" ? "bg-forest-400" : "bg-earth-500"}`} />

          <p className="text-gray-500" style={{ fontSize: "clamp(0.4rem, 1.1vw, 0.7rem)" }}>
            This is to gratefully certify that
          </p>
          <p className="font-serif font-bold text-forest-950 leading-tight" style={{ fontSize: "clamp(0.95rem, 3.4vw, 2rem)" }}>
            {donation.donor_name}
          </p>

          {isGift && (
            <p className={`font-semibold tracking-wide mt-[1.5%] ${accent}`} style={{ fontSize: "clamp(0.4rem, 1.1vw, 0.72rem)" }}>
              A LIVING GIFT FOR {gift!.recipientName!.toUpperCase()}
              {gift?.occasion ? ` · ${gift.occasion.toUpperCase()}` : ""}
            </p>
          )}

          <p className="font-serif italic text-forest-800 mt-[1.5%] max-w-[80%]" style={{ fontSize: "clamp(0.45rem, 1.3vw, 0.85rem)" }}>
            {isGift && gift?.message
              ? `“${gift.message}”`
              : "“Your generosity is growing roots that will outlast us all.”"}
          </p>

          <div className="mt-[3%] w-full max-w-[90%] grid grid-cols-4 border-y border-forest-200/70 divide-x divide-forest-200/70">
            {meta.map(([label, value]) => (
              <div key={label} className="px-1 py-[2%]">
                <p className={`font-semibold uppercase tracking-wide ${accent}`} style={{ fontSize: "clamp(0.3rem, 0.85vw, 0.55rem)" }}>
                  {label}
                </p>
                <p className="text-forest-950 mt-0.5 truncate" style={{ fontSize: "clamp(0.4rem, 1vw, 0.72rem)" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-[6%] pb-[3%] flex items-center justify-between text-forest-700/70">
          <span className="font-mono truncate" style={{ fontSize: "clamp(0.3rem, 0.8vw, 0.5rem)" }}>
            {donation.certificate_id}
          </span>
          <span className="font-serif italic" style={{ fontSize: "clamp(0.4rem, 1vw, 0.7rem)" }}>
            NFSF
          </span>
        </div>
      </div>
    </div>
  );
}
