import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db/drizzle";
import { noteTable } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";

export async function DELETE(_req: Request, { params }: { params: { noteId: string } }) {
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
    const deletedNote = await db
      .delete(noteTable)
      .where(
        and(
          eq(noteTable.id, noteId),
          user.role !== "admin" ? eq(noteTable.createdBy, user.id) : undefined
        )
      )
      .returning({
        deletedId: noteTable.id,
      });

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

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
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

export async function PATCH(request: Request) {
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
    // TODO: DB Update

    return NextResponse.json({}, { status: 201 });
  } catch (error) {
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
