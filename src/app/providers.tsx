"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@/providers/userProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="event-station"
          themes={["event-station", "alienware"]}
        >
          <UserProvider>{children}</UserProvider>
          <ToastContainer />
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
