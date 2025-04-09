"use client";

import { Playlists } from "./_components/playlists";
import ApolloProvider from "@/providers/apollo-provider";
export default function PlaylistsPage() {
  return (
    <ApolloProvider>
      <Playlists />
    </ApolloProvider>
  );
}
