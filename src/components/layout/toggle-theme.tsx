"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { useMounted } from "@/hooks/useMounted";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { Icons } from "../ui/icons";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <div className="flex gap-x-2 p-2">
      <Label htmlFor="theme-toggle">
        <Icons.sun className="size-5" />
        <span className="sr-only">라이트 모드</span>
      </Label>
      <Switch
        id="theme-toggle"
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <Label htmlFor="theme-toggle">
        <Icons.moon className="size-5" />
        <span className="sr-only">다크 모드</span>
      </Label>
    </div>
  );
}
