"use client";

import { Home, NotebookPen, Search, TriangleAlert, User } from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";
import Link from "next/link";

import NavLink from "@/components/layout/nav-link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import ToggleTheme from "@/components/layout/toggle-theme";

const NAV_ITEMS = [
  {
    icon: Home,
    label: "홈",
    pathname: "/",
  },
  {
    icon: Search,
    label: "검색",
    pathname: "/search",
  },
  {
    icon: NotebookPen,
    label: "노트쓰기",
    pathname: "/write",
  },
  {
    icon: User,
    label: "프로필",
    pathname: "/profile",
  },
];

const Navigation = () => {
  const pathname = usePathname();

  const isActive = (itemPathname: string) => {
    if (itemPathname === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(itemPathname);
  };

  return (
    <div className="flex flex-1 flex-col font-medium md:px-4">
      <nav>
        {NAV_ITEMS.map((item, index) => (
          <NavLink
            key={index}
            pathname={item.pathname}
            isActive={isActive(item.pathname)}
          >
            <item.icon className="size-4" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <footer className="mt-auto">
        <ToggleTheme />
        <nav>
          <NavLink
            pathname="/report"
            isActive={isActive("/report")}
          >
            <TriangleAlert className="size-4" />
            <span>문제신고</span>
          </NavLink>
        </nav>
        <p className="text-muted-foreground px-3">
          © 2024 {siteConfig.name}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({
                variant: "link",
              }),
              "text-muted-foreground hover:text-primary ml-2 p-0"
            )}
          >
          Github
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default React.memo(Navigation);
