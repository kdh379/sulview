"use client";

import {
  Home,
  ListOrdered
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Icons } from "../ui/icons";

const NAV_ITEMS = [
  {
    icon: Home,
    label: "홈",
    pathname: "/",
  },
  {
    icon: ListOrdered,
    label: "위스키",
    pathname: "/whiskies",
  },
  {
    icon: Icons.barrels,
    label: "증류소/독병",
    pathname: "/distilleries",
  },
  {
    icon: ListOrdered,
    label: "리뷰",
    pathname: "/reviews",
  },
];

const MainNav = () => {

  const pathname = usePathname();

  return (
    <nav className="px-4 text-sm font-medium">
      {NAV_ITEMS.map((item, index) => (
        <Link
          key={item.pathname}
          href={item.pathname}
          className={cn(
            "text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-4 transition-all",
            index === 0
              ? pathname === item.pathname && "text-primary"
              : pathname.startsWith(item.pathname) && "text-primary"
          )}
        >
          <item.icon className="size-4" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default React.memo(MainNav);