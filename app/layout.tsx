import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nature and Farmer Sustainability Foundation — Plant a Tree for ₹300",
  description:
    "Support reforestation in Andhra Pradesh. Donate ₹300 to plant a tree, receive a digital certificate, and help offset carbon emissions. Based in Bangalore.",
  keywords: ["tree plantation", "India", "NGO", "Andhra Pradesh", "carbon offset", "reforestation", "donate"],
  openGraph: {
    title: "Nature and Farmer Sustainability Foundation",
    description: "Plant a tree in Andhra Pradesh for ₹300. Receive a digital certificate.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
