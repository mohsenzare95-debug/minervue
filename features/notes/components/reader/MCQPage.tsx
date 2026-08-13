//features\notes\components\reader\MCQPage.tsx
"use client";

import React, { useState } from "react";
import { TriangleAlert } from "lucide-react";
import MarkdownText from "./MarkdownText";
import type { NotePage } from "@/shared/types/note";

export default function MCQPage({
  page,
}: {
  page: Extract<NotePage, { type: "mcq" }>;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  const answered = selected !== null;

  return (
    <section style={styles.page}>

      {/* =========================
          LABEL
      ========================= */}

      <div style={styles.label}>
        {page.label}
      </div>

      {/* =========================
          QUESTION
      ========================= */}

      <MarkdownText style={styles.question}>
        {page.question}
      </MarkdownText>

      {/* =========================
          QUESTION IMAGE
      ========================= */}

      {page.questionImage && (
        <img
          src={page.questionImage}
          alt=""
          draggable={false}
          style={styles.image}
        />
      )}

      {/* =========================
          OPTIONS
      ========================= */}

      <div style={styles.options}>
        {page.options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrect = index === page.correctAnswer;

          const isWrong =
            answered &&
            isSelected &&
            !isCorrect;

          return (
            <button
              key={index}
              type="button"
              onClick={() => setSelected(index)}
              style={{
                ...styles.option,

                ...(answered && isCorrect
                  ? styles.correct
                  : {}),

                ...(isWrong
                  ? styles.wrong
                  : {}),
              }}
            >

              {/* LETTER / CHECK */}

              <span
                style={{
                  ...styles.letter,

                  ...(isWrong
                    ? styles.wrongLetter
                    : {}),

                  ...(answered && isCorrect
                    ? styles.correctLetter
                    : {}),
                }}
              >
                {isWrong ? (
  <TriangleAlert size={14} strokeWidth={2.2} />
) : answered && isCorrect ? (
  <span style={styles.checkMark}>✓</span>
) : (
  String.fromCharCode(65 + index)
)}
              </span>

              {/* OPTION TEXT */}

              <div style={styles.optionText}>
  <MarkdownText inline>
    {option}
  </MarkdownText>
</div>

            </button>
          );
        })}
      </div>

      {/* =========================
          EXPLANATION
      ========================= */}

      {answered && (
        <div style={styles.explanation}>

          <div style={styles.explanationLine} />

          <div style={styles.explanationTitle}>
            Explanation
          </div>

          <MarkdownText style={styles.explanationText}>
            {page.explanation}
          </MarkdownText>

        </div>
      )}

    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {

  // ==========================================================
  // PAGE
  // ==========================================================

  page: {
    width: "100%",
    boxSizing: "border-box",

    padding: "24px 20px 30px",

    background: "#dce9e8",

    borderRadius: 8,

    minHeight: "100%",

    color: "#222",
  },

  // ==========================================================
  // LABEL
  // ==========================================================

  label: {
    width: "fit-content",

    margin: "0 auto 24px",

    padding: "6px 14px",

    background: "#12444b",

    color: "#fff",

    borderRadius: 999,

    fontSize: 12,

    fontWeight: 600,

    letterSpacing: "0.2px",
  },

  // ==========================================================
  // QUESTION
  // ==========================================================

  question: {
    fontSize: 15,

    lineHeight: 1.8,

    color: "#222",

    marginBottom: 20,
  },

  // ==========================================================
  // IMAGE
  // ==========================================================

  image: {
    display: "block",

    width: "100%",

    maxWidth: 360,

    height: "auto",

    margin: "0 auto 22px",

    borderRadius: 8,
  },

  // ==========================================================
  // OPTIONS
  // ==========================================================

  options: {
    display: "flex",

    flexDirection: "column",

    gap: 8,
  },

  option: {
    position: "relative",

    width: "100%",

    minHeight: 50,

padding: "4px 12px",

    boxSizing: "border-box",

    border: "2px dashed #111",

    borderRadius: 8,

    background: "#dce9e8",

    color: "#12444b",

    display: "flex",

    alignItems: "center",

    gap: 10,

    cursor: "pointer",

    fontSize: 14,

    lineHeight: 1.5,

    textAlign: "left",

    transition:
      "background .18s ease, border .18s ease, color .18s ease, box-shadow .18s ease",
  },

  // ==========================================================
  // LETTER
  // ==========================================================

  letter: {
    flexShrink: 0,

    width: 22,
    height: 22,

    display: "flex",

    alignItems: "center",
    justifyContent: "center",

    borderRadius: "50%",

    background: "#12444b",

    color: "#fff",

    fontSize: 10,

    fontWeight: 600,

    lineHeight: 1,
  },

  // ==========================================================
  // CORRECT ANSWER
  // ==========================================================

  correct: {
    background: "#12444b",

    border: "2px solid #12444b",

    color: "#fff",

    boxShadow:
      "0 4px 12px rgba(18,68,75,.18)",
  },

  correctLetter: {
    background: "#fff",

    color: "#12444b",

    border: "none",
  },

  // ==========================================================
  // WRONG ANSWER
  // ==========================================================

  wrong: {
    background: "#202020",

    border: "2px solid #111",

    color: "#fff",

    boxShadow:
      "0 4px 10px rgba(0,0,0,.18)",
  },

  wrongLetter: {
    background: "#fff",

    color: "#222",

    border: "1px solid #fff",

    boxSizing: "border-box",
  },

  // ==========================================================
  // CHECK MARK
  // ==========================================================

  checkMark: {
    fontSize: 14,

    fontWeight: 700,

    lineHeight: 1,
  },

  // ==========================================================
  // EXPLANATION
  // ==========================================================

  explanation: {
    marginTop: 24,

    paddingTop: 16,

    fontSize: 14,

    lineHeight: 1.7,

    color: "#405052",
  },

  explanationLine: {
    width: "100%",

    height: 2,

    background: "#12444b",

    borderRadius: 999,

    marginBottom: 14,
  },

  explanationTitle: {
    color: "#12444b",

    fontWeight: 700,

    fontSize: 12,

    letterSpacing: "0.4px",

    textTransform: "uppercase",

    marginBottom: 6,
  },

  explanationText: {
    color: "#405052",

    fontSize: 13,

    lineHeight: 1.7,
  },

  // ==========================================================
  // OPTION TEXT
  // ==========================================================

  optionText: {
  flex: 1,

  minWidth: 0,

  fontSize: 14,

  lineHeight: 1.4,

  display: "flex",

  alignItems: "center",

  justifyContent: "flex-start",
},
};