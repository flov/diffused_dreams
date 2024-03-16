export const revalidate = 3;

import { Button } from "@nextui-org/react";
import { signIn } from "@/actions";
import { ThemedLogo } from "@/components/navigation/ThemedLogo";

export default async function Home() {
  return (
    <div
      style={{ height: "calc(100vh - 200px)" }}
      className="flex items-center flex-col justify-center"
    >
      <ThemedLogo width={500} height={300} />
      <h5 className="mt-4 uppercase">
        Transform each event into a unique visual story with customized ai.
      </h5>

      <form className="my-4" action={signIn}>
        <Button type="submit" color="primary" variant="bordered">
          Sign in with Github
        </Button>
      </form>
    </div>
  );
}
