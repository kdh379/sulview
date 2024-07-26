"use client";

import FeedCard from "@/components/home/feed-card";
import { Icons } from "@/components/ui/icons";
import { useFeeds } from "@/hooks/useFeeds";

function Feeds() {
  const { notes, isLoading, lastElementRef } = useFeeds();

  return (
    <div className="space-y-2 md:max-w-[590px]">
      {notes && notes.map((note) => (
        <FeedCard key={note.id} ref={lastElementRef} {...note}/>
      ))}
      {isLoading && (
        <Icons.spinner className="mx-auto size-6"/>
      )}
    </div>
  );
}

export default Feeds;