"use client";

import {
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Chip,
  Link,
  CircularProgress,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { signOut } from "@/actions";
import { StarIcon } from "@/icons/StarIcon";
import { useUser } from "@/providers/userProvider";

export default function HeaderAuth() {
  const session = useSession();
  const { user } = useUser();
  const isLoggedIn = user !== null;

  let authContent: React.ReactNode;

  if (isLoggedIn) {
    authContent = (
      <>
        {user && (
          <Chip
            startContent={<StarIcon size={18} />}
            variant="faded"
            size="lg"
            color="primary"
          >
            {user.tokens}
          </Chip>
        )}

        <Popover placement="bottom" color="default">
          <PopoverTrigger>
            <Avatar src={user.image || ""} />
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4 flex flex-col gap-2">
              <form action={signOut}>
                <Button type="submit" color="danger">
                  Sign Out
                </Button>
              </form>
              <Link href="/gallery">Gallery</Link>
              <Link href="/eventstation">Generate image</Link>
            </div>
          </PopoverContent>
        </Popover>
      </>
    );
  } else if (session.status === "loading") {
    return null;
  } else {
    authContent = (
      <NavbarItem>
        <Button as={Link} href="/login" type="submit" variant="bordered">
          Sign in
        </Button>
      </NavbarItem>
    );
  }

  return authContent;
}
