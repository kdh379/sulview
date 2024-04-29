"use client";

import {
  ListOrdered
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Icons } from "../ui/icons";

export const NAV_ITEMS = [
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
    <div className="hidden sm:flex">
      <Link 
        href="/"
        className="mr-8 flex items-center gap-x-2"
      >
        <Icons.logo className="text-primary" />
        <span className="font-bold">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-x-8">
        {
          NAV_ITEMS.map((item) => (
            <Link
              key={item.pathname}
              href={item.pathname}
              className={cn(
                "text-muted-foreground/75 hover:text-primary font-medium transition-colors",
                pathname.startsWith(item.pathname) && "text-primary"
              )}
            >
              <span>{item.label}</span>
            </Link>
          ))
        }
      </nav>
    </div>
  );
};

export default React.memo(MainNav);