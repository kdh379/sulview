import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselDotButton, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { reviewTable, users } from "@/db/schema";

function TasteItem({ 
  label,
  score,
  content,
} : { 
    label: string,
    content: string
    score?: number,
  }) {
  return (
    <div>
      <div className="flex items-center">
        <b className="w-12">{label}</b>
        { score && score > -1 && <>
          <b className="ml-8 w-12">{score}</b>
          <Progress className="ml-2 max-w-[400px]" value={score} />
        </> }
      </div>
      <p className="mt-2 whitespace-pre-wrap">{content}</p>
    </div>
  );
}

type Review = typeof reviewTable.$inferSelect;

interface WhiskyReviewItemProps extends Review {
  userName: typeof users.$inferSelect.name;
  userAvatar: typeof users.$inferSelect.image;
}

export default function WhiskyReviewItem({
  userAvatar,
  userName,
  ...review
}: WhiskyReviewItemProps) {
  return (
    <li>
      <article className="space-y-8">
        <header className="flex items-center">
          <Avatar>
            <AvatarImage src={userAvatar ?? undefined} />
            <AvatarFallback>SV</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <Link
              href={`/users/${userName}`}
              className="font-bold underline-offset-4 hover:underline"
            >
              {userName}
            </Link>
            <time className="text-muted-foreground block text-sm">{dayjs(review.createdAt).format("YYYY-MM-DD HH:mm:ss")}</time>
          </div>
        </header>
        <Carousel>
          <CarouselContent>
            {review.images.length > 0 && review.images.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image}
                  width={300}
                  height={300}
                  alt={review.content}
                  className="max-h-[400px] w-full rounded-md object-contain md:max-h-[600px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex items-center gap-x-4">
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDotButton className="ml-auto" />
          </div>
        </Carousel>
        <div className="mt-4 space-y-4">
          <TasteItem label="Nose" score={review.noseScore} content={review.nose} />
          <TasteItem label="Palate" score={review.palateScore} content={review.palate} />
          <TasteItem label="Finish" score={review.finishScore} content={review.finish} />
          <TasteItem label="총평" score={review.score} content={review.content} />
        </div>
      </article>
    </li>
  );
}