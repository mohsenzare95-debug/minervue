"use client";

import NotesIllustration from "@/features/notes/components/NotesIllustration";
import NoteList from "@/features/notes/components/NoteList";

export default function NotesPage() {
  return (
    <main style={styles.page}>

      {/* =========================
          TOP ILLUSTRATION
      ========================= */}

      <NotesIllustration />

      {/* =========================
          TITLE
      ========================= */}

      <div style={styles.titleBlock}>
        <div style={styles.title}>
          Summary Notes
        </div>
      </div>

      {/* =========================
          NOTES
      ========================= */}

      <NoteList />

    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: "flex",
    flexDirection: "column",

    gap: 18,

    width: "100%",

    paddingBottom: 110,

    fontFamily: "sans-serif",
  },

  titleBlock: {
    textAlign: "center",

    marginTop: -2,
    marginBottom: 4,
  },

  title: {
    fontSize: 38,

    fontWeight: 400,

    letterSpacing: "-1px",

    color: "#111",

    lineHeight: 1.1,
  },
};