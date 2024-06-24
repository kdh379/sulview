import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { db } from "@/db/drizzle";
import { noteTable, users } from "@/db/schema";
import NoteInfo from "@/components/note/note-info";
import NoteImage from "@/components/note/note-image";

type Props = {
  params: { id: string }
}

async function getNote({ params }: Props) {
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

  const { note, userName, userImage } = result[0];

  return {
    note,
    user: {
      name: userName,
      image: userImage,
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

async function Note({ params }: Props) {
  const result = await getNote({ params });

  if(!result) notFound();

  const { note, user } = result;

  return (
    <div className="mx-auto max-w-[900px] py-6">
      <section className="grid max-h-[600px] rounded-sm border lg:grid-cols-2">
        <NoteImage images={note.images} />
        <NoteInfo note={note} user={user} />
      </section>
    </div>
  );
}

export default Note;