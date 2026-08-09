export type NotePage =
  | {
      id: string;
      type: "note";
      subtitle: string;
      label: string;
      text: string;
      image?: string;
    }
  | {
      id: string;
      type: "mcq";
      subtitle: string;
      label: string;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
      questionImage?: string;
    }
  | {
      id: string;
      type: "fillBlank";
      subtitle: string;
      label: string;
      text: string;
      answer: string;
      image?: string;
    };

export type Note = {
  key: string;
  title: string;
  pages: NotePage[];
};