//features\decks\components\ResetDeckButton.tsx
"use client";

import { useState } from "react";
import ConfirmResetModal from "@/shared/components/ConfirmResetModal";

export default function ResetDeckButton({
  deckKey,
  onReset,
}: {
  deckKey: string;
  onReset: (deckKey: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        style={{
          fontSize: 12,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: "#b00",
        }}
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        reset
      </button>

      <ConfirmResetModal
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          onReset(deckKey);
          setOpen(false);
        }}
      />
    </>
  );
}

const styles = {
  modalOverlay: {
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

  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 280,
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 16,
  },
};