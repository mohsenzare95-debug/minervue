import { CheckCircle, HelpCircle, XCircle } from "lucide-react";
import { analytics } from "@/features/analytics/events";

type AnswerValue = "Correct" | "Almost" | "Wrong";

type Props = {
  selected: AnswerValue | null;
  chooseAnswer: (value: AnswerValue) => void;
  canNext: boolean;
  handleNext: () => void;

  deckKey?: string;
  cardId?: string;
};

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

export default function AnswerControls({
  selected,
  chooseAnswer,
  canNext,
  handleNext,
  deckKey,
  cardId,
}: Props) {
  const emitAnswer = (answer: AnswerValue) => {
    analytics.cardAnswered(deckKey!, cardId!, answer);
    chooseAnswer(answer);
  };

  const emitNext = () => {
    analytics.cardNext(deckKey!, cardId!);
    handleNext();
  };

  return (
    <div style={styles.container}>
      <div style={styles.rowButtons}>
        <AnswerButton
          icon={CheckCircle}
          label="Correct"
          active={selected === "Correct"}
          onClick={() => emitAnswer("Correct")}
        />

        <AnswerButton
          icon={HelpCircle}
          label="Almost"
          active={selected === "Almost"}
          onClick={() => emitAnswer("Almost")}
        />

        <AnswerButton
          icon={XCircle}
          label="Wrong"
          active={selected === "Wrong"}
          onClick={() => emitAnswer("Wrong")}
        />
      </div>

      {canNext && (
        <button style={styles.nextBtn} onClick={emitNext}>
          Next
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  rowButtons: {
    display: "flex",
    gap: 10,
    marginTop: 20,
    width: "100%",
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