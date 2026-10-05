import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { notes } from "@/data/notes";
import NoteViewer from "@/features/notes/components/reader/NoteViewer";

type Props = {
  params: Promise<{
    slug: string;
    section: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug, section: sectionSlug } = await params;

  const note = notes[slug as keyof typeof notes];

  if (!note) {
    return {};
  }

  const section = note.sections.find(
    (item) => item.slug === sectionSlug
  );

  if (!section) {
    return {};
  }

  const description =
    section.description ??
    `${section.title} — ${note.title} summary notes.`;

  return {
    title: `${section.title} | VisoSage`,
    description,
    alternates: {
      canonical: `/notes/${slug}/${section.slug}`,
    },
  };
}

export default async function NoteSectionPage({
  params,
}: Props) {
  const { slug, section: sectionSlug } = await params;

  const note = notes[slug as keyof typeof notes];

  if (!note) {
    notFound();
  }

  const section = note.sections.find(
    (item) => item.slug === sectionSlug
  );

  if (!section) {
    notFound();
  }

  return (
    <NoteViewer
      note={note}
      noteSlug={slug}
      currentSectionSlug={section.slug}
    />
  );
}