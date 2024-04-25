import z from "zod";

const ReviewActionSchema = z.object({
  name: z.string().min(1),
  score: z.coerce.number().min(0).max(100).multipleOf(0.1),
  images: z.array(z.string()),
  distillery: z.string(),
  bottler: z.string(),
  age: z.string(),
  abv: z.string(),
  caskType: z.array(z.string()),
  caskNumber: z.string(),
  nose: z.string(),
  noseScore: z.coerce.number().min(0).max(100).int(),
  palate: z.string(),
  palateScore: z.coerce.number().min(0).max(100).int(),
  finish: z.string(),
  finishScore: z.coerce.number().min(0).max(100).int(),
  content: z.string(),
});

type ReviewActionData = {
  error?:
    | {
        code: "AUTH_ERROR";
        message: string;
    }
}