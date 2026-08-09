import React from "react";
import type { NotePage } from "@/shared/types/note";
import ReactMarkdown from "react-markdown";
import type { ReactNode, CSSProperties } from "react";
import { renderNoteDescription } from "@/shared/icons/renderNoteDescription";

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

      <div style={styles.text}>
        <ReactMarkdown components={mdComponents}>
          {page.text}
        </ReactMarkdown>
      </div>

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
   MARKDOWN COMPONENTS
   ========================================================== */

const mdComponents = {
  p: ({ children }: { children?: ReactNode }) => (
    <p style={styles.p}>
      {renderMarkdownChildren(children)}
    </p>
  ),

  ul: ({ children }: { children?: ReactNode }) => (
    <ul style={styles.ul}>
      {children}
    </ul>
  ),

  ol: ({ children }: { children?: ReactNode }) => (
    <ol style={styles.ol}>
      {children}
    </ol>
  ),

  li: ({ children }: { children?: ReactNode }) => (
    <li style={styles.li}>
      {renderMarkdownChildren(children)}
    </li>
  ),

  strong: ({ children }: { children?: ReactNode }) => (
    <strong style={styles.strong}>
      {children}
    </strong>
  ),

  em: ({ children }: { children?: ReactNode }) => (
    <em style={styles.em}>
      {children}
    </em>
  ),

  br: () => <br />,
};

/* ==========================================================
   MARKDOWN → ICONS
   ========================================================== */

function renderMarkdownChildren(
  children: ReactNode
): ReactNode {
  if (typeof children === "string") {
    return renderNoteDescription(children);
  }

  if (Array.isArray(children)) {
    return children.map((child, index) => (
      <React.Fragment key={index}>
        {renderMarkdownChildren(child)}
      </React.Fragment>
    ));
  }

  return children;
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