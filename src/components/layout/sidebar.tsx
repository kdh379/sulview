import { Bell } from "lucide-react";
import Link from "next/link";

import Navigation from "@/components/layout/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";

export default function Sidebar() {
  return (
    <div className="w-sidebar fixed hidden h-full border-r duration-200 md:block">
      <div className="flex h-full flex-col pb-4">
        <div className="flex h-14 items-center px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Icons.logo className="text-primary" />
            {siteConfig.name}
          </Link>
          <Button variant="outline" size="icon" className="ml-auto size-8">
            <Bell className="size-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <Navigation />
      </div>
    </div>
  );
}
