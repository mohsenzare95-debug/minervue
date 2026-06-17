import "./globals.css";
import type { Metadata } from "next";
import NavbarWrapper from "./NavbarWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PostHogProvider from "@/features/analytics/PostHogProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://visosage.com"),

  title: {
    default: "VisoSage – Ophthalmology Flashcards",
    template: "%s | VisoSage",
  },

  description:
    "Ophthalmology flashcards for residents and specialists. Structured clinical summaries for rapid exam preparation and clinical practice.",

  keywords: [
    "ophthalmology",
    "flashcards",
    "retina",
    "glaucoma",
    "uveitis",
    "cataract",
    "medical education",
    "board exam",
    "residents",
  ],

  authors: [{ name: "Mohsen Zare" }],
  creator: "VisoSage",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://visosage.com",
  },

  openGraph: {
    title: "VisoSage – Ophthalmology Flashcards",
    description:
      "Structured ophthalmology flashcards for residents and board exam preparation.",
    url: "https://visosage.com",
    siteName: "VisoSage",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "VisoSage ophthalmology flashcards",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "VisoSage – Ophthalmology Flashcards",
    description:
      "Structured ophthalmology flashcards for residents and board exam preparation.",
    images: ["/og.png"],
  },

  appleWebApp: {
    capable: true,
    title: "VisoSage",
    statusBarStyle: "default",
  },

  formatDetection: {
    telephone: false,
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
        <PostHogProvider>
          <main className="app">{children}</main>

          <NavbarWrapper />

          <Analytics />
          <SpeedInsights />
        </PostHogProvider>
      </body>
    </html>
  );
}