import { Suspense } from "react";

import ErrorBoundary from "@/components/error-boundary";
import Feeds from "@/components/home/feeds";
import { FeedCardSkeleton } from "@/components/home/feed-card";

function HomePage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={(
        <article className="space-y-2 md:max-w-[600px]">
          <FeedCardSkeleton />
          <FeedCardSkeleton />
          <FeedCardSkeleton />
        </article>
      )}>
        <Feeds />
      </Suspense>
    </ErrorBoundary>
  );
}

export default HomePage;