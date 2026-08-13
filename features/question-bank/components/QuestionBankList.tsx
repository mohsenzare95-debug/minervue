//features/question-bank/components/QuestionBankList.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { renderNoteDescription } from "@/shared/icons/renderNoteDescription";

type QuestionBank = {
  key: string;
  title: string;
  icon: string;
  description: string;
  questions: number;
};

const questionBanks: QuestionBank[] = [
  {
    key: "retina",
    title: "Retina",
    icon: "/notes-icons/retina.png",
    questions: 0,
    description:
`Practice questions covering major Retina topics.

[MCQ] Multiple Choice Questions
[ANSWER] Immediate Answer & Explanation`,
  },

  
];

export default function QuestionBankList() {
  return (
    <div style={styles.list}>
      {questionBanks.map((bank) => (
        <Link
          key={bank.key}
          href={`/question-bank/${bank.key}`}
          style={styles.link}
        >
          <div style={styles.card}>

            {/* BACK PAPERS */}

            <div style={styles.backPaper1} />
            <div style={styles.backPaper2} />

            {/* MAIN PAPER */}

            <div style={styles.paper}>

              {/* PAPER CLIP */}

              <div style={styles.clip}>
                <div style={styles.clipInner} />
              </div>

              {/* LEFT */}

              <div style={styles.left}>

                <div style={styles.iconWrap}>
                  <Image
                    src={bank.icon}
                    alt=""
                    width={86}
                    height={86}
                    draggable={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                <div style={styles.divider} />

                <div style={styles.title}>
                  {bank.title}
                </div>

              </div>

              {/* RIGHT */}

              <div style={styles.right}>

                <div style={styles.description}>
                  {renderNoteDescription(bank.description)}
                </div>

              </div>

            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    width: "100%",
  },

  link: {
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },

  card: {
    position: "relative",
    width: "100%",
    minHeight: 180,
    boxSizing: "border-box",
    paddingTop: 5,
    paddingRight: 3,
    paddingBottom: 7,
    paddingLeft: 3,
  },

  backPaper1: {
    position: "absolute",
    left: 10,
    right: 10,
    top: 8,
    bottom: 1,
    background: "#12444b",
    borderRadius: 8,
    transform: "rotate(-1.3deg)",
    zIndex: 0,
  },

  backPaper2: {
    position: "absolute",
    left: 6,
    right: 7,
    top: 5,
    bottom: 4,
    background: "#dce9e8",
    borderRadius: 8,
    transform: "rotate(1.4deg)",
    zIndex: 1,
  },

  paper: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    minHeight: 180,
    background: "#fff",
    border: "1px solid #eeeeee",
    borderRadius: 8,
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    overflow: "visible",
    boxShadow: "0 5px 16px rgba(0,0,0,.07)",
    transform: "rotate(-0.25deg)",
  },

  left: {
    width: "38%",
    minWidth: 130,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 12px 24px 18px",
    boxSizing: "border-box",
  },

  iconWrap: {
    width: 86,
    height: 86,
    borderRadius: "50%",
    overflow: "hidden",
    marginBottom: 13,
  },

  divider: {
    width: 34,
    height: 3,
    borderRadius: 999,
    background: "#12444b",
    marginBottom: 11,
  },

  title: {
    fontSize: 18,
    fontWeight: 500,
    color: "#222",
    lineHeight: 1.2,
    textAlign: "center",
  },

  right: {
    flex: 1,
    padding: "24px 14px",
    boxSizing: "border-box",
  },

  description: {
    width: "calc(100% + 20px)",
    marginLeft: -20,
    fontSize: 13,
    lineHeight: 1.7,
    color: "#666",
  },

  questionCount: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: 600,
    color: "#12444b",
  },

  clip: {
    position: "absolute",
    right: 22,
    top: -12,
    width: 16,
    height: 38,
    border: "2.5px solid #777",
    borderRadius: "9px 9px 7px 7px",
    transform: "rotate(17deg)",
    boxSizing: "border-box",
    background: "transparent",
    zIndex: 10,
    filter:
      "drop-shadow(0 1px 1px rgba(0,0,0,.15))",
  },

  clipInner: {
    position: "absolute",
    left: 3,
    top: 5,
    width: 7,
    height: 25,
    borderLeft: "1.8px solid #777",
    borderRadius: 8,
  },
};