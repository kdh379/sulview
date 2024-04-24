
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { addDistillery } from "@/actions/distilleryActions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { customErrorMap } from "@/lib/zod";

const formSchema = z.object({
  name: z.string().min(1),
  region: z.string().min(1),
});
z.setErrorMap(customErrorMap);

export type DistilleryFormValues = z.infer<typeof formSchema>;

const INIT_VALUES: DistilleryFormValues = {
  name: "",
  region: "",
};

export default function DistilleryForm({ handleOnAction }: { handleOnAction: () => void }) {

  const form = useForm<DistilleryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: INIT_VALUES,
  });
  const onSubmit = async(data: z.infer<typeof formSchema>) => {
    const result = await addDistillery(data);

    if("error" in result)
      return toast({
        title: result.error,
        duration: 5000,
        variant: "destructive",
      });
    else if(result.length > 0) {
      handleOnAction();
      toast({
        title: "증류소가 추가되었습니다.",
        duration: 5000,
      });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-lg font-semibold leading-none tracking-tight">증류소 추가</h1>
        <p className="text-muted-foreground mt-2 text-sm">
        추가할 증류소의 이름과 위치를 입력해주세요.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 pb-8">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    증류소
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="글렌알라키" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    지역
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="스코틀랜드" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div
            className="flex items-center justify-end gap-2"
          >
            <Button 
              variant="outline"
              onClick={handleOnAction}
              disabled={form.formState.isSubmitting}
            >
              취소
            </Button>
            <Button
              type="submit"
              isLoading={form.formState.isSubmitting}
            >
              추가
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}