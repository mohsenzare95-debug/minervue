import { notFound } from "next/navigation";
import { getQuestionBank } from "@/data/question-bank/index";
import QuestionBankPage from "@/features/question-bank/components/QuestionBankPage";

export default async function QuestionBankSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const questions = getQuestionBank(slug);

  if (questions.length === 0) {
    notFound();
  }

  return (
    <QuestionBankPage
      slug={slug}
      questions={questions}
    />
  );
}