export type Question = {
  id: string;

  topic: string;

  question: string;

  options: string[];

  correctAnswer: number;

  explanation: string;

  questionImage?: string;
};