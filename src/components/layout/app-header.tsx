import {
  Bell,
  Search
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Logout } from "@/components/layout/logout";
import MainNav from "@/components/layout/main-nav";
import MobileNav from "@/components/layout/mobile-nav";
import ToggleTheme from "@/components/layout/toggle-theme";
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
import { getCurrentUser } from "@/lib/session";

async function SignButton() {
  const user = await getCurrentUser();

  return (
    <>
      {user ? (
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
              {user.name}
              <p className="text-muted-foreground/75 text-xs">
                {user.email}
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
    <header className="border-border bg-background supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="container flex h-14 items-center">
        <MobileNav />
        <MainNav />
        <div className="ml-4 flex flex-1 items-center justify-end gap-x-4">
          <div className="relative w-full max-w-80">
            <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
            <Input
              type="search"
              placeholder="위스키 검색"
              className="w-full pl-8"
            />
          </div>
          <ToggleTheme />
          <Button
            variant="outline"
            size="icon"
          >
            <Bell className="size-4" />
            <span className="sr-only">알림</span>
          </Button>
          <SignButton />
        </div>
      </div>
    </header>
  );
};