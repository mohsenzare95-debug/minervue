export default function DeckHero({
  score,
  streak,
  week = [],
  scoreLevel,
  scoreDots = [],
}: any) {
  return (
    <div style={styles.hero}>
      
      {/* ===================== */}
      {/* TOP ROW: 2 CARDS */}
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
          <div style={styles.level}>
            {scoreLevel ?? 1}
          </div>

          <div style={styles.dots}>
            {(scoreDots ?? []).map((d: string, i: number) => (
              <span key={i} style={styles.dot}>
                {d}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ===================== */}
      {/* BOTTOM CARD */}
      {/* ===================== */}
      <div style={styles.bottomCard}>
        <div style={styles.streakLabel}>
          Streak Days: {streak ?? 0} 🔥
        </div>

        <div style={styles.weekRow}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (d, i) => (
              <div key={d} style={styles.day}>
                <div style={styles.dayName}>{d}</div>
                <div style={styles.weekDot}>
                  {week?.[i] ? "●" : "○"}
                </div>
              </div>
            )
          )}
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

  /* ===================== */
  /* TOP ROW */
  /* ===================== */
  topRow: {
    display: "flex",
    gap: 12,
  },

  /* CARD BASE (IMPORTANT FIX) */
  card: {
    flex: 1,
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 18,

    padding: 18,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",     // 🔴 FIX alignment
    justifyContent: "center", // 🔴 FIX vertical mismatch
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
    lineHeight: 1, // 🔴 prevents vertical shift
  },

  level: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1,
  },

  dots: {
    marginTop: 6,
    display: "flex",
    gap: 4,
    justifyContent: "center",
  },

  dot: {
    fontSize: 14,
    lineHeight: 1,
  },

  /* ===================== */
  /* BOTTOM CARD */
  /* ===================== */
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
    fontSize: 16,
    lineHeight: 1,
  },
};