import { eq, sql } from "drizzle-orm";
import Link from "next/link";

import { db } from "@/db/drizzle";
import { reviewTable, whiskyTable } from "@/db/schema";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { Skeleton } from "@/components/ui/skeleton";

function FeaturedWhiskysSkeletonItem() {
  return (
    <li className="float-left w-[200px] p-2">
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="mt-2 h-4" />
      <Skeleton className="mt-1 h-4" />
    </li>
  );
}

function FeaturedWhiskiesSkeleton() {
  return (
    <ol>
      <FeaturedWhiskysSkeletonItem />
      <FeaturedWhiskysSkeletonItem />
      <FeaturedWhiskysSkeletonItem />
      <FeaturedWhiskysSkeletonItem />
      <FeaturedWhiskysSkeletonItem />
      <FeaturedWhiskysSkeletonItem />
      <FeaturedWhiskysSkeletonItem />
      <FeaturedWhiskysSkeletonItem />
    </ol>
  );
}

const getTopRateWhiskys = () => {
  // 리뷰 개수가 높은 순서로 5개의 위스키를 가져옵니다.
  return db
    .select({
      id: whiskyTable.id,
      name: whiskyTable.name,
      reviewCount: sql<number>`COUNT(${reviewTable.id})`,
      rating: sql<number>`AVG(${reviewTable.score})`,
      images: whiskyTable.images,
    })
    .from(whiskyTable)
    .leftJoin(reviewTable, eq(reviewTable.whiskyId, whiskyTable.id))
    .groupBy(whiskyTable.id)
    .orderBy(sql`COUNT(${reviewTable.id}) DESC`);
};

async function FeaturedWhiskies() {
  const whiskys = await getTopRateWhiskys();

  return (
    <section>
      <ol className="slide-enter-content after:clear-both">
        {whiskys.map((whisky) => (
          <li key={whisky.id} className="hover:bg-muted group float-left mb-6 h-[300px] w-[200px] rounded-md p-2 transition-colors duration-200 hover:shadow-md">
            <Link href={`/whiskies/${whisky.id}`}>
              <div className="h-[200px] overflow-hidden rounded-md bg-white">
                <ImageWithFallback
                  src={whisky.images[0] ?? "/whisky-placeholder.png"}
                  fallbackSrc="/whisky-placeholder.png"
                  width={200}
                  height={200}
                  alt={whisky.name}
                  className="mx-auto max-h-[200px] rounded-md object-contain transition-transform group-hover:scale-105"
                  priority
                />
              </div>
              <div className="mt-2">
                {
                  whisky.rating ? (
                    <>
                      <span className="text-primary text-wrap font-bold">{Number(whisky.rating).toFixed(2)}</span>
                      <span className="text-muted-foreground ml-4">( 리뷰: {whisky.reviewCount} )</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">평가 없음</span>
                  )
                }
              </div>
              <p className="line-clamp-2">{whisky.name}</p>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export { FeaturedWhiskies, FeaturedWhiskiesSkeleton };