import dayjs from "dayjs";
import Link from "next/link";

import { WhiskyBreadcrumb } from "@/app/whiskies/[...whisky]/whisky-breadcrumb";
import WhiskyImages from "@/app/whiskies/[...whisky]/whisky-images";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { distilleryTable, whiskyTable } from "@/db/schema";

interface WhiskyPageProps {
  whisky: typeof whiskyTable.$inferSelect;
  distillery: typeof distilleryTable.$inferSelect;
  score: number | null;
  userName: string | null;
}

export default async function WhiskyInfo({ whisky, distillery, userName, score }: WhiskyPageProps) {
  const independent = whisky.independentDistillery && distillery.name;

  return (
    <Card>
      <CardHeader>
        <WhiskyBreadcrumb
          region={distillery.region}
          distillery={distillery.name}
          independentDistillery={whisky.independentDistillery}
        />
        <h1 className="mb-4 text-4xl font-bold">{whisky.name}</h1>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-[300px_1fr] md:gap-12">
        <WhiskyImages alt={whisky.name} images={whisky.images} />
        <div>
          <h2 className="mb-4">
            <p className="text-lg font-bold">{siteConfig.name} RATING</p>
            <strong className="text-4xl font-bold">{Number(score)?.toFixed(2)}</strong>
            <span className="ml-1 text-xl font-medium">/ 100</span>
          </h2>
          <dl className="[&>dt]:text-muted-foreground grid auto-rows-min grid-cols-[150px_1fr] [&>dd]:font-bold [&>dt]:mb-2">
            {independent && (
              <>
                <dt>증류소</dt>
                <dd>
                  <Link href={`/distilleries/${whisky.independentDistillery}`} className="underline underline-offset-4">
                    {whisky.independentDistillery}
                  </Link>
                </dd>
              </>
            )}
            <dt>{independent ? "병입" : "증류소"}</dt>
            <dd>
              <Link href={`/distilleries/${independent || distillery.name}`} className="underline underline-offset-4">
                {independent || distillery.name}
              </Link>
            </dd>
            <dt>지역</dt>
            <dd>
              <Link href={`/distilleries?region=${distillery.region}`} className="underline underline-offset-4">
                {distillery.region}
              </Link>
            </dd>
            {whisky.bottled && (
              <>
                <dt>병입일</dt>
                <dd>{whisky.bottled}</dd>
              </>
            )}
            {whisky.aged && (
              <>
                <dt>Aged</dt>
                <dd>{whisky.aged}</dd>
              </>
            )}
            {whisky.abv && (
              <>
                <dt>ABV</dt>
                <dd>{whisky.abv}</dd>
              </>
            )}
            {whisky.caskTypes.length > 0 && (
              <>
                <dt>캐스크 종류</dt>
                <dd>
                  <ul>
                    {whisky.caskTypes.map((cask) => (
                      <li key={cask}>{cask}</li>
                    ))}
                  </ul>
                </dd>
              </>
            )}
            {whisky.caskNumber && (
              <>
                <dt>캐스크 번호</dt>
                <dd>{whisky.caskNumber}</dd>
              </>
            )}
            {whisky.createdAt && (
              <>
                <dt>생성일</dt>
                <dd>
                  {dayjs(whisky.createdAt).format("YY.MM.DD HH:mm")} by
                  <Link href={`/users/${userName}`} className="block w-fit underline underline-offset-4">
                    {userName}
                  </Link>
                </dd>
              </>
            )}
          </dl>
        </div>
      </CardContent>
    </Card>
  );
}
