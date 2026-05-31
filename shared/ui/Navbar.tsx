//shared\ui\Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, BarChart3, Settings } from "lucide-react";

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
    bottom: 0,
    left: 0,
    right: 0,
    height: 76,
    background: "#fff",
    borderTop: "1px solid #eee",
    display: "flex",
    padding: "0 12px",
    zIndex: 1000,
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