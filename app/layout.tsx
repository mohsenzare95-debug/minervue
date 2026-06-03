import "./globals.css";
import type { Metadata } from "next";
import NavbarWrapper from "./NavbarWrapper"; // کامپوننت client برای Navbar و syncEngine

export const metadata: Metadata = {
  title: "Minervue", // این عنوان توی تب مرورگر و PWA نمایش داده می‌شود
  description: "Flashcards for Ophthalmologists", // توضیح کوتاه اپ

  // PWA manifest
  manifest: "/manifest.json",

  // این خط باعث میشه کاربر نتونه زوم کنه
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",


  // آیکون‌ها و favicon
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      url: "/icon.png",
      type: "image/png",
    },
  ],

  // تنظیمات مخصوص iOS
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
      </body>
    </html>
  );
}