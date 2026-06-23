// features/flashcards/components/DeckMastered.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmResetModal from "@/shared/components/ConfirmResetModal";

// ======================
// ICON
// ======================

const SessionIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12l3 3 5-6" />
  </svg>
);

// ======================
// TYPES
// ======================

type DeckMasteredProps = {
  onReset: () => void;
};

// ======================
// COMPONENT
// ======================

export default function DeckMastered({
  onReset,
}: DeckMasteredProps) {
  const router = useRouter();

  const [openReset, setOpenReset] = useState(false);

  return (
    <div style={styles.container}>
      <SessionIcon />

      <h2 style={styles.title}>
        You have mastered this deck!
      </h2>

      <div style={styles.row}>
        <button
          style={styles.primaryBtn}
          onClick={() => setOpenReset(true)}
        >
          Start Over
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => router.push("/deck")}
        >
          Review Decks
        </button>
      </div>

      {/* ======================
          RESET MODAL
      ====================== */}

      <ConfirmResetModal
        open={openReset}
        onCancel={() => setOpenReset(false)}
        onConfirm={() => {
          onReset();
          setOpenReset(false);
        }}
      />
    </div>
  );
}

// ======================
// STYLES
// ======================

const styles = {
  container: {
    padding: 24,
    textAlign: "center" as const,
  },

  title: {
    fontSize: 20,
    marginTop: 12,
  },

  row: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    marginTop: 20,
  },

  primaryBtn: {
    padding: "10px 14px",
    background: "#111",
    color: "#fff",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },

  secondaryBtn: {
    padding: "10px 14px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 8,
    cursor: "pointer",
  },
};