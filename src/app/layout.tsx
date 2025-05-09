import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "YOUR MUSIC",
  description: "Convert your playlist to other platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
