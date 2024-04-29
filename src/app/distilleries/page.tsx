import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { headers as dynamic } from "next/headers";
import Link from "next/link";
import React, { Suspense } from "react";
import { z } from "zod";

import Distilleries from "@/app/distilleries/distilleries";
import SearchInput from "@/app/distilleries/search-input";
import { Button } from "@/components/ui/button";

const SearchParamsSchema = z.object({
  q: z.string().max(256).optional().default(""),
  region: z.string().max(256).optional().default(""),
});

export type SearchParams = z.infer<typeof SearchParamsSchema>;

export const metadata: Metadata = {
  title: "증류소",
};

export default function DistilleriesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  dynamic();

  const parse = SearchParamsSchema.safeParse(searchParams);

  if (!parse.success)
    return <p>잘못된 요청입니다.</p>;

  return (
    <main>
      <div
        className="flex items-center justify-end gap-x-4"
      >
        <SearchInput {...parse.data} />
        <Link href="/distilleries/add">
          <Button>
            <PlusCircledIcon className="mr-2 size-5" />
            증류소 추가
          </Button>
        </Link>
      </div>
      <Suspense fallback={null}>
        <Distilleries {...parse.data} />
      </Suspense>
    </main>
  );
}