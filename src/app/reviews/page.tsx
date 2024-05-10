import { Metadata } from "next";


export const metadata: Metadata = {
  title: "리뷰 작성",
};

export default function ReviewPage() {
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      Reviews Page
    </div>
  );
}