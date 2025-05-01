export const revalidate = 4000;

import { GetPlaylistDocument } from "@/graphql/hooks";
import NotFound from "@/app/not-found";
import ApolloProvider from "@/providers/apollo-provider";
import { sanitizeData } from "@/lib/sanitize-data";
import { SongTable } from "../_components/song-table";
import PlaylistDetail from "./_components/playlist";
import { getClient } from "@/lib/apollo-client";
import { GetPlaylistQuery } from "@/graphql/operations";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [{ "playlist-id": "1" }];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function PlaylistDetailPage({
  params,
}: {
  params: Promise<{ "playlist-id": string }>;
}) {
  const { "playlist-id": playlistId } = await params;

  // Validate playlistId
  const numericPlaylistId = parseInt(playlistId);
  if (isNaN(numericPlaylistId)) {
    console.error(
      `[ISR Error] Invalid playlistId received: ${playlistId}. Rendering notFound.`
    );
    notFound(); // Return notFound if ID is not a number
  }

  const client = getClient();
  const { data, error } = await client.query<GetPlaylistQuery>({
    query: GetPlaylistDocument,
    variables: { id: numericPlaylistId },
    context: {
      fetchOptions: {
        next: {
          revalidate: 4000,
        },
      },
    },
  });
  const sanitizedData = sanitizeData(data?.playlist.listJson);

  // Add logging for ISR debugging
  console.log(`[ISR Build/Revalidate] playlistId: ${playlistId}`);
  console.log("[ISR Build/Revalidate] Error:", JSON.stringify(error, null, 2));
  console.log("[ISR Build/Revalidate] Data Exists:", !!data);
  console.log(
    "[ISR Build/Revalidate] Sanitized Data Length:",
    sanitizedData?.length ?? 0
  );

  if (error) {
    console.error("[ISR Build/Revalidate] Rendering NotFound due to error.");
    return <NotFound />;
  }

  return (
    <>
      <ApolloProvider>
        <PlaylistDetail
          playlistId={playlistId}
          userId={data?.playlist.userId}
          playlistData={sanitizedData || []}
          playlistName={data?.playlist.name}
        />
      </ApolloProvider>
      <SongTable songs={sanitizedData || []} />
    </>
  );
}
