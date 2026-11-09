import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VELQON — Interior Architecture Studio",
    template: "%s | VELQON",
  },
  description:
    "VELQON is a premier Dubai-based interior architecture studio crafting extraordinary residences, penthouses, and bespoke hospitality spaces with cinematic perfection.",
  keywords: [
    "interior design dubai",
    "luxury interior architecture",
    "palm jumeirah interior design",
    "minimalist luxury villa",
    "bespoke joinery dubai",
    "VELQON",
  ],
  authors: [{ name: "VELQON Studio" }],
  openGraph: {
    title: "VELQON — Interior Architecture Studio",
    description:
      "Crafting extraordinary living spaces with timeless elegance, honest materiality, and quiet luxury.",
    type: "website",
    locale: "en_US",
    siteName: "VELQON",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#08080a] text-[#fafafa] selection:bg-[#c5a880] selection:text-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
