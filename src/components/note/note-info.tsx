import { User } from "next-auth";
import Link from "next/link";
import { Clock, Heart, MessageCircle, Share2, User as UserIcon } from "lucide-react";

import { Note } from "@/types/entity/note";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/dayjs";
import { Progress } from "@/components/ui/progress";
import Counter from "@/components/ui/counter";
import NoteSeeMore from "@/components/note/note-see-more";
import { getCurrentUser } from "@/lib/session";

interface TastingNoteItemProps {
  label: string;
  rating: number;
  content: string;
}

function TastingNoteItem({ label, rating, content }: TastingNoteItemProps) {
  return (
    <li>
      <h2 className="mb-2 flex items-center">
        <span className="font-semibold">{label}</span>
        <Counter className="ml-2 text-lg font-bold" value={rating} />
        <Progress value={rating} className="ml-2 w-3/5" />
      </h2>
      <p className="whitespace-pre-wrap">{content}</p>
    </li>
  );
}


interface NoteInfoProps {
  note: Note;
  user: Pick<User, "name" | "image">;
}

async function NoteInfo({ note, user }: NoteInfoProps) {
  const currentUser = await getCurrentUser();
  return (
    <article className="flex flex-col rounded-md border-l md:max-h-[750px]">
      <h1 className="p-4 text-2xl font-bold">{note.whiskyName}</h1>
      <div className="flex border-b p-4 pt-0">
        <Link
          href={`/user/${user.name}`}
          className={cn(buttonVariants({ variant: "link", size: "auto" }), "ml-1")}
        >
          <Avatar>
            <AvatarFallback>
              <UserIcon className="size-4" />
            </AvatarFallback>
            <AvatarImage src={user.image || ""} />
          </Avatar>
        </Link>
        <div className="ml-2 leading-5">
          <Link
            href={`/user/${user.name}`}
            className={cn(buttonVariants({ variant: "link", size: "auto" }))}
          >
            {user.name}
          </Link>
          <div className="text-muted-foreground flex items-center gap-x-1 text-sm">
            <Clock className="size-4" />
            <time>{formatDate(note.createdAt)}</time>
          </div>
        </div>
        <div className="ml-auto">
          <Button variant="ghost" size="icon" disabled>
            <Heart className="text-destructive size-6" />
            <span className="sr-only">좋아요</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="size-6" />
            <span className="sr-only">공유</span>
          </Button>
          <Button variant="ghost" size="icon" disabled>
            <MessageCircle className="size-6" />
            <span className="sr-only">댓글</span>
          </Button>
          {currentUser?.id === note.createdBy &&
            <NoteSeeMore noteId={note.id} />
          }
        </div>
      </div>
      <ul className="flex-1 space-y-4 p-4 md:overflow-y-auto">
        <TastingNoteItem label="Nose" rating={note.noseScore} content={note.nose} />
        <TastingNoteItem label="Palate" rating={note.palateScore} content={note.palate} />
        <TastingNoteItem label="Finish" rating={note.finishScore} content={note.finish} />
        <TastingNoteItem label="Review" rating={note.score} content={note.review} />
      </ul>
    </article>
  );
}

export default NoteInfo;