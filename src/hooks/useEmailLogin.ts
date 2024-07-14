import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

interface EmailLoginProps {
  email: string;
}

export function useEmailLogin () {
  return useMutation({
    mutationFn: (data: EmailLoginProps) =>
      signIn("nodemailer", {
        email: data.email,
        redirect: false,
      }),
  });
}