import { Metadata } from "next";

import WhiskyAddForm from "@/app/distilleries/[distillery]/add/form";
import { getCurrentSessionRedirect } from "@/lib/session";

export const metadata: Metadata = {
  title: "위스키 추가",
};

interface WhiskyAddPageProps {
  params: {
    distillery: string;
  };
}

export default async function WhiskyAddPage({ params }: WhiskyAddPageProps) {

  await getCurrentSessionRedirect();
  const distilleryName = decodeURIComponent(params.distillery);

  return (
    <div className="mx-auto max-w-[800px]">
      <div>
        <h1 className="mb-2 text-2xl font-bold">위스키 추가</h1>
        <p className="text-muted-foreground">
          <b className="text-primary">{distilleryName}</b>
          에 추가할 위스키의 정보를 입력해주세요.
        </p>
      </div>
      <WhiskyAddForm distilleryName={distilleryName} />
    </div>
  );
}