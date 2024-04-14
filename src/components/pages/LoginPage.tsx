import EmailForm from "../login/EmailForm";
import SocialForm from "../login/SocialForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function LoginPage() {
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