"use client";

import { useState } from "react";
import MarkdownText from "@/features/notes/components/reader/MarkdownText";
import type { Question } from "../data/types";

export default function QuestionBankPage({
  slug,
  questions,
}: {
  slug: string;
  questions: Question[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const question = questions[currentIndex];

  const answered = selected !== null;

  const isCorrect =
    answered &&
    selected === question.correctAnswer;

  const handleSelect = (index: number) => {
    if (answered) return;

    setSelected(index);
  };

  const handleNext = () => {
    if (currentIndex >= questions.length - 1) {
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelected(null);
  };

  return (
    <main style={styles.page}>

      {/* =========================
          HEADER
      ========================= */}

      <div style={styles.header}>

        <div style={styles.title}>
          {slug.charAt(0).toUpperCase() + slug.slice(1)}
        </div>

        <div style={styles.counter}>
          Question {currentIndex + 1} of {questions.length}
        </div>

      </div>


      {/* =========================
          QUESTION CARD
      ========================= */}

      <section style={styles.card}>

        {/* TOPIC */}

        <div style={styles.topic}>
          {question.topic}
        </div>


        {/* QUESTION */}

        <MarkdownText style={styles.question}>
          {question.question}
        </MarkdownText>


        {/* QUESTION IMAGE */}

        {question.questionImage && (
          <img
            src={question.questionImage}
            alt=""
            draggable={false}
            style={styles.image}
          />
        )}


        {/* =========================
            OPTIONS
        ========================= */}

        <div style={styles.options}>

          {question.options.map((option, index) => {

            const isSelected =
              selected === index;

            const isCorrectAnswer =
              index === question.correctAnswer;

            const isWrong =
              answered &&
              isSelected &&
              !isCorrectAnswer;

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(index)}
                style={{
                  ...styles.option,

                  ...(answered && isCorrectAnswer
                    ? styles.correct
                    : {}),

                  ...(isWrong
                    ? styles.wrong
                    : {}),

                  ...(isSelected &&
                  !answered
                    ? styles.selected
                    : {}),
                }}
              >

                <span
                  style={{
                    ...styles.letter,

                    ...(answered &&
                    isCorrectAnswer
                      ? styles.correctLetter
                      : {}),

                    ...(isWrong
                      ? styles.wrongLetter
                      : {}),
                  }}
                >
                  {answered && isCorrectAnswer
                    ? "✓"
                    : String.fromCharCode(65 + index)}
                </span>

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
              {question.explanation}
            </MarkdownText>

          </div>
        )}


        {/* =========================
            NEXT QUESTION
        ========================= */}

        {answered && (
          <div style={styles.nextWrapper}>

            <button
              type="button"
              onClick={handleNext}
              disabled={
                currentIndex >= questions.length - 1
              }
              style={{
                ...styles.nextButton,

                ...(currentIndex >= questions.length - 1
                  ? styles.nextDisabled
                  : {}),
              }}
            >
              {currentIndex >= questions.length - 1
                ? "End of Question Bank"
                : "Next Question →"}
            </button>

          </div>
        )}

      </section>

    </main>
  );
}


const styles: Record<string, React.CSSProperties> = {

  // ==========================================================
  // PAGE
  // ==========================================================

  page: {
    width: "100%",
    boxSizing: "border-box",
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    marginBottom: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: 600,
    color: "#222",
  },

  counter: {
    marginTop: 4,
    fontSize: 12,
    color: "#777",
  },


  // ==========================================================
  // CARD
  // ==========================================================

  card: {
    width: "100%",
    boxSizing: "border-box",

    padding: "24px 20px 30px",

    background: "#dce9e8",

    borderRadius: 8,

    color: "#222",
  },


  // ==========================================================
  // TOPIC
  // ==========================================================

  topic: {
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
    display: "grid",

    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",

    gap: 8,

    width: "100%",
  },


  // ==========================================================
  // OPTION
  // ==========================================================

  option: {
    position: "relative",

    width: "100%",

    minHeight: 58,

    padding: "8px 12px",

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


  selected: {
    background: "#c9dddb",

    border: "2px solid #12444b",
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


  // ==========================================================
  // CORRECT
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
  // WRONG
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
  // NEXT
  // ==========================================================

  nextWrapper: {
    display: "flex",

    justifyContent: "flex-end",

    marginTop: 22,
  },

  nextButton: {
    border: "none",

    borderRadius: 8,

    padding: "10px 16px",

    background: "#12444b",

    color: "#fff",

    fontSize: 13,

    fontWeight: 600,

    cursor: "pointer",

    transition:
      "background .18s ease, opacity .18s ease",
  },

  nextDisabled: {
    opacity: 0.45,

    cursor: "default",
  },
};