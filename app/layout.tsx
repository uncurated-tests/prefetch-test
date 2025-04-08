import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Data Fetching Demo",
  description: "Demonstrating different data fetching patterns in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-row">
            <main className="flex-1 max-w-4xl mx-auto w-full p-4">
              {children}
            </main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
