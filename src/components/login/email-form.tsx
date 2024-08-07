"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEmailLogin } from "@/hooks/useEmailLogin";

import { Icons } from "../ui/icons";

const formSchema = z.object({
  email: z.string().email(),
});

export default function EmailForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const { mutate: login, isPending, isSuccess } = useEmailLogin();

  const onSubmit = () => {
    login(form.getValues());
  };

  if (isSuccess) {
    return (
      <>
        <p className="text-2xl font-bold">
          로그인 메일을 전송하였습니다. <Icons.emailAdd className="mb-2 ml-2 inline-block" />
        </p>
        <p>메일함을 확인해주세요.</p>
      </>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일 주소</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  disabled={isPending}
                  placeholder="sulview@naver.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" isLoading={isPending}>
          이메일로 시작하기
        </Button>
      </form>
    </Form>
  );
}
