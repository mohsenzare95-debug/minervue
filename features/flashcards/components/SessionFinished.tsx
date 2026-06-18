"use client";

import { useRouter } from "next/navigation";

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

type SessionFinishedProps = {
  onNewSession: () => void;
  deckKey?: string;
  totalSeen?: number;
  totalCards?: number;
};

// ======================
// COMPONENT
// ======================

export default function SessionFinished({
  onNewSession,
  deckKey = "default",
  totalSeen = 0,
  totalCards = 0,
}: SessionFinishedProps) {
  const router = useRouter();

  // ❌ REMOVED:
  // analytics.sessionCompleted()

  return (
    <div style={styles.container}>
      <SessionIcon />

      <h2 style={styles.title}>Session Finished</h2>

      <div style={styles.row}>
        <button
          style={styles.primaryBtn}
          onClick={onNewSession}
        >
          New Session
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => router.push("/deck")}
        >
          Review Decks
        </button>
      </div>
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
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
  },

  secondaryBtn: {
    padding: "10px 14px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 10,
    cursor: "pointer",
  },
};