// features/flashcards/components/CardView.tsx

"use client";

/// ======================
/// IMPORTS
/// ======================
import type { Card } from "@/shared/types/card";
import type { CSSProperties } from "react";

/// ======================
/// PROPS
/// ======================

type Props = {
  card: Card;
  showAnswer: boolean;
};

/// ======================
/// COMPONENT
/// ======================

export default function CardView({
  card,
  showAnswer,
}: Props) {
  if (!card) return null;

  return (
    <div style={styles.card}>

      {/* ======================
          QUESTION
      ====================== */}
      <h3 style={styles.question}>
        {card.q}
      </h3>

      {/* ======================
          QUESTION IMAGE
      ====================== */}
      {card.questionImage && (
        <div style={styles.imageContainer}>
          <img
            src={card.questionImage}
            alt={card.q}
            style={styles.image}
          />
        </div>
      )}

      {/* ======================
          SEPARATOR (Q → A)
      ====================== */}
      <div style={styles.separator} />

      {/* ======================
          ANSWER TEXT
      ====================== */}
      {showAnswer && (
        <div style={styles.answer}>
          {card.a}
        </div>
      )}

      {/* ======================
          ANSWER IMAGE
      ====================== */}
      {showAnswer && card.answerImage && (
        <div style={styles.imageContainer}>
          <img
            src={card.answerImage}
            alt={card.a}
            style={styles.image}
          />
        </div>
      )}

    </div>
  );
}

/// ======================
/// STYLES
/// ======================

const styles: Record<string, CSSProperties> = {
  card: {
    padding: 22,
    borderRadius: 16,
    border: "1px solid #eee",
    background: "#fff",
  },

  question: {
    fontSize: 18,
    fontWeight: 600,
  },

  answer: {
    marginTop: 14,
  },

  imageContainer: {
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid #f0f0f0",
    background: "#fafafa",
  },

  image: {
    width: "100%",
    height: "auto",
    maxHeight: 360,
    objectFit: "contain",
    display: "block",
  },

  /// ======================
  /// FADE SEPARATOR LINE
  /// ======================
  separator: {
    height: 1,
    margin: "16px 0",
    background:
      "linear-gradient(to right, transparent, #ddd 20%, #ddd 80%, transparent)",
  },
};