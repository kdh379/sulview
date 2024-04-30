import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="container flex h-14 items-center justify-end gap-x-4 font-bold">
      <Link
        href={siteConfig.links.github}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({
          size: "icon",
          variant: "outline",
        })}
      >
        <GitHubLogoIcon />
        <span className="sr-only">Github</span>
      </Link>
      <Link
        href={siteConfig.links.mailTo}
        className={buttonVariants({
          size: "icon",
          variant: "outline",
        })}
      >
        <Mail className="size-4" />
        <span className="sr-only">Mail</span>
      </Link>
      <p>© 2024 {siteConfig.name}</p>
    </footer>
  );
}