import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="container flex h-14 items-center justify-end gap-x-4 font-bold">
      <Link
        href={siteConfig.links.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          variant="outline"
          size="icon"
        >
          <GitHubLogoIcon />
          <span className="sr-only">Github</span>
        </Button>
      </Link>
      <Link
        href={siteConfig.links.mailTo}
      >
        <Button
          variant="outline"
          size="icon"
        >
          <Mail className="size-4" />
          <span className="sr-only">Mail</span>
        </Button>
      </Link>
      <p>© 2024 {siteConfig.name}</p>
    </footer>
  );
}