import type { jsPDF } from "jspdf";
import type { Donation } from "@/lib/supabase";
import { NOTO_SANS_REGULAR_B64, NOTO_SANS_BOLD_B64 } from "@/lib/certificateFont";

// ─────────────────────────────────────────────────────────────────────────────
// NFSF Certificate of Tree Plantation — landscape A4 PDF.
//
// Design notes:
// - Brand palette: deep forest header, forest-green accents, warm amber, ivory paper.
// - Signature element: a layered forest-horizon silhouette across the bottom
//   (echoes the hero on the landing page) plus hand-drawn leaf sprigs flanking
//   the title — all vector, no raster assets.
// - The ₹ glyph is unavailable in jsPDF's built-in fonts, so an embedded Noto
//   Sans subset (Latin + ₹) renders every amount. Display headings stay on the
//   built-in Times serif for an elegant serif/sans contrast (matching the site's
//   Playfair + Inter pairing).
// ─────────────────────────────────────────────────────────────────────────────

const VERIFY_DOMAIN = "nfsf.org.in";

// Brand logo (public/logo.png) — intrinsic 1692×929 ⇒ aspect ratio.
const LOGO_RATIO = 1692 / 929;

/** Fetch an image and return it as a data URL (browser-only). */
async function loadImageData(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

// Palette (RGB tuples)
const C = {
  paper: [255, 253, 247] as const,
  forestDark: [12, 31, 20] as const,
  forest: [21, 128, 61] as const,
  forestDeep: [16, 78, 48] as const,
  sage: [150, 184, 156] as const,
  sageLight: [196, 217, 198] as const,
  amber: [180, 83, 9] as const,
  ink: [55, 65, 60] as const,
  muted: [120, 128, 122] as const,
  faint: [160, 166, 161] as const,
  white: [255, 255, 255] as const,
};

type RGB = readonly [number, number, number];

function inr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function registerFonts(doc: jsPDF) {
  doc.addFileToVFS("NotoSans-Regular.ttf", NOTO_SANS_REGULAR_B64);
  doc.addFont("NotoSans-Regular.ttf", "NotoSans", "normal");
  doc.addFileToVFS("NotoSans-Bold.ttf", NOTO_SANS_BOLD_B64);
  doc.addFont("NotoSans-Bold.ttf", "NotoSans", "bold");
}

// A single pointed leaf, drawn from its base at (x, y), rotated `angleDeg`.
function leaf(doc: jsPDF, x: number, y: number, len: number, angleDeg: number, color: RGB) {
  const a = (angleDeg * Math.PI) / 180;
  const w = 0.3 * len;
  const rot = (dx: number, dy: number): [number, number] => [
    dx * Math.cos(a) - dy * Math.sin(a),
    dx * Math.sin(a) + dy * Math.cos(a),
  ];
  // Two cubic beziers: up one side to the tip, back down the other.
  const seg1 = [
    ...rot(0.28 * len, -w),
    ...rot(0.72 * len, -w),
    ...rot(len, 0),
  ];
  const seg2 = [
    ...rot(-0.28 * len, w),
    ...rot(-0.72 * len, w),
    ...rot(-len, 0),
  ];
  doc.setFillColor(color[0], color[1], color[2]);
  doc.lines([seg1, seg2], x, y, [1, 1], "F", true);
}

// A small sprig: a curved stem with a few leaves. `dir` flips it horizontally.
function sprig(doc: jsPDF, x: number, y: number, scale: number, dir: 1 | -1, color: RGB) {
  doc.setDrawColor(color[0], color[1], color[2]);
  doc.setLineWidth(0.4 * scale);
  // gentle stem
  doc.lines(
    [[dir * 5 * scale, -1 * scale, dir * 9 * scale, -5 * scale, dir * 12 * scale, -9 * scale]],
    x,
    y,
    [1, 1],
    "S",
    false
  );
  leaf(doc, x + dir * 2.5 * scale, y - 0.8 * scale, 5 * scale, dir > 0 ? -30 : 210, color);
  leaf(doc, x + dir * 5.5 * scale, y - 3 * scale, 5.5 * scale, dir > 0 ? -55 : 235, color);
  leaf(doc, x + dir * 8.5 * scale, y - 5.5 * scale, 5 * scale, dir > 0 ? -80 : 260, color);
  leaf(doc, x + dir * 11 * scale, y - 8.5 * scale, 4.2 * scale, dir > 0 ? -105 : 285, color);
}

// A stylised fir tree (stacked tiers) for the horizon silhouette.
function fir(doc: jsPDF, cx: number, baseY: number, w: number, h: number, color: RGB) {
  doc.setFillColor(color[0], color[1], color[2]);
  const tiers = 3;
  for (let i = 0; i < tiers; i++) {
    const ty = baseY - (h * 0.32 * i);
    const tw = w * (1 - i * 0.2);
    const th = h * 0.55;
    doc.triangle(cx - tw / 2, ty, cx + tw / 2, ty, cx, ty - th, "F");
  }
}

// Layered forest horizon along the bottom of the certificate.
function forestHorizon(doc: jsPDF, x0: number, x1: number, baseY: number) {
  // Deterministic, pseudo-random heights so the result is stable across renders.
  const wave = (i: number) => 0.5 + 0.5 * Math.sin(i * 1.7) * Math.cos(i * 0.6);

  // Back layer — lighter, shorter, denser.
  let i = 0;
  for (let cx = x0; cx <= x1; cx += 9, i++) {
    const h = 7 + wave(i) * 6;
    fir(doc, cx, baseY - 1, 9, h, C.sage);
  }
  // Front layer — deeper green, taller, offset.
  i = 0;
  for (let cx = x0 + 5; cx <= x1; cx += 12, i++) {
    const h = 11 + wave(i + 3) * 7;
    fir(doc, cx, baseY + 1.5, 12, h, C.forestDeep);
  }
  // Ground line.
  doc.setDrawColor(C.forest[0], C.forest[1], C.forest[2]);
  doc.setLineWidth(0.4);
  doc.line(x0 - 1, baseY + 1.8, x1 + 1, baseY + 1.8);
}

// Circular emblem near the signature.
function seal(doc: jsPDF, cx: number, cy: number) {
  doc.setDrawColor(C.forest[0], C.forest[1], C.forest[2]);
  doc.setFillColor(C.paper[0], C.paper[1], C.paper[2]);
  doc.setLineWidth(0.8);
  doc.circle(cx, cy, 12, "FD");
  doc.setLineWidth(0.4);
  doc.circle(cx, cy, 9.5, "S");

  // little tree mark
  fir(doc, cx, cy + 3, 8, 9, C.forest);
  doc.setDrawColor(C.amber[0], C.amber[1], C.amber[2]);
  doc.setLineWidth(0.7);
  doc.line(cx, cy + 3, cx, cy + 5.5);

  doc.setFont("times", "bold");
  doc.setFontSize(7);
  doc.setTextColor(C.forest[0], C.forest[1], C.forest[2]);
  doc.text("NFSF", cx, cy - 5.5, { align: "center" });
}

/**
 * Build and trigger download of the donor's plantation certificate.
 * Filename: NFSF-Certificate-<certificate_id>.pdf
 */
export async function generateCertificate(donation: Donation): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  registerFonts(doc);

  const W = 297;
  const H = 210;
  const CX = W / 2;

  const set = {
    fill: (c: RGB) => doc.setFillColor(c[0], c[1], c[2]),
    stroke: (c: RGB) => doc.setDrawColor(c[0], c[1], c[2]),
    text: (c: RGB) => doc.setTextColor(c[0], c[1], c[2]),
  };

  // ── Paper ──────────────────────────────────────────────────────────────────
  set.fill(C.paper);
  doc.rect(0, 0, W, H, "F");

  // ── Forest horizon (drawn first so the border frames it) ────────────────────
  forestHorizon(doc, 16, W - 16, 196);

  // ── Borders ─────────────────────────────────────────────────────────────────
  set.stroke(C.forest);
  doc.setLineWidth(1.6);
  doc.rect(9, 9, W - 18, H - 18, "S");
  doc.setLineWidth(0.4);
  doc.rect(12, 12, W - 24, H - 24, "S");

  // ── Header band ──────────────────────────────────────────────────────────────
  set.fill(C.forestDark);
  doc.rect(12, 12, W - 24, 26, "F");

  // Brand logo on a white plate (falls back to a wordmark if it can't be loaded).
  const logoData = await loadImageData("/logo.png");
  if (logoData) {
    const lh = 13.5;
    const lw = lh * LOGO_RATIO;
    set.fill(C.white);
    doc.roundedRect(CX - lw / 2 - 2.5, 13.6, lw + 5, lh + 2.4, 2, 2, "F");
    doc.addImage(logoData, "PNG", CX - lw / 2, 14.8, lw, lh);
  } else {
    doc.setFont("times", "bold");
    doc.setFontSize(17);
    set.text(C.white);
    doc.text("Nature and Farmer Sustainability Foundation", CX, 24, { align: "center" });
  }

  doc.setFont("NotoSans", "normal");
  doc.setFontSize(8.5);
  set.text(C.sageLight);
  doc.text(
    "Registered under the Societies Registration Act, 1860",
    CX,
    34.5,
    { align: "center" }
  );

  // ── Title + flanking sprigs ──────────────────────────────────────────────────
  doc.setFont("times", "bolditalic");
  doc.setFontSize(25);
  set.text(C.forest);
  doc.text("Certificate of Tree Plantation", CX, 55, { align: "center" });

  const titleHalf = doc.getTextWidth("Certificate of Tree Plantation") / 2;
  sprig(doc, CX - titleHalf - 9, 53, 1, -1, C.forest);
  sprig(doc, CX + titleHalf + 9, 53, 1, 1, C.forest);

  set.stroke(C.amber);
  doc.setLineWidth(0.7);
  doc.line(CX - 32, 60, CX + 32, 60);

  // ── Recipient ─────────────────────────────────────────────────────────────────
  doc.setFont("NotoSans", "normal");
  doc.setFontSize(11);
  set.text(C.muted);
  doc.text("This is to gratefully certify that", CX, 71, { align: "center" });

  // Donor name — most prominent element, auto-shrink to fit.
  let nameSize = 32;
  doc.setFont("times", "bold");
  doc.setFontSize(nameSize);
  const maxNameWidth = W - 90;
  while (doc.getTextWidth(donation.donor_name) > maxNameWidth && nameSize > 16) {
    nameSize -= 1;
    doc.setFontSize(nameSize);
  }
  set.text(C.forestDark);
  doc.text(donation.donor_name, CX, 88, { align: "center", charSpace: 0.3 });

  const nameWidth = doc.getTextWidth(donation.donor_name) + 0.3 * (donation.donor_name.length - 1);
  set.stroke(C.amber);
  doc.setLineWidth(0.5);
  doc.line(CX - nameWidth / 2 - 4, 92, CX + nameWidth / 2 + 4, 92);

  // ── Citation ──────────────────────────────────────────────────────────────────
  const treeWord = donation.trees === 1 ? "tree" : "trees";
  doc.setFont("NotoSans", "normal");
  doc.setFontSize(12);
  set.text(C.ink);
  doc.text(
    `has generously sponsored the planting and lifelong care of ${donation.trees} ${treeWord} through our farmers,`,
    CX,
    103,
    { align: "center" }
  );
  doc.text(
    `contributing ${inr(donation.amount)} toward reforestation and farmer livelihoods.`,
    CX,
    110,
    { align: "center" }
  );

  // ── Inspiring line ───────────────────────────────────────────────────────────
  doc.setFont("times", "italic");
  doc.setFontSize(13);
  set.text(C.forestDeep);
  doc.text(
    "“Your generosity is growing roots that will outlast us all.”",
    CX,
    123,
    { align: "center" }
  );

  // ── Meta row (Date · Location · Trees · Contribution) ────────────────────────
  const meta: Array<[string, string]> = [
    [
      "DATE",
      new Date(donation.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    ],
    ["PLANTED ON", "Our own farmland"],
    ["TREES PLANTED", `${donation.trees}`],
    ["CONTRIBUTION", inr(donation.amount)],
  ];

  const colLeft = 36;
  const colRight = W - 36;
  const colSpan = (colRight - colLeft) / meta.length;
  const metaTop = 134;
  const metaBot = 150;

  set.stroke(C.sage);
  doc.setLineWidth(0.3);
  doc.line(colLeft, metaTop, colRight, metaTop);
  doc.line(colLeft, metaBot, colRight, metaBot);

  meta.forEach(([label, value], idx) => {
    const cx = colLeft + colSpan * (idx + 0.5);
    if (idx > 0) {
      doc.line(colLeft + colSpan * idx, metaTop + 1.5, colLeft + colSpan * idx, metaBot - 1.5);
    }
    doc.setFont("NotoSans", "bold");
    doc.setFontSize(7);
    set.text(C.amber);
    doc.text(label, cx, metaTop + 5.5, { align: "center", charSpace: 0.4 });
    doc.setFont("NotoSans", "normal");
    doc.setFontSize(10.5);
    set.text(C.forestDark);
    doc.text(value, cx, metaTop + 12, { align: "center" });
  });

  // ── 80G note ──────────────────────────────────────────────────────────────────
  doc.setFont("NotoSans", "normal");
  doc.setFontSize(8.5);
  set.text(C.muted);
  doc.text(
    "This donation is eligible for 80G tax deduction under the Income Tax Act, 1961.",
    CX,
    158,
    { align: "center" }
  );

  // ── Footer: certificate id + verify (left), seal (centre), signatory (right) ──
  const verifyUrl = `${VERIFY_DOMAIN}/verify/${donation.certificate_id}`;

  doc.setFont("NotoSans", "bold");
  doc.setFontSize(8);
  set.text(C.faint);
  doc.text("CERTIFICATE ID", 24, 170, { charSpace: 0.3 });
  doc.setFont("NotoSans", "normal");
  doc.setFontSize(9.5);
  set.text(C.forestDark);
  doc.text(donation.certificate_id, 24, 175.5);
  doc.setFontSize(8);
  set.text(C.muted);
  doc.text(`Verify at  ${verifyUrl}`, 24, 181);

  seal(doc, CX, 173);

  set.stroke(C.ink);
  doc.setLineWidth(0.4);
  doc.line(W - 78, 174, W - 24, 174);
  doc.setFont("times", "bolditalic");
  doc.setFontSize(13);
  set.text(C.forestDeep);
  doc.text("NFSF", W - 51, 172, { align: "center" });
  doc.setFont("NotoSans", "normal");
  doc.setFontSize(8);
  set.text(C.muted);
  doc.text("Authorised Signatory", W - 51, 179, { align: "center" });

  doc.save(`NFSF-Certificate-${donation.certificate_id}.pdf`);
}
