import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { DistilleryFormValues } from "@/components/review/DistilleryForm";
import { db } from "@/db/drizzle";
import { distillery } from "@/db/schema";

export async function POST(request: Request) {
  const session = await auth();

  if(!session || !session.user?.id)
    return NextResponse.json({}, { status: 401 });
  
  const { name, region }: DistilleryFormValues = await request.json();

  const exists = await db.select().from(distillery).where(eq(distillery.name, name));

  if(exists.length)
    return NextResponse.json({ message: "이미 존재하는 증류소입니다" }, { status: 400 });

  const result = await db.insert(distillery).values({
    name,
    region,
    createdAt: new Date(),
    createdBy: session.user.id,
  }).returning();

  return NextResponse.json(result);
}

export async function GET() {
  try {
    const distilleries = await db.select().from(distillery).orderBy(distillery.name);
    return NextResponse.json(distilleries);
  }
  catch(error) {
    return NextResponse.error();
  }
}