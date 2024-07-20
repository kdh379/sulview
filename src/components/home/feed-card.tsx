import { forwardRef } from "react";
import Link from "next/link";

import type { GetNotesRes } from "@/types/entity/note";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselDotButton, CarouselItem } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "@/components/ui/image";

export function FeedCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="mt-[6px] h-5 w-1/4" />
      </CardHeader>
      <Skeleton className="mb-4 aspect-square w-full" />
      <CardContent>
        <Skeleton className="mt-1 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-full" />
      </CardContent>
    </Card>
  );
}

interface FeedCardProps extends GetNotesRes {}

const FeedCard = forwardRef<HTMLDivElement, FeedCardProps>(({
  id,
  whiskyName,
  images,
  review,
  userName,
}, ref) => {
  return (
    <Card ref={ref}>
      <CardHeader className="flex">
        <CardTitle className="text-lg font-semibold">
          <Link
            href={`/note/${id}`}
          >
            {whiskyName}
          </Link>
        </CardTitle>
        <CardDescription>
          write by
          <Link
            href={`/user/${userName}`}
            className={buttonVariants({variant: "link", size: "auto"})}
          >
            <span className="ml-1 font-bold">{userName}</span>
          </Link>
        </CardDescription>
      </CardHeader>
      {images.length > 1 && (
        <Carousel className="mb-6 border-y">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="max-h-[600px]">
                <Image
                  src={image}
                  alt={whiskyName}
                  width={600}
                  height={600}
                  placeholder="blur"
                  className="h-full object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDotButton className="absolute bottom-4 right-4" />
        </Carousel>
      )}
      <CardContent>
        <Link
          href={`/note/${id}`}
        >
          <div className="before:to-background hover:before:to-background/75 relative mb-1 before:absolute before:size-full before:max-h-[100px] before:bg-gradient-to-b before:from-transparent before:transition-colors">
            <p className="line-clamp-4 whitespace-pre-wrap">
              {review}
            </p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
});

FeedCard.displayName = "FeedCard";

export default FeedCard;