import { noteTable, users } from "@/db/schema";

interface GetNotesParam {
  page: number;
  limit: number;
  search?: string;
}

type Note = typeof noteTable.$inferSelect;
type User = typeof users.$inferSelect;

interface GetNotesRes extends Pick<Note, "id" | "whiskyName" | "review" | "images">{
  userName: User["name"];
};