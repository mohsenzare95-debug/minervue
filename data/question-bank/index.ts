//question-bank\index.ts
import type { Question } from "@/shared/types/question";
import { anatomyQuestions } from "./retina/anatomy";
import { traumaQuestions } from "./retina/trauma";
import { rdQuestions } from "./retina/rd";

export const questionBanks: Record<string, Question[]> = {
  "retina-anatomy": anatomyQuestions,
  "retina-trauma": traumaQuestions,
  "retina-rd": rdQuestions,
};

export function getQuestionBank(slug: string): Question[] {
  return questionBanks[slug] ?? [];
}
