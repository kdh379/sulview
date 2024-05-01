import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { WhiskyBreadcrumb } from "@/app/whiskies/[whiskyId]/whisky-breadcrumb";
import WhiskyInfo from "@/app/whiskies/[whiskyId]/whisky-info";
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
    whiskyId: number;
  };
}

export default async function WhiskyPage({ params }: WhiskyPageProps) {

  const { whisky, distillery, userName } = await getWhiskyAbout(params.whiskyId);
  
  return (
    <div>
      <Suspense fallback={null}>
        <WhiskyBreadcrumb
          region={distillery.region}
          distillery={distillery.name}
          independentDistillery={whisky.independentDistillery}
        />
      </Suspense>
      <Suspense fallback={null}>
        <WhiskyInfo 
          whisky={whisky}
          distillery={distillery}
          userName={userName}
        />
      </Suspense>
    </div>
  );
}