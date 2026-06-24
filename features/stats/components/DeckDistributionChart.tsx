// features/stats/components/DeckDistributionChart.tsx
"use client";

const PATTERNS = ["url(#p1)", "url(#p2)", "url(#p3)", "url(#p4)"];

type Props = {
  data: {
    name: string;
    value: number;
  }[];

  range: "day" | "week" | "month" | "year";

  setRange: (value: "day" | "week" | "month" | "year") => void;
};

export default function DeckDistributionChart({
  data,
  range,
  setRange,
}: Props) {
  const total = data.reduce((a, b) => a + b.value, 0);

  const svgSize = 380;
  const r = 80;
  const labelRadius = r + 50;
  const center = svgSize / 2;

  const slices = data.reduce<
    {
      name: string;
      value: number;
      start: number;
      end: number;
      pattern: string;
    }[]
  >((acc, d, i) => {
    const prevEnd = acc.length ? acc[acc.length - 1].end : 0;

    const angle = total === 0 ? 0 : (d.value / total) * Math.PI * 2;

    acc.push({
      ...d,
      start: prevEnd,
      end: prevEnd + angle,
      pattern: PATTERNS[i % PATTERNS.length],
    });

    return acc;
  }, []);

  return (
    <div style={styles.chartContainer}>
      <div style={styles.title}>Deck Distribution</div>
      <div style={styles.titleDivider} />

      {total === 0 ? (
        <div style={styles.empty}>No activity yet</div>
      ) : (
        <svg
          width="100%"
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          style={{
            maxWidth: "100%",
            height: "auto",
            overflow: "visible",
          }}
        >
          <defs>
            <pattern id="p1" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M0 6 L6 0" stroke="#000" />
            </pattern>

            <pattern id="p2" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#000" />
            </pattern>

            <pattern id="p3" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M0 0 L6 6 M6 0 L0 6" stroke="#000" />
            </pattern>

            <pattern id="p4" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M0 3 L6 3" stroke="#000" />
            </pattern>
          </defs>

          {/* PIE */}
          {slices.map((s, i) => {
            const x1 = center + r * Math.cos(s.start);
            const y1 = center + r * Math.sin(s.start);

            const angle = s.end - s.start;
            const large = angle > Math.PI ? 1 : 0;

            const safeAngle =
              angle === Math.PI * 2 ? Math.PI * 1.999 : angle;

            const x2 = center + r * Math.cos(s.start + safeAngle);
            const y2 = center + r * Math.sin(s.start + safeAngle);

            return (
              <path
                key={i}
                d={`
                  M ${center} ${center}
                  L ${x1} ${y1}
                  A ${r} ${r} 0 ${large} 1 ${x2} ${y2}
                  Z
                `}
                fill={s.pattern}
                stroke="#000"
                strokeWidth="2"
              />
            );
          })}

          {/* PERCENT BOX (NEW) */}
          {slices.map((s, i) => {
            const mid = (s.start + s.end) / 2;

            const px = center + (r * 0.45) * Math.cos(mid);
            const py = center + (r * 0.45) * Math.sin(mid);

            const percent = total ? Math.round((s.value / total) * 100) : 0;

            return (
              <g key={`pct-${i}`}>
                <rect
                  x={px - 18}
                  y={py - 12}
                  width={36}
                  height={24}
                  rx={6}
                  fill="#000"
                />
                <text
                  x={px}
                  y={py}
                  fill="#fff"
                  fontSize="11"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="Inter, system-ui, -apple-system, sans-serif"
                >
                  {percent}%
                </text>
              </g>
            );
          })}

          {/* CONNECTORS */}
          {slices.map((s, i) => {
            const mid = (s.start + s.end) / 2;

            // start slightly outside slice
            const innerR = r * 0.85;
            const x1 = center + innerR * Math.cos(mid);
            const y1 = center + innerR * Math.sin(mid);

            const x2 = center + (labelRadius + 10) * Math.cos(mid);
            const y2 = center + (labelRadius + 10) * Math.sin(mid);

            const dx = x2 - x1;
            const dy = y2 - y1;

            // TRUE cubic bezier (smooth + natural)
            const cx1 = x1 + dx * 0.3 + (-dy * 0.2);
            const cy1 = y1 + dy * 0.3 + (dx * 0.2);

            const cx2 = x1 + dx * 0.7 + (-dy * 0.2);
            const cy2 = y1 + dy * 0.7 + (dx * 0.2);

            const isRight = x2 > center;

            return (
              <g key={`conn-${i}`}>
                {/* curve */}
                <path
                  d={`
                    M ${x1} ${y1}
                    C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}
                  `}
                  stroke="#333"
                  strokeWidth="1.3"
                  fill="none"
                />

                {/* DOT START */}
                <circle cx={x1} cy={y1} r={3} fill="#000" />

                {/* DOT END */}
                <circle cx={x2} cy={y2} r={3} fill="#000" />

                {/* LABEL */}
                <text
                  x={x2 + (isRight ? 10 : -10)}
                  y={y2}
                  fontSize="13"
                  fontFamily="Inter, system-ui, -apple-system, sans-serif"
                  textAnchor={isRight ? "start" : "end"}
                  dominantBaseline="middle"
                  fill="#111"
                >
                  {s.name.charAt(0).toUpperCase() + s.name.slice(1)}
                </text>
              </g>
            );
          })}
        </svg>
      )}

      {/* Legend */}
      {total !== 0 && (
        <div style={styles.legend}>
          {slices.map((s, i) => {
            const percent = total
              ? Math.round((s.value / total) * 100)
              : 0;

            return (
              <div
  key={s.name}
  style={styles.legendItem}
>
  <svg
    width="28"
    height="42"
    viewBox="0 0 28 42"
    style={{
      flexShrink: 0,
    }}
  >
    <rect
      x="1"
      y="1"
      width="26"
      height="40"
      fill={s.pattern}
      stroke="#111"
      strokeWidth="1.5"
      rx="4"
    />
  </svg>

  <div style={styles.legendContent}>
    <div style={styles.legendText}>
      <div style={styles.legendName}>
        {s.name}
      </div>

      <div style={styles.legendMeta}>
        {s.value} cards
      </div>
    </div>

    <div style={styles.legendPercent}>
      {percent}%
    </div>
  </div>
</div>
            );
          })}
        </div>
      )}

      <div style={styles.row}>
        {(["day", "week", "month", "year"] as const).map((r) => (
          <button
            key={r}
            onClick={() => {
              console.log("CLICKED:", r);
              setRange(r);
            }}
            style={{
              ...styles.btn,
              opacity: range === r ? 1 : 0.65,
            }}
          >
            {r}
          </button>
        ))}
      </div>

      <div style={styles.note}>
        <b>etc</b>: each slice is calculated based on cards number, not reviews
      </div>
    </div>
  );
}

