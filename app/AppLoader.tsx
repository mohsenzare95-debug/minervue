// app/AppLoader.tsx
"use client";

import { useState } from "react";
import SplashScreen from "@/features/SplashScreen";

export default function AppLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {/* محتوای اصلی همیشه رندر می‌شود (برای انیمیشن باز شدن پلک روی صفحه واقعی) */}
      {children}

      {/* اسپلش به صورت Overlay نمایش داده می‌شود */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}
    </>
  );
}