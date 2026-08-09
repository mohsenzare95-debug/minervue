//features\notes\components\reader\NoteNavigation.tsx
export default function NoteNavigation({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onSelect,
}: {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}) {
return (
  <div style={styles.wrapper}>

    <button
      onClick={onPrevious}
      disabled={currentPage === 0}
      style={{
        ...styles.arrow,
        opacity: currentPage === 0 ? 0.3 : 1,
      }}
    >
      ←
    </button>

    <div style={styles.progressArea}>
      <div style={styles.progressTrack}>

        <div
          style={{
            ...styles.progressFill,
            width: `${
              totalPages <= 1
                ? 100
                : (currentPage / (totalPages - 1)) * 100
            }%`,
          }}
        />

        <div
          style={{
            ...styles.markerDot,
            left: `${
              totalPages <= 1
                ? 50
                : (currentPage / (totalPages - 1)) * 100
            }%`,
          }}
        />

        <div
          style={{
            ...styles.progressXP,
            left: `${
              totalPages <= 1
                ? 50
                : (currentPage / (totalPages - 1)) * 100
            }%`,
          }}
        >
          {currentPage + 1}
        </div>

      </div>
    </div>

    <button
      onClick={onNext}
      disabled={currentPage === totalPages - 1}
      style={{
        ...styles.arrow,
        opacity:
          currentPage === totalPages - 1
            ? 0.3
            : 1,
      }}
    >
      →
    </button>

  </div>
);  
}

const styles: Record<string, React.CSSProperties> = {

  wrapper: {
    display: "flex",
    alignItems: "center",

    gap: 8,

    width: "100%",
    boxSizing: "border-box",

    padding: "7px 8px",

    background: "rgba(255,255,255,0.72)",

    backdropFilter: "blur(18px) saturate(160%)",
    WebkitBackdropFilter:
      "blur(18px) saturate(160%)",

    border:
      "1px solid rgba(255,255,255,0.55)",

    borderRadius: 24,

    boxShadow:
      "0 6px 22px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.65)",
  },

  arrow: {
    flexShrink: 0,

    width: 34,
    height: 34,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: 0,

    border: "none",
    background: "transparent",

    borderRadius: 10,

    color: "#12444b",

    fontSize: 19,
    fontWeight: 400,

    cursor: "pointer",

    transition:
      "background .15s ease, opacity .15s ease",
  },

  progressArea: {
    position: "relative",

    flex: 1,

    height: 34,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    minWidth: 0,
  },

  progressTrack: {
  position: "absolute",

  left: 0,
  right: 0,

  top: "50%",
  transform: "translateY(-50%)",

  height: 5,

  background: "rgba(18,68,75,0.16)",

  borderRadius: 999,

  overflow: "visible",
},

  progressFill: {
    height: "100%",

    background: "#12444b",

    borderRadius: 999,

    transition:
      "width .25s ease",
  },

  progressXP: {
  position: "absolute",

  top: -19,

  transform: "translateX(-50%)",

  fontSize: 11,
  fontWeight: 600,

  color: "#111",

  whiteSpace: "nowrap",

  transition: "left .25s ease",
},

markerDot: {
  position: "absolute",

  top: "50%",

  transform: "translate(-50%, -50%)",

  width: 14,
  height: 14,

  boxSizing: "border-box",

  borderRadius: "50%",

  background: "#12444b",

  border: "2px solid #fff",

  boxShadow: "0 0 0 1px #ddd",

  zIndex: 3,

  transition: "left .25s ease",
},

  pageCount: {
    position: "relative",

    padding: "2px 7px",

    background:
      "rgba(255,255,255,0.88)",

    borderRadius: 6,

    fontSize: 10,
    fontWeight: 600,

    color: "#555",

    lineHeight: 1.4,

    boxShadow:
      "0 1px 4px rgba(0,0,0,0.05)",
  },
};