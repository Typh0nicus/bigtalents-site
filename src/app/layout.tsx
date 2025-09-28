// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Outfit } from "next/font/google";

// Display font just for headings (exposed as CSS var)
const heading = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bigtalents.org"),
  title: { default: "BGT — Big Talents", template: "%s — BGT" },
  description:
    "Big Talents, Bigger Stages. $6,900+ awarded across NA & EU. Join the next BGT event.",
  alternates: { canonical: "https://bigtalents.org" },
  openGraph: {
    title: "Home — Big Talents",
    description:
      "Community-driven esports tournaments. $6,900+ awarded across NA & EU.",
    url: "https://bigtalents.org",
    siteName: "Big Talents",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Home — Big Talents" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bgtalents",
    creator: "@bgtalents",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#B8941C",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={heading.variable}>
      <body className="safe-areas">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
