//app\notes\[slug]\page.tsx
import { notFound } from "next/navigation";

import { notes } from "@/data/notes";
import NoteViewer from "@/features/notes/components/reader/NoteViewer";

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const note = notes[slug as keyof typeof notes];

  if (!note) {
    notFound();
  }

  return <NoteViewer note={note} />;
}