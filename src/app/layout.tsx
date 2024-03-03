import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/header";
import Link from "next/link";
import Image from "next/image";

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
    <html lang="en" className="purple-dark text-foreground bg-background">
      <body>
        <Providers>
          <div>
            <main className="container mx-auto px-4 max-w-6xl w-full min-h-screen">
              <div className="flex py-8 justify-center">
                <Link href="/">
                  <Image
                    src="/event-logo.svg"
                    width={400}
                    height={200}
                    alt="logo"
                  />
                </Link>
              </div>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
