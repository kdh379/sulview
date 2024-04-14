"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
  const {
    mutate: login,
    isLoading,
    isSuccess,
  } = useMutation("login", (
    values: z.infer<typeof formSchema>
  ) => signIn("nodemailer", {
    email: values.email,
    redirect: false,
  }));

  function onSubmit(values: z.infer<typeof formSchema>) {
    return login(values);
  }

  if (isSuccess) {
    return (
      <>
        <p className="text-2xl font-bold">
          이메일을 확인해주세요 <Icons.emailAdd className="mb-2 ml-2 inline-block" />
        </p>
        <p>로그인 링크를 메일로 전송하였습니다.</p>
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
                  autoFocus
                  disabled={isLoading}
                  placeholder="sulview@naver.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
        >
          이메일로 로그인
        </Button>
      </form>
    </Form>
  );
}
