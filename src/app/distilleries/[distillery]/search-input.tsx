"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { SearchParamsType } from "@/app/distilleries/[distillery]/page";
import { Input } from "@/components/ui/input";
import debounce from "@/lib/debounce";

interface SearchInputProps extends SearchParamsType {
  distilleryName: string;
}

export default function SearchInput(
  {
    distilleryName,
    q="",
  }: SearchInputProps) {

  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = React.useState({q});

  React.useEffect(() => {
    
    const params = new URLSearchParams({...searchParams}).toString();

    router.replace(`/distilleries/${distilleryName}?${params}`);

  }, [router, searchParams, distilleryName]);

  React.useEffect(() => {
    if (!inputRef.current || document.activeElement === inputRef.current)
      return;

    inputRef.current.focus();
    inputRef.current.setSelectionRange(
      inputRef.current.value.length,
      inputRef.current.value.length
    );
  }, []);

  return (
    <>
      <div className="relative">
        <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
        <Input
          ref={inputRef}
          defaultValue={searchParams.q}
          placeholder="증류소 검색"
          className="w-full pl-8"
          onInput={debounce(
            (e) => {
              setSearchParams({ ...searchParams, q: e.target.value });
            }, 
            300)}
        />
      </div>
    </>
  );
}