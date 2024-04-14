import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

function SignButton() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <div className="flex items-center gap-x-4">
          <span>{session.user?.name}</span>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => signOut()}
                >
                  <Icons.logout className="size-6" />
                  <span className="sr-only">로그아웃</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                로그아웃
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <Button 
          onClick={() => signIn()}
        >
            Login
        </Button>
      )}
    </>
  );
}

const AppHeader = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/">
          <span className="font-bold">sulview</span>
        </Link>
        <SignButton />
      </div>
    </header>
  );
};

export default AppHeader;