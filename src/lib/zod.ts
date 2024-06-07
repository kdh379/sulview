import { z } from "zod";

export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.received === "undefined" || issue.received === "null") return { message: "필수 입력 항목입니다." };
    if (issue.expected === "number") return { message: "숫자만 입력 가능합니다." };
  }
  if (issue.code === z.ZodIssueCode.too_small) return { message: `최소 ${issue.minimum}자 이상 입력해주세요.` };

  return { message: ctx.defaultError };
};
