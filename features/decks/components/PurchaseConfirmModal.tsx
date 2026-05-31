"use client";

export default function PurchaseConfirmModal({
  open,
  deck,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  deck: any;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>Unlock Deck</h3>

        <p style={styles.text}>
          Do you want to unlock <b>{deck.name}</b> for premium access?
        </p>

        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>

          <button style={styles.buyBtn} onClick={onConfirm}>
            Pay with Crypto
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: 14,
    width: 320,
  },

  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 600,
  },

  text: {
    marginTop: 10,
    fontSize: 14,
    color: "#444",
    textAlign: "center",
  },

  actions: {
    display: "flex",
    gap: 10,
    marginTop: 16,
  },

  cancelBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },

  buyBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },
};