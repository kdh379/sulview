import { z } from "zod";

import { customErrorMap } from "@/lib/zod";

export const distilleryFormSchema = z.object({
  name: z.string().min(1),
  region: z.string().min(1),
});
z.setErrorMap(customErrorMap);

export type DistilleryFormValues = z.infer<typeof distilleryFormSchema>;