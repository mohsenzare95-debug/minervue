import React from "react";
import type { NotePage } from "@/shared/types/note";
import type { CSSProperties } from "react";
import MarkdownText from "./MarkdownText";

export default function NotePage({
  page,
}: {
  page: Extract<NotePage, { type: "note" }>;
}) {
  return (
    <section style={styles.page}>

      {/* =========================
          LABEL
      ========================= */}

      <div style={styles.label}>
        {page.label}
      </div>

      {/* =========================
          TEXT
      ========================= */}

      <MarkdownText
  style={styles.text}
>
  {page.text}
</MarkdownText>

      {/* =========================
          IMAGE
      ========================= */}

      {page.image && (
        <img
          src={page.image}
          alt=""
          draggable={false}
          style={styles.image}
        />
      )}

    </section>
  );
}
/* ==========================================================
   STYLES
   ========================================================== */

const styles: Record<string, CSSProperties> = {

  /* =========================
     PAGE
     ========================= */

  page: {
    width: "100%",
    boxSizing: "border-box",

    padding: "18px 4px 28px",

    color: "#222",

    overflowWrap: "anywhere",
  },

  /* =========================
     LABEL
     ========================= */

  label: {
    width: "fit-content",

    margin: "0 auto 24px",

    padding: "6px 14px",

    background: "#dce9e8",
    color: "#12444b",

    borderRadius: 999,

    fontSize: 12,
    fontWeight: 600,

    letterSpacing: ".2px",
  },

  /* =========================
     MARKDOWN CONTAINER
     ========================= */

  text: {
    width: "100%",
    maxWidth: "100%",

    boxSizing: "border-box",

    fontSize: 15,
    lineHeight: 1.8,

    color: "#222",

    textAlign: "left",

    overflowWrap: "anywhere",
    wordBreak: "normal",
  },

  /* =========================
     PARAGRAPH
     ========================= */

  p: {
    margin: "0 0 14px",

    lineHeight: 1.8,

    overflowWrap: "anywhere",
    wordBreak: "normal",
  },

  /* =========================
     UNORDERED LIST
     ========================= */

  ul: {
    margin: "8px 0 14px",

    paddingLeft: 22,

    boxSizing: "border-box",

    lineHeight: 1.8,

    overflowWrap: "anywhere",
  },

  /* =========================
     ORDERED LIST
     ========================= */

  ol: {
    margin: "8px 0 14px",

    paddingLeft: 22,

    boxSizing: "border-box",

    lineHeight: 1.8,

    overflowWrap: "anywhere",
  },

  /* =========================
     LIST ITEM
     ========================= */

  li: {
    margin: "2px 0",

    lineHeight: 1.8,

    overflowWrap: "anywhere",
    wordBreak: "normal",
  },

  /* =========================
     BOLD
     ========================= */

  strong: {
    fontWeight: 600,
    color: "#222",
  },

  /* =========================
     ITALIC
     ========================= */

  em: {
    fontStyle: "italic",
  },

  /* =========================
     IMAGE
     ========================= */

  image: {
    display: "block",

    width: "100%",
    maxWidth: 360,

    height: "auto",

    margin: "24px auto 0",

    borderRadius: 8,

    objectFit: "contain",
  },
};