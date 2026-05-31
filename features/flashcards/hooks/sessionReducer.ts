//features\flashcards\hooks\useFlashcardSession.ts
export type Card = {
  id: string;
  q: string;
  a: string;
  image?: string;
  questionImage?: string;
  answerImage?: string;
  imagePosition?: "question" | "answer";
};

export type AnswerType = "Correct" | "Almost" | "Wrong";

export type SessionState = {
  index: number;
  cards: Card[];
  showAnswer: boolean;
  selected: AnswerType | null;
  finished: boolean;
};

export function createSession(cards: Card[]): SessionState {
  return {
    index: 0,
    cards: shuffle(cards),
    showAnswer: false,
    selected: null,
    finished: false,
  };
}

function shuffle(arr: Card[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function getCurrentCard(state: SessionState) {
  return state.cards[state.index] ?? null;
}

export function answerCard(
  state: SessionState,
  answer: AnswerType
): SessionState {
  return {
    ...state,
    selected: answer,
    showAnswer: true,
  };
}

export function nextCard(state: SessionState): SessionState {
  const nextIndex = state.index + 1;
  const finished = nextIndex >= state.cards.length;

  return {
    ...state,
    index: finished ? state.index : nextIndex,
    showAnswer: false,
    selected: null,
    finished,
  };
}