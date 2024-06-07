import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db/drizzle";
import { reviewTable } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";

export async function PUT(request: Request) {
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
    const input = await request.json();

    const exist = await db
      .select()
      .from(reviewTable)
      .where(and(eq(reviewTable.whiskyId, input.whiskyId), eq(reviewTable.createdBy, user.id)));

    if (exist.length)
      await db
        .update(reviewTable)
        .set({
          score: input.score,
          content: input.content,
          images: input.images,
          nose: input.nose,
          noseScore: input.noseScore ?? -1,
          palate: input.palate,
          palateScore: input.palateScore ?? -1,
          finish: input.finish,
          finishScore: input.finishScore ?? -1,
          createdAt: new Date(),
        })
        .where(eq(reviewTable.id, exist[0].id));
    else
      await db.insert(reviewTable).values({
        whiskyId: input.whiskyId,
        score: input.score,
        content: input.content,
        images: input.images,
        nose: input.nose,
        noseScore: input.noseScore ?? -1,
        palate: input.palate,
        palateScore: input.palateScore ?? -1,
        finish: input.finish,
        finishScore: input.finishScore ?? -1,
        createdAt: new Date(),
        createdBy: user.id,
      });

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
