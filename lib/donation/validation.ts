export const PRICE_PER_TREE = 300;

// Accepts both legacy 4-char IDs and new longer server-generated IDs.
export const CERT_ID_RE = /^NFSF-\d{8}-[A-Z0-9]{4,32}$/;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidCertId(id: unknown): id is string {
  return typeof id === "string" && CERT_ID_RE.test(id);
}

export interface GiftInput {
  isGift: boolean;
  recipientName?: string;
  occasion?: string;
  treeName?: string;
  message?: string;
}

export interface DonationInput {
  name: string;
  email: string;
  trees: number;
  gift: GiftInput;
}

type ValidationResult =
  | { ok: true; value: DonationInput }
  | { ok: false; error: string };

/** Server-side validation for an incoming donation. Never trust the client. */
export function validateDonation(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }
  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const trees =
    typeof b.trees === "number"
      ? b.trees
      : typeof b.trees === "string"
      ? parseInt(b.trees, 10)
      : NaN;

  if (name.length < 1 || name.length > 100) {
    return { ok: false, error: "Name must be between 1 and 100 characters." };
  }
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (!Number.isInteger(trees) || trees < 1 || trees > 1000) {
    return { ok: false, error: "Number of trees must be between 1 and 1000." };
  }

  // Gift fields — optional, capped to match client-side limits
  const rawGift = b.gift && typeof b.gift === "object" ? b.gift as Record<string, unknown> : {};
  const gift: GiftInput = { isGift: rawGift.isGift === true };
  if (gift.isGift) {
    const rn = typeof rawGift.recipientName === "string" ? rawGift.recipientName.trim() : "";
    if (rn.length > 0) gift.recipientName = rn.slice(0, 60);
    const occ = typeof rawGift.occasion === "string" ? rawGift.occasion.trim() : "";
    if (occ.length > 0) gift.occasion = occ.slice(0, 80);
    const tn = typeof rawGift.treeName === "string" ? rawGift.treeName.trim() : "";
    if (tn.length > 0) gift.treeName = tn.slice(0, 40);
    const msg = typeof rawGift.message === "string" ? rawGift.message.trim() : "";
    if (msg.length > 0) gift.message = msg.slice(0, 140);
  }

  return { ok: true, value: { name, email, trees, gift } };
}
