export const revalidate = 3;

import { Suspense } from "react";
import { Wizard } from "@/components/wizard/Wizard";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Alienware() {
  const session = await auth();

  // redirect to '/' if not authenticated
  if (!session) {
    redirect("/");
  }

  return (
    <Suspense>
      <Wizard initialStep="SelectCameraOrFile" />
    </Suspense>
  );
}
