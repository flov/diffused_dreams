export const revalidate = 3;

import { Suspense } from "react";
import { Wizard } from "@/components/wizard/Wizard";

export default async function Home() {
  return (
    <Suspense>
      <Wizard />
    </Suspense>
  );
}
