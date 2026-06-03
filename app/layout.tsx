// app/layout.tsx
"use client";

import "./globals.css";
import Navbar from "@/shared/ui/Navbar";
import { useEffect } from "react";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import { syncEngine } from "@/shared/storage/sync/syncEngine"; // مسیر خودت

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthSession();

  useEffect(() => {
    
    // وقتی کاربر لود شد و موجود بود، syncEngine رو استارت کن
    if (!loading && user) {
      syncEngine.start(user);
    }
  }, [loading, user]);

  return (
    <html lang="en">
      <body>
        <main className="app">{children}</main>
        <Navbar />
      </body>
    </html>
  );
}