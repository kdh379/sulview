import { Button } from "../../components/ui/button";
import { CardDescription } from "../../components/ui/card";
import { Icons } from "../../components/ui/icons";

export default function SocialForm() {
  return (
    <div className="mt-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            OR
          </span>
        </div>
      </div>
      <CardDescription>
        원하는 소셜 계정으로 로그인하세요.
      </CardDescription>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="text-red-600"
        >
          <Icons.google className="mr-2 size-4" />
          Google
        </Button>
        <Button
          variant="outline"
          className="text-green-600"
        >
          <Icons.naver className="mr-2 size-4" />
          Naver
        </Button>
      </div>
    </div>
  );
}