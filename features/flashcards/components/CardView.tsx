//features\flashcards\components\CardView.tsx
"use client";

import type { Card } from "@/shared/types/card";
import React, {
  type CSSProperties,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { renderCardText } from "@/shared/icons/renderCardText";

type Props = {
  card: Card;
  showAnswer: boolean;
  mode?: "session" | "review";
  searchQuery?: string;
};

function highlightText(
  text: string,
  query: string
): ReactNode {
  if (!query.trim()) {
    return renderCardText(text);
  }

  const escaped = query.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  const parts = text.split(
    new RegExp(`(${escaped})`, "gi")
  );

  return parts.map((part, index) => {
    if (
      part.toLowerCase() ===
      query.toLowerCase()
    ) {
      return (
        <mark
          key={index}
          style={{
            background: "#b8d9d5",
            color: "#12444b",
            padding: "1px 3px",
            borderRadius: 3,
          }}
        >
          {part}
        </mark>
      );
    }

    return (
      <React.Fragment key={index}>
        {renderCardText(part)}
      </React.Fragment>
    );
  });
}

function normalizeContent(
  children: ReactNode,
  searchQuery: string
): ReactNode {
  if (typeof children === "string") {
  return highlightText(
    children,
    searchQuery
  );
}

  if (Array.isArray(children)) {
  return children.map((child, i) => (
    <span key={i}>
      {normalizeContent(child, searchQuery)}
    </span>
  ));
}

  return children;
}

const createMdComponents = (searchQuery: string) => ({
  p: ({ children }: any) => (
    <p style={styles.p}>
      {normalizeContent(children, searchQuery)}
    </p>
  ),

  ul: ({ children }: any) => (
    <ul style={styles.ul}>{children}</ul>
  ),

  li: ({ children }: any) => (
    <li style={styles.li}>
      {normalizeContent(children, searchQuery)}
    </li>
  ),

  strong: ({ children }: any) => (
    <strong style={styles.strong}>
      {normalizeContent(children, searchQuery)}
    </strong>
  ),

  // =========================
  // TABLE
  // =========================

  table: ({ children }: any) => (
    <table style={styles.table}>
      {children}
    </table>
  ),

  thead: ({ children }: any) => (
    <thead style={styles.thead}>
      {children}
    </thead>
  ),

  tbody: ({ children }: any) => (
    <tbody>{children}</tbody>
  ),

  tr: ({ children }: any) => (
    <tr style={styles.tr}>
      {children}
    </tr>
  ),

  th: ({ children }: any) => (
    <th style={styles.th}>
      {normalizeContent(children, searchQuery)}
    </th>
  ),

  td: ({ children }: any) => (
    <td style={styles.td}>
      {normalizeContent(children, searchQuery)}
    </td>
  ),
});



export default function CardView({
  card,
  showAnswer,
  mode = "session",
  searchQuery = "",
}: Props) {
  if (!card) return null;

  const mdComponents = createMdComponents(searchQuery);

  return (
    <div
      style={styles.wrapper}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* BACK PAPER 1 */}
      <div style={styles.backPaper1} />

      {/* BACK PAPER 2 */}
      <div style={styles.backPaper2} />

      {/* MAIN PAPER */}
      <div style={styles.card}>

        {/* TOPIC */}
        {card.topic && (
  <div style={styles.topic}>
    #{card.topic}
  </div>
)}

        {/* CONTENT */}
        <div style={styles.content}>

          {/* QUESTION */}
          <div style={styles.question}>
            <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={mdComponents}
>
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
              <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={mdComponents}
>
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
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    position: "relative",
    width: "100%",
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
     MAIN CARD
  ========================= */

  card: {
    position: "relative",

    zIndex: 2,

    width: "100%",

    boxSizing: "border-box",

    background: "#e6e6e6",

    border: "1px solid #eeeeee",

    borderRadius: 8,

    boxShadow: "0 5px 16px rgba(0,0,0,.07)",

    transform: "rotate(-0.2deg)",

    overflow: "visible",
      userSelect: "none",
  WebkitUserSelect: "none",
  WebkitTouchCallout: "none",
  },

  /* =========================
     TOPIC
  ========================= */

  topic: {
    position: "absolute",

    right: 18,
    top: -11,

    padding: "5px 10px",

    background: "#dce9e8",

    color: "#12444b",

    border: "1px solid #b8cecc",

    borderRadius: 7,

    fontSize: 11,

    fontWeight: 700,

    letterSpacing: "0.2px",

    zIndex: 10,
  },

  /* =========================
     CONTENT
  ========================= */

  content: {
    background: "#fff",

    borderRadius: 8,

    padding: "20px 18px 24px",

    boxSizing: "border-box",
  },

  question: {
    fontSize: 18,

    fontWeight: 500,

    lineHeight: 1.5,

    color: "#111",
  },

  answer: {
    marginTop: 14,

    lineHeight: 1.5,

    color: "#222",
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

    /* =========================
     TABLE
  ========================= */

  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "14px 0",
    fontSize: 13,
    lineHeight: 1.5,
  },

  thead: {
    background: "#dce9e8",
  },

  tr: {
    borderBottom: "1px solid #ddd",
  },

  th: {
    padding: "8px 10px",
    textAlign: "left",
    fontWeight: 700,
    color: "#12444b",
    border: "1px solid #d5d5d5",
  },

  td: {
    padding: "8px 10px",
    textAlign: "left",
    verticalAlign: "middle",
    border: "1px solid #d5d5d5",
  },

  /* =========================
     IMAGES
  ========================= */

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

  /* =========================
     SEPARATOR
  ========================= */

  separator: {
    height: 1,

    margin: "16px 0",

    background:
      "linear-gradient(to right, transparent, #ddd 20%, #ddd 80%, transparent)",
  },
};