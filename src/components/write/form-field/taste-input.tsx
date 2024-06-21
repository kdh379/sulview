"use client";

import { Minus, Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface FieldSetProps {
  name: string;
  legend: string;
}

function FieldSet({ name, legend }: FieldSetProps) {
  const form = useFormContext();
  const { error } = useFormField();

  return (
    <li>
      <fieldset>
        <legend
          className={cn(
            "text-sm font-medium leading-none",
            error && "text-destructive"
          )}
        >
          {legend}
        </legend>
        <FormField
          name={`${name}Score`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="-mt-8 ml-8 flex items-center">
              <FormLabel className="sr-only">{name} 점수</FormLabel>
              <div className="ml-8 flex gap-x-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => {
                    const { value } = field;
                    form.setValue(`${name}Score`, value > 0 ? value - 1 : 0);
                  }}
                >
                  <Minus className="size-4" />
                </Button>
                <FormControl>
                  <Input
                    {...field}
                    className="w-12 text-center"
                    value={field.value ?? ""}
                    onFocus={(e) => e.target.select()}
                  />
                </FormControl>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => {
                    const { value } = field;
                    form.setValue(`${name}Score`, value < 100 ? value + 1 : 100);
                  }}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </FormItem>
          )}
        />
        <FormField
          name={name}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="sr-only">{legend}</span>
              </FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-[90px]" placeholder="과일, 견과류, 다크초콜릿, 오크" />
              </FormControl>
            </FormItem>
          )}
        />
      </fieldset>
    </li>
  );
}

function TasteInput({ className }: { className?: string }) {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="score"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl font-bold" required>
              RATING
              <span className="ml-2 text-2xl font-bold">{field.value}</span>
            </FormLabel>
            <FormControl>
              <Slider
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => form.setValue("score", value[0])}
                name={field.name}
                defaultValue={[field.value ?? 0]}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <ul className={cn("mt-4 space-y-6", className)}>
        <FieldSet name="nose" legend="Nose" />
        <FieldSet name="palate" legend="Palate" />
        <FieldSet name="finish" legend="Finish" />
      </ul>
      <FormField
        control={form.control}
        name="review"
        render={({ field }) => (
          <FormItem>
            <FormLabel required>리뷰</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                className="min-h-24"
                placeholder="적극 추천하는 위스키. 재구매 의사 있음."
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}

export { TasteInput };