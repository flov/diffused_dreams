import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";

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
            <main className="container mx-auto px-4 max-w-6xl w-full h-screen">
              <div className="flex justify-center">
                <Link href="/">
                  <Image
                    src="/alienware_logo.png"
                    width={200}
                    height={120}
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
