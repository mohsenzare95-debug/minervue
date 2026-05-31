import { useState } from "react";
import { signInWithEmail } from "../lib/SignInWithEmail";

export function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn(
    email: string,
    password: string
  ) {
    try {
      setLoading(true);
      setError(null);

      await signInWithEmail(email, password);

      return true;
    } catch (e: any) {
      setError(e.message);

      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    signIn,
    loading,
    error,
  };
}