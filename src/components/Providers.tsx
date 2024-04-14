"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

import AppHeader from "./layout/app-header";

const queryClient = new QueryClient();

interface ProvidersProps {
  session: Session | null;
  children: React.ReactNode;
}

export default function Providers({ session, children }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <div className="flex min-h-screen flex-col">
          <AppHeader />
          {children}
        </div>
      </QueryClientProvider>
    </SessionProvider>
  );
}