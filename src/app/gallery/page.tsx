import { auth } from "@/auth";
import DownloadButton from "@/components/gallery/DownloadAllButton";
import ListImages from "@/components/gallery/ListImages";
import { fetchImagesByUserId } from "@/db/queries/generatedImages";
import { fetchUserByEmail } from "@/db/queries/users";
import { Button } from "@nextui-org/react";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  // // redirect to '/' if not authenticated
  if (!session || !session.user || !session.user.email) {
    redirect("/");
  }

  // fetch user by email
  const user = await fetchUserByEmail(session.user.email);
  if (!user) redirect("/");

  return (
    <div className="mb-6">
      <div className="flex flex-col justify-center items-center mt-8 gap-x-4 mb-11">
        <h2 className="font-bold mb-4 text-white">Eventname</h2>
        {/* <DownloadButton userId={user.id} /> */}
      </div>

      <ListImages fetchData={() => fetchImagesByUserId(user.id)} />

      {/* todo implement pagination logic when clicking the load more to get another batch of images */}
      <div className="flex justify-center mt-6">
        <Button variant="bordered" className="border-secondary border-2 p-2.5">
          Load More Images
        </Button>
      </div>
    </div>
  );
}
