"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useRef } from "react";
import axios from "axios";

import { GetNotesRes } from "@/types/entity/note";
import FeedCard from "@/components/home/feed-card";
import { Icons } from "@/components/ui/icons";

const LIMIT_REQUEST_FEEDS = 10;

function Feeds() {
  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: ({ pageParam }) =>
      axios.get<GetNotesRes[]>("/api/note", {
        params: {
          limit: LIMIT_REQUEST_FEEDS,
          page: pageParam,
          search: "",
        },
      })
        .then((res) => res.data),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
  const observer = useRef<IntersectionObserver>();


  const lastElementRef  = useCallback(
    (node: HTMLDivElement) => {
      if(isLoading) return;

      if(observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && hasNextPage && !isFetchingNextPage)
          fetchNextPage();
      });

      if(node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  const notes = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  return (
    <article className="space-y-2 md:max-w-[590px]">
      {notes && notes.map((note) => (
        <FeedCard key={note.id} ref={lastElementRef} {...note}/>
      ))}
      {isLoading && (
        <Icons.spinner className="mx-auto size-6"/>
      )}
    </article>
  );
}

export default Feeds;