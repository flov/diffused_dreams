import { auth } from "@/auth";
import LoginForm from "@/components/auth/LoginForm";
import ThemedLogo from "@/components/navigation/ThemedLogo";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center gap-y-6 justify-center">
      <ThemedLogo />

      <h4 className="text-white text-xl ">
        Transform each event into a unique visual story with customized AI.
      </h4>

      <h3 className="text-white text-4xl mt-6">LOGIN</h3>
      <LoginForm />
    </div>
  );
}
