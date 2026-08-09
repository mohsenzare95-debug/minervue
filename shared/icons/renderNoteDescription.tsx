import React from "react";
import { iconMap } from "./iconmap";

const ICON_REGEX = /\[([A-Z]+)\]/g;

export function renderNoteDescription(text: string) {
  const parts = text.split(ICON_REGEX);

  return parts.map((part, index) => {
    const Icon = iconMap[part as keyof typeof iconMap];

    if (Icon) {
      return (
        <Icon
          key={`note-icon-${index}`}
          size={18}
          strokeWidth={1.8}
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            margin: "0 4px",
            position: "relative",
            top: "-1px",
            color: "#12444b",
          }}
        />
      );
    }

    return (
  <React.Fragment key={`note-text-${index}`}>
    {part.split("\n").map((line, i, lines) => (
      <React.Fragment key={i}>
        {line}
        {i < lines.length - 1 && <br />}
      </React.Fragment>
    ))}
  </React.Fragment>
);
  });
}