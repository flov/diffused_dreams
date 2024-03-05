"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="event-station"
          themes={["event-station", "alienware"]}
        >
          {children}
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
