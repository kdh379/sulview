
"use server";

import { eq } from "drizzle-orm";

import { DistilleryFormValues } from "@/components/review/DistilleryForm";
import { db } from "@/db/drizzle";
import { distillery } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";

export const addDistillery = async (values: DistilleryFormValues) => {

  const user = await getCurrentUser();

  if (!user?.id)
    return { error: "로그인 정보를 찾을 수 없습니다."};

  const exists = await db.select().from(distillery).where(eq(distillery.name, values.name));

  if (exists.length)
    return { error: "이미 존재하는 증류소입니다." };

  return db.insert(distillery).values({
    ...values,
    createdAt: new Date(),
    createdBy: user.id,
  }).returning();
};