import { useState } from "react";
import { Auth } from "@/shared/supabase/auth";

export function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signUp(
  username: string,
  email: string,
  password: string
) {
    try {
      setLoading(true);
      setError(null);

      const res = await Auth.signUp(email, password,  {username,}
);

      if (res.error) {
  setError(
    res.error.message === "SIGNUP_FAILED"
      ? "این ایمیل قبلاً ثبت شده یا نیاز به تایید دارد"
      : res.error.message
  );
  return false;
}

if (!res.user) {
  setError("خطای غیرمنتظره در ثبت‌نام");
  return false;
}

      return true;
    } finally {
      setLoading(false);
    }
  }

  return { signUp, loading, error };
}