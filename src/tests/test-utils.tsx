import * as React from "react";
import { render, renderHook } from "@testing-library/react";

import Providers from "@/components/providers";
import ErrorBoundary from "@/components/error-boundary";

function Wrapper({ children }: React.PropsWithChildren) {
  return (
    <Providers>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </Providers>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function customRender(ui: React.ReactElement, options?: any) {
  return render(ui, { wrapper: Wrapper, ...options });
}

function customRenderHook(callback: () => unknown) {
  return renderHook(callback, { wrapper: Wrapper });
}

export * from "@testing-library/react";
export { Wrapper };
export { customRender as render };
export { customRenderHook as renderHook };
export { default as userEvent } from "@testing-library/user-event";