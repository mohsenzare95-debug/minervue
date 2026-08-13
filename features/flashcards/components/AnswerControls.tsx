import { CheckCircle, HelpCircle, XCircle } from "lucide-react";
import type { AnswerType } from "@/shared/types/events";

type Props = {
  selected: AnswerType | null;
  chooseAnswer: (value: AnswerType) => void;
  canNext: boolean;
  handleNext: () => void;
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

        background: active ? "#12444b" : "#fff",

        color: active ? "#fff" : "#12444b",

        border: active
          ? "1px solid #12444b"
          : "1px solid #c8d8d7",
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
}: Props) {
  const emitAnswer = (answer: AnswerType) => {
    chooseAnswer(answer);
  };

  const emitNext = () => {
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
        <button
          style={styles.nextBtn}
          onClick={emitNext}
        >
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

    padding: "12px 10px",

    borderRadius: 8,

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,

    cursor: "pointer",

    fontSize: 14,

    fontWeight: 600,

    transition: "all 0.15s ease",

    boxSizing: "border-box",
  },

  nextBtn: {
    marginTop: 14,

    width: "100%",

    padding: 14,

    borderRadius: 8,

    background: "#12444b",

    color: "#fff",

    border: "1px solid #12444b",

    cursor: "pointer",

    fontSize: 15,

    fontWeight: 600,

    transition: "all 0.15s ease",
  },
};