import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { WhiskyFormSchemaType } from "@/app/distilleries/[distillery]/add/form";
import { db } from "@/db/drizzle";
import { distilleryTable, whiskyTable } from "@/db/schema";
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
    const { distilleryName, caskTypes, ...restProps }: WhiskyFormSchemaType = await request.json();

    const distilleries = await db.select().from(distilleryTable).where(eq(distilleryTable.name, distilleryName));

    if (!distilleries.length)
      return NextResponse.json<ActionError>(
        {
          error: {
            code: "VALIDATION_ERROR",
            fieldErrors: {
              bottler: ["증류소/독립 병입자를 찾을 수 없습니다."],
            },
          },
        },
        { status: 400 },
      );

    const distilleryId = distilleries[0].id;

    const whiskies = await db
      .insert(whiskyTable)
      .values({
        ...restProps,
        distilleryId,
        caskTypes: caskTypes.map((caskType) => caskType.value),
        createdAt: new Date(),
        createdBy: user.id,
      })
      .returning({
        id: whiskyTable.id,
      });

    return NextResponse.json(
      {
        id: whiskies[0].id,
      },
      { status: 201 },
    );
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
