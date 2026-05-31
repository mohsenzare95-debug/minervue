"use client";

import { useState } from "react";
import { supabase } from "@/shared/supabase/client";

export default function ResetPassword() {
  const [password, setPassword] = useState("");

  const updatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) return alert(error.message);

    alert("Password updated");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={updatePassword}>
        Update
      </button>
    </div>
  );
}