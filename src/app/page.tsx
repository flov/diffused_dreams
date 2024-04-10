export const revalidate = 3;

import { auth } from "@/auth";
import { ThemedLogo } from "@/components/navigation/ThemedLogo";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div
      style={{ height: "calc(100vh - 200px)" }}
      className="flex items-center flex-col justify-center"
    >
      <ThemedLogo width={500} height={300} />
      <h5 className="mt-4 uppercase">
        Transform each event into a unique visual story with customized ai.
      </h5>
      {session && session.user && session.user.email && (
        <div className="mt-14 flex flex-col justify-center items-center w-full">
          <Button
            as={Link}
            href="/gallery"
            variant="bordered"
            className="rounded border-2 border-secondary py-2.5 px-24 text-base text-white"
          >
            Gallery
          </Button>
          <Button
            as={Link}
            href="/eventstation"
            variant="bordered"
            className="rounded border-2 border-secondary py-2.5 px-24 text-base text-white"
          >
            Start Photoboothloop
          </Button>
        </div>
      )}
    </div>
  );
}
