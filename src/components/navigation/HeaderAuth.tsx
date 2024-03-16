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
import { signOut, signIn } from "@/actions";
import { StarIcon } from "@/icons/StarIcon";
import { useUser } from "@/providers/userProvider";

export default function HeaderAuth() {
  const { data: session, status } = useSession();
  const { user } = useUser();

  return (
    <>
      {status === "loading" ? (
        <NavbarItem>
          <CircularProgress color="primary" />
        </NavbarItem>
      ) : session?.user ? (
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
              <Avatar src={session.user.image || ""} alt="User Avatar" />
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-4">
                <form onSubmit={signOut}>
                  <Button type="submit" color="danger">
                    Sign Out
                  </Button>
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <NavbarItem>
          <form onSubmit={signIn}>
            <Button type="submit" variant="bordered">
              Sign in with Github
            </Button>
          </form>
        </NavbarItem>
      )}
    </>
  );
}
