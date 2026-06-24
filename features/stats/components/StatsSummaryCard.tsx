//features/stats/components/StatsSummaryCard.tsx

"use client";

import {
  Eye,
  Medal,
  Target,
} from "lucide-react";

type Props = {
  seenCards: number;
  masteredCards: number;
  score: number;
};

export default function StatsSummaryCard({
  seenCards,
  masteredCards,
  score,
}: Props) {
  return (
    <div style={styles.wrapper}>
      <Row
        icon={<Eye size={16} />}
        label="Seen Cards"
        value={seenCards}
      />

      <Row
        icon={<Medal size={16} />}
        label="Mastered Cards"
        value={masteredCards}
      />

      <Row
        icon={<Target size={16} />}
        label="Score"
        value={score}
        noBorder
      />
    </div>
  );
}

function Row({
  icon,
  label,
  value,
  noBorder = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  noBorder?: boolean;
}) {
  return (
    <div
      style={{
        ...styles.row,
        ...(noBorder
          ? { borderBottom: "none" }
          : {}),
      }}
    >
      <div style={styles.left}>
        <div style={styles.iconBox}>
          {icon}
        </div>

        <span>{label}</span>
      </div>

      <b>{value}</b>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: "100%",
    maxWidth: "520px",

    margin: "0 auto",
    marginTop: 4, // کمتر از قبل

    padding: 16,

    borderRadius: 8,

    background: "var(--card)",
    border: "1px solid var(--border)",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "12px 0",

    borderBottom: "1px solid var(--border)",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  iconBox: {
    width: 28,
    height: 28,

    borderRadius: 8,

    background: "#111",
    color: "#fff",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    flexShrink: 0,
  },
};