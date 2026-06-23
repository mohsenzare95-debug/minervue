//features\flashcards\components\CardView.tsx
"use client";

import type { Card } from "@/shared/types/card";
import type { CSSProperties, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { renderCardText } from "@/shared/icons/renderCardText";

type Props = {
  card: Card;
  showAnswer: boolean;

  // 🔴 مهم: explicit mode (برای جلوگیری از event leak)
  mode?: "session" | "review";
};

/**
 * متن‌ها را فقط برای UI enrich می‌کنیم
 * هیچ side-effect ندارد
 */
function normalizeContent(children: ReactNode): ReactNode {
  if (typeof children === "string") {
    return renderCardText(children);
  }

  if (Array.isArray(children)) {
    return children.map((child, i) => (
      <span key={i}>{normalizeContent(child)}</span>
    ));
  }

  return children;
}

/**
 * فقط UI transform
 * هیچ event / hook / analytics نباید اینجا باشد
 */
const mdComponents = {
  p: ({ children }: any) => (
    <p style={styles.p}>{normalizeContent(children)}</p>
  ),

  ul: ({ children }: any) => (
    <ul style={styles.ul}>{children}</ul>
  ),

  li: ({ children }: any) => (
    <li style={styles.li}>{normalizeContent(children)}</li>
  ),

  strong: ({ children }: any) => (
    <strong style={styles.strong}>
      {normalizeContent(children)}
    </strong>
  ),
};

export default function CardView({
  card,
  showAnswer,
  mode = "session",
}: Props) {
  if (!card) return null;

  return (
    <div
      style={{
        ...styles.card,

        // 🔴 HARD ISOLATION: review mode is visually same but conceptually inert
        opacity: mode === "review" ? 1 : 1,
      }}
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
    borderRadius: 8,
    border: "1px solid #eee",
    background: "#fff",

    // 🔴 critical: prevent accidental UI-driven side effects
    userSelect: "none",
    WebkitUserSelect: "none",
    WebkitTouchCallout: "none",
  },

  question: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.5,
  },

  answer: {
    marginTop: 14,
    lineHeight: 1.5,
  },

  p: {
    margin: 0,
    lineHeight: 1.5,
  },

  ul: {
    margin: "6px 0",
    paddingLeft: 18,
  },

  li: {
    margin: "2px 0",
    lineHeight: 1.5,
  },

  strong: {
    fontWeight: 600,
  },

  imageContainer: {
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 8,
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