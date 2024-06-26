import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { desc, eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { noteTable, users } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import type { NoteFormSchemaType } from "@/components/write/note-form";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const [page, limit, _search] = [
    Number(searchParams.get("page")) ?? 0,
    Number(searchParams.get("limit")) ?? 10,
    searchParams.get("search"),
  ];

  // TODO: Embedding을 활용한 검색 기능 구현

  try {
    const result = await db
      .select({
        id: noteTable.id,
        whiskyName: noteTable.whiskyName,
        images: noteTable.images,
        review: noteTable.review,
        userName: users.name,
      })
      .from(noteTable)
      .leftJoin(users, eq(users.id, noteTable.createdBy))
      .orderBy(desc(noteTable.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    return NextResponse.json(result);
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

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateEmbedding = async (value: string[]) => {

  const input = value.reduce((acc, cur) => {
    return acc + cur + " ";
  });

  try {
    const { data } = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input,
    });

    return data[0].embedding;
  } catch (error) {
    console.error("OpenAI API 요청 중 오류가 발생했습니다.", error);
    return [];
  }
};

export async function POST(request: NextRequest) {
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
    const input: NoteFormSchemaType = await request.json();
    const embedding = await generateEmbedding([
      input.whiskyName,
      input.abv,
      input.aged,
      input.nose,
      input.palate,
      input.finish,
      input.review,
    ]);

    const result = await db.insert(noteTable).values({
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
      createdAt: new Date(),
      createdBy: user.id,
      embedding: embedding,
    }).returning();

    return NextResponse.json(result[0], { status: 201 });
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