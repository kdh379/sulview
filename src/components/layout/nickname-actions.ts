"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { customErrorMap } from "@/lib/zod";

const NicknameActionSchema = z.object({
  nickname: z.string().min(2).max(20)
    .refine((value) => !value.includes(" "), "닉네임에 공백을 포함할 수 없습니다."),
});

z.setErrorMap(customErrorMap);

export type NicknameActionSchemaType = z.infer<typeof NicknameActionSchema>;

export async function changeNicknameAction(
  _prevState: any,
  formData: FormData
): Promise<ActionError | void> {
  const input = NicknameActionSchema.safeParse({
    nickname: formData.get("nickname"),
  });

  if (!input.success) {
    const { fieldErrors } = input.error.flatten();
    
    return {
      error: {
        code: "VALIDATION_ERROR",
        fieldErrors,
      },
    };
  }

  const user = await getCurrentUser();
  if (!user || !user.id) {
    return {
      error: {
        code: "AUTH_ERROR",
        message: "로그인 정보를 찾을 수 없습니다.",
      },
    };
  }


  try {
    const exist = await db
      .select()
      .from(users)
      .where(eq(users.name, input.data.nickname));

    if (exist.length)
      return {
        error: {
          code: "EXISTS_ERROR",
          key: "nickname",
          message: "이미 사용 중인 닉네임입니다.",
        },
      };

    await db
      .update(users)
      .set({
        name: input.data.nickname,
      })
      .where(eq(users.id, user.id));

    revalidatePath("/", "layout");
  }
  catch (error) {
    return {
      error: {
        code: "INTERNAL_ERROR",
        message: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
      },
    };
  }
}