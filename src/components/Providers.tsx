"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Toaster } from "@/components/ui/toaster";

import AppHeader from "./layout/app-header";
import Navigation from "./layout/navigation";
import { TooltipProvider } from "./ui/tooltip";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

interface ProvidersProps {
  session: Session | null;
  children: React.ReactNode;
}

export default function Providers({ session, children }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={0}>
          <Navigation />
          <div className="bg-muted/40 flex min-h-screen w-full flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <AppHeader />
            {children}
          </div>
        </TooltipProvider>
        <Toaster />
      </QueryClientProvider>
    </SessionProvider>
  );
}