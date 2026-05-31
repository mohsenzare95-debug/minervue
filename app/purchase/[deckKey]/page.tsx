//app\purchase\[deckKey]\page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";

export default function PurchasePage({
  params,
}: {
  params: { deckKey: string };
}) {
  const { user } = useAuthSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const buy = async () => {
    setLoading(true);

    const res = await fetch("/api/payments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.id,
        deckKey: params.deckKey,
      }),
    });

    const data = await res.json();

    if (data.payment_url) {
      window.location.href = data.payment_url;
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Unlock Deck</h2>

      <p>Pay with crypto to unlock this deck</p>

      <button
        onClick={buy}
        disabled={loading}
        style={{
          padding: 12,
          background: "#111",
          color: "#fff",
          borderRadius: 8,
        }}
      >
        {loading ? "Redirecting..." : "Pay with Crypto"}
      </button>
    </div>
  );
}