import type { CSSProperties } from "react";
import QuestionBankList from "@/features/question-bank/components/QuestionBankList";

export default function QuestionBankPage() {
  return (
    <main style={styles.page}>

      <h1 style={styles.title}>
        Question Bank
      </h1>

      <QuestionBankList />

    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    width: "100%",
    boxSizing: "border-box",
  },

  title: {
    margin: "12px 0 22px",

    textAlign: "center",

    fontSize: 22,
    fontWeight: 600,

    lineHeight: 1.2,

    color: "#222",
  },
};