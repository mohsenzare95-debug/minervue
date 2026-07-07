//app\deck\[slug]\review\page.tsx
import { deckRegistry } from "@/data/decks";
import { notFound } from "next/navigation";
import CardView from "@/features/flashcards/components/CardView";

export default async function DeckReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const cards = deckRegistry[slug as keyof typeof deckRegistry];

  if (!cards) return notFound();

  return (
    <div style={styles.container}>
      
      {/* TITLE */}
      <h2 style={styles.title}>Deck Review</h2>

      {/* CARDS */}
      {cards.map((card) => (
        <div key={card.id} style={styles.cardWrapper}>
          <CardView card={card} showAnswer={true} />
        </div>
      ))}

    </div>
  );
}

// ======================
// STYLES (layout-neutral)
// ======================

const styles: Record<string, React.CSSProperties> = {
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
    marginBottom: 18,
  },

  cardWrapper: {
    width: "100%",
    marginBottom: 16,
  },
};