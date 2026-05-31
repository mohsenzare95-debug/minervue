"use client";

import "./globals.css";
import Navbar from "@/shared/ui/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="app">
          {children}
        </main>

        <Navbar />
      </body>
    </html>
  );
}