//features\auth\components\SignUpForm.tsx
"use client";

import { useEffect, useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

export function SignUpForm({
  onClose,
  onSwitchToSignin,
  message,
}: {
  onClose: () => void;
  onSwitchToSignin: () => void;
  message?: string;
}) {
  const { signUp, loading, error } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // ESC close + body scroll lock
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  async function handleSubmit() {
    if (!username || !email || !password) return;

    const success = await signUp(
      username.trim(),
      email.trim(),
      password
    );

    if (success === true) {
      onClose();
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >

         {message && (
          <>
            <div style={styles.message}>
              {message}
            </div>
            <div style={styles.messageDivider} />
          </>
        )}
        
        <h3 style={styles.title}>Sign Up</h3>

               <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <input
          style={styles.input}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          type="button"
          style={styles.switchBtn}
          onClick={onSwitchToSignin}
        >
          Already have an account?
        </button>

        {error && (
          <p style={styles.error}>{error}</p>
        )}

        <div style={styles.actions}>
          <button
            style={styles.secondaryBtn}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            style={{
              ...styles.primaryBtn,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: 16,
  },

  modal: {
    width: "100%",
    maxWidth: 380,
    background: "#fff",
    borderRadius: 8,
    padding: 20,
    boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
  },

  title: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 16,
  },

  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
    outline: "none",
    fontSize: 14,
    boxSizing: "border-box",
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginTop: 12,
  },

  primaryBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
  },

  secondaryBtn: {
    background: "#f2f2f2",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
  },

  error: {
    color: "#d11a2a",
    fontSize: 13,
    marginBottom: 10,
  },

  switchBtn: {
    background: "transparent",
    border: "none",
    padding: 0,
    marginBottom: 12,
    width: "100%",
    textAlign: "center",
    color: "#555",
    fontSize: 13,
    cursor: "pointer",
  },

  // New styles for message
  message: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
    color: "#000000",
    marginBottom: 10,
  },

  messageDivider: {
    height: 1,
    background: "#eee",
    marginBottom: 16,
  },
};