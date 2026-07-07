// features/decks/components/DeckList.tsx
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
import { clientState } from "@/shared/state/client/clientState";

import { unlockedDecksStorage } from "@/shared/storage/local/unlockedDecksStorage";
import { SignInForm } from "@/features/auth/components/SignInForm";
import { SignUpForm } from "@/features/auth/components/SignUpForm";
import { analytics } from "@/features/analytics/events";
import { Hourglass } from "lucide-react";
import Image from "next/image";

type Deck = any;

export default function DeckList({
  decks,
  getDeckProgress,
}: {
  decks: Deck[];
  getDeckProgress: (deck: Deck) => { percent: number };
}) {
  const [mounted, setMounted] = useState(false);
  const [targetDeck, setTargetDeck] = useState<Deck | null>(null);
  const [buyDeck, setBuyDeck] = useState<Deck | null>(null);
  const [purchaseDeck, setPurchaseDeck] = useState<Deck | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  
  const router = useRouter();
  const { user } = useAuthSession();
  const subscription = useSubscription(user?.id ?? null);

  const deckImages: Record<string, string> = {
    cataract: "/deck-icons/cataract3.png",
    uveitis: "/deck-icons/uveitis2.png",
    glaucoma: "/deck-icons/glaucoma2.png",
  };

  clientState.useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ padding: 16 }}>Loading decks...</div>;
  }

  // دیباگ کاربر (قبل از رندر اصلی)
  console.log("👤 DeckList user", user);

  return (
    <div style={styles.list}>
      {decks.map((deck) => {
        const { percent } = getDeckProgress(deck);

        const isUnlocked =
          deck.isFree === true ||
          subscription.isActive ||
          unlockedDecksStorage.isUnlocked(deck.key);

        return (
          <div key={deck.key} style={styles.cardWrapper}>
            <div style={styles.cardShadow} />

            <div style={styles.card}>
              <Link
                href={isUnlocked ? `/deck/${deck.key}` : "#"}
                style={{
                  ...styles.link,
                  opacity: isUnlocked ? 1 : 0.4,
                }}
                onClick={(e) => {
  analytics.deckSelected();
  analytics.authVerified({
  context: "session_gate",
  user_id: user?.id ?? null,
});

  if (!user) {
    e.preventDefault();
    e.stopPropagation();
    setShowLogin(true);
    return;
  }

  if (!isUnlocked) {
    e.preventDefault();
    e.stopPropagation();
    setBuyDeck(deck);
  }
}}
              >
                {/* icon */}
                <div style={styles.iconWrap}>
                  <Image
                    src={deckImages[deck.key]}
                    alt={deck.name}
                    width={72}
                    height={72}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                {/* title */}
                <div style={styles.deckTitle}>{deck.name}</div>

                {/* divider */}
                <div style={styles.miniDivider} />

                {/* cards + percent */}
                <div style={styles.metaRow}>
                  <span>{deck.cards.length} cards</span>
                  <span>{percent}%</span>
                </div>

                {/* progress */}
                <div style={styles.bar}>
                  <div
                    style={{
                      ...styles.fill,
                      width: `${percent}%`,
                    }}
                  />
                </div>

                {/* footer */}
                <div style={styles.footer}>
                  <button
                    style={styles.footerBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(`/deck/${deck.key}/review`);
                    }}
                  >
                    <Eye size={14} />
                    View
                  </button>

                  <button
                    style={styles.footerBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setTargetDeck(deck);
                    }}
                  >
                    <RefreshCw size={14} />
                    Reset
                  </button>
                </div>
              </Link>
            </div>
          </div>
        );
      })}

      <div style={styles.addCard}>
        <Hourglass size={24} />
        <div>New Decks Coming Soon</div>
      </div>

      {/* RESET MODAL */}
      <ConfirmResetModal
        open={!!targetDeck}
        onCancel={() => setTargetDeck(null)}
        onConfirm={() => {
          if (targetDeck) {
            resetDeckLifecycle(targetDeck.key, user?.id ?? null);
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
              <button onClick={() => setBuyDeck(null)}>Cancel</button>

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

      {/* PURCHASE CONFIRM */}
      <ConfirmPurchaseModal
        open={!!purchaseDeck}
        deck={purchaseDeck}
        onCancel={() => setPurchaseDeck(null)}
        onConfirm={() => {
          router.push(`/purchase/${purchaseDeck?.key}`);
        }}
      />

      {/* LOGIN MODAL */}
      {showLogin && (
        <SignInForm
          message="For reviewing flashcards, you need to sign in."
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {/* SIGNUP MODAL */}
      {showSignup && (
        <SignUpForm
          message="Create an account to continue."
          onClose={() => setShowSignup(false)}
          onSwitchToSignin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
}

/* ====================== */

const styles = {
 list: {
  display: "grid",
  gridTemplateColumns: "repeat(2,minmax(0,1fr))",
  gap: 14,
  width: "100%",
},

  cardWrapper: {
    position: "relative",
     minWidth:0
  },

  cardShadow: {
    position: "absolute",
    top: -11,
    left: "4%",
    width: "92%",
    height: 24,
    background: "#12444bdf",
    borderRadius: 7,
    transform: "rotate(-1deg)",
    transformOrigin: "center",
    zIndex: 0,
  },

  card: {
    position: "relative",
    background: "#fefefe",
    borderRadius: 8,
    border: "1px solid #F3F3F3",
    minHeight: 250,
    padding: 20,
    zIndex: 1,
    width:"100%",
    boxSizing:"border-box"
  },

  iconWrap: {
    width: 92,
    height: 92,
    overflow: "hidden",
    borderRadius: "50%",
    margin: "0 auto 18px",
  },

  deckTitle: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
  },

  miniDivider: {
    width: 26,
    height: 4,
    borderRadius: 999,
    background: "#12444bdf",
    margin: "0 auto 18px",
  },

  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13,
    color: "#666",
    marginBottom: 10,
  },

  footer: {
    marginTop: 18,
    paddingTop: 14,
    borderTop: "1px solid #EEE",
    display: "flex",
    justifyContent: "space-around",
  },

  footerBtn: {
    border: "none",
    background: "transparent",
    display: "flex",
    gap: 6,
    alignItems: "center",
    cursor: "pointer",
    color: "#12444bdf",
    fontSize: 13,
  },

  addCard: {
    minHeight: 250,
    borderRadius: 8,
    border: "2px dashed #1e4d559c",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#1e4d559c",
    gap: 12,
    textAlign: "center",
    fontSize: 14,
    padding: "0 10px",
    lineHeight: 1.3,
    fontWeight: 600,
  },

  link: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    textDecoration: "none",
    color: "#111",
  },

  bar: {
    height: 9,
    background: "#1e4d559c",
    borderRadius: 9999,
    marginTop: 10,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    background: "#12444bdf",
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
    borderRadius: 8,
    width: 300,
  },
};