//shared\ui\Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, BarChart3, Settings } from "lucide-react";

const CONTAINER_WIDTH = 480;

export default function Navbar() {
  const pathname = usePathname();

  const tabs = [
    { name: "Stats", href: "/stats", icon: BarChart3 },
    { name: "Decks", href: "/", icon: BookOpen },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div style={styles.wrapper}>
      {tabs.map((tab) => {
        const Icon = tab.icon;

        const isActive =
          pathname === tab.href ||
          (tab.href === "/" && pathname.startsWith("/deck"));

        return (
          <Link key={tab.href} href={tab.href} style={styles.link}>
            <div style={styles.item}>
              {/* ICON (no size change at all) */}
              <div style={styles.iconWrap}>
                <Icon size={26} color={isActive ? "#000" : "#999"} />
              </div>

              {/* LABEL (fixed height → no shift) */}
              <div
                style={{
                  ...styles.label,
                  color: isActive ? "#000" : "#999",
                }}
              >
                {tab.name}
              </div>

              {/* INDICATOR (absolute, no layout effect) */}
              <div
                style={{
                  ...styles.indicator,
                  opacity: isActive ? 1 : 0,
                  transform: "translateX(-50%) scale(" + (isActive ? 1 : 0.7) + ")",
                }}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",

    left: "50%",
    transform: "translateX(-50%)",

    bottom: 16,

    width: "calc(100% - 32px)",
    maxWidth: CONTAINER_WIDTH - 32,

    height: 72,

    display: "flex",

    padding: "0 12px",

    zIndex: 1000,

    background: "rgba(255,255,255,0.75)",

    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",

    border: "1px solid rgba(255,255,255,0.4)",

    borderRadius: 24,

    boxShadow:
      "0 8px 30px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
  },

  link: {
    flex: 1,
    textDecoration: "none",
  },

  item: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    position: "relative",

    /* 🔥 مهم‌ترین بخش */
    minWidth: 0,
    flexShrink: 0,
  },

  iconWrap: {
    height: 28, // 🔥 ثابت کردن box icon
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 11,
    fontWeight: 500,
    height: 14, // 🔥 جلوگیری از shift
    lineHeight: "14px",
  },

  indicator: {
    position: "absolute",
    bottom: 6,
    left: "50%",
    width: 16,
    height: 2,
    borderRadius: 2,
    background: "#000",
    transition: "all 0.2s ease",
  },
};