export const revalidate = 3;

import { Suspense } from "react";
import { Wizard } from "@/components/wizard/Wizard";

export default async function Alienware() {
  return (
    <Suspense>
      <Wizard initialStep="SelectCameraOrFile" />
    </Suspense>
  );
}
