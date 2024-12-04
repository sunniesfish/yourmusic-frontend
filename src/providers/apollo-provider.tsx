"use client";

import { client } from "@/lib/apollo-client";
import { ApolloProvider as Provider } from "@apollo/client";

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider client={client}>{children}</Provider>;
}
