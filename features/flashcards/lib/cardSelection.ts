// features/flashcards/lib/cardSelection.ts

import type { Card } from "@/shared/types/card";
import type { DeckProgress } from "@/shared/types/progress";

// ======================
// CONFIG
// ======================

const SESSION_SIZE = 20;

// ======================
// HELPERS
// ======================

function shuffle<T>(
  arr: T[]
): T[] {
  return [...arr].sort(
    () => Math.random() - 0.5
  );
}

function takeCards(
  source: Card[],
  count: number
): Card[] {
  return shuffle(source).slice(
    0,
    count
  );
}

// ======================
// CARD GROUPING
// ======================

function groupCards(
  cards: Card[],
  progress: DeckProgress
) {
  const activeCards = cards.filter(
    (card) =>
      !progress[card.id]?.mastered
  );

  const newCards = activeCards.filter(
    (card) =>
      !progress[card.id]?.seen
  );

  const reviewCards =
    activeCards.filter(
      (card) =>
        progress[card.id]?.seen
    );

  const streak2 =
    reviewCards.filter(
      (card) =>
        progress[card.id]
          ?.streak === 2
    );

  const streak1 =
    reviewCards.filter(
      (card) =>
        progress[card.id]
          ?.streak === 1
    );

  const streak0 =
    reviewCards.filter(
      (card) =>
        (progress[card.id]
          ?.streak ?? 0) === 0
    );

  return {
    activeCards,
    newCards,
    streak2,
    streak1,
    streak0,
  };
}

// ======================
// REVIEW CARD PICKING
// ======================

function pickReviewCards(
  streak2: Card[],
  streak1: Card[],
  streak0: Card[]
): Card[] {
  const targetReview =
    SESSION_SIZE -
    Math.round(
      SESSION_SIZE * 0.3
    );

  const perGroup =
    Math.floor(
      targetReview / 3
    );

  const picked2 =
    takeCards(
      streak2,
      perGroup
    );

  let missingFrom2 =
    perGroup -
    picked2.length;

  if (missingFrom2 < 0) {
    missingFrom2 = 0;
  }

  const picked1 =
    takeCards(
      streak1,
      perGroup +
        missingFrom2
    );

  let missingFrom1 =
    perGroup +
    missingFrom2 -
    picked1.length;

  if (missingFrom1 < 0) {
    missingFrom1 = 0;
  }

  const picked0 =
    takeCards(
      streak0,
      perGroup +
        missingFrom1
    );

  return [
    ...picked2,
    ...picked1,
    ...picked0,
  ];
}

// ======================
// SESSION FILLER
// ======================

function fillRemainingCards(
  session: Card[],
  activeCards: Card[]
): Card[] {
  if (
    session.length >=
    SESSION_SIZE
  ) {
    return session;
  }

  const usedIds = new Set(
    session.map(
      (c) => c.id
    )
  );

  const remaining =
    shuffle(
      activeCards.filter(
        (card) =>
          !usedIds.has(
            card.id
          )
      )
    );

  while (
    session.length <
      SESSION_SIZE &&
    remaining.length
  ) {
    session.push(
      remaining.pop()!
    );
  }

  return session;
}

// ======================
// MAIN SELECTION
// ======================

export function selectCardsForSession(
  cards: Card[],
  progress: DeckProgress
): Card[] {

  console.log("🎯 SELECT SESSION CALLED", {
    totalCards: cards.length,
    progressCards: Object.keys(progress).length,
  });

  // ======================
  // GROUP CARDS
  // ======================

  const {
    activeCards,
    newCards,
    streak2,
    streak1,
    streak0,
  } = groupCards(
    cards,
    progress
  );

  // ======================
  // REVIEW CARDS
  // ======================

  const reviewPicked =
    pickReviewCards(
      streak2,
      streak1,
      streak0
    );

  // ======================
  // NEW CARDS
  // ======================

  const targetNew =
    Math.round(
      SESSION_SIZE * 0.3
    );

  const newPicked =
    takeCards(
      newCards,
      targetNew
    );

  // ======================
  // COMBINE
  // ======================

  const session = [
    ...reviewPicked,
    ...newPicked,
  ];

  // ======================
  // FILL REMAINING
  // ======================

  fillRemainingCards(
    session,
    activeCards
  );

  // ======================
  // DEBUG SESSION CONTENT (قبل از shuffle نهایی)
  // ======================

  const stats = {
    newCards: 0,
    streak0: 0,
    streak1: 0,
    streak2: 0,
    mastered: 0,
  };

  for (const card of session) {
    const p = progress[card.id];

    if (!p?.seen) {
      stats.newCards++;
      continue;
    }

    if (p.mastered) {
      stats.mastered++;
      continue;
    }

    switch (p.streak) {
      case 0:
        stats.streak0++;
        break;
      case 1:
        stats.streak1++;
        break;
      case 2:
        stats.streak2++;
        break;
    }
  }

  console.log("🎯 SESSION COMPOSITION", {
    sessionSize: session.length,
    ...stats,
  });

  // جدول دقیق کارت‌ها (بسیار مفید برای دیباگ)
  console.table(
    session.map((card) => {
      const p = progress[card.id];

      return {
        id: card.id,
        seen: p?.seen ?? false,
        streak: p?.streak ?? "NEW",
        mastered: p?.mastered ?? false,
      };
    })
  );

  // ======================
  // FINAL SHUFFLE + LOG
  // ======================

  const finalSession = shuffle(session);

  console.log("🎯 SESSION CREATED", {
    totalCards: cards.length,
    sessionSize: finalSession.length,
  });

  return finalSession;
}