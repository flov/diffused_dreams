import ThemedLogo from "@/components/navigation/ThemedLogo";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-y-6">
      <ThemedLogo />
      <h4 className="text-white text-xl text-center">
        Thank your for Registering <br />
        Please confirm your Email to get started
      </h4>
      <Button
        as={Link}
        href="/login"
        className="bg-white text-black text-base py-3 rounded w-64 font-medium"
      >
        LOGIN
      </Button>
    </div>
  );
}
