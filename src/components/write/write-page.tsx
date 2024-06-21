import { NoteAddForm } from "@/components/write/note-form";
import { getCurrentSessionRedirect } from "@/lib/session";

async function WritePage() {
  await getCurrentSessionRedirect();
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">노트쓰기</h1>
      <NoteAddForm  />
    </div>
  );
}

export default WritePage;