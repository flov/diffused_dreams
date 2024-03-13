import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import ThemedLogo from "@/components/ThemedLogo";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "EventStation",
  description: "The AI Photo Booth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark text-foreground bg-background">
      <body>
        <Providers>
          <div>
            <main className="container mx-auto px-4 max-w-6xl w-full min-h-screen">
              <div className="flex py-8 justify-center">
                <ThemedLogo />
              </div>
              {children}
            </main>
          </div>
          <Suspense>
            <ThemeSwitcher />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
