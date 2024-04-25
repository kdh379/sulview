import { FieldValues, UseFormReturn } from "react-hook-form";

import { toast } from "@/components/ui/use-toast";

export const hasError = (state: ActionError | unknown): state is ActionError => {

  if(!state || typeof state !== "object") return false;

  return "error" in state;
};

export const handleApiError = <TFieldValues extends FieldValues>(err: ActionError, form: UseFormReturn<TFieldValues>) => {

  const { error } = err;

  if(!error) return console.error(err);

  switch (error.code) {
  case "INTERNAL_ERROR":
    toast({
      title: "알 수 없는 오류가 발생했습니다.",
      description: "잠시 후 다시 시도해주세요.",
      variant: "destructive",
      duration: 5000,
    });
    form.setError("root", { message: error.message, type: error.code });
    break;
  case "EXISTS_ERROR":
    form.setError(error.key as any, { message: error.message });
    break;
  case "AUTH_ERROR":
    toast({
      title: "인증 오류",
      description: error.message,
      variant: "destructive",
      duration: 5000,
    });
    break;
  case "VALIDATION_ERROR":
    const { fieldErrors } = error;
    Object.keys(fieldErrors).forEach((key) => {
      form.setError(key as any, { message: fieldErrors[key].flat().join(" ") });
    });
    break;
  }
};