const styles = {
  chartContainer: {
    width: "100%",
    maxWidth: "520px",
    minWidth: 0,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    background: "var(--card)",
    border: "1px solid var(--border)",
  },

  title: {
    fontWeight: 600,
    marginBottom: 12,
  },

  titleDivider: {
    width: 42,
    height: 2,
    background: "#111",
    borderRadius: 999,
    marginBottom: 18,
  },

  empty: {
    color: "#999",
    fontSize: 14,
    padding: 40,
  },

  legend: {
    width: "100%",
    marginTop: 4,
    marginBottom: 18,

    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(140px,1fr))",
    gap: 12,
  },

  legendItem: {
  display: "flex",
  alignItems: "center",

  gap: 12,

  padding: 10,

  border: "1px solid #eee",
  borderRadius: 10,

  background: "#fff",
},

  legendText: {
    display: "flex",
    flexDirection: "column",
  },

  legendName: {
    fontSize: 13,
    fontWeight: 600,
    color: "#111",
    lineHeight: 1.2,
  },

  legendMeta: {
    marginTop: 3,

    fontSize: 11,

    color: "#777",

    lineHeight: 1.2,
  },

  row: {
    marginTop: 12,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },

  btn: {
    padding: "6px 16px",
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "#fff",
    fontSize: 13,
    cursor: "pointer",
  },

  note: {
    marginTop: 12,
    fontSize: 11.5,
    color: "#666",
    textAlign: "center",
  },

  legendContent: {
  flex: 1,

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  minWidth: 0,
},

legendPercent: {
  fontSize: 13,
  fontWeight: 600,
  color: "#111",

  flexShrink: 0,

  marginLeft: 12,
},
};