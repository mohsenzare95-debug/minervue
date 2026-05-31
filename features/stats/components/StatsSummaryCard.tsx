//features/stats/components/StatsSummaryCard.tsx

"use client";

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
        label="Seen Cards"
        value={seenCards}
      />

      <Row
        label="Mastered Cards"
        value={masteredCards}
      />

      <Row
        label="Score"
        value={score}
      />
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div style={styles.row}>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    maxWidth: "520px",

    margin: "0 auto",

    padding: 16,

    borderRadius: 16,

    background: "var(--card)",
    border: "1px solid var(--border)",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",

    padding: "10px 0",

    borderBottom:
      "1px solid var(--border)",
  },
};