"use client";

import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  deckName: string;
  deckKey: string;
  onCancel: () => void;
};

export default function ConfirmPurchaseModal({
  open,
  deckName,
  deckKey,
  onCancel,
}: Props) {
  const router = useRouter();

  if (!open) return null;

  const handlePay = async () => {
    const res = await fetch("/api/payments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "temp", // فعلاً بعداً با session جایگزین می‌کنیم
        deckKey,
      }),
    });

    const data = await res.json();

    if (data?.payment_url) {
      window.location.href = data.payment_url;
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Unlock Deck</h3>

        <p>
          Do you want to purchase <b>{deckName}</b>?
        </p>

        <div style={styles.actions}>
          <button onClick={onCancel} style={styles.cancel}>
            Cancel
          </button>

          <button onClick={handlePay} style={styles.pay}>
            Pay with Crypto
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
  },

  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 320,
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 16,
  },

  cancel: {
    padding: 10,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },

  pay: {
    padding: 10,
    background: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};