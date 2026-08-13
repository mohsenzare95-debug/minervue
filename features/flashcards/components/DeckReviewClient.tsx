"use client";

import CardView from "./CardView";
import { useCardSearch } from "../hooks/useCardSearch";
import type { Card } from "@/shared/types/card";
import type { CSSProperties } from "react";

type Props = {
  cards: Card[];
};

export default function DeckReviewClient({
  cards,
}: Props) {
  const {
    query,
    setQuery,
    results,
  } = useCardSearch(cards);

  const visibleCards = query.trim()
    ? results
    : cards;

  return (
    <div style={styles.container}>

      {/* TITLE */}
      <h2 style={styles.title}>
        Deck Review
      </h2>

      {/* SEARCH */}
      <div style={styles.searchBox}>
  <span style={styles.searchIcon}>⌕</span>

  <input
    type="text"
    placeholder="Search cards..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    style={styles.searchInput}
  />

  {query && (
    <button
      type="button"
      onClick={() => setQuery("")}
      style={styles.clearButton}
      aria-label="Clear search"
    >
      ×
    </button>
  )}
</div>

      {/* NO RESULTS */}
      {query.trim() && results.length === 0 && (
        <div style={styles.noResults}>
          No cards found.
        </div>
      )}

      {/* CARDS */}
      {visibleCards.map((card) => (
        <div
          key={card.id}
          style={styles.cardWrapper}
        >
          <CardView
            card={card}
            showAnswer={true}
            searchQuery={query}
          />
        </div>
      ))}

    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
  },

  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 6,
  },

  searchBox: {
    width: "100%",
    maxWidth: 520,

    margin: "0 auto 18px",

    display: "flex",
    alignItems: "center",

    gap: 8,

    padding: "10px 14px",

    boxSizing: "border-box",

    background: "#fff",

    border: "1px solid #c8d8d7",

    borderRadius: 8,

    boxShadow:
      "0 3px 10px rgba(0,0,0,.04)",
  },

  searchIcon: {
    fontSize: 22,
    color: "#12444b",
    lineHeight: 1,
  },

  searchInput: {
    flex: 1,

    border: "none",
    outline: "none",

    background: "transparent",

    fontSize: 15,
    color: "#222",
  },

  noResults: {
    textAlign: "center",

    padding: "24px 16px",

    color: "#777",

    fontSize: 14,
  },

  cardWrapper: {
    width: "100%",
    marginBottom: 16,
  },

  clearButton: {
  border: "none",
  background: "transparent",
  color: "#12444b",
  fontSize: 22,
  lineHeight: 1,
  padding: 0,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
},
};