import { eq } from "drizzle-orm";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import RouterRewrite from "@/app/whiskies/[...whisky]/router-rewrite";
import { WhiskyBreadcrumb } from "@/app/whiskies/[...whisky]/whisky-breadcrumb";
import WhiskyInfo from "@/app/whiskies/[...whisky]/whisky-info";
import WhiskyReviews from "@/app/whiskies/[...whisky]/whisky-reviews";
import { siteConfig } from "@/config/site";
import { db } from "@/db/drizzle";
import { distilleryTable, users, whiskyTable } from "@/db/schema";

const getWhiskyAbout = async (whiskyId: number) => {

  const whiskySq = db
    .select()
    .from(whiskyTable)
    .where(eq(whiskyTable.id, whiskyId))
    .as("whisky");

  const result = await db
    .select({
      whisky: whiskyTable,
      distillery: distilleryTable,
      userName: users.name,
    })
    .from(distilleryTable)
    .leftJoin(whiskySq, eq(whiskySq.distilleryId, distilleryTable.id))
    .leftJoin(users, eq(users.id, whiskyTable.createdBy));

  const { whisky, distillery, userName } = result[0];

  if(!whisky || !distillery) return notFound();

  return { whisky, distillery, userName };
};

interface WhiskyPageProps {
  params: {
    whisky: [number, string]
  };
}

export async function generateMetadata({ params }: WhiskyPageProps): Promise<Metadata> {
  
  const { whisky, distillery } = await getWhiskyAbout(params.whisky[0]);

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

  const [whiskyId] = params.whisky;
  const { whisky, distillery, userName } = await getWhiskyAbout(whiskyId);
  
  return (
    <div>
      <WhiskyBreadcrumb
        region={distillery.region}
        distillery={distillery.name}
        independentDistillery={whisky.independentDistillery}
      />
      <WhiskyInfo 
        whisky={whisky}
        distillery={distillery}
        userName={userName}
      />
      <Suspense fallback={null}>
        <WhiskyReviews whiskyId={whiskyId} />
      </Suspense>
      <RouterRewrite 
        whiskyId={whiskyId}
        whiskyName={whisky.name}
      />
    </div>
  );
}