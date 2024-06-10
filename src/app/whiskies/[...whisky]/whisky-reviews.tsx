import { eq } from "drizzle-orm";
import { ListFilter, MessageSquareText } from "lucide-react";

import { WhiskyReviewAddForm } from "@/app/whiskies/[...whisky]/whisky-review-form";
import WhiskyReviewItem from "@/app/whiskies/[...whisky]/whisky-review-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/db/drizzle";
import { reviewTable, users } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";

const getWhiskyReviews = async (whiskyId: number) =>
  db
    .select({
      id: reviewTable.id,
      whiskyId: reviewTable.whiskyId,
      createdAt: reviewTable.createdAt,
      createdBy: reviewTable.createdBy,
      images: reviewTable.images,
      score: reviewTable.score,
      content: reviewTable.content,
      noseScore: reviewTable.noseScore,
      nose: reviewTable.nose,
      palateScore: reviewTable.palateScore,
      palate: reviewTable.palate,
      finishScore: reviewTable.finishScore,
      finish: reviewTable.finish,
      userName: users.name,
      userAvatar: users.image,
    })
    .from(reviewTable)
    .where(eq(reviewTable.whiskyId, whiskyId))
    .leftJoin(users, eq(users.id, reviewTable.createdBy));

interface WhiskyReviewsProps {
  whiskyId: number;
}

export default async function WhiskyReviews({ whiskyId }: WhiskyReviewsProps) {
  const reviews = await getWhiskyReviews(whiskyId);
  const user = await getCurrentUser();

  return (
    <Card className="mt-8">
      <div className="flex p-6">
        <h2 className="flex items-center text-2xl font-bold">
          <MessageSquareText className="text-primary" />
          <span className="ml-2">리뷰</span>
          <span className="text-muted-foreground ml-2">({reviews.length})</span>
        </h2>
        <Button variant="outline" size="sm" className="ml-2">
          <ListFilter className="mr-2" />
          정렬 기준
        </Button>
      </div>
      <CardContent>
        <div
          className={cn(
            "my-4",
            reviews.find((review) => review.createdBy === user?.id) && "hidden")}
        >
          <WhiskyReviewAddForm whiskyId={whiskyId} isLogged={!!user} />
        </div>
        <ol>
          {reviews ? (
            reviews.map((review) => (
              <WhiskyReviewItem
                key={review.id}
                isAuthor={review.createdBy === user?.id}
                isAdmin={user?.role === "admin"}
                {...review}
              />
            ))
          ) : (
            <li className="text-muted-foreground mt-4">리뷰가 없습니다.</li>
          )}
        </ol>
      </CardContent>
    </Card>
  );
}
