import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SSN IT",
  description: "IT GRADES",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster /></body>
    </html>
  );
}
