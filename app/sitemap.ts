import { decks } from "@/data/decks";
import { notes } from "@/data/notes";

export default function sitemap() {
  const deckUrls = decks.map((deck) => ({
    url: `https://visosage.com/decks/${deck.key}`,
    lastModified: new Date(),
  }));

  const noteUrls = Object.entries(notes).flatMap(
    ([slug, note]) =>
      note.sections.map((section) => ({
        url: `https://visosage.com/notes/${slug}/${section.slug}`,
        lastModified: new Date(),
      }))
  );

  return [
    {
      url: "https://visosage.com/decks",
      lastModified: new Date(),
    },
    {
      url: "https://visosage.com/notes",
      lastModified: new Date(),
    },
    ...deckUrls,
    ...noteUrls,
  ];
}