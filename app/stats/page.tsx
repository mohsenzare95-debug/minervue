// app/stats/page.tsx
"use client";

import DailyActivityChart from "@/features/stats/components/DailyActivityChart";
import DeckDistributionChart from "@/features/stats/components/DeckDistributionChart";
import StatsSummaryCard from "@/features/stats/components/StatsSummaryCard";

import { useStatistics } from "@/features/stats/hooks/useStatistics";

export default function StatsPage() {
  const {
    dailyActivity,
    dailyActivityScale,
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
    <div style={styles.page}>
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
        scale={dailyActivityScale}
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

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
};