import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { handleApiError, hasError } from "@/lib/api";

interface WhiskyReviewDeleteAlertProps {
  reviewId: number;
}

export default function WhiskyReviewDeleteAlert({ reviewId }: WhiskyReviewDeleteAlertProps) {

  const {
    mutate: deleteReview,
  } = useMutation(
    () => axios.delete(`/api/review/${reviewId}`),
    {
      onSuccess: () => {
        toast({
          title: "리뷰가 삭제되었습니다.",
        });
      },
      onError: (err: AxiosError) => {
        if(hasError(err))
          handleApiError(err, null);
        else
          toast({
            title: "알 수 없는 오류가 발생했습니다.",
            description: "잠시 후 다시 시도해주세요.",
            variant: "destructive",
          });
      },
    }
  );

  return (
    <>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            정말로 삭제하시겠습니까?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction 
            variant="destructive"
            onClick={() => deleteReview()}
          >삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
}