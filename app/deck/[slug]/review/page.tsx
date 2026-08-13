import { deckRegistry } from "@/data/decks";
import { notFound } from "next/navigation";
import DeckReviewClient from "@/features/flashcards/components/DeckReviewClient";

export default async function DeckReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const cards =
    deckRegistry[
      slug as keyof typeof deckRegistry
    ];

  if (!cards) {
    return notFound();
  }

  return (
    <DeckReviewClient
      cards={cards}
    />
  );
}