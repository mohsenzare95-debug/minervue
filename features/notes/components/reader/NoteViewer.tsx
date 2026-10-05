"use client";

import React from "react";
import { useRouter } from "next/navigation";

import type { Note } from "@/shared/types/note";

import NoteHeader from "./NoteHeader";
import NotePageRenderer from "./NotePageRenderer";

export default function NoteViewer({
  note,
  noteSlug,
  currentSectionSlug,
}: {
  note: Note;
  noteSlug: string;
  currentSectionSlug: string;
}) {
  const router = useRouter();

  const currentSectionIndex = note.sections.findIndex(
    (item) => item.slug === currentSectionSlug
  );

  const section = note.sections[currentSectionIndex];

  if (!section) {
    return null;
  }

  const isFirstSection = currentSectionIndex === 0;
  const isLastSection =
    currentSectionIndex === note.sections.length - 1;

  const goNext = () => {
    if (isLastSection) return;

    const nextSection =
      note.sections[currentSectionIndex + 1];

    router.push(
      `/notes/${noteSlug}/${nextSection.slug}`
    );
  };

  const goPrevious = () => {
    if (isFirstSection) return;

    const previousSection =
      note.sections[currentSectionIndex - 1];

    router.push(
      `/notes/${noteSlug}/${previousSection.slug}`
    );
  };

  return (
    <main
      style={styles.page}
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
    >
      <div style={styles.readerWrapper}>
        <div style={styles.backPaper1} />
        <div style={styles.backPaper2} />

        <div style={styles.paper}>
          <div style={styles.headerBox}>
            <NoteHeader
              title={note.title}
              subtitle={section.title}
            />
          </div>

          <div style={styles.headerDivider} />

          <div style={styles.contentFrame}>
            <div style={styles.contentScroll}>
              {section.pages.map((page) => (
                <div
                  key={page.id}
                  style={styles.sectionPage}
                >
                  <NotePageRenderer page={page} />
                </div>
              ))}
            </div>
          </div>

        
<div style={styles.sectionNavigation}>
  <button
    type="button"
    onClick={goPrevious}
    disabled={isFirstSection}
    style={{
      ...styles.sectionButton,
      opacity: isFirstSection ? 0.25 : 1,
      cursor: isFirstSection
        ? "default"
        : "pointer",
    }}
    aria-label="Previous section"
  >
    <span style={styles.sectionArrow}>←</span>

    <span style={styles.sectionButtonText}>
      {isFirstSection
        ? "Previous"
        : note.sections[currentSectionIndex - 1].title}
    </span>
  </button>

  <button
    type="button"
    onClick={goNext}
    disabled={isLastSection}
    style={{
      ...styles.sectionButton,
      opacity: isLastSection ? 0.25 : 1,
      cursor: isLastSection
        ? "default"
        : "pointer",
    }}
    aria-label="Next section"
  >
    <span style={styles.sectionButtonText}>
      {isLastSection
        ? "Next"
        : note.sections[currentSectionIndex + 1].title}
    </span>

    <span style={styles.sectionArrow}>→</span>
  </button>
</div>

          
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    paddingBottom: 60,
    fontFamily: "sans-serif",
  },

  readerWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: 900,
  },

  backPaper1: {
    position: "absolute",
    inset: "8px 10px 0 10px",
    background: "#f5f5f5",
    borderRadius: 5,
  },

  backPaper2: {
    position: "absolute",
    inset: "4px 5px 0 5px",
    background: "#fafafa",
    borderRadius: 5,
  },

  paper: {
    position: "relative",
    minHeight: "calc(100vh - 80px)",
    background: "#fff",
    borderRadius: 5,
    boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
    overflow: "hidden",
    paddingBottom: 62,
  },

  headerDivider: {
    height: 1,
    width: "calc(100% - 48px)",
    margin: "0 auto",
    background: "#d6d6d6",
  },

  headerBox: {
    paddingBottom: 22,
  },

  contentFrame: {
    position: "relative",
    width: "100%",
  },

  contentScroll: {
    width: "100%",
    boxSizing: "border-box",
    padding: "0 28px 30px",
  },

  sectionPage: {
    width: "100%",
    boxSizing: "border-box",
    marginBottom: 2,
  },


sectionNavigation: {
  position: "absolute",
  left: 28,
  right: 28,
  bottom: 12,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 16,
},

sectionButton: {
  minWidth: 150,
  maxWidth: "42%",
  minHeight: 42,
  padding: "0 16px",
  border: "none",
  borderRadius: 8,
  background: "#12444b",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.1px",
  transition: "opacity .15s ease",
  boxSizing: "border-box",
},

sectionButtonText: {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
},

sectionArrow: {
  flexShrink: 0,
  fontSize: 18,
  fontWeight: 300,
  lineHeight: 1,
},


  arrow: {
    width: 42,
    height: 42,
    border: "none",
    background: "transparent",
    color: "#12444b",
    fontSize: 28,
    fontWeight: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    transition: "opacity .15s ease",
  },
};