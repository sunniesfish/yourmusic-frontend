import type { Metadata } from "next";
import "./globals.css";
import ApolloProvider from "@/providers/apollo-provider";
import { client } from "@/lib/apollo-client";
import { GET_USER } from "@/graphql/queries/user";
import { User } from "@/graphql/types/generated";

export const metadata: Metadata = {
  title: "YOUR MUSIC",
  description: "Convert your playlist to other platforms",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = localStorage.getItem("token");
  let data;
  if (token) {
    data = await client.query<User | null>({ query: GET_USER });
  }
  return (
    <html lang="en">
      <body>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}
