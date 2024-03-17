"use client";

import {
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Chip,
  CircularProgress,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { signOut, signInWithGoogle } from "@/actions";
import { StarIcon } from "@/icons/StarIcon";
import { useUser } from "@/providers/userProvider";

export default function HeaderAuth() {
  const session = useSession();
  const { user } = useUser();

  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
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
            <Avatar src={session.data.user.image || ""} />
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4">
              <form action={signOut}>
                <Button type="submit" color="danger">
                  Sign Out
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </>
    );
  } else {
    authContent = (
      <NavbarItem>
        <form action={signInWithGoogle}>
          <Button type="submit" variant="bordered">
            Sign in
          </Button>
        </form>
      </NavbarItem>
    );
  }

  return authContent;
}
