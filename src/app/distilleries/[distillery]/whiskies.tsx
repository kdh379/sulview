import { and, eq, ilike, sql } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

import { SearchParamsType } from "@/app/distilleries/[distillery]/page";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/db/drizzle";
import { reviewTable, whiskyTable } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";

interface WhiskiesProps extends SearchParamsType {
  distilleryId: number;
}

const getWhiskies = async (distilleryId: number, q: string) => {
  const user = await getCurrentUser();
  
  return db
    .select({
      id: whiskyTable.id,
      name: whiskyTable.name,
      aged: whiskyTable.aged,
      abv: whiskyTable.abv,
      bottled: whiskyTable.bottled,
      images: whiskyTable.images,
      score: sql<number>`avg(${reviewTable.score})`,
      myScore: sql<number>`avg(CASE WHEN ${reviewTable.createdBy} = ${user?.id} THEN ${reviewTable.score} ELSE NULL END)`,
    })
    .from(whiskyTable)
    .groupBy(whiskyTable.id)
    .where(and(
      eq(whiskyTable.distilleryId, distilleryId),
      q.length ? ilike(whiskyTable.name, `%${q}%`) : undefined
    ))
    .leftJoin(reviewTable, eq(reviewTable.whiskyId, whiskyTable.id));
};

export default async function Whiskies({ distilleryId, q }: WhiskiesProps) {

  const whiskies = await getWhiskies(distilleryId, q);

  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>위스키</TableHead>
          <TableHead>Aged</TableHead>
          <TableHead>ABV</TableHead>
          <TableHead>Bottled</TableHead>
          <TableHead>점수</TableHead>
          <TableHead>내 점수</TableHead>
          <TableHead className="w-0 p-0">
            <span className="sr-only">Link</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {whiskies.map((whisky) => (
          <TableRow 
            key={whisky.id}
            className="relative"
          >
            <TableCell className="hidden w-[100px] sm:table-cell">
              <Image
                src={whisky.images[0]}
                alt={whisky.name}
                width={100}
                height={100}
              />
            </TableCell>
            <TableCell>{whisky.name}</TableCell>
            <TableCell>{whisky.aged}</TableCell>
            <TableCell>{whisky.abv}</TableCell>
            <TableCell>{whisky.bottled}</TableCell>
            <TableCell>{whisky.score}</TableCell>
            <TableCell>{whisky.myScore}</TableCell>
            <TableCell className="w-0 p-0">
              <Link
                href={`/whiskies/${whisky.id}`}
                className="absolute inset-0"
              >
                <span className="sr-only">{whisky.name}</span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}