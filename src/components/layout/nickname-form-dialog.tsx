"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useFormContext } from "react-hook-form";

import { changeNicknameAction, NicknameActionSchemaType } from "@/components/layout/nickname-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormAction } from "@/hooks/useFormAction";
import { useMounted } from "@/hooks/useMounted";

export default function NicknameFormDialog({ open }: { open: boolean }) {
  const [state, formAction] = useFormState(changeNicknameAction, {});
  const mounted = useMounted();
  const form = useFormAction<NicknameActionSchemaType>({
    state,
    defaultValues: {
      nickname: "",
    },
  });

  if (!mounted) return null;

  return (
    <Dialog open={open}>
      <DialogContent>
        <Form {...form}>
          <form action={formAction}>
            <NicknameFormFields />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function NicknameFormFields() {
  const form = useFormContext();
  const { pending } = useFormStatus();

  return (
    <>
      <DialogHeader className="mb-4">
        <DialogTitle>닉네임 설정</DialogTitle>
        <DialogDescription>술뷰에서 사용하실 닉네임을 입력해주세요.</DialogDescription>
      </DialogHeader>
      <FormField
        name="nickname"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>닉네임</FormLabel>
            <FormControl>
              <Input {...field} className="text-xl font-semibold" placeholder="닉네임을 입력해주세요" />
            </FormControl>
          </FormItem>
        )}
      />
      <DialogFooter className="mt-4">
        <Button type="submit" isLoading={pending}>
          저장
        </Button>
      </DialogFooter>
    </>
  );
}
