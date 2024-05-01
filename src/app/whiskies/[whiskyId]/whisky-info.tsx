
import dayjs from "dayjs";
import Link from "next/link";

import WhiskyImage from "@/app/whiskies/[whiskyId]/whisky-image";
import { distilleryTable, whiskyTable } from "@/db/schema";

interface WhiskyPageProps {
  whisky: typeof whiskyTable.$inferSelect;
  distillery: typeof distilleryTable.$inferSelect;
  userName: string | null;
}

export default async function WhiskyInfo({ whisky, distillery, userName }: WhiskyPageProps) {

  const independent = whisky.independentDistillery && distillery.name;

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">{whisky.name}</h1>
      <div className="grid justify-center gap-8 sm:grid-cols-[300px_1fr] sm:gap-12 md:justify-start">
        <WhiskyImage alt={whisky.name} images={whisky.images} />
        <div>
          <div className="mb-4">
            <h2 className="font-semibold">술뷰 점수</h2>
            <strong className="text-3xl font-bold">85.00</strong>
            <span className="ml-1 font-medium">/ 100</span>
          </div>
          <dl className="[&>dt]:text-muted-foreground grid auto-rows-min grid-cols-[150px_1fr] [&>dd]:font-bold [&>dt]:mb-2">
            {
              independent && (
                <>
                  <dt>증류소</dt>
                  <dd>
                    <Link 
                      href={`/distilleries/${whisky.independentDistillery}`}
                      className="underline"
                    >
                      {whisky.independentDistillery}
                    </Link>
                  </dd>
                </>
              )
            }
            <dt>{independent ? "병입" : "증류소"}</dt>
            <dd>
              <Link 
                href={`/distilleries/${whisky.independentDistillery || distillery.name}`}
                className="underline underline-offset-4"
              >
                {whisky.independentDistillery || distillery.name}
              </Link>
            </dd>
            {
              whisky.bottled && (
                <>
                  <dt>병입일</dt>
                  <dd>{whisky.bottled}</dd>
                </>
              )
            }
            {
              whisky.aged && (
                <>
                  <dt>Aged</dt>
                  <dd>{whisky.aged}</dd>
                </>
              )
            }
            {
              whisky.abv && (
                <>
                  <dt>ABV</dt>
                  <dd>{whisky.abv}</dd>
                </>
              )
            }
            {
              whisky.caskTypes.length > 0 && (
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
              )
            }
            {
              whisky.caskNumber && (
                <>
                  <dt>캐스크 번호</dt>
                  <dd>{whisky.caskNumber}</dd>
                </>
              )
            }
            {
              whisky.createdAt && (
                <>
                  <dt>생성일</dt>
                  <dd>
                    {dayjs(whisky.createdAt).format("YY.MM.DD HH:mm")} by
                    <Link
                      href={`/users/${userName}`}
                      className="block w-fit underline underline-offset-4"
                    >
                      {userName}
                    </Link>
                  </dd>
                </>
              )
            }
          </dl>
        </div>
      </div>
    </div>
  );
}