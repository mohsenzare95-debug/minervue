//features\auth\components\ForgetPasswordForm.tsx
"use client";

import { useState } from "react";
import { useForgetPassword } from "../hooks/useForgetPassword";

export function ForgetPasswordForm() {
  const { sendReset, loading, error, success } =
    useForgetPassword();

  const [email, setEmail] = useState("");

  return (
    <div>
      <h3>Reset Password</h3>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        disabled={loading}
        onClick={() => sendReset(email)}
      >
        Send reset email
      </button>

      {success && <p>Email sent</p>}
      {error && <p>{error}</p>}
    </div>
  );
}