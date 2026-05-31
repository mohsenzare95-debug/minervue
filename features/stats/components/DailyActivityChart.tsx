"use client";

type Props = {
  data: {
    day: number;
    value: number;
  }[];

  monthLabel: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export default function DailyActivityChart({
  data,
  monthLabel,
  onPrevMonth,
  onNextMonth,
}: Props) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const step = Math.max(1, Math.ceil(maxValue / 4));
  const yTicks = Array.from({ length: 5 }, (_, i) => step * (4 - i));

  return (
    <div style={styles.wrapper}>

      {/* TOP TITLE */}
      <div style={styles.topTitle}>
        Daily Activity
      </div>

      {/* SUBTITLE */}
      <div style={styles.subTitle}>
        based on cards number
      </div>

      {/* HEADER */}
      <div style={styles.header}>
        <button onClick={onPrevMonth} style={styles.navBtn}>
          ←
        </button>

        <div style={styles.monthTitle}>
          {monthLabel}
        </div>

        <button onClick={onNextMonth} style={styles.navBtn}>
          →
        </button>
      </div>

      {/* CHART */}
      <div style={styles.chartArea}>

        {/* Y AXIS */}
        <div style={styles.yAxis}>
          {yTicks.map((y, i) => (
            <div key={i} style={styles.yRow}>
              <span style={styles.yText}>
                {y === 0 ? "" : y}
              </span>
            </div>
          ))}
        </div>

        {/* BARS */}
        <div style={styles.bars}>
          {data.map((d, i) => {
            const height = (d.value / maxValue) * 180;

            return (
              <div key={i} style={styles.barWrap}>
                <div style={{ ...styles.bar, height }} />
                <div style={styles.xLabel}>{d.day}</div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: "100%",
    maxWidth: 520,
    margin: "0 auto",
    padding: 16,
    borderRadius: 12,
    background: "var(--card)",
    border: "1px solid var(--border)",
    position: "relative",
  },

  topTitle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 2,
    color: "var(--text)",
    letterSpacing: 0.3,
  },

  subTitle: {
    textAlign: "center",
    fontSize: 11.5,
    fontStyle: "italic",
    color: "#666",
    marginBottom: 10,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  monthTitle: {
    fontSize: 14,
    fontWeight: 600,
  },

  navBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },

  chartArea: {
    display: "flex",
    height: 220,
  },

  yAxis: {
    width: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  yRow: {
    display: "flex",
    justifyContent: "flex-end",
  },

  yText: {
    fontSize: 10,
    color: "var(--muted)",
  },

  bars: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
    gap: 3,
    paddingLeft: 6,
    overflowX: "hidden", // safety fix
  },

  barWrap: {
    flex: 1,
    minWidth: 0, // 🔴 critical fix for mobile overflow
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  bar: {
    width: "100%",
    background: "#000",
    borderRadius: 6,
  },

  xLabel: {
    fontSize: 9,
    marginTop: 6,
    color: "var(--muted)",
  },
};