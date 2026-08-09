"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";

import type { NotePage } from "@/shared/types/note";

export default function FillBlankPage({
  page,
}: {
  page: Extract<NotePage, { type: "fillBlank" }>;
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  const parts = page.text.split("______");

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

      <div style={styles.text}>

        {parts[0]}

        <span
          style={{
            ...styles.blank,
            ...(showAnswer
              ? styles.revealed
              : {}),
          }}
        >
          {showAnswer ? page.answer : "\u00A0"}
        </span>

        {parts[1]}

        {/* LIGHTBULB */}
        <button
          type="button"
          onClick={() =>
            setShowAnswer((prev) => !prev)
          }
          aria-label="Reveal answer"
          style={{
            ...styles.bulbButton,
            ...(showAnswer
              ? styles.bulbButtonOn
              : {}),
          }}
        >
          <Lightbulb
            size={20}
            strokeWidth={1.8}
          />
        </button>

      </div>

      {/* =========================
          HINT
      ========================= */}

      <div style={styles.hint}>
        Click the light bulb to reveal the answer.
      </div>

    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "18px 4px 28px",
  },

  /* =========================
     LABEL
  ========================= */

  label: {
    width: "fit-content",

    margin: "0 auto 28px",

    padding: "6px 14px",

    background: "#dce9e8",

    color: "#12444b",

    borderRadius: 999,

    fontSize: 12,

    fontWeight: 600,
  },

  /* =========================
     QUESTION
  ========================= */

  text: {
    fontSize: 15,

    lineHeight: 1.9,

    color: "#222",

    textAlign: "center",
  },

  /* =========================
     BLANK
  ========================= */

  blank: {
    display: "inline-block",

    minWidth: 72,

    height: 25,

    margin: "0 4px",

    verticalAlign: "middle",

    borderBottom:
      "2px solid #12444b",

    transition:
      "all .2s ease",
  },

  revealed: {
    minWidth: 52,

    padding: "0 7px",

    background: "#dce9e8",

    color: "#12444b",

    fontWeight: 600,

    borderRadius: 5,

    borderBottom: "none",
  },

  /* =========================
     LIGHT BULB
  ========================= */

  bulbButton: {
    display: "inline-flex",

    alignItems: "center",
    justifyContent: "center",

    verticalAlign: "middle",

    width: 30,
    height: 30,

    marginLeft: 4,

    padding: 0,

    border: "none",

    background: "transparent",

    color: "#999",

    cursor: "pointer",

    borderRadius: "50%",

    transition:
      "color .2s ease, transform .2s ease",
  },

  bulbButtonOn: {
    color: "#D4A72C",

    transform: "scale(1.08)",
  },

  /* =========================
     HINT
  ========================= */

  hint: {
    marginTop: 24,

    textAlign: "center",

    fontSize: 12,

    fontStyle: "italic",

    color: "#999",

    lineHeight: 1.5,
  },
};