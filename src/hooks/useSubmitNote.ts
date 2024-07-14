import type { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import type { NoteFormSchemaType } from "@/components/write/note-form";
import api, { handleApiError } from "@/lib/api";
import { QUERY_KEY } from "@/hooks/useFeeds";
import { getQueryClient } from "@/lib/tanstack-query";

interface UseSubmitNoteProps {
  form: UseFormReturn<NoteFormSchemaType>;
  onSubmitted?: () => void;
}

export function useSubmitNote({
  form,
  onSubmitted,
}: UseSubmitNoteProps) {
  const router = useRouter();
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (data: NoteFormSchemaType) => api.post("/api/note", data),
    onSuccess: (res) => {
      const { data } = res;
      router.push(`/note/${data.id}`);
      onSubmitted?.();
      // Feeds 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (err: AxiosError<ActionError>) => {
      if (err.response?.data) handleApiError(err.response.data, form);
    },
  });
}