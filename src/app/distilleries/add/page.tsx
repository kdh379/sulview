import { Metadata } from "next";
import * as React from "react";

import DistilleryForm from "@/app/distilleries/add/form";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { getCurrentSessionRedirect } from "@/lib/session";

export const metadata: Metadata = {
  title: "증류소 추가",
};

export default async function DistilleryAddPage() {
  await getCurrentSessionRedirect();

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <h1 className="text-lg font-semibold leading-none tracking-tight">증류소 / 독립 병입자 추가</h1>
          <CardDescription>추가할 증류소 혹은 독립 병입자의 정보를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <DistilleryForm />
        </CardContent>
      </Card>
    </div>
  );
}
