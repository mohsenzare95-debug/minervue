//shared\components\ConfirmResetModal.tsx
"use client";

export default function ConfirmResetModal({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>Reset Deck?</h3>

        <p>
          This will reset deck progress and reduce your global score.
        </p>

        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>

          <button style={styles.resetBtn} onClick={onConfirm}>
            Reset
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
    borderRadius: 12,
    width: 300,
  },

  title: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 600,
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 10,
  },

  cancelBtn: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "#fff",
    color: "#111",
    cursor: "pointer",
    fontWeight: 500,
  },

  resetBtn: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
};