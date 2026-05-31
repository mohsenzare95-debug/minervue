// app/stats/page.tsx

"use client";

import DailyActivityChart from "@/features/stats/components/DailyActivityChart";
import DeckDistributionChart from "@/features/stats/components/DeckDistributionChart";
import StatsSummaryCard from "@/features/stats/components/StatsSummaryCard";

import { useStatistics } from "@/features/stats/hooks/useStatistics";

export default function StatsPage() {
  const {
    dailyActivity,
    distribution,

    seenCards,
    masteredCards,
    score,

    range,
    setRange,

    monthLabel,
    monthOffset,
    setMonthOffset,
  } = useStatistics();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          textAlign: "center",
          margin: "20px 0 32px",
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        Stats
      </div>

      {/* SUMMARY */}
      <StatsSummaryCard
        seenCards={seenCards}
        masteredCards={masteredCards}
        score={score}
      />

      {/* DAILY ACTIVITY */}
      <DailyActivityChart
        data={dailyActivity}
        monthLabel={monthLabel}
        onPrevMonth={() => setMonthOffset((m) => m + 1)}
        onNextMonth={() => setMonthOffset((m) => Math.max(0, m - 1))}
      />

      {/* DISTRIBUTION */}
      <DeckDistributionChart
        data={distribution}
        range={range}
        setRange={setRange}
      />
    </div>
  );
}

const styles = {
  container: { padding: 20, maxWidth: 900, margin: "0 auto" },
  card: { marginBottom: 16, padding: 18, borderRadius: 14, border: "1px solid #eee", background: "#fff" },
  sectionTitle: { fontWeight: 600, marginBottom: 12, textAlign: "center" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  monthTitle: { fontSize: 14, fontWeight: 600 },
  iconBtn: { width: 32, height: 32, borderRadius: 10, border: "1px solid #ddd", background: "#fff", cursor: "pointer" },
  row: { display: "flex", justifyContent: "space-between", padding: "6px 0" },
  left: { display: "flex", alignItems: "center", gap: 8 },
  medal: { width: 22, textAlign: "center" },
  rank: { width: 28, color: "#666" },
  score: { fontWeight: 600 },
  meBox: { marginTop: 10, padding: 8, borderRadius: 10, background: "#f5f5f5", fontWeight: 600 },
};