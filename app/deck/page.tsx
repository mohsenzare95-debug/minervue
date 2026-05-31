"use client";

import DeckHero from "@/features/decks/components/DeckHero";
import DeckList from "@/features/decks/components/DeckList";
import { useGlobalProgress } from "@/features/decks/hooks/useGlobalProgress";
import { useDeckProgress } from "@/features/decks/hooks/useDeckProgress";

import { decks } from "@/data/decks";

export default function DeckPage() {
  const global = useGlobalProgress();
  const { getDeckProgress } = useDeckProgress();

  return (
    <div style={styles.page}>

      {/* HERO DIRECT (no wrapper card) */}
      <DeckHero
        score={global.score}
        streak={global.streak}
        week={global.week}
        scoreLevel={global.scoreLevel}
        scoreDots={global.scoreDots}
      />

      <div style={styles.titleBlock}>
        <div style={styles.title}>Decks</div>
      </div>

      <DeckList
        decks={decks}
        getDeckProgress={getDeckProgress}
      />
    </div>
  );
}
const styles: Record<string, React.CSSProperties> = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    fontFamily: "sans-serif",
  },

  titleBlock: {
    textAlign: "center",
    margin: "0 0 8px",
  },

  title: {
    fontSize: 38,
    fontWeight: 700,
    letterSpacing: "-1px",
    color: "#111",
    lineHeight: 1.1,
  },
};