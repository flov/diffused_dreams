export const revalidate = 3;

import CaptureAndGenerate from "@/components/webcam/CaptureAndGenerate";

export default async function Home() {
  return <CaptureAndGenerate />;
}
