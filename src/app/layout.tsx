import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "YOUR MUSIC",
  description: "Convert your playlist to other platforms",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
