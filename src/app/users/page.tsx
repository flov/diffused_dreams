import ListUsers from "@/components/users/ListUsers";
import { fetchUsers } from "@/db/queries/user";

export default function Users() {
  return (
    <>
      <h1>Users</h1>
      <div className="grid grid-cols-4 gap-4 py-4">
        <div className="col-span-3">
          <ListUsers fetchData={fetchUsers} />
        </div>
      </div>
    </>
  );
}
