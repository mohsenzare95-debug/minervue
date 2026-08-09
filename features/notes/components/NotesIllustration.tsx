"use client";

export default function NotesIllustration() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.shelfIllustration}>

        {/* BACK BOOKS */}

        <div style={{ ...styles.book, ...styles.book1 }} />
        <div style={{ ...styles.book, ...styles.book2 }} />
        <div style={{ ...styles.book, ...styles.book3 }} />
        <div style={{ ...styles.book, ...styles.book4 }} />
        <div style={{ ...styles.book, ...styles.book5 }} />
        <div style={{ ...styles.book, ...styles.book6 }} />
        <div style={{ ...styles.book, ...styles.book7 }} />
        <div style={{ ...styles.book, ...styles.book8 }} />

        {/* SHELF */}

        <div style={styles.shelfTop} />
        <div style={styles.shelfBody} />

      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",

    paddingTop: 8,
    paddingBottom: 2,
  },

  shelfIllustration: {
    position: "relative",

    width: 340,
    height: 150,
  },

  /* =========================
     BOOKS
  ========================= */

  book: {
    position: "absolute",

    bottom: 29,

    width: 31,

    borderRadius: "3px 3px 1px 1px",

    background: "#e6e6e6",

    border: "1px solid #c9c9c9",

    boxSizing: "border-box",

    boxShadow:
      "0 2px 3px rgba(0,0,0,.08)",
  },

  book1: {
    left: 55,
    height: 88,
    transform: "rotate(-6deg)",
  },

  book2: {
    left: 84,
    height: 105,
    transform: "rotate(-2deg)",
  },

  book3: {
    left: 113,
    height: 94,
    transform: "rotate(1deg)",
  },

  book4: {
    left: 142,
    height: 112,
    transform: "rotate(0deg)",
  },

  book5: {
    left: 171,
    height: 98,
    transform: "rotate(2deg)",
  },

  book6: {
    left: 200,
    height: 108,
    transform: "rotate(1deg)",
  },

  book7: {
    left: 229,
    height: 90,
    transform: "rotate(5deg)",
  },

  book8: {
    left: 258,
    height: 102,
    transform: "rotate(7deg)",
  },

  /* =========================
     SHELF
  ========================= */

  shelfTop: {
    position: "absolute",

    left: 22,
    right: 22,

    bottom: 25,

    height: 9,

    background: "#12444b",

    borderRadius: 3,

    boxShadow:
      "0 4px 8px rgba(0,0,0,.13)",

    zIndex: 5,
  },

  shelfBody: {
    position: "absolute",

    left: 32,
    right: 32,

    bottom: 8,

    height: 17,

    background: "#12444b",

    borderRadius: "0 0 6px 6px",

    boxShadow:
      "0 4px 8px rgba(0,0,0,.10)",

    zIndex: 5,
  },
};