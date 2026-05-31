"use client";

import { useState } from "react";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import { useProfile } from "@/features/auth/hooks/useProfile";

import { GuestAuthCard } from "@/features/auth/components/GuestAuthCard";
import { ProfileCard } from "@/features/auth/components/ProfileCard";

import { SignInForm } from "@/features/auth/components/SignInForm";
import { SignUpForm } from "@/features/auth/components/SignUpForm";

import { AboutMeCard } from "@/features/settings/components/AboutMeCard";
import { DonationWalletCard } from "@/features/settings/components/DonationWalletCard";
import { SocialLinks } from "@/features/settings/components/SocialLinks";

import { FutureRoadmap } from "@/features/settings/components/FutureRoadmap";

export default function SettingsPage() {
  const { user, loading } = useAuthSession();
  const profile = useProfile(user);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Settings</h2>

      {/* AUTH SECTION */}
      {!user ? (
        <GuestAuthCard
          onLogin={() => setShowLogin(true)}
          onSignup={() => setShowSignup(true)}
        />
      ) : (
        <ProfileCard user={user} profile={profile} />
      )}

      {/* ABOUT */}
      <AboutMeCard
        name="Behind Minervue"
        bio={`My name is Mohsen Zare. I am a published Iranian ophthalmologist. Minervue is a solo-developed educational platform designed specifically for ophthalmologists, structured around hundreds of flashcards reviewed through a spaced repetition system with integrated self-assessment.

Rather than isolated theoretical facts, it is built around structured clinical reasoning, decision-making frameworks, and deeper conceptual understanding beyond surface-level training content.`}
        imageUrl="/images/et c/Profile.jpg"
      />

      {/* DONATION */}
      <DonationWalletCard
        walletAddress="0xa9Dc587E40E28A2537EFB223Da4685f7046E72fC"
        network="Ethereum / USDT"
      />

      {/* FUTURE ROADMAP */}
      <FutureRoadmap imageUrl="/images/et c/roadmap.png" />

      {/* SOCIAL ICONS */}
      <div style={styles.socialSection}>
        <SocialLinks />
      </div>

      {/* MODALS */}
      {showLogin && (
        <SignInForm onClose={() => setShowLogin(false)} />
      )}

      {showSignup && (
        <SignUpForm onClose={() => setShowSignup(false)} />
      )}
    </div>
  );
}

/* ====================== */

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,

    /* ❌ removed layout conflicts */
    fontFamily: "sans-serif",
  },

  title: {
    fontSize: 22,
    fontWeight: 600,
    textAlign: "center",
    width: "100%",
    marginBottom: 4,
  },

  socialSection: {
    marginTop: 12,
    paddingTop: 18,
    borderTop: "1px solid #eee",
    display: "flex",
    justifyContent: "center",
  },

  loading: {
    padding: 20,
    color: "#777",
  },
};