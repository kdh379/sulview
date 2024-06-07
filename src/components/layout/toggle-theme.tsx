"use client";

import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

import { Icons } from "../ui/icons";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const mounted = useMounted();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hidden sm:inline-flex"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mounted && (
        <>{theme === "dark" ? <Icons.moon className={cn("size-5")} /> : <Icons.sun className={cn("size-5")} />}</>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
