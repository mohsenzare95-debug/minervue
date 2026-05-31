export default function DeckHero({
  score,
  streak,
  week = [],
  scoreLevel,
  levelProgress,
}: any) {

  console.log("HERO PROPS CHECK:", {
    score,
    scoreLevel,
    levelProgress,
    progress: levelProgress?.progress,
  });
console.log("BAR WIDTH:", {
  progress: levelProgress?.progress,
  width: `${(levelProgress?.progress ?? 0) * 100}%`,
});
  return (
    <div style={styles.hero}>

      <div style={styles.topRow}>

        <div style={styles.card}>
          <div style={styles.label}>Score</div>
          <div style={styles.score}>{score}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.label}>Level</div>

          <div style={{ ...styles.level, fontWeight: 800 }}>
            {scoreLevel}
          </div>

          <div style={styles.progressWrap}>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${(levelProgress?.progress ?? 0) * 100}%`,
                }}
              />
            </div>
          </div>
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
    padding: 18,
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