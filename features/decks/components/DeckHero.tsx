//features\decks\components\DeckHero.tsx
import {
  Flame,
  Target,
  TrendingUp,
} from "lucide-react";

type Props = {
  score?: number;
  streak?: number;
  week?: any[];
  scoreLevel?: number;
  levelProgress?: {
    progress?: number;
  };
  userName?: string;
  avatar?: string;
};

export default function DeckHero({
  score,
  streak,
  week = [],
  scoreLevel,
  levelProgress,
  userName,
  avatar,
}: Props) {
  const progress = levelProgress?.progress ?? 0;

  const markerPosition =
    Math.max(0.03, Math.min(progress, 0.97)) * 100;

  return (
    <div style={styles.hero}>
      <div style={styles.statsCard}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.avatar}>
  <img
    src="/avatars/default-avatar.png"
    alt="avatar"
    style={styles.avatarImg}
  />
</div>

          <div style={styles.userInfo}>
            <div style={styles.greeting}>
              Hey
            </div>

            <div style={styles.userName}>
              {userName || "Guest"}
            </div>
          </div>

          <div style={styles.levelSide}>
            
            <div style={styles.headerProgress}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${progress * 100}%`,
                }}
              />

              <div
                style={{
                  ...styles.progressXP,
                  left: `${markerPosition}%`,
                }}
              >
              {score ?? 0} XP
              </div>

              <div
                style={{
                  ...styles.markerDot,
                  left: `${markerPosition}%`,
                }}
              />
              <div style={styles.nextLevel}>
  Level {(scoreLevel ?? 1) + 1}
</div>
            </div>
          </div>
        </div>

        <div style={styles.horizontalDivider} />

        {/* KPI ROW */}
        <div style={styles.kpiRow}>
          {/* SCORE */}
          <div style={styles.statBlock}>
            <Target size={18} style={styles.icon} />
            <div style={styles.statLabel}>Score</div>
            <div style={styles.statValue}>
              {score ?? 0}
            </div>
          </div>

          <div style={styles.divider} />

          {/* LEVEL */}
          <div style={styles.statBlock}>
            <TrendingUp size={18} style={styles.icon} />
            <div style={styles.statLabel}>Level</div>
            <div style={styles.statValue}>
              {scoreLevel ?? 1}
            </div>
          </div>

          <div style={styles.divider} />

          {/* STREAK */}
          <div style={styles.statBlock}>
            <Flame size={18} style={styles.icon} />
            <div style={styles.statLabel}>Streak</div>
            <div style={styles.statValue}>
              {streak ?? 0}
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

  statsCard: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 16,
    overflow: "hidden",
  },

  header: {
    display: "flex",
    alignItems: "center",
    padding: "16px 18px",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    flexShrink: 0,
  },

  userInfo: {
    marginLeft: 12,
  },

  greeting: {
    fontSize: 11,
    color: "#999",
    fontWeight: 500,
  },

  userName: {
    fontSize: 16,
    fontWeight: 700,
    color: "#222",
  },

  levelSide: {
  flex: 1,
  marginLeft: 20,
  paddingRight: 50,
  paddingTop: 11
},

  nextLevel: {
  position: "absolute",
  left: "calc(100% + 10px)",
  top: "50%",
  transform: "translateY(-50%)",

  fontSize: 12,
  fontWeight: 600,
  color: "#666",

  whiteSpace: "nowrap",
},

  headerProgress: {
    position: "relative",
    width: "100%",
    height: 8,
    background: "#ececec",
    borderRadius: 999,
  },

  horizontalDivider: {
    height: 1,
    background: "#f2f2f2",
  },

  kpiRow: {
    display: "flex",
    alignItems: "stretch",
    padding: "16px 0",
  },

  statBlock: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  icon: {
    color: "#222",
    marginBottom: 2,
  },

  statLabel: {
    fontSize: 11,
    fontWeight: 500,
    color: "#555",
  },

  statValue: {
    fontSize: 22,
    fontWeight: 700,
    color: "#222",
    lineHeight: 1,
  },

  divider: {
    width: 1,
    background: "#f1f1f1",
    marginTop: 6,
    marginBottom: 6,
  },

  progressFill: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    background: "#111",
    borderRadius: 999,
    transition: "width 0.3s ease",
  },

  progressXP: {
    position: "absolute",
    top: -26,
    transform: "translateX(-50%)",
    fontSize: 11,
    fontWeight: 600,
    color: "#111",
    whiteSpace: "nowrap",
  },

  markerDot: {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#111",
    border: "2px solid white",
    boxShadow: "0 0 0 1px #ddd",
  },
};