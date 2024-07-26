import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { AxiosError } from "axios";

import api, { handleApiError } from "@/lib/api";

export function useDeleteNote() {
  const router = useRouter();
  return useMutation({
    mutationFn: (noteId: number) => api.delete(`/api/note/${noteId}`),
    onSuccess: () => {
      router.push("/");
    },
    onError: (error: AxiosError<ActionError>) => {
      if(error.response?.data)
        handleApiError(error.response.data);
      else
        throw error;
    },
  });
}