"use client";

import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteNote } from "@/hooks/useDeleteNote";

interface NoteSeeMoreProps {
  noteId: number;
}

function NoteSeeMore({ noteId }: NoteSeeMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    mutate: handleDeleteNote,
    isPending,
    isSuccess,
  } = useDeleteNote();

  const onDelete = async () => {
    await handleDeleteNote(noteId);
    if(isSuccess)
      setIsExpanded(false);
  };

  return (
    <AlertDialog open={isExpanded} onOpenChange={setIsExpanded}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <DotsVerticalIcon className="size-6" />
            <span className="sr-only">더보기</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild className="gap-2">
            <Link href={`/note/${noteId}/edit`}>
              <Edit className="size-4" />
              수정
            </Link>
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-destructive gap-2">
              <Trash className="size-4" />
              삭제
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
        <AlertDialogContent>
          <AlertDialogHeader>정말로 삭제하시겠습니까?</AlertDialogHeader>
          <AlertDialogDescription>
            삭제된 노트는 복구할 수 없습니다.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>
              취소
            </AlertDialogCancel>
            <Button
              variant="destructive"
              isLoading={isPending}
              onClick={onDelete}
            >
              네, 삭제합니다.
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </DropdownMenu>
    </AlertDialog>
  );
}

export default NoteSeeMore;