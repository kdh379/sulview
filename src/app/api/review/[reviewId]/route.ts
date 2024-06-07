import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db/drizzle";
import { reviewTable } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";

export async function DELETE(_req: Request, { params }: { params: { reviewId: string } }) {
  const reviewId = Number(params.reviewId);

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
    const deleteReview = await db
      .delete(reviewTable)
      .where(and(eq(reviewTable.id, reviewId), user.role !== "admin" ? eq(reviewTable.createdBy, user.id) : undefined))
      .returning({
        deletedId: reviewTable.id,
      });

    if (!deleteReview.length)
      return NextResponse.json<ActionError>(
        {
          error: {
            code: "AUTH_ERROR",
            message: "삭제 권한이 없습니다.",
          },
        },
        { status: 403 },
      );

    return NextResponse.json({}, { status: 200 });
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
