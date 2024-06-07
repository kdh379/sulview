import { eq, sql } from "drizzle-orm";
import { Inbox, NotebookPen } from "lucide-react";
import Link from "next/link";

import { db } from "@/db/drizzle";
import { distilleryTable, reviewTable, whiskyTable } from "@/db/schema";

const getPopularWhiskies = async (distilleryId: number) => {
  return await db
    .select({
      id: whiskyTable.id,
      whiskyName: whiskyTable.name,
      reviewCount: sql<number>`COUNT(${reviewTable.id})`,
    })
    .from(whiskyTable)
    .where(eq(whiskyTable.distilleryId, distilleryId))
    .leftJoin(reviewTable, eq(reviewTable.whiskyId, whiskyTable.id))
    .groupBy(whiskyTable.id);
};

function PopularWhiskeyItem({
  href,
  whiskyName,
  reviewCount,
}: {
  href: string;
  whiskyName: string;
  reviewCount: number;
}) {
  return (
    <li className="flex items-center gap-x-6">
      <div className="flex items-center gap-x-2">
        <NotebookPen className="text-muted-foreground size-4" />
        <span className="font-bold">{reviewCount}</span>
        <p className="text-muted-foreground">리뷰</p>
        <Link href={href} className="text-primary hover:underline">
          {whiskyName}
        </Link>
      </div>
    </li>
  );
}

export default async function PopularWhisky({ distillery }: { distillery: typeof distilleryTable.$inferSelect }) {
  const whiskies = await getPopularWhiskies(distillery.id);

  return whiskies !== null && whiskies.length > 0 ? (
    whiskies.slice(0, 5).map((whisky) => (
      <ul key={whisky.whiskyName} className="mt-4 space-y-2">
        <PopularWhiskeyItem
          href={`/whiskies/${whisky.id}/${whisky.whiskyName}`}
          whiskyName={whisky.whiskyName}
          reviewCount={whisky.reviewCount}
        />
      </ul>
    ))
  ) : (
    <div className="text-muted-foreground mt-4 flex max-w-40 flex-col items-center">
      <Inbox className="size-12" />
      <p>작성된 리뷰가 없습니다.</p>
    </div>
  );
}
