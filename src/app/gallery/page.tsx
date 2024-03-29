import { auth } from "@/auth";
import ListImages from "@/components/gallery/ListImages";
import { fetchImagesByUserId } from "@/db/queries/generatedImages";
import { fetchUserByEmail } from "@/db/queries/users";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  // redirect to '/' if not authenticated
  if (!session || !session.user || !session.user.email) {
    redirect("/");
  }

  // fetch user by email
  const user = await fetchUserByEmail(session.user.email);
  if (!user) redirect("/");

  return (
    <>
      <h2 className="font-bold mb-4">Gallery</h2>

      <ListImages fetchData={() => fetchImagesByUserId(user.id)} />
    </>
  );
}
