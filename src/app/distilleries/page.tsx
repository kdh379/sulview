import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Search } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchParamsSchema = z.object({
  q: z.string().max(256).optional().default(""),
});

export const metadata: Metadata = {
  title: "증류소",
};

export default function DistilleriesPage({
  searchParams,
}: {
  searchParams: z.infer<typeof SearchParamsSchema>;
}) {
  headers();

  const query = SearchParamsSchema.safeParse(searchParams);

  if (!query.success)
    return <p>잘못된 요청입니다.</p>;

  return (
    <main>
      <div
        className="flex items-center justify-end gap-x-4"
      >
        <div className="relative">
          <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
          <Input
            type="search"
            placeholder="증류소 검색"
            className="w-full pl-8"
          />
        </div>
        <Link href="/distilleries/add">
          <Button>
            <PlusCircledIcon className="mr-2 size-5" />
            증류소 추가
          </Button>
        </Link>
      </div>
    </main>
  );
}