import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Logout } from "@/components/layout/logout";
import MobileNav from "@/components/layout/mobile-nav";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { getCurrentUser } from "@/lib/session";

async function SignButton() {
  const user = await getCurrentUser();

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 overflow-hidden rounded-full">
              <Image
                src="/user-placeholder.jpg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
                priority
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {user.name}
              <p className="text-muted-foreground/75 text-xs">{user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>작성 목록</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login" className={buttonVariants()}>
          로그인
        </Link>
      )}
    </>
  );
}

export default async function MobileHeader() {
  return (
    <header className="border-border bg-background supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 flex h-14 items-center border-b px-4 backdrop-blur md:hidden md:px-8">
      <div className="flex flex-1 items-center gap-x-4">
        <MobileNav />
        <div className="relative w-full md:w-2/3 lg:w-1/3">
          <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
          <Input type="search" placeholder="위스키 검색" className="pl-8" />
        </div>
        <div className="ml-auto flex items-center gap-x-4">
          <SignButton />
        </div>
      </div>
    </header>
  );
}
