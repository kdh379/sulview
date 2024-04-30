import { redirect } from "next/navigation";
import { Session } from "next-auth";

import { auth } from "@/auth";

export async function getCurrentUser() {
  const session = await auth();

  return session?.user;
}

export async function getCurrentSessionRedirect(): Promise<Session> {
  const session = await auth();

  if(!session?.user)
    return redirect("/login");

  return session;
}