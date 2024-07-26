import { FieldValues, UseFormReturn } from "react-hook-form";
import axios from "axios";

import { toast } from "@/components/ui/use-toast";

const api = (function () {
  const instance = axios.create({
    baseURL: typeof window === "undefined" ? process.env.NEXT_PUBLIC_API_URL : "",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return instance;
})();

export default api;

export const hasError = (state: ActionError | unknown): state is ActionError => {
  if (!state || typeof state !== "object") return false;

  return "error" in state;
};

export const handleApiError = <TFieldValues extends FieldValues>(
  err: ActionError,
  form?: UseFormReturn<TFieldValues>,
) => {
  const { error } = err;

  if (!error) return console.error(err);

  switch (error.code) {
  case "INTERNAL_ERROR":
    toast({
      title: "알 수 없는 오류가 발생했습니다.",
      description: "잠시 후 다시 시도해주세요.",
      variant: "destructive",
      duration: 5000,
    });
    form && form.setError("root", { message: error.message, type: error.code });
    break;
  case "EXISTS_ERROR":
    form && form.setError(`root.${error.key}`, { message: error.message });
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
    form &&
        Object.keys(fieldErrors).forEach((key) => {
          form.setError(`root.${key}`, { message: fieldErrors[key].flat().join(" ") });
        });
    break;
  }
};
