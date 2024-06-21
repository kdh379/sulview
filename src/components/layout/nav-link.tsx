import Link from "next/link";

import { cn } from "@/lib/utils";

interface NavLinkProps {
  pathname: string;
  isActive?: boolean;
  children: React.ReactNode;
}

export default function NavLink({pathname, isActive=false, children}: NavLinkProps) {
  return (
    <Link
      key={pathname}
      href={pathname}
      className={cn(
        "text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-4 transition-colors",
        isActive && "text-primary"
      )}
    >
      {children}
    </Link>
  );
}
