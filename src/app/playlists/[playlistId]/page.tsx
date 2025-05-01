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
  return [{ playlistId: "1" }];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function PlaylistDetailPage({
  params,
}: {
  params: Promise<{ playlistId: string }>;
}) {
  const { playlistId } = await params;

  const numericPlaylistId = parseInt(playlistId);
  if (isNaN(numericPlaylistId)) {
    console.error(
      `[ISR Error] Invalid playlistId received: ${playlistId}. Rendering notFound.`
    );
    notFound();
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

  if (error) {
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
