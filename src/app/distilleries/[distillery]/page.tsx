import { PlusCircledIcon } from "@radix-ui/react-icons";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { z } from "zod";

import PopularWhisky from "@/app/distilleries/[distillery]/popular-whisky";
import SearchInput from "@/app/distilleries/[distillery]/search-input";
import Whiskies from "@/app/distilleries/[distillery]/whiskies";
import { buttonVariants } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselDotButton, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { siteConfig } from "@/config/site";
import { db } from "@/db/drizzle";
import { distilleryTable } from "@/db/schema";
import { cn } from "@/lib/utils";

const SearchParamsSchema = z.object({
  q: z.string().max(256).optional().default(""),
});

export type SearchParamsType = z.infer<typeof SearchParamsSchema>;

interface DistilleryPageProps {
  params: {
    distillery: string;
  };
  searchParams: SearchParamsType;
}

export async function generateMetadata({ params }: DistilleryPageProps): Promise<Metadata> {
  const distillery = await getDistillery(decodeURIComponent(params.distillery));

  if(!distillery) return notFound();

  return {
    title: distillery.name,
    openGraph: {
      title: distillery.name,
      url: `${siteConfig.url}${encodeURIComponent(distillery.name)}`,
      siteName: siteConfig.name,
      images: [
        {
          url: distillery.images[0],
          width: 400,
          height: 400,
          alt: distillery.name,
        },
      ],
    },
  };
}

const getDistillery = async (name: string) => {
  const distilleries = await db
    .select()
    .from(distilleryTable)
    .where(eq(distilleryTable.name, name))
    .limit(1);

  if(distilleries.length === 0)
    notFound();

  return distilleries[0];
};

export default async function DistilleryPage({ params, searchParams }: DistilleryPageProps ) {

  const distillery = await getDistillery(decodeURIComponent(params.distillery));

  const parse = SearchParamsSchema.safeParse(searchParams);

  if (!parse.success)
    return <p>잘못된 요청입니다.</p>;

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-[300px_1fr]">
        <Carousel>
          <CarouselContent>
            {distillery.images.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image}
                  width={300}
                  height={300}
                  alt={`${distillery.name}-image-${index}`}
                  className="mx-auto aspect-square rounded-lg border object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-1 flex gap-x-2">
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDotButton className="ml-auto" />
          </div>
        </Carousel>
        <div>
          <h1 className="mb-2 text-2xl font-bold">{distillery.name}</h1>
          <p className="text-muted-foreground font-medium">{distillery.region}</p>
          <div className="mt-8">
            <strong>인기 위스키</strong>
            <Suspense fallback={null}>
              <PopularWhisky distillery={distillery} />
            </Suspense>
          </div>
        </div>
      </section>
      <section className="mt-4 lg:-mt-8">
        <div className="flex items-center justify-end gap-x-4">
          <SearchInput distilleryName={distillery.name} {...parse.data} />
          <Link
            href={`/distilleries/${encodeURIComponent(distillery.name)}/add`}
            className={cn(
              buttonVariants(),
              "size-9 shrink-0 p-0 sm:w-auto sm:px-4 sm:py-2"
            )}
          >
            <PlusCircledIcon className="size-4 sm:mr-2" />
            <span className="sr-only inline-block sm:not-sr-only">
              위스키 추가
            </span>
          </Link>
        </div>
        <Whiskies distilleryId={distillery.id} {...parse.data} />
      </section>
    </>
  );
}