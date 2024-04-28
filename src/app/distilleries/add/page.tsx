
import { redirect } from "next/navigation";
import * as React from "react";

import DistilleryForm from "@/app/distilleries/add/form";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/session";

export default async function DistilleryAddPage() {

  const user = await getCurrentUser();

  if(!user)
    redirect("/login");

  return (
    <main className="flex items-center justify-center">
      <Card className="w-full max-w-[500px]">
        <CardHeader className="mb-8">
          <h1 className="text-lg font-semibold leading-none tracking-tight">증류소 추가</h1>
          <CardDescription>
          추가할 증류소의 이름과 위치를 입력해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DistilleryForm />
        </CardContent>
      </Card>
    </main>
  );
}