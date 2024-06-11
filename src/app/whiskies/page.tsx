import { Suspense } from "react";

import { FeaturedWhiskies, FeaturedWhiskiesSkeleton } from "@/app/whiskies/featured-whiskies";
import ErrorBoundary from "@/components/error-boundary";

export default function WhiskiesPage() {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold">위스키</h1>
      <ErrorBoundary>
        <Suspense fallback={<FeaturedWhiskiesSkeleton />}>
          <FeaturedWhiskies />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
