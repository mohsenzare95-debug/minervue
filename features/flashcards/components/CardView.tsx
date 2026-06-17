//C:\Users\DOR CO\flashcards-app\features\flashcards\components\CardView.tsx
"use client";

import type { Card } from "@/shared/types/card";
import type { CSSProperties } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  card: Card;
  showAnswer: boolean;
};

const mdComponents = {
  p: ({ children }: any) => (
    <p style={{ margin: 0, lineHeight: 1.4 }}>{children}</p>
  ),
  ul: ({ children }: any) => (
    <ul style={{ margin: "6px 0", paddingLeft: 18 }}>{children}</ul>
  ),
  li: ({ children }: any) => (
    <li style={{ margin: "2px 0", lineHeight: 1.4 }}>{children}</li>
  ),
  strong: ({ children }: any) => (
    <strong style={{ fontWeight: 600 }}>{children}</strong>
  ),
};

export default function CardView({ card, showAnswer }: Props) {
  if (!card) return null;

  return (
    <div
      style={styles.card}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* QUESTION */}
      <div style={styles.question}>
        <ReactMarkdown components={mdComponents}>
          {card.q}
        </ReactMarkdown>
      </div>

      {/* QUESTION IMAGE */}
      {card.questionImage && (
        <div style={styles.imageContainer}>
          <img
            src={card.questionImage}
            alt={card.q}
            style={styles.image}
          />
        </div>
      )}

      {/* SEPARATOR */}
      <div style={styles.separator} />

      {/* ANSWER */}
      {showAnswer && (
        <div style={styles.answer}>
          <ReactMarkdown components={mdComponents}>
            {card.a}
          </ReactMarkdown>
        </div>
      )}

      {/* ANSWER IMAGE */}
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

const styles: Record<string, CSSProperties> = {
  card: {
    padding: 16,
    borderRadius: 16,
    border: "1px solid #eee",
    background: "#fff",
    userSelect: "none",
    WebkitUserSelect: "none" as any,
    WebkitTouchCallout: "none" as any,
  },

  question: {
    fontSize: 18,
    fontWeight: 500,
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

  separator: {
    height: 1,
    margin: "16px 0",
    background:
      "linear-gradient(to right, transparent, #ddd 20%, #ddd 80%, transparent)",
  },
};