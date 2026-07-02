// Gift details for a donation. These are intentionally NOT persisted in the
// database — they travel from the donate form to the thank-you page via
// sessionStorage and are baked into the client-generated certificate PDF only.
// Because they never touch the server or DB, they add no new attack surface;
// we still cap lengths on input as a courtesy to the PDF layout.

export interface GiftDetails {
  isGift: boolean;
  recipientName?: string;
  occasion?: string;
  message?: string;
  treeName?: string;
}

export const GIFT_OCCASIONS = [
  "Birthday",
  "Diwali",
  "Anniversary",
  "Wedding",
  "Graduation",
  "New Baby",
  "In Memory",
  "Just Because",
] as const;

export const GIFT_LIMITS = {
  recipientName: 60,
  message: 140,
  treeName: 40,
} as const;

const KEY = (certId: string) => `nfsf_gift_${certId}`;

/** Stash gift details for a certificate so the thank-you page can render them. */
export function stashGift(certId: string, gift: GiftDetails): void {
  try {
    sessionStorage.setItem(KEY(certId), JSON.stringify(gift));
  } catch {
    /* sessionStorage unavailable — certificate just renders without gift extras */
  }
}

/** Read gift details stashed for a certificate, if any. */
export function readGift(certId: string): GiftDetails | null {
  try {
    const raw = sessionStorage.getItem(KEY(certId));
    return raw ? (JSON.parse(raw) as GiftDetails) : null;
  } catch {
    return null;
  }
}
