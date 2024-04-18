import {
  GlassWater,
  Home,
  ListOrdered,
  SquarePen
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
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
    icon: SquarePen,
    label: "리뷰 작성",
    href: "/write",
  },
  {
    icon: Icons.barrels,
    label: "증류소",
    href: "/distilleries",
  },
  {
    icon: ListOrdered,
    label: "랭킹",
    href: "/rankings",
  },
];

const Navigation = () => {

  const pathname = usePathname();

  return (
    <aside className="bg-background fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="bg-primary text-primary-foreground group flex size-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:size-8 md:text-base"
        >
          <GlassWater className="size-4 transition-all group-hover:scale-110" />
          <span className="sr-only">{siteConfig.name}</span>
        </Link>
        {
          NAV_ITEMS.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "text-muted-foreground hover:text-foreground flex size-9 items-center justify-center rounded-lg transition-colors md:size-8",
                    pathname === item.href && "bg-accent text-accent-foreground"
                  )}
                >
                  <item.icon className="size-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))
        }
      </nav>
    </aside>
  );
};

export default React.memo(Navigation);