import { eq } from "drizzle-orm";
import { ListFilter, MessageSquareText } from "lucide-react";

import WhiskyReviewForm from "@/app/whiskies/[...whisky]/whisky-review-form";
import { Button } from "@/components/ui/button";
import { db } from "@/db/drizzle";
import { reviewTable } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";

const getWhiskyReviews = async (whiskyId: number) => (
  db
    .select()
    .from(reviewTable)
    .where(eq(reviewTable.whiskyId, whiskyId)));


interface WhiskyReviewsProps {
  whiskyId: number;
}

export default async function WhiskyReviews({ whiskyId }: WhiskyReviewsProps) {

  const reviews = await getWhiskyReviews(whiskyId);
  const user = await getCurrentUser();

  return (
    <div className="mt-8">
      <div className="flex items-center">
        <h2 className="flex items-center text-2xl font-bold">
          <MessageSquareText className="text-primary" />
          <span className="ml-2">리뷰</span>
          <span className="text-muted-foreground ml-2">({reviews.length})</span>
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="ml-2"
        >
          <ListFilter className="mr-2" />
            정렬 기준
        </Button>
      </div>
      <div className={cn(
        "mt-4",
        !user || reviews.find((review) => review.createdBy === user.id) && "hidden"
      )}>
        <WhiskyReviewForm
          whiskyId={whiskyId}
        />
      </div>
    </div>
  );
}