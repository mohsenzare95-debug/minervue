//features\decks\components\DeckList.tsx
"use client";

import Link from "next/link";
import { RefreshCw, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { resetDeckLifecycle } from "@/features/deckDomain/deckLifecycle";
import ConfirmResetModal from "@/shared/components/ConfirmResetModal";
import ConfirmPurchaseModal from "@/shared/components/ConfirmPurchaseModal";

import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import { useSubscription } from "@/features/subscription/hook/useSubscription";

import { unlockedDecksStorage } from "@/shared/storage/local/unlockedDecksStorage";

export default function DeckList({ decks, getDeckProgress }: any) {
  const [mounted, setMounted] = useState(false);
  const [targetDeck, setTargetDeck] = useState<any>(null);
  const [buyDeck, setBuyDeck] = useState<any>(null);
  const [purchaseDeck, setPurchaseDeck] = useState<any>(null);

  const router = useRouter();
  const { user } = useAuthSession();
  const subscription = useSubscription(user?.id ?? null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ padding: 16 }}>Loading decks...</div>;
  }

  return (
    <div style={styles.list}>
      {decks.map((deck: any) => {
        const { percent } = getDeckProgress(deck);

        // ✅ CENTRALIZED ACCESS LOGIC
        const isUnlocked =
          deck.isFree === true ||
          subscription.isActive ||
          unlockedDecksStorage.isUnlocked(deck.key);

        return (
          <div key={deck.key} style={styles.card}>
            <Link
              href={isUnlocked ? `/deck/${deck.key}` : "#"}
              style={{
                ...styles.link,
                opacity: isUnlocked ? 1 : 0.4,
              }}
              onClick={(e) => {
                if (!isUnlocked) {
                  e.preventDefault();
                  e.stopPropagation();
                  setBuyDeck(deck);
                  return;
                }
              }}
            >
              <div style={styles.top}>
                <div style={styles.titleRow}>
                  <div>{deck.name}</div>

                  {!isUnlocked && (
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setPurchaseDeck(deck);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      🔐
                    </span>
                  )}

                  <span style={styles.count}>
                    ({deck.cards.length} cards)
                  </span>
                </div>

                <div style={styles.right}>
                  <button
                    style={styles.eyeBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(`/deck/${deck.key}/review`);
                    }}
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    style={styles.trashBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setTargetDeck(deck);
                    }}
                  >
                    <RefreshCw size={16} />
                  </button>

                  <span style={styles.percent}>{percent}%</span>
                </div>
              </div>

              <div style={styles.bar}>
                <div
                  style={{
                    ...styles.fill,
                    width: `${percent}%`,
                  }}
                />
              </div>
            </Link>
          </div>
        );
      })}

      {/* RESET MODAL */}
      <ConfirmResetModal
        open={!!targetDeck}
        onCancel={() => setTargetDeck(null)}
        onConfirm={() => {
          if (targetDeck) {
            resetDeckLifecycle(targetDeck.key);
            setTargetDeck(null);
          }
        }}
      />

      {/* BUY MODAL */}
      {buyDeck && (
        <div style={modalStyles.backdrop}>
          <div style={modalStyles.box}>
            <h3>Unlock Deck</h3>

            <p>
              Do you want to purchase <b>{buyDeck.name}</b>?
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button onClick={() => setBuyDeck(null)}>
                Cancel
              </button>

              <button
                onClick={async () => {
                  const res = await fetch("/api/payments/create", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      userId: user?.id,
                      deckKey: buyDeck.key,
                    }),
                  });

                  const data = await res.json();
                  window.location.href = data.payment_url;
                }}
              >
                Pay with Crypto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PURCHASE CONFIRM MODAL */}
      <ConfirmPurchaseModal
        open={!!purchaseDeck}
        deck={purchaseDeck}
        onCancel={() => setPurchaseDeck(null)}
        onConfirm={() => {
          router.push(`/purchase/${purchaseDeck.key}`);
        }}
      />
    </div>
  );
}

const styles = {
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  card: {
    padding: 16,
    borderRadius: 16,
    background: "#fff",
    border: "1px solid #eee",
  },

  link: {
    textDecoration: "none",
    color: "#111",
    display: "block",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: 600,
  },

  titleRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
  },

  count: {
    fontSize: 12,
    color: "#888",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    minWidth: 70,
    justifyContent: "flex-end",
  },

  percent: {
    width: 42,
    textAlign: "right",
  },

  trashBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#444",
    display: "flex",
    alignItems: "center",
  },

  eyeBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#444",
    display: "flex",
    alignItems: "center",
  },

  bar: {
    height: 9,
    background: "#eee",
    borderRadius: 9999,
    marginTop: 10,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    background: "#111",
    borderRadius: 9999,
    transition: "width 0.3s ease",
  },
};

const modalStyles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 300,
  },
};