// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Outfit } from "next/font/google"; // clean, modern display

// Expose heading font via CSS var (body text stays your existing font)
const heading = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bigtalents.org"),
  title: { default: "BGT — Big Talents Esports", template: "%s — BGT" },
  description:
    "Community-driven esports tournaments. $6,900+ awarded across NA & EU. Join the next BGT event.",
  alternates: { canonical: "https://bigtalents.org" },
  openGraph: {
    title: "BGT — Big Talents Esports",
    description:
      "Community-driven esports tournaments. $6,900+ awarded across NA & EU.",
    url: "https://bigtalents.org",
    siteName: "Big Talents",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BGT — Big Talents Esports" }],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Apply heading.variable so the CSS var is actually used (fixes the ESLint “unused” warning)
    <html lang="en" className={heading.variable}>
      <head>
        {/* allow content to extend under the notch & use safe-area insets */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* optional but nice for mobile UI chrome */}
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="safe-areas">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
