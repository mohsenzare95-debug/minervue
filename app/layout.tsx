import "./globals.css";
import type { Metadata } from "next";
import NavbarWrapper from "./NavbarWrapper";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "VisoSage",
  description: "Flashcards for Ophthalmologists",

  manifest: "/manifest.json",

  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    { rel: "icon", url: "/icon.png", type: "image/png" },
  ],

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
      </body>
    </html>
  );
}