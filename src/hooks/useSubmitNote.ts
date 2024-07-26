import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import type { NoteFormSchemaType } from "@/components/write/note-form";
import api, { handleApiError } from "@/lib/api";
import { QUERY_KEY as feedQueryKey } from "@/hooks/useFeeds";
import { getQueryClient } from "@/lib/tanstack-query";

interface NoteFormSubmitSchema extends NoteFormSchemaType {
  id?: number;
}

export function useSubmitNote({isEdit = false}: {isEdit: boolean}) {
  const router = useRouter();
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (data: NoteFormSubmitSchema) => {
      if (isEdit)
        return api.patch(`/api/note/${data.id}`, data);
      return api.post("/api/note", data);
    },
    onSuccess: (res) => {
      const { data } = res;
      router.push(`/note/${data.id}`);
      // Feeds 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [feedQueryKey] });
    },
    onError: (err: AxiosError<ActionError>) => {
      if (err.response?.data) handleApiError(err.response.data);
    },
  });
}