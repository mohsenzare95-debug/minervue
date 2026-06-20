// app/deck/[slug]/page.tsx
import SessionScreen from "@/features/flashcards/components/SessionScreen";
import { deckRegistry } from "@/data/decks";
import { notFound, redirect } from "next/navigation";
import { storageClient } from "@/shared/storage/core/storageClient";

export default async function DeckPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const deckKey = slug;

  const isUnlocked =
    storageClient.unlockedDecks.isUnlocked(deckKey);

  if (!isUnlocked) {
    redirect("/"); // یا صفحه paywall
  }

  const cards = deckRegistry[deckKey as keyof typeof deckRegistry];

  if (!cards) {
    console.error(`Deck "${deckKey}" not found in registry`);
    return notFound();
  }

  return <SessionScreen cards={cards} deckKey={deckKey} />;
}