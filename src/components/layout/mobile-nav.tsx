import { PanelLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

import MainNav from "@/components/layout/main-nav";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="md:hidden">
          <PanelLeft className="size-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <Link href="/" className="group flex items-center gap-2 px-3 py-4 text-lg font-semibold">
          <Icons.logo className="text-primary transition-all group-hover:scale-110" />
          <span>{siteConfig.name}</span>
        </Link>
        <MainNav />
      </SheetContent>
    </Sheet>
  );
}
