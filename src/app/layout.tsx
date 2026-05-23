import { AppQueryClientProvider } from "@/components/providers/AppQueryClientProvider";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { HOME_META_DATA } from "@/utils/metaData";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = HOME_META_DATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-inter">
        <StoreProvider>
          <AppQueryClientProvider>{children}</AppQueryClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
