"use client";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import { Button } from "@/components/ui/button";

function FallbackRender({ error, resetErrorBoundary }: { error: Error | null; resetErrorBoundary: () => void }) {
  console.error(error);
  return (
    <div role='alert' className="flex flex-col items-center justify-center gap-8">
      <p className="text-2xl font-bold">
        요청사항을 처리하는 중 오류가 발생했습니다.
      </p>
      <p className="font-medium">
        잠시 후 다시 시도해 주세요.
      </p>
      <Button onClick={resetErrorBoundary}>다시 시도</Button>
    </div>
  );
}

type ErrorBoundaryProps = {
  children: React.ReactNode;
  FallbackComponent?: (props: { error: Error | null; resetErrorBoundary: () => void }) => React.ReactNode;
};

export default function ErrorBoundary({ children, FallbackComponent }: ErrorBoundaryProps): JSX.Element {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          onReset={reset}
          FallbackComponent={(props) => (
            FallbackComponent
              ? FallbackComponent(props)
              : <FallbackRender {...props} />
          )}
        >
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
