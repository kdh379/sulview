
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { distilleryFormSchema, DistilleryFormValues } from "@/components/distillery/distillery-form-schema";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { handleApiError } from "@/lib/api";

export default function DistilleryForm({ handleOnAction }: { handleOnAction: () => void }) {

  const form = useForm<DistilleryFormValues>({
    resolver: zodResolver(distilleryFormSchema),    
    defaultValues: {
      name: "",
      region: "",
    },
  });

  const {
    isLoading,
    mutate: handleAddDistillery,
  } = useMutation(
    (data: DistilleryFormValues) => axios.post("/api/distillery", data),
    {
      onSuccess: () => {
        form.reset();
        toast({
          title: "증류소가 추가되었습니다.",
          duration: 3000,
        });
        handleOnAction();
      },
      onError: (err: AxiosError<ActionError>) => {
        if(err.response?.data)
          handleApiError(err.response.data, form);
      },
    }
  );

  const onSubmit = (data: DistilleryFormValues) => {
    handleAddDistillery(data);
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
                  <FormLabel className="flex justify-between">
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
                  <FormLabel className="flex justify-between">
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
            <DialogClose asChild>
              <Button
                variant="outline"
                disabled={isLoading}
              >
                취소
              </Button>
            </DialogClose>
            <Button
              type="submit"
              isLoading={isLoading}
            >
              추가
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}