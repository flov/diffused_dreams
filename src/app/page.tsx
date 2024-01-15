export const revalidate = 3;

import GenerateImageForm from "@/components/GenerateImageForm";

export default async function Home() {
  return (
    <div>
      <GenerateImageForm />
    </div>
  );
}
