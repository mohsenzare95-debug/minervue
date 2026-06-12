import "./globals.css";
import type { Metadata } from "next";
import NavbarWrapper from "./NavbarWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "VisoSage",
  description: "Flashcards for Ophthalmologists",

  manifest: "/manifest.json",

  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    { rel: "icon", url: "/icon.png", type: "image/png" },
  ],

  openGraph: {
    title: "VisoSage",
    description: "Flashcards for Ophthalmologists",
    url: "https://visosage.vercel.app",
    siteName: "VisoSage",
    images: [
      {
        url: "https://visosage.vercel.app/og.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "VisoSage",
    description: "Flashcards for Ophthalmologists",
    images: ["https://visosage.vercel.app/og.png"],
  },

  appleWebApp: {
    capable: true,
    title: "Flashcards",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="app">{children}</main>

        <NavbarWrapper />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}