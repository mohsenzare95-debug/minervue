"use client";

import DeckHero from "@/features/decks/components/DeckHero";
import DeckList from "@/features/decks/components/DeckList";
import { useGlobalProgress } from "@/features/decks/hooks/useGlobalProgress";
import { useDeckProgress } from "@/features/decks/hooks/useDeckProgress";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { SignInForm } from "@/features/auth/components/SignInForm";
import { SignUpForm } from "@/features/auth/components/SignUpForm";
import { decks } from "@/data/decks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { analytics } from "@/features/analytics/events";

export default function DeckPage() {
  const global = useGlobalProgress();
  const { getDeckProgress } = useDeckProgress();

  const { user } = useAuthSession();
  const profile = useProfile(user);

  const router = useRouter();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    analytics.pageViewed();
  }, []);

  const handleFundusClick = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    router.push("/fundus-simulator");
  };

  return (
    <div style={styles.page}>
      <DeckHero
        score={global.score}
        streak={global.streak}
        week={global.week}
        scoreLevel={global.scoreLevel}
        levelProgress={global.levelProgress}
        scoreDots={global.scoreDots}
        userName={profile?.username}
        avatar={profile?.avatar}
      />

      <div style={styles.titleBlock}>
        <div style={styles.title}>
          Decks
        </div>
      </div>

      <DeckList
        decks={decks}
        getDeckProgress={getDeckProgress}
      />

      {/* ====================================================
          FLOATING FUNDUS SIMULATOR BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={handleFundusClick}
        aria-label="Open Fundus Simulator"
        style={styles.fundusFloatingButton}
      >
        <img
  src="/fundus-simulator-icon.png"
  alt=""
  draggable={false}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%",
  }}
/>
      </button>

      {/* ====================================================
          LOGIN MODAL
      ===================================================== */}

      {showLogin && (
        <SignInForm
          message="To use the Fundus Simulator, you need to sign in."
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {/* ====================================================
          SIGNUP MODAL
      ===================================================== */}

      {showSignup && (
        <SignUpForm
          message="Create an account to use the Fundus Simulator."
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

const styles: Record<string, React.CSSProperties> = {
  // ==========================================================
  // PAGE
  // ==========================================================

  page: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    fontFamily: "sans-serif",
    position: "relative",
  },

  // ==========================================================
  // TITLE
  // ==========================================================

  titleBlock: {
    textAlign: "center",
    margin: "0 0 8px",
  },

  title: {
    fontSize: 38,
    fontWeight: 400,
    letterSpacing: "-1px",
    color: "#111",
    lineHeight: 1.1,
  },

  // ==========================================================
  // FLOATING FUNDUS BUTTON
  // ==========================================================
fundusFloatingButton: {
  position: "fixed",

  right: "max(22px, calc((100vw - 480px) / 2 + 16px))",
  bottom: 108,

  width: 58,
  height: 58,

  borderRadius: "50%",

  border: "1px solid rgba(18,68,75,.18)",

  background: "#fff",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  cursor: "pointer",
  padding: 0,

  overflow: "hidden",

  zIndex: 1100,

  boxShadow:
    "0 8px 24px rgba(0,0,0,.16), " +
    "0 2px 6px rgba(0,0,0,.08)",

  transition: "transform .18s ease, box-shadow .18s ease",
},
}