//features\auth\hooks\useForgetPassword.ts
import { useState } from "react";
import { recoveryPassword } from "../lib/RecoveryPassword";

export function useForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function sendReset(email: string) {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await recoveryPassword(email);

      setSuccess(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { sendReset, loading, error, success };
}