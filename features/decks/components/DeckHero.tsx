//features\decks\components\DeckHero.tsx

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
      {/* SCORE BOX */}
      {/* ===================== */}
      <div style={styles.box}>
        <div style={styles.big}>{score ?? 0}</div>
        <div style={styles.label}>Score</div>

        <div style={styles.dots}>
          {(scoreDots ?? []).map((d: string, i: number) => (
            <span key={i} style={{ marginRight: 3 }}>
              {d}
            </span>
          ))}
        </div>

        <div style={styles.level}>
          Level {scoreLevel ?? 1}
        </div>
      </div>

      {/* ===================== */}
      {/* STREAK + WEEK */}
      {/* ===================== */}
      <div style={styles.boxRight}>
        <div style={styles.streakLabel}>
          Streak Days: {streak ?? 0} 🔥
        </div>

        <div style={styles.weekRow}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (d, i) => (
              <div key={d} style={styles.day}>
                <div style={styles.dayName}>{d}</div>

                <div
                  style={{
                    color: week?.[i] ? "#111" : "#bbb",
                  }}
                >
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
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 20,
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(10px)",
    marginBottom: 30,
  },

  box: {
    textAlign: "left",
  },

  boxRight: {
    textAlign: "right",
  },

  big: {
    fontSize: 44,
    fontWeight: 700,
  },

  label: {
    fontSize: 12,
    color: "#666",
  },

  streakLabel: {
    fontSize: 16,
    fontWeight: 800,
    color: "#111",
    marginBottom: 6,
  },

  dots: {
    marginTop: 4,
  },

  level: {
    fontSize: 12,
    marginTop: 4,
  },

  weekRow: {
    display: "flex",
    gap: 10,
    marginTop: 8,
  },

  day: {
    textAlign: "center",
  },

  dayName: {
    fontSize: 10,
    color: "#888",
  },
};