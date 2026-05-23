import { AppQueryClientProvider } from "@/components/providers/AppQueryClientProvider";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { HOME_META_DATA } from "@/utils/metaData";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = HOME_META_DATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-inter">
        <StoreProvider>
          <AppQueryClientProvider>{children}</AppQueryClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
