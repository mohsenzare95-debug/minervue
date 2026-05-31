"use client";

import { Mail, Globe, Send } from "lucide-react";

export function SocialLinks() {
  return (
    <div style={styles.container}>
      {/* EMAIL */}
      <a
        href="mailto:mohsenzare95@gmail.com"
        style={styles.iconBtn}
      >
        <Mail size={22} />
      </a>

      {/* INSTAGRAM */}
      <a
        href="https://instagram.com/iceburgins"
        target="_blank"
        rel="noreferrer"
        style={styles.iconBtn}
      >
        <Globe size={22} />
      </a>

      {/* TELEGRAM */}
      <a
        href="https://t.me/didardeck"
        target="_blank"
        rel="noreferrer"
        style={styles.iconBtn}
      >
        <Send size={22} />
      </a>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: 24,
    marginTop: 20,
  },

  iconBtn: {
    color: "#111",
    background: "#f5f5f5",
    width: 44,
    height: 44,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    transition: "all 0.2s ease",
  },
};