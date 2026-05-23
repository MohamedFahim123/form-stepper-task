import { META_DATA } from "@/utils/metaData";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = META_DATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-inter">{children}</body>
    </html>
  );
}
