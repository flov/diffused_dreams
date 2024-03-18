import { User } from "@nextui-org/react";
import type { User as UserType } from "@prisma/client";

interface UserListProps {
  fetchData: () => Promise<UserType[]>;
}

export default async function PostList({ fetchData }: UserListProps) {
  const users = await fetchData();

  const renderedUsers = users.map((user) => {
    return (
      <User
        key={user.id}
        name={user.name}
        description={`${user.tokens} tokens`}
        avatarProps={{
          src: user.image || "",
        }}
      />
    );
  });

  return renderedUsers;
}
