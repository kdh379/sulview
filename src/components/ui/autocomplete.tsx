import { Command as CommandPrimitive } from "cmdk";
import { Check } from "lucide-react";
import { type KeyboardEvent, useCallback, useRef, useState } from "react";
import * as React from "react";

import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type Item = Record<"value" | "label", string> & Record<string, string>

interface AutoCompleteProps extends React.ComponentProps<typeof CommandPrimitive.Input>{
  itemList: Item[]
  
  value?: string;
  emptyMessage?: string
  onValueChange?: (value: string) => void
  isLoading?: boolean
  allowDirectInput?: boolean
}

export const AutoComplete = ({
  itemList,
  emptyMessage = "",
  value = "",
  onValueChange,
  isLoading = false,
  allowDirectInput = false,
  className,
  ...restProps
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const [inputValue, setInputValue] = useState(value);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;

      if (!isOpen) setOpen(true);

      if (event.key === "Enter" && input.value !== "") {
        const selectedItem = itemList.find(
          (option) => option.label === input.value
        );
        if (selectedItem) {
          setSelected(selectedItem.value);
          onValueChange?.(selectedItem.value);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, itemList, onValueChange]
  );

  const handleBlur = useCallback(() => {
    const value = inputRef.current?.value || "";
    setOpen(false);
    if(allowDirectInput) {
      setInputValue(value);
      onValueChange?.(value);
    } else {
      setInputValue(selected);
      onValueChange?.(selected);
    }
  }, [selected, allowDirectInput, onValueChange]);

  const handleSelectOption = useCallback(
    (selectedOption: Item) => {
      setInputValue(selectedOption.value);

      setSelected(selectedOption.value);
      onValueChange?.(selectedOption.value);

      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange]
  );

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <CommandPrimitive.Input
        ref={inputRef}
        value={inputValue}
        onValueChange={isLoading ? undefined : setInputValue}
        onBlur={handleBlur}
        onFocus={() => setOpen(true)}
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...restProps}
      />
      <div className="relative mt-1">
        {isOpen && (
          <div className="animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-stone-50 outline-none">
            <CommandList className="rounded-lg ring-1 ring-slate-200">
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {itemList.length > 0 && !isLoading && (
                <ScrollArea className="h-[200px]">
                  <CommandGroup>
                    {itemList.map((option) => {
                      const isSelected = selected === inputValue && inputValue === option.value;
                      return (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                          onSelect={() => handleSelectOption(option)}
                        >
                          {option.label}
                          <Check className={cn(
                            "invisible ml-auto w-4",
                            isSelected && "visible"
                          )} />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </ScrollArea>
              )}
              {!isLoading && <CommandEmpty>{emptyMessage}</CommandEmpty>}
            </CommandList>
          </div>
        )}
      </div>
    </CommandPrimitive>
  );
};