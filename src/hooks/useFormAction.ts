import { useEffect } from "react";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";

import { handleApiError, hasError } from "@/lib/api";

type UseFormActionProps<TFieldValues extends FieldValues = FieldValues, TContext = any> = UseFormProps<TFieldValues, TContext> & {
  state?: ActionError | unknown;
}

export function useFormAction<TFieldValues extends FieldValues = FieldValues, TContext = any>({
  state,
  ...props
}: UseFormActionProps<TFieldValues, TContext>) {
  const form = useForm({
    ...props,
  });

  useEffect(() => {
    form.clearErrors();
    if (hasError(state) && state.error) {
      handleApiError(state, form);
    }
    else
      form.reset();
  }, [state, form]);
	
  return {
    ...form,
  };
}
