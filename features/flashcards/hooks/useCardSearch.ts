"use client";

import { useMemo, useState } from "react";
import type { Card } from "@/shared/types/card";

export function useCardSearch(cards: Card[]) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    // اگر چیزی سرچ نشده،
    // نتیجه‌ای نداریم و صفحه معمولی خودش نمایش داده می‌شود.
    if (!normalizedQuery) {
      return [];
    }

    return cards.filter((card) => {
      const question =
        card.q?.toLowerCase() ?? "";

      const answer =
        card.a?.toLowerCase() ?? "";

      return (
        question.includes(normalizedQuery) ||
        answer.includes(normalizedQuery)
      );
    });
  }, [cards, query]);

  return {
    query,
    setQuery,
    results,
  };
}