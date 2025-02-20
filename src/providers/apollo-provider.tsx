"use client";

import { getClient } from "@/lib/apollo-client";
import { ApolloProvider as Provider } from "@apollo/client";

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider client={getClient()}>{children}</Provider>;
}
