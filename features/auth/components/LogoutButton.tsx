"use client";

import { useSignOut } from "../hooks/useSignOut";

export function LogoutButton() {
  const { signOut, loading } = useSignOut();

  return (
    <button onClick={signOut} disabled={loading}>
      Logout
    </button>
  );
}