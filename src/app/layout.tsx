import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/header";

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
            <Header />

            <main className="container mx-auto px-4 max-w-6xl">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
