// app/NavbarWrapper.tsx
"use client";

import { useEffect } from "react";
import Navbar from "@/shared/ui/Navbar";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import { syncEngine } from "@/shared/storage/sync/syncEngine";

export default function NavbarWrapper() {
  const { user, loading } = useAuthSession();

  useEffect(() => {
    if (!loading && user) {
      syncEngine.start(user);
    }
  }, [loading, user]);

  return <Navbar />;
}