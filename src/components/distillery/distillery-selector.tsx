"use client";

import {
  CaretSortIcon,
  PlusCircledIcon
} from "@radix-ui/react-icons";
import axios from "axios";
import { CheckIcon, RotateCw } from "lucide-react";
import * as React from "react";
import { useQuery } from "react-query";

import DistilleryForm from "@/components/distillery/distillery-form";
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
import { cn } from "@/lib/utils";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

type Distillery = typeof distillery.$inferSelect;

type GroupedDistilleries = {
  region: string;
  distilleries: Distillery[];
}

interface DistillerySelectorProps extends PopoverTriggerProps {
  onValueChange?: (value: number) => void
}

export default function DistillerySelector({ className, onValueChange }: DistillerySelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewDistilleryDialog, setShowNewDistilleryDialog] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<Distillery>();

  const {
    data: groups,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery("distilleries", () =>
    axios.
      get<Distillery[]>("/api/distillery")
      .then((res) => res.data),
  {
    select: (data) => {
      const grouped = data.reduce((acc, distillery) => {
        const region = distillery.region;
        const group = acc.find((g) => g.region === region);

        if (group) {
          group.distilleries.push(distillery);
        } else {
          acc.push({ region, distilleries: [distillery] });
        }

        return acc;
      }, [] as GroupedDistilleries[]);

      return grouped;
    },
  });
  

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
                { isLoading && (
                  <div className="space-y-1 py-2">
                    <CommandItem className="bg-muted h-10 animate-pulse" />
                    <CommandItem className="bg-muted h-10 animate-pulse" />
                    <CommandItem className="bg-muted h-10 animate-pulse" />
                    <CommandItem className="bg-muted h-10 animate-pulse" />
                  </div>
                )}
                {isSuccess && (
                  <CommandEmpty>
                    <p>찾으시는 증류소가 없나요?</p>
                    <p>아래 버튼을 클릭하여 증류소를 추가해주세요.</p>
                  </CommandEmpty>
                )}
                {isError && (
                  <div className="py-4">
                    <p className="text-center text-sm">알 수 없는 오류가 발생하였습니다.</p>
                    <p className="text-muted-foreground/75 text-center text-xs">잠시 후 다시 시도해주세요.</p>
                    <Button
                      variant="ghost"
                      className="mt-2 w-full"
                      isLoading={isLoading}
                      onClick={() => refetch()}
                    >
                      <RotateCw className="mr-2 size-4" />
                      새로고침
                    </Button>
                  </div>
                )}
                {groups?.map((group) => (
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
                            selectedItem === distillery
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
                onClick={() => {
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
          handleOnAction={() => {
            setShowNewDistilleryDialog(false);
            refetch();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
