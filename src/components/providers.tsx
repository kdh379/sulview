"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";

import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={0}>
          {children}
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}