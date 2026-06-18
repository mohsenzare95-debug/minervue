// shared/icons/renderCardText.tsx
import React from "react";
import { iconMap } from "./iconmap";

const ICON_REGEX = /\[([A-Z]+)\]/g;

export function renderCardText(text: string) {
  const parts = text.split(ICON_REGEX);

  return parts.map((part, i) => {
    // اگر part دقیقاً یکی از کلیدهای iconMap بود
    const Icon = iconMap[part as keyof typeof iconMap];

    if (Icon) {
      return (
        <Icon
          key={`icon-${i}`}
          size={18}
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            margin: "0 4px",
            position: "relative",
            top: "-1px",
          }}
        />
      );
    }

    return <span key={`text-${i}`}>{part}</span>;
  });
}