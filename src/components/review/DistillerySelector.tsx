"use client";

import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon
} from "@radix-ui/react-icons";
import * as React from "react";
import { useQuery } from "react-query";

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
import { distillery } from "@/db/schema";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

type DistilleryType = typeof distillery.$inferSelect;

type GroupedDistilleries = {
  region: string;
  distilleries: DistilleryType[]; 
}

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface DistillerySelectorProps extends PopoverTriggerProps {
  onValueChange?: (value: number) => void
}

export default function DistillerySelector({ className, onValueChange }: DistillerySelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewDistilleryDialog, setShowNewDistilleryDialog] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<DistilleryType>();

  const {
    data: distilleries,
    isLoading,
    isError,
    error,
  } = useQuery(
    "distilleries",
    () => api("distilleries"),
    {
      select: (data) => {
        const grouped = data.reduce((acc, dist) => {
    
          const draft = acc.find((group) => group.region === dist.region);
      
          if (draft)
            draft.distilleries.push(dist);
          else
            acc.push({ region: dist.region, distilleries: [dist] });
      
          
          return acc;
        }, [] as GroupedDistilleries[]);

        return grouped;
      },
    }
  );

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
            {selectedItem?.name || ""}
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
                {distilleries?.map((group) => (
                  <CommandGroup key={group.region} heading={group.region}>
                    {group.distilleries.map((distillery) => (
                      <CommandItem
                        key={distillery.id}
                        onSelect={() => {
                          setSelectedItem(distillery);
                          onValueChange?.(distillery.id);
                          setOpen(false);
                        }}
                        className="text-sm"
                      >
                        {distillery.name}
                        <CheckIcon
                          className={cn(
                            "ml-auto size-4",
                            selectedItem?.id === distillery.id
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
