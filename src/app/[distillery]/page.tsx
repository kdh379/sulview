import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/db/drizzle";
import { distilleryTable } from "@/db/schema";

export default async function DistilleryPage({ params }: { params: { distillery: string } }) {

  const distilleryName = decodeURIComponent(params.distillery);

  const distillery = await db.select().from(distilleryTable).where(eq(distilleryTable.name, distilleryName)).limit(1);

  if(distillery.length === 0)
    notFound();

  return (
    <main>
      <p>Distillery: {distillery[0].name}</p>
      <Image
        src={`${distillery[0].images[0]}`}
        width={200}
        height={200}
        alt={distillery[0].name}
      />
    </main>
  );
}