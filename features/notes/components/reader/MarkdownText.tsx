//features\notes\components\reader\MarkdownText.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode, CSSProperties } from "react";
import { renderNoteDescription } from "@/shared/icons/renderNoteDescription";

export default function MarkdownText({
  children,
  style,
  inline = false,
}: {
  children: string;
  style?: CSSProperties;
  inline?: boolean;
}) {
  return (
    <div
      style={{
        ...style,
        ...(inline ? styles.inline : {}),
      }}
    >
      <ReactMarkdown
      remarkPlugins={[remarkGfm]}
        components={{
          ...mdComponents,

          p: ({ children }) => (
            <p
              style={
                inline
                  ? styles.inlineP
                  : styles.p
              }
            >
              {renderMarkdownChildren(children)}
            </p>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
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
      {renderMarkdownChildren(children)}
    </strong>
  ),

  em: ({ children }: { children?: ReactNode }) => (
    <em style={styles.em}>
      {renderMarkdownChildren(children)}
    </em>
  ),

  h1: ({ children }: { children?: ReactNode }) => (
    <h1 style={styles.h1}>
      {renderMarkdownChildren(children)}
    </h1>
  ),

  h2: ({ children }: { children?: ReactNode }) => (
    <h2 style={styles.h2}>
      {renderMarkdownChildren(children)}
    </h2>
  ),

  h3: ({ children }: { children?: ReactNode }) => (
    <h3 style={styles.h3}>
      {renderMarkdownChildren(children)}
    </h3>
  ),

  hr: () => <hr style={styles.hr} />,

  br: () => <br />,

  // TABLE
  table: ({ children }: { children?: ReactNode }) => (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children }: { children?: ReactNode }) => (
    <thead style={styles.thead}>
      {children}
    </thead>
  ),

  tbody: ({ children }: { children?: ReactNode }) => (
    <tbody>
      {children}
    </tbody>
  ),

  tr: ({ children }: { children?: ReactNode }) => (
    <tr style={styles.tr}>
      {children}
    </tr>
  ),

  th: ({ children }: { children?: ReactNode }) => (
    <th style={styles.th}>
      {renderMarkdownChildren(children)}
    </th>
  ),

  td: ({ children }: { children?: ReactNode }) => (
    <td style={styles.td}>
      {renderMarkdownChildren(children)}
    </td>
  ),
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
  p: {
    margin: "0 0 14px",
    lineHeight: 1.8,
  },

  ul: {
    margin: "8px 0 14px",
    paddingLeft: 22,
    lineHeight: 1.8,
  },

  ol: {
    margin: "8px 0 14px",
    paddingLeft: 22,
    lineHeight: 1.8,
  },

  li: {
    margin: "2px 0",
    lineHeight: 1.8,
  },

  strong: {
    fontWeight: 600,
    color: "#222",
  },

  em: {
    fontStyle: "italic",
  },

  h1: {
    fontSize: 20,
    lineHeight: 1.4,
    margin: "0 0 16px",
    fontWeight: 700,
  },

  h2: {
    fontSize: 18,
    lineHeight: 1.45,
    margin: "0 0 14px",
    fontWeight: 700,
  },

  h3: {
    fontSize: 16,
    lineHeight: 1.5,
    margin: "0 0 12px",
    fontWeight: 700,
  },

  hr: {
    border: "none",
    borderTop: "1px solid #ddd",
    margin: "18px 0",
  },

  inline: {
  display: "inline",
},

inlineP: {
  margin: 0,
  padding: 0,
  lineHeight: 1.4,
},

tableWrapper: {
  width: "100%",
  overflowX: "auto",
  margin: "18px 0 20px",
},

table: {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 13,
  lineHeight: 1.6,
  background: "#fff",
},

thead: {
  background: "#dce9e8",
},

tr: {
  borderBottom: "1px solid #d9d9d9",
},

th: {
  padding: "9px 10px",
  textAlign: "left",
  fontWeight: 600,
  color: "#12444b",
  border: "1px solid #cfd9d8",
},

td: {
  padding: "9px 10px",
  verticalAlign: "middle",
  border: "1px solid #d9d9d9",
  color: "#333",
},
};