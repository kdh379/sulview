import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";

export default function ReviewFormHeader() {

  const router = useRouter();

  const form = useFormContext();

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        className="size-7"
        onClick={() => router.back()}
      >
        <ChevronLeft className="size-4" />
        <span className="sr-only">뒤로가기</span>
      </Button>
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        리뷰 작성
      </h1>
      <div className="hidden items-center gap-2 md:ml-auto md:flex">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          type="submit"
          size="sm"
          isLoading={form.formState.isSubmitting}
        >
          리뷰 저장
        </Button>
      </div>
    </div>
  );
}