import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "BGT — Big Talents Esports",
  description:
    "Community-driven esports tournaments. $6,900+ awarded across NA & EU. Join the next BGT event.",
  openGraph: {
    title: "BGT — Big Talents Esports",
    description:
      "Community-driven esports tournaments. $6,900+ awarded across NA & EU.",
    url: "https://bigtalents.org",
    siteName: "Big Talents",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "BGT — Big Talents Esports",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bgtalents",
    creator: "@bgtalents",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
