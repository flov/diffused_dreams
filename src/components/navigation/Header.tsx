"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React, { useState } from "react";
import HeaderAuth from "./HeaderAuth";
import * as actions from "@/actions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ThemedLogo from "./ThemedLogo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useReducer(
    (current) => !current,
    false,
  );
  const session = useSession();

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="shadow mb-6"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">EventStation.ai</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/">
            <ThemedLogo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>

      <NavbarMenu>
        {session.status === "authenticated" && (
          <>
            <NavbarMenuItem>
              <form action={actions.signOut}>
                <Button type="submit" color="danger">
                  Sign Out
                </Button>
              </form>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link href="/alienware">Alienware</Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link href="/gallery">Gallery</Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
