// features/flashcards/components/AnswerControls.tsx

import { CheckCircle, HelpCircle, XCircle } from "lucide-react";

/// ======================
/// TYPES
/// ======================

type AnswerValue = "Correct" | "Almost" | "Wrong";

type Props = {
  selected: AnswerValue | null;
  chooseAnswer: (value: AnswerValue) => void;
  canNext: boolean;
  handleNext: () => void;
};

/// ======================
/// SINGLE BUTTON (internal primitive)
/// ======================

function AnswerButton({
  icon: Icon,
  label,
  onClick,
  active,
}: {
  icon: any;
  label: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.btn,
        background: active ? "#111" : "#fff",
        color: active ? "#fff" : "#111",
        border: active ? "1px solid #111" : "1px solid #ddd",
      }}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}

/// ======================
/// MAIN CONTROL COMPONENT
/// ======================

export default function AnswerControls({
  selected,
  chooseAnswer,
  canNext,
  handleNext,
}: Props) {
  return (
    <>
      {/* ======================
          ANSWER OPTIONS
      ====================== */}
      <div style={styles.rowButtons}>
        <AnswerButton
          icon={CheckCircle}
          label="Correct"
          active={selected === "Correct"}
          onClick={() => chooseAnswer("Correct")}
        />

        <AnswerButton
          icon={HelpCircle}
          label="Almost"
          active={selected === "Almost"}
          onClick={() => chooseAnswer("Almost")}
        />

        <AnswerButton
          icon={XCircle}
          label="Wrong"
          active={selected === "Wrong"}
          onClick={() => chooseAnswer("Wrong")}
        />
      </div>

      {/* ======================
          NEXT BUTTON
      ====================== */}
      {canNext && (
        <button style={styles.nextBtn} onClick={handleNext}>
          Next
        </button>
      )}
    </>
  );
}

/// ======================
/// STYLES
/// ======================

const styles = {
  rowButtons: {
    display: "flex",
    gap: 10,
    marginTop: 20,
  },

  btn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
  },

  nextBtn: {
    marginTop: 14,
    width: "100%",
    padding: 14,
    borderRadius: 12,
    background: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};