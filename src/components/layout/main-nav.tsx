"use client";

import {
  Home,
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
    icon: Home,
    label: "홈",
    href: "/",
  },
  {
    icon: ListOrdered,
    label: "리뷰",
    href: "/reviews",
  },
  {
    icon: Icons.barrels,
    label: "증류소",
    href: "/distilleries",
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
              key={item.href}
              href={item.href}
              className={cn(
                "text-muted-foreground/75 hover:text-primary font-medium transition-colors",
                pathname === item.href && "text-primary"
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