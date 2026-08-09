// shared/icons/iconMap.ts
import {
  Siren,
  TriangleAlert,
  Brain,
  Dumbbell,
  Dot,
  Flame,
  NotebookPen,
  ListChecks,
  TextCursorInput,
} from "lucide-react";

export const iconMap = {
  FIRE: Flame,
  BRAIN: Brain,
  WARNING: TriangleAlert,
  SIREN: Siren,
  DUMBBELL: Dumbbell,
  DOT: Dot,

  NOTE: NotebookPen,
  QUIZ: ListChecks,
  FILL: TextCursorInput,
} as const;