// shared/storage/local/reviewLogStorage.ts
// TOTAL ACTIVITY / STATS RESOURCE

export type Activitylog = {
  deckKey: string;
  cardId: string;
  timestamp: number;
  result: "Correct" | "Wrong" | "Almost";
};

const KEY = "review_logs";

function getAll():
Record<string, Activitylog[]> {

  if (typeof window === "undefined") {
    return {};
  }

  try {
    return JSON.parse(
      localStorage.getItem(KEY) || "{}"
    );
  } catch {
    return {};
  }
}

function saveAll(
  data: Record<string, Activitylog[]>
) {

  localStorage.setItem(
    KEY,
    JSON.stringify(data)
  );
}

export const reviewLogStorage = {

  // ======================
  // GET ALL
  // ======================

  getAll() {
    return getAll();
  },

  // ======================
  // GET SINGLE DECK
  // ======================

  get(
    deckKey: string
  ): Activitylog[] {

    return getAll()[deckKey] || [];
  },

  // ======================
  // ADD EVENT
  // ======================

  add(
    deckKey: string,
    event: Omit<
      Activitylog,
      "deckKey"
    >
  ) {

    const all =
      getAll();

    if (!all[deckKey]) {
      all[deckKey] = [];
    }

    all[deckKey].push({
      deckKey,
      ...event,
    });

    saveAll(all);
  },

  // ======================
  // CLEAR DECK
  // ======================

  clear(
    deckKey: string
  ) {

    const all =
      getAll();

    delete all[deckKey];

    saveAll(all);
  },

  // ======================
  // CLEAR ALL
  // ======================

  clearAll() {

    saveAll({});
  },
};