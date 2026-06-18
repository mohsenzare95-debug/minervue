"use client";

type Props = {
  data: { day: number; value: number }[];
  monthLabel: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  scale?: { maxScale: number; ticks: number[] };
};

export default function DailyActivityChart({
  data,
  monthLabel,
  onPrevMonth,
  onNextMonth,
  scale,
}: Props) {
  const CHART_HEIGHT = 220;

  const maxScale = scale?.maxScale ?? 1;

  let ticks = scale?.ticks ?? [maxScale];
  if (!ticks.includes(maxScale)) {
    ticks = [...ticks, maxScale];
  }

  const sortedTicks = [...ticks].sort((a, b) => a - b);

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.titleBlock}>
          <div style={styles.topTitle}>Daily Activity</div>
          <div style={styles.subTitle}>based on cards number</div>
        </div>

        <div style={styles.nav}>
          <button onClick={onPrevMonth} style={styles.navBtn}>←</button>
          <div style={styles.monthTitle}>{monthLabel}</div>
          <button onClick={onNextMonth} style={styles.navBtn}>→</button>
        </div>
      </div>

      {/* CHART */}
      <div style={styles.chartContainer}>
        {/* Y AXIS */}
        <div style={styles.yAxis}>
          {sortedTicks
            .slice()
            .reverse()
            .map((tick, i) => {
              const perc = (tick / maxScale) * 100;

              return (
                <div
                  key={i}
                  style={{
                    ...styles.yTick,
                    bottom: `${perc}%`,
                  }}
                >
                  {tick}
                </div>
              );
            })}
        </div>

        {/* BODY */}
        <div style={styles.chartBody}>
          {/* GRID */}
          <div style={styles.grid}>
            {sortedTicks.map((tick, i) => {
              const perc = (tick / maxScale) * 100;

              return (
                <div
                  key={i}
                  style={{
                    ...styles.gridLine,
                    bottom: `${perc}%`,
                  }}
                />
              );
            })}
          </div>

          {/* BARS */}
          <div style={styles.bars}>
            {data.map((d, i) => {
              const ratio = maxScale > 0 ? d.value / maxScale : 0;
              const height = Math.max(6, ratio * CHART_HEIGHT);

              return (
                <div key={i} style={styles.barWrap}>
                  <div
                    style={{
                      ...styles.bar,
                      height,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* X AXIS */}
          <div style={styles.xAxis} />
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    background: "var(--card)",
    border: "1px solid var(--border)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  titleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  topTitle: {
    fontSize: 16,
    fontWeight: 700,
  },

  subTitle: {
    fontSize: 12,
    color: "#666",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  monthTitle: {
    fontSize: 14,
    fontWeight: 600,
  },

  navBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  chartContainer: {
    display: "flex",
    gap: 6,
    alignItems: "stretch",
    height: 220,
  },

  yAxis: {
    width: 10,
    position: "relative",
    height: 220,
  },

  yTick: {
    position: "absolute",
    right: 0,
    transform: "translateY(50%)",
    fontSize: 11,
    color: "var(--muted)",
    textAlign: "right",
  },

  chartBody: {
    flex: 1,
    position: "relative",
    height: 220,
  },

  grid: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },

  gridLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    background: "rgba(0,0,0,0.08)",
  },

  bars: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    display: "flex",
    alignItems: "flex-end",
    gap: 3,
  },

  barWrap: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
  },

  bar: {
    width: "100%",
    background: "#000",
    borderRadius: 3,
  },

  xAxis: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    background: "rgba(0,0,0,0.25)",
  },
};