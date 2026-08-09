import type { NotePage } from "@/shared/types/note";

import NotePageComponent from "./NotePage";
import MCQPage from "./MCQPage";
import FillBlankPage from "./FillBlankPage";

export default function NotePageRenderer({
  page,
}: {
  page: NotePage;
}) {
  switch (page.type) {
    case "note":
      return <NotePageComponent page={page} />;

    case "mcq":
      return <MCQPage page={page} />;

    case "fillBlank":
      return <FillBlankPage page={page} />;

    default:
      return null;
  }
}