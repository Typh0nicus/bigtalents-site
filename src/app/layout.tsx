// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Outfit, Teko } from "next/font/google";

// Body/secondary font
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

// Display font for headings - esports aesthetic (similar to TECHNOPATH)
const displayFont = Teko({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bigtalents.org"),
  title: { default: "Big Talents", template: "Big Talents | %s" },
  description:
    "Premier competitive esports organization fielding championship rosters, hosting elite events, and building the future of Brawl Stars esports. 10,000+ players, $7,300+ awarded.",
  alternates: { canonical: "https://bigtalents.org" },
  keywords: [
    "Brawl Stars esports",
    "competitive Brawl Stars",
    "BGT",
    "Big Talents",
    "esports organization",
    "Brawl Stars rosters",
    "esports tournaments",
    "competitive gaming"
  ],
  openGraph: {
    title: "Big Talents",
    description:
      "Championship rosters, elite tournaments, and exclusive community access. Join 10,000+ players in the BGT ecosystem.",
    url: "https://bigtalents.org",
    siteName: "Big Talents",
    images: [
      { 
        url: "/og.png", 
        width: 1200, 
        height: 630, 
        alt: "Big Talents" 
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bgtalents",
    creator: "@bgtalents",
    title: "Big Talents — Premier Brawl Stars Esports",
    description: "Championship rosters, elite events, and 10,000+ players strong.",
    images: ["/og.png"],
  },
  icons: { 
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  authors: [{ name: "Big Talents", url: "https://bigtalents.org" }],
  creator: "Big Talents",
  publisher: "Big Talents",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#D4AF37", 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${outfit.variable}`}>
      <body className="safe-areas">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
