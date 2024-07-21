import type { PropsWithChildren } from "react";
import { render } from "@testing-library/react";

import Providers from "@/components/providers";
import ErrorBoundary from "@/components/error-boundary";

function Wrapper({ children }: PropsWithChildren) {
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

export * from "@testing-library/react";
export { customRender as render };
export { default as userEvent } from "@testing-library/user-event";