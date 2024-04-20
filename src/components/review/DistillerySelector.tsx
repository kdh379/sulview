"use client";

import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon
} from "@radix-ui/react-icons";
import * as React from "react";

import DistilleryForm from "@/components/review/DistilleryForm";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const groups = [
  {
    label: "스코틀랜드",
    distilleries: [
      {
        label: "에드라두어",
        value: "edradour",
      },
      {
        label: "글렌알라키",
        value: "glenallachie",
      },
    ],
  },
  {
    label: "미국",
    distilleries: [
      {
        label: "와일드터키",
        value: "wildturkey",
      },
      {
        label: "버팔로 트레이스",
        value: "buffalo trace",
      },
      {
        label: "일라이저 크레이그",
        value: "elijah craig",
      },
    ],
  },
];

type Team = (typeof groups)[number]["distilleries"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface DistillerySelectorProps extends PopoverTriggerProps {
  onValueChange?: (value: string) => void
}

export default function DistillerySelector({ className, onValueChange }: DistillerySelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewDistilleryDialog, setShowNewDistilleryDialog] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<Team>();

  return (
    <Dialog open={showNewDistilleryDialog} onOpenChange={setShowNewDistilleryDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            {selectedItem?.label || ""}
            <CaretSortIcon className="ml-auto size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="bottom"
          className="w-[250px]"
        >
          <Command>
            <CommandList>
              <CommandInput placeholder="증류소 검색..." />
              <ScrollArea className="h-[200px] w-full">
                <CommandEmpty>
                  <p>찾으시는 증류소가 없나요?</p>
                  <p>아래 버튼을 클릭하여 증류소를 추가해주세요.</p>
                </CommandEmpty>
                {groups.map((group) => (
                  <CommandGroup key={group.label} heading={group.label}>
                    {group.distilleries.map((distillery) => (
                      <CommandItem
                        key={distillery.value}
                        onSelect={() => {
                          setSelectedItem(distillery);
                          onValueChange?.(distillery.value);
                          setOpen(false);
                        }}
                        className="text-sm"
                      >
                        {distillery.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto size-4",
                            selectedItem?.value === distillery.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </ScrollArea>
            </CommandList>
            <CommandSeparator />
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="mt-2"
                onSelect={() => {
                  setOpen(false);
                  setShowNewDistilleryDialog(true);
                }}
              >
                <PlusCircledIcon className="mr-2 size-5" />
                    증류소 추가
              </Button>
            </DialogTrigger>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DistilleryForm 
          handleOnAction={() => setShowNewDistilleryDialog(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
