//features/notes/components/reader/NoteViewer.tsx
"use client";

import React, { useState } from "react";
import type { Note } from "@/shared/types/note";

import NoteHeader from "./NoteHeader";
import NotePageRenderer from "./NotePageRenderer";
import NoteNavigation from "./NoteNavigation";

export default function NoteViewer({
  note,
}: {
  note: Note;
}) {
  const [currentPage, setCurrentPage] = useState(0);

  const page = note.pages[currentPage];

  const goNext = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, note.pages.length - 1)
    );
  };

  const goPrevious = () => {
    setCurrentPage((prev) =>
      Math.max(prev - 1, 0)
    );
  };

  return (
    <main
      style={styles.page}
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
    >
      {/* =========================
          READER
      ========================= */}

      <div style={styles.readerWrapper}>

        {/* BACK PAPERS */}
        <div style={styles.backPaper1} />
        <div style={styles.backPaper2} />

        {/* MAIN PAPER */}
        <div style={styles.paper}>

          {/* =========================
              HEADER BOX
          ========================= */}

          <div style={styles.headerBox}>
            <NoteHeader
              title={note.title}
              subtitle={page.subtitle}
            />
          </div>

          {/* =========================
              CONTENT BOX
          ========================= */}

          <div
  style={{
    ...styles.contentFrame,
    background:
      page.type === "mcq"
        ? "#dce9e8"
        : "#fff",
  }}
>

            {/* PAPER CLIP */}
            <div style={styles.contentClip}>
              <div style={styles.contentClipInner} />
            </div>

            {/* SCROLLABLE CONTENT */}
            <div style={styles.contentScroll}>
              <NotePageRenderer page={page} />
            </div>

          </div>

        </div>
      </div>

      {/* =========================
          FIXED NAVIGATION
      ========================= */}

      <div style={styles.navigation}>
        <NoteNavigation
          currentPage={currentPage}
          totalPages={note.pages.length}
          onPrevious={goPrevious}
          onNext={goNext}
          onSelect={setCurrentPage}
        />
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: "100%",
    height: "100dvh",

    boxSizing: "border-box",

    padding: "8px 4px 92px",

    fontFamily: "sans-serif",

    overflow: "visible",

    userSelect: "none",
    WebkitUserSelect: "none",
  },

  readerWrapper: {
    position: "relative",

    width: "100%",
    height: "calc(100dvh - 100px)",

    boxSizing: "border-box",

    padding: "8px 4px 10px",
  },

  /* =========================
     BACK PAPERS
  ========================= */

  backPaper1: {
    position: "absolute",

    left: 10,
    right: 10,

    top: 12,
    bottom: 4,

    background: "#12444b",

    borderRadius: 8,

    transform: "rotate(-1deg)",

    zIndex: 0,
  },

  backPaper2: {
    position: "absolute",

    left: 6,
    right: 7,

    top: 8,
    bottom: 7,

    background: "#dce9e8",

    borderRadius: 8,

    transform: "rotate(1deg)",

    zIndex: 1,
  },

  /* =========================
     MAIN PAPER
  ========================= */

  paper: {
  position: "relative",

  zIndex: 2,

  width: "100%",
  height: "100%",

  background: "#e6e6e6",

  border: "1px solid #eeeeee",

  borderRadius: 8,

  boxSizing: "border-box",

  overflow: "visible",

  boxShadow:
    "0 5px 16px rgba(0,0,0,.07)",

  transform: "rotate(-0.2deg)",

  display: "flex",
  flexDirection: "column",
},

  /* =========================
     HEADER BOX
  ========================= */

  headerBox: {
    flexShrink: 0,

    background: "#fff",

    border: "1px solid #eeeeee",

    borderRadius: 8,

    boxSizing: "border-box",

    padding: "18px 20px",

    marginBottom: 10,

    boxShadow:
      "0 3px 10px rgba(0,0,0,.04)",
  },

  /* =========================
     CONTENT FRAME
  ========================= */

  contentFrame: {
  position: "relative",

  flex: 1,
  minHeight: 0,

  width: "100%",

  boxSizing: "border-box",

  background: "#e9e2dc",

  borderRadius: 8,

  overflow: "visible",

  padding: 0,
},

  /* =========================
     CONTENT SCROLL
  ========================= */

  contentScroll: {
    width: "100%",
    height: "100%",

    overflowY: "auto",
    overflowX: "hidden",

    boxSizing: "border-box",

    padding: "0 18px 28px",

    WebkitOverflowScrolling: "touch",

    scrollbarWidth: "none",

    msOverflowStyle: "none",
  },

  /* =========================
     PAPER CLIP
  ========================= */

  contentClip: {
    position: "absolute",

    right: 22,
    top: -12,

    width: 17,
    height: 40,

    border: "2.5px solid #555",

    borderRadius: "9px 9px 7px 7px",

    transform: "rotate(17deg)",

    boxSizing: "border-box",

    background: "transparent",

    zIndex: 20,

    pointerEvents: "none",

    filter:
      "drop-shadow(0 1px 1px rgba(0,0,0,.15))",
  },

  contentClipInner: {
    position: "absolute",

    left: 3,
    top: 5,

    width: 7,
    height: 27,

    borderLeft: "1.8px solid #555",

    borderRadius: 8,
  },

  /* =========================
     NAVIGATION
  ========================= */

 navigation: {
  position: "fixed",

  left: "50%",
  transform: "translateX(-50%)",

  bottom: 96,

  width: "calc(100% - 32px)",
  maxWidth: 448,

  zIndex: 1000,
},
};