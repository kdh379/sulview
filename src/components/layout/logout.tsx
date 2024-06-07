"use client";

import { signOutAction } from "@/components/layout/actions";

export function Logout() {
  return (
    <form action={signOutAction}>
      <LogoutButton />
    </form>
  );
}

function LogoutButton() {
  return <button type="submit">로그아웃</button>;
}
