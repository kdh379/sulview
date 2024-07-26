import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useRef } from "react";

import { GetNotesRes } from "@/types/entity/note";
import api from "@/lib/api";

const LIMIT_REQUEST_FEEDS = 10;

export const QUERY_KEY = "feeds" as const;

export function useFeeds() {
  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: [QUERY_KEY],
    queryFn: ({ pageParam }) =>
      api.get<GetNotesRes[]>("/api/note", {
        params: {
          limit: LIMIT_REQUEST_FEEDS,
          page: pageParam,
          search: "",
        },
      })
        .then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage)
          fetchNextPage();
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  const notes = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  return {
    notes,
    isLoading,
    lastElementRef,
  };
}