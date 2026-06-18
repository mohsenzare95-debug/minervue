import { Flame } from "lucide-react";
export default function DeckHero({
  score,
  streak,
  week = [],
  scoreLevel,
  levelProgress,
}: any) {
  const progress = levelProgress?.progress ?? 0;

  return (
    <div style={styles.hero}>

      {/* ===================== */}
      {/* TOP ROW */}
      {/* ===================== */}
      <div style={styles.topRow}>

        {/* SCORE CARD */}
        <div style={styles.card}>
          <div style={styles.label}>Score</div>
          <div style={styles.score}>{score ?? 0}</div>
        </div>

        {/* LEVEL CARD */}
        <div style={styles.card}>
          <div style={styles.label}>Level</div>

          {/* LEVEL NUMBER */}
          <div style={styles.level}>
            {scoreLevel ?? 1}
          </div>

          {/* PROGRESS BAR */}
          <div style={styles.progressWrap}>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${progress * 100}%`,
                }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* ===================== */}
      {/* BOTTOM CARD */}
      {/* ===================== */}
      <div style={styles.bottomCard}>
        <div style={styles.streakLabel}>
          Streak Days: {streak ?? 0}  <Flame size={16} />
        </div>

        <div style={styles.weekRow}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
            <div key={d} style={styles.day}>
              <div style={styles.dayName}>{d}</div>

              <div
                style={{
                  ...styles.weekDot,
                  background: week?.[i] ? "#111" : "transparent",
                }}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

const styles: any = {
  hero: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  topRow: {
    display: "flex",
    gap: 12,
  },

  card: {
    flex: 1,
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 18,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },

  score: {
    fontSize: 44,
    fontWeight: 800,
    lineHeight: 1,
  },

  level: {
    fontSize: 26,
    fontWeight: 900,   // مهم: بولد واقعی
    lineHeight: 1,
    marginBottom: 8,
  },

  progressWrap: {
    width: "100%",
  },

  progressBar: {
    height: 6,
    width: "100%",
    background: "#eee",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#111",
    borderRadius: 999,
    transition: "width 0.3s ease",
  },

  bottomCard: {
    padding: 18,
    borderRadius: 18,
    background: "#fff",
    border: "1px solid #eee",
    textAlign: "center",
  },

  streakLabel: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 10,
  },

  weekRow: {
    display: "flex",
    justifyContent: "center",
    gap: 14,
  },

  day: {
    textAlign: "center",
  },

  dayName: {
    fontSize: 10,
    color: "#888",
  },

  weekDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    border: "1px solid #111",
    marginTop: 2,
  },
};