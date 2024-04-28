import { Metadata } from "next";
import { redirect } from "next/navigation";

import EmailForm from "@/components/login/email-form";
import SocialForm from "@/components/login/social-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "로그인",
};

export default async function Login () {
  const user = await getCurrentUser();

  if (user)
    redirect("/");

  return (
    <main className="flex flex-1 items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>로그인하여 계속 진행하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <EmailForm />
          <SocialForm />
        </CardContent>
      </Card>
    </main>
  );
};