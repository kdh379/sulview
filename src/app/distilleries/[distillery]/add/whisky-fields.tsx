import { CirclePlus, Minus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export default function WhiskyFields() {

  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "caskTypes",
    control: form.control,
  });

  return (
    <div className="space-y-4">
      <FormField
        name="name"
        control={form.control}
        render={({field}) => (
          <FormItem className="flex-1">
            <FormLabel required>위스키</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="text-xl font-semibold"
                placeholder="와일드 터키"
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
              <FormLabel required>병입</FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="distillery" />
                  </FormControl>
                  <FormLabel 
                    className="font-normal"
                    message={false}
                  >
                    증류소 병입
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="independent" />
                  </FormControl>
                  <FormLabel 
                    className="font-normal"
                    message={false}
                  >
                    독립 병입
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )
        }
      />
      {form.watch("bottler") === "independent" && (
        <FormField
          name="independentDistillery"
          control={form.control}
          render={
            ({field}) => (
              <FormItem>
                <FormLabel>증류소</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="글렌알라키" />
                </FormControl>
              </FormItem>
            )
          }
        />
      )}
      <FormField
        name="abv"
        control={form.control}
        render={
          ({field}) => (
            <FormItem>
              <FormLabel required>ABV</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="46%"
                />
              </FormControl>
            </FormItem>
          )
        }
      />
      <FormField
        control={form.control}
        name="aged"
        render={
          ({field}) => (
            <FormItem>
              <FormLabel>Aged</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  placeholder="12Y"
                />
              </FormControl>
            </FormItem>
          )
        }
      />
      <div>
        {fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`caskTypes.${index}.value`}
            render={
              ({field}) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    케스크 타입
                  </FormLabel>
                  <div className="flex">
                    <FormControl>
                      <Input 
                        {...field}
                        placeholder="PX 셰리"
                        value={field.value ?? ""}
                      />
                    </FormControl>
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
                <Input 
                  {...field}
                  placeholder="900818"
                />
              </FormControl>
            </FormItem>
          )
        }
      />
      <FormField
        name="bottled"
        control={form.control}
        render={
          ({field}) => (
            <FormItem>
              <FormLabel>병입일</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  placeholder="2024"
                />
              </FormControl>
            </FormItem>
          )
        }
      />
    </div>
  );
}