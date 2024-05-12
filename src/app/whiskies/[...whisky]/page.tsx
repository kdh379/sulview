import { eq, sql } from "drizzle-orm";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import WhiskyInfo from "@/app/whiskies/[...whisky]/whisky-info";
import WhiskyReviews from "@/app/whiskies/[...whisky]/whisky-reviews";
import { siteConfig } from "@/config/site";
import { db } from "@/db/drizzle";
import { distilleryTable, reviewTable, users, whiskyTable } from "@/db/schema";

const getWhiskyAbout = async (whiskyId: number) => {

  const avgReviewSq = db
    .select({
      whiskyId: reviewTable.whiskyId,
      score: sql<number>`avg(${reviewTable.score})`.as("score"),
    })
    .from(reviewTable)
    .groupBy(reviewTable.whiskyId)
    .as("avgReviewSq");

  const result = await db
    .select({
      whisky: whiskyTable,
      distillery: distilleryTable,
      userName: users.name,
      score: sql<number>`COALESCE(${avgReviewSq.score}, 0)`,
    })
    .from(whiskyTable)
    .leftJoin(distilleryTable, eq(distilleryTable.id, whiskyTable.distilleryId))
    .leftJoin(users, eq(users.id, whiskyTable.createdBy))
    .leftJoin(avgReviewSq, eq(avgReviewSq.whiskyId, whiskyTable.id))
    .where(eq(whiskyTable.id, whiskyId));

  const { whisky, distillery, userName, score } = result[0];

  if(!whisky || !distillery) return notFound();

  return { whisky, distillery, userName, score };
};

interface WhiskyPageProps {
  params: {
    whisky: string[]
  };
}

export async function generateMetadata({ params }: WhiskyPageProps): Promise<Metadata> {
  
  const [whiskyId] = params.whisky.map(Number);
  if(isNaN(Number(whiskyId))) return {};
  const { whisky, distillery } = await getWhiskyAbout(whiskyId);

  return {
    title: `${whisky.name} - 평가 및 리뷰`,
    description: `${whisky.name} - ${distillery.name} - ${whisky.independentDistillery} - ${whisky.aged} - ${whisky.abv} - ${whisky.bottled} - ${whisky.caskTypes.join(", ")}`,
    openGraph: {
      title: whisky.name,
      url: `${siteConfig.url}${encodeURIComponent(distillery.name)}/${whisky.id}`,
      siteName: siteConfig.name,
      images: [
        {
          url: whisky.images[0],
          width: 400,
          height: 400,
          alt: whisky.name,
        },
      ],
    },
  };
}

export default async function WhiskyPage({ params }: WhiskyPageProps) {

  const [whiskyId] = params.whisky.map(Number);
  if(isNaN(Number(whiskyId))) return notFound();

  const { whisky, distillery, userName, score } = await getWhiskyAbout(whiskyId);
  
  return (
    <div>
      <WhiskyInfo 
        whisky={whisky}
        distillery={distillery}
        userName={userName}
        score={score}
      />
      <Suspense fallback={null}>
        <WhiskyReviews whiskyId={whiskyId} />
      </Suspense>
    </div>
  );
}