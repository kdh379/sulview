import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { db } from "@/db/drizzle";
import { noteTable, users } from "@/db/schema";
import { getCurrentSessionRedirect } from "@/lib/session";
import { NoteEditForm } from "@/components/write/note-form";

function getNote(noteId: number, userId: string) {
  return db
    .select({
      note: noteTable,
      userName: users.name,
      userImage: users.image,
    })
    .from(noteTable)
    .where(
      and(
        eq(noteTable.id, noteId),
        eq(noteTable.createdBy, userId)
      )
    )
    .leftJoin(users, eq(users.id, noteTable.createdBy));
}

interface NoteEditPageProps{
  params: { id: string }
}

async function NoteEditPage({params}: NoteEditPageProps) {
  const session = await getCurrentSessionRedirect();
  const noteId = Number(params.id);
  const userId = session?.user?.id || "";

  const result = await getNote(noteId, userId);

  if(!result.length)
    return notFound();

  return (
    <NoteEditForm note={result[0].note} />
  );
}

export default NoteEditPage;