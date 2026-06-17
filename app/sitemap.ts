import { decks } from "@/data/decks";

export default function sitemap() {
  const deckUrls = decks.map((deck) => ({
    url: `https://visosage.com/decks/${deck.key}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: "https://visosage.com/decks",
      lastModified: new Date(),
    },
    ...deckUrls,
  ];
}