import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db/drizzle";
import { distilleryTable } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";

export async function POST(request: Request) {
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
    const { name, region, images } = await request.json();

    const exists = await db.select().from(distilleryTable).where(eq(distilleryTable.name, name));

    if (exists.length)
      return NextResponse.json<ActionError>(
        {
          error: {
            code: "EXISTS_ERROR",
            key: "name",
            message: "이미 존재하는 증류소입니다.",
          },
        },
        { status: 400 },
      );

    await db.insert(distilleryTable).values({
      name,
      region,
      images,
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

export async function GET() {
  try {
    const distilleries = await db.select().from(distilleryTable).orderBy(distilleryTable.name);
    return NextResponse.json(distilleries);
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
