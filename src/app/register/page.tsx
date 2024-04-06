import { auth } from "@/auth";
import { RegisterForm } from "@/components/auth/RegisterForm";
import ThemedLogo from "@/components/navigation/ThemedLogo";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center gap-y-6 ">
      <ThemedLogo />
      <h4 className="text-white text-xl">
        Transform each event into a unique visual story with customized AI.
      </h4>

      <h3 className="text-white text-4xl mt-10">Register</h3>

      <RegisterForm />
    </div>
  );
}
