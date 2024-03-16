import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Suspense } from "react";
import Header from "@/components/navigation/Header";

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
          <Header />
          <main className="container mx-auto px-4 max-w-6xl w-full">
            {children}
          </main>
          <Suspense>
            <ThemeSwitcher />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
