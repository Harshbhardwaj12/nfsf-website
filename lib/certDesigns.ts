// Certificate visual themes the donor can choose on the thank-you page.
// The chosen id is passed to both the HTML preview (CertificatePreview) and the
// PDF generator (lib/certificate.ts). Kept tiny and serialisable.

export type CertDesignId = "classic" | "photo" | "ivory";

export interface CertDesign {
  id: CertDesignId;
  name: string;
  desc: string;
  /** Header background photo (used by the "photo" theme), from /public. */
  photo?: string;
}

export const CERT_DESIGNS: CertDesign[] = [
  { id: "classic", name: "Classic Forest", desc: "Deep green header, ivory paper" },
  { id: "photo", name: "Photo Banner", desc: "Plantation photo header", photo: "/images/forest-path.jpg" },
  { id: "ivory", name: "Minimal Ivory", desc: "Clean, light and understated" },
];

export const DEFAULT_CERT_DESIGN: CertDesignId = "classic";
