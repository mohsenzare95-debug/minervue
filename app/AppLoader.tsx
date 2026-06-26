"use client";

import { useState } from "react";
import SplashScreen from "@/features/SplashScreen";

export default function AppLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  return showSplash ? (
    <SplashScreen onFinish={() => setShowSplash(false)} />
  ) : (
    <>{children}</>
  );
}