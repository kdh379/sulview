import {
  Search
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

import { NAV_ITEMS } from "@/components/layout/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
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

function SignButton() {
  const { data: session } = useSession();

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
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel
            >
              내 계정
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              작성 목록
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut()}
            >
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button 
          onClick={() => signIn()}
        >
            로그인
        </Button>
      )}
    </>
  );
}

const AppHeader = () => {

  const pathname = usePathname();

  return (
    <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <MobileNavigation />
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {
            pathname.split("/").slice(1).map((path, index, paths) => {
              const href = `/${paths.slice(0, index + 1).join("/")}`;
              const isLast = index === paths.length - 1;
              const label = NAV_ITEMS.find((item) => item.href === href)?.label || path;

              return (
                <React.Fragment key={label}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={href}>
                        {label}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })
          }
        </BreadcrumbList>
      </Breadcrumb>
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

export default AppHeader;