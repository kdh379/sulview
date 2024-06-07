import { and, eq, ilike, sql } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

import { SearchParams } from "@/app/distilleries/page";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/db/drizzle";
import { distilleryTable, reviewTable, whiskyTable } from "@/db/schema";

const getDistilleries = async ({ q, region }: SearchParams) => {
  return await db
    .select({
      id: distilleryTable.id,
      name: distilleryTable.name,
      region: distilleryTable.region,
      images: distilleryTable.images,
      whiskyCount: sql<number>`COUNT(${whiskyTable.id})`,
      reviewCount: sql<number>`COUNT(${reviewTable.id})`,
    })
    .from(distilleryTable)
    .groupBy(distilleryTable.id)
    .where(
      distilleryWhere({
        q,
        region,
      }),
    )
    .leftJoin(whiskyTable, eq(whiskyTable.distilleryId, distilleryTable.id))
    .leftJoin(reviewTable, eq(reviewTable.whiskyId, whiskyTable.id));
};

const distilleryWhere = ({ q, region }: SearchParams) => {
  return and(
    region != null && region.length ? eq(distilleryTable.region, region) : undefined,
    q != null && q.length ? ilike(distilleryTable.name, `%${q}%`) : undefined,
  );
};

export default async function Distilleries({ q, region }: SearchParams) {
  const distilleries = await getDistilleries({ q, region });

  return (
    <Table className="mt-4">
      <TableCaption>증류소 목록</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>증류소 / 독립 병입자</TableHead>
          <TableHead>지역</TableHead>
          <TableHead>위스키</TableHead>
          <TableHead>리뷰</TableHead>
          <TableHead className="w-0 p-0">
            <span className="sr-only">Link</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {distilleries.map((distillery) => (
          <TableRow key={distillery.id} className="group relative">
            <TableCell className="hidden w-[100px] sm:table-cell">
              <Image
                src={distillery.images[0]}
                width={100}
                height={100}
                alt={distillery.name}
                quality={100}
                className="aspect-square w-16 rounded-md object-cover transition-transform group-hover:scale-110"
              />
            </TableCell>
            <TableCell>{distillery.name}</TableCell>
            <TableCell>{distillery.region}</TableCell>
            <TableCell>{distillery.whiskyCount}</TableCell>
            <TableCell>{distillery.reviewCount}</TableCell>
            <TableCell className="w-0 p-0">
              <Link href={`/distilleries/${distillery.name}`} className="absolute inset-0">
                <span className="sr-only">Link</span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
