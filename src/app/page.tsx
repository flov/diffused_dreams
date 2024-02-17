export const revalidate = 3;

import CaptureAndUpload from "@/components/webcam/CaptureAndUpload";

export default async function Home() {
  return <CaptureAndUpload />;
}
