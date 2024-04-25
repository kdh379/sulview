import {
  Search
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { auth } from "@/auth";
import { AppBreadcrumb } from "@/components/layout/app-breadcrumb";
import { Logout } from "@/components/layout/logout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import MobileNavigation from "./mobile-navigation";

async function SignButton() {
  const session = await auth();

  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Image
                src="/placeholder-user.jpg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
                priority
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel
            >
              {session.user?.name}
              <p className="text-muted-foreground/75 text-xs">
                {session.user?.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              작성 목록
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <Button>
            로그인
          </Button>
        </Link>
      )}
    </>
  );
}

export default async function AppHeader() {

  return (
    <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <MobileNavigation />
      <AppBreadcrumb />
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
        <Input
          type="search"
          placeholder="Search..."
          className="bg-background w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <SignButton />
    </header>
  );
};