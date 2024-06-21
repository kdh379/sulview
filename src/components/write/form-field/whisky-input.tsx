"use client";

import { CirclePlus, Minus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

function WhiskyInput() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "caskTypes",
  });

  return (
    <>
      <FormField
        name="whiskyName"
        control={form.control}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel required>위스키</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="text-xl font-semibold"
                placeholder="와일드 터키 12년"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-x-4">
        <FormField
          name="abv"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ABV</FormLabel>
              <FormControl>
                <Input {...field} placeholder="46%" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aged"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aged</FormLabel>
              <FormControl>
                <Input {...field} placeholder="12Y" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`caskTypes.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(index !== 0 && "sr-only")}>케스크 타입</FormLabel>
                <div className="flex">
                  <FormControl>
                    <Input {...field} placeholder="PX 셰리" value={field.value ?? ""} />
                  </FormControl>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn("ml-2", index === 0 && "hidden")}
                    onClick={() => remove(index)}
                  >
                    <Minus className="size-3" />
                    <span className="sr-only">케스크 타입 삭제</span>
                  </Button>
                </div>
              </FormItem>
            )}
          />
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => append({ value: "" })}
        >
          <CirclePlus className="mr-2 size-4" />
          케스크 타입 추가
        </Button>
      </div>
    </>
  );
}

export default WhiskyInput;