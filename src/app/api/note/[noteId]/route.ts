import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db/drizzle";
import { noteTable } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import type { NoteFormSchemaType } from "@/components/write/note-form";

const createWhereCondition = (noteId: number, userId: string, userRole: string) => {
  if (userRole === "admin") {
    return eq(noteTable.id, noteId);
  }
  return and(
    eq(noteTable.id, noteId),
    eq(noteTable.createdBy, userId)
  );
};

interface APIParams {
  params: { noteId: string };
}

export async function DELETE(_req: Request, { params }: APIParams) {
  const noteId = Number(params.noteId);

  const user = await getCurrentUser();
  if (!user?.id)
    return NextResponse.json<ActionError>(
      {
        error: {
          code: "AUTH_ERROR",
          message: "로그인 정보를 찾을 수 없습니다.",
        },
      },
      { status: 401 },
    );

  try {
    const deleteCondition = createWhereCondition(noteId, user.id, user.role);
    const deletedNote = await db
      .delete(noteTable)
      .where(deleteCondition)
      .returning();

    if (!deletedNote.length)
      return NextResponse.json<ActionError>(
        {
          error: {
            code: "AUTH_ERROR",
            message: "삭제할 노트를 찾을 수 없습니다.",
          },
        },
        { status: 403 },
      );

    return NextResponse.json({
      deletedId: deletedNote[0],
    }, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json<ActionError>(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
        },
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: APIParams) {
  const noteId = Number(params.noteId);

  const user = await getCurrentUser();
  if (!user?.id)
    return NextResponse.json<ActionError>(
      {
        error: {
          code: "AUTH_ERROR",
          message: "로그인 정보를 찾을 수 없습니다.",
        },
      },
      { status: 401 },
    );

  const input: NoteFormSchemaType = await request.json();

  try {
    const updateNotes = await db
      .update(noteTable)
      .set({
        whiskyName: input.whiskyName,
        images: input.images,
        abv: input.abv,
        aged: input.aged,
        nose: input.nose,
        noseScore: input.noseScore || -1,
        palate: input.palate,
        palateScore: input.palateScore || -1,
        finish: input.finish,
        finishScore: input.finishScore || -1,
        review: input.review,
        score: input.score,
        caskTypes: input.caskTypes.map((cask) => cask.value),
      })
      .where(createWhereCondition(noteId, user.id, user.role))
      .returning();

    if (!updateNotes.length)
      return NextResponse.json<ActionError>(
        {
          error: {
            code: "AUTH_ERROR",
            message: "수정할 노트를 찾을 수 없습니다.",
          },
        },
        { status: 403 },
      );

    return NextResponse.json(updateNotes[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json<ActionError>(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
        },
      },
      { status: 500 },
    );
  }
}
