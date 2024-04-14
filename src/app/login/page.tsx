import { redirect } from "next/navigation";

import LoginPage from "@/components/pages/LoginPage";
import { getCurrentUser } from "@/lib/session";

const Login = async () => {
  const user = await getCurrentUser();

  if (user)
    redirect("/");

  return <LoginPage />;
};

export default Login;