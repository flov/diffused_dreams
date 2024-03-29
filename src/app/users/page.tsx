import ListUsers from "@/components/users/ListUsers";
import { fetchUsers } from "@/db/queries/users";

export const revalidate = 3600; // revalidate at most every hour

export default function Users() {
  return (
    <>
      <h2>Users</h2>
      <div className="flex mt-4 gap-4">
        <ListUsers fetchData={fetchUsers} />
      </div>
    </>
  );
}
