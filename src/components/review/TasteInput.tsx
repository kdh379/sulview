import { Minus, Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FieldSetProps {
  name: string;
  legend: string;
};

function FieldSet({ name, legend }: FieldSetProps) {

  const form = useFormContext();
  const { error } = useFormField();

  return (
    <li>
      <fieldset>
        <legend className={cn(
          "text-sm font-medium leading-none",
          error && "text-destructive"
        )}
        >
          {legend}
        </legend>
        <FormField
          name={`${name}Score`}
          control={form.control}
          render={
            ({field}) => (
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
                    <Input className="w-12 text-center" {...field}/>
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
            )
          }
        />
        <FormField
          name={name}
          control={form.control}
          render={
            ({field}) => (
              <FormItem className="mt-2">
                <FormLabel>
                  <span className="sr-only">Nose</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-[90px]"
                    placeholder="과일, 견과류, 다크초콜릿, 오크"
                  />
                </FormControl>
              </FormItem>
            )
          }
        />
      </fieldset>
    </li>
  );
}

export default function TasteInput({className} : {className?: string}) {

  return (
    <ul className={cn("mb-4 space-y-8", className)}>
      <FieldSet name="nose" legend="Nose" />
      <FieldSet name="palate" legend="Palate" />
      <FieldSet name="finish" legend="Finish" />
    </ul>
  );
}