export const revalidate = 3;

import { Suspense } from "react";
import { Wizard } from "@/components/wizard/Wizard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Eventstation() {
  const session = await auth();

  // redirect to '/' if not authenticated
  if (!session) {
    redirect("/");
  }

  return (
    <Suspense>
      <Wizard initialStep="SelectCameraAndFilter" />
    </Suspense>
  );
}
