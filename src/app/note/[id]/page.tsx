import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { db } from "@/db/drizzle";
import { noteTable, users } from "@/db/schema";
import NoteInfo from "@/components/note/note-info";
import NoteImage from "@/components/note/note-image";

async function getNote({ params }: NotePageProps) {
  const id = Number(params.id);

  if(isNaN(id)) return;

  const result = await db
    .select({
      note: noteTable,
      userName: users.name,
      userImage: users.image,
    })
    .from(noteTable)
    .where(
      eq(noteTable.id, id)
    )
    .leftJoin(users, eq(users.id, noteTable.createdBy));

  if(!result.length) return;
  const { note, userName, userImage } = result[0];

  return {
    note,
    user: {
      name: userName,
      image: userImage,
    },
  };
}

type NotePageProps = {
  params: { id: string }
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const result = await getNote({ params });

  if(!result) return {};

  const { note, user } = result;

  return {
    title: note.whiskyName,
    description: note.review,
    authors: {
      name: user.name || "",
      url: `/user/${user.name}`,
    },
    openGraph: {
      title: note.whiskyName,
      description: note.review,
      authors: user.name,
      type: "article",
      images: [
        {
          url: note.images[0] || "",
          alt: note.whiskyName,
        },
      ],
    },
  };
}

async function NotePage({ params }: NotePageProps) {
  const result = await getNote({ params });

  if(!result) notFound();

  const { note, user } = result;

  return (
    <section className="mx-auto grid max-w-screen-xl rounded-sm border md:grid-cols-2">
      <NoteImage images={note.images} />
      <NoteInfo note={note} user={user} />
    </section>
  );
}

export default NotePage;