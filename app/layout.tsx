import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tool",
  description: "Testing drag & drop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-green-200 text-black p-2">
          <Link href="/" className="text-xl font-bold">
            Tool editor
          </Link>
          <main className="flex flex-col px-8 pt-2">{children}</main>
        </div>
      </body>
    </html>
  );
}
