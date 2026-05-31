import { useState } from "react";
import { logOut } from "../lib/LogOut";

export function useSignOut() {
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    await logOut();
    setLoading(false);
  }

  return { signOut, loading };
}