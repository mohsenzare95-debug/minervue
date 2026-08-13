import { retinaQuestions } from "./retina";


import type { Question } from "@/shared/types/question";

export const questionBanks: Record<string, Question[]> = {
  retina: retinaQuestions,

};

export function getQuestionBank(
  slug: string
): Question[] {
  return questionBanks[slug] ?? [];
}