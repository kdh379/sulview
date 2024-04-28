"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { NAV_ITEMS } from "@/components/layout/main-nav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";


export function AppBreadcrumb() {

  const pathname = usePathname();

  return (
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
  );
}