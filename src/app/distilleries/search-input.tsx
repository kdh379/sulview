"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { SearchParams } from "@/app/distilleries/page";
import { AutoComplete } from "@/components/ui/autocomplete";
import { Input } from "@/components/ui/input";
import data from "@/data/distillery-regions.json";
import debounce from "@/lib/debounce";

export default function SearchInput({ region = "", q = "" }: SearchParams) {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = React.useState({ region, q });

  React.useEffect(() => {
    const params = new URLSearchParams({ ...searchParams }).toString();

    router.replace(`/distilleries?${params}`);
  }, [router, searchParams]);

  React.useEffect(() => {
    if (!inputRef.current || document.activeElement === inputRef.current) return;

    inputRef.current.focus();
    inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
  }, []);

  return (
    <>
      <AutoComplete
        itemList={data.distilleryRegions.map((region) => ({
          value: region,
          label: region,
        }))}
        placeholder="지역"
        value={searchParams.region}
        onValueChange={(value) => setSearchParams({ ...searchParams, region: value })}
      />
      <div className="relative">
        <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
        <Input
          ref={inputRef}
          defaultValue={searchParams.q}
          placeholder="증류소 검색"
          className="w-full pl-8"
          onInput={debounce((e) => {
            setSearchParams({ ...searchParams, q: e.target.value });
          }, 300)}
        />
      </div>
    </>
  );
}
