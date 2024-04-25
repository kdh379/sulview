import { CirclePlus, Minus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import DistillerySelector from "@/components/distillery/distillery-selector";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function WhiskyInputField() {

  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "caskType",
    control: form.control,
  });

  return (
    <div className="space-y-2">
      <FormField
        name="score"
        control={form.control}
        render={
          ({field}) => (
            <FormItem>
              <FormLabel>평점</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 items-center gap-x-2 text-lg">
                  <Input
                    type="number"
                    {...field}
                    className="text-lg"
                  />
                / 100
                </div>
              </FormControl>
            </FormItem>
          )
        }
      />
      <FormField
        name="distillery"
        control={form.control}
        render={() => (
          <FormItem>
            <FormLabel>증류소</FormLabel>
            <FormMessage />
            <FormControl>
              <DistillerySelector
                className="w-full"
                onValueChange={(value) => form.setValue("distillery", value)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="bottler"
        control={form.control}
        render={
          ({field}) => (
            <FormItem>
              <FormLabel>병입</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
            </FormItem>
          )
        }
      />
      <FormField
        control={form.control}
        name="age"
        render={
          ({field}) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
            </FormItem>
          )
        }
      />
      <FormField
        name="abv"
        control={form.control}
        render={
          ({field}) => (
            <FormItem>
              <FormLabel>도수</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
            </FormItem>
          )
        }
      />
      <div>
        {fields.map((fields, index) => (
          <FormField
            control={form.control}
            key={fields.id}
            name={`caskType.${index}.value`}
            render={
              ({field}) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>케스크 타입</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input {...field}/>
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          "ml-2",
                          index === 0 && "hidden"
                        )}
                        onClick={() => remove(index)}
                      >
                        <Minus className="size-3"/>
                        <span className="sr-only">케스크 타입 삭제</span>
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )
            }
          />
        ))}
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => append({value: ""})}
        >
          <CirclePlus className="mr-2 size-4"/>
          케스크 타입 추가
        </Button>
      </div>
      <FormField
        name="caskNumber"
        control={form.control}
        render={
          ({field}) => (
            <FormItem>
              <FormLabel>케스크 넘버</FormLabel>
              <FormMessage />
              <FormControl>
                <Input {...field}/>
              </FormControl>
            </FormItem>
          )
        }
      />
    </div>
  );
}