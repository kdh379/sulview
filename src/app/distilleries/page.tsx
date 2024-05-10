import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { headers as dynamic } from "next/headers";
import Link from "next/link";
import React, { Suspense } from "react";
import { z } from "zod";

import Distilleries from "@/app/distilleries/distilleries";
import SearchInput from "@/app/distilleries/search-input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <>
      <div
        className="flex items-center justify-end gap-x-4"
      >
        <SearchInput {...parse.data} />
        <Link 
          href="/distilleries/add"
          className={cn(
            buttonVariants(),
            "size-9 shrink-0 p-0 sm:w-auto sm:px-4 sm:py-2"
          )}
        >
          <PlusCircledIcon className="size-4 sm:mr-2" />
          <span className="sr-only inline-block sm:not-sr-only">
            추가
          </span>
        </Link>
      </div>
      <Suspense fallback={null}>
        <Distilleries {...parse.data} />
      </Suspense>
    </>
  );
}