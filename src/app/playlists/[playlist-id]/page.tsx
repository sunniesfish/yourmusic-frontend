export const revalidate = 4000;
export const dynamic = "auto";

import { GetPlaylistDocument } from "@/graphql/hooks";
import NotFound from "@/app/not-found";
import ApolloProvider from "@/providers/apollo-provider";
import { sanitizeData } from "@/lib/sanitize-data";
import { SongTable } from "../_components/song-table";
import PlaylistDetail from "./_components/playlist";
import { getClient } from "@/lib/apollo-client";
import { GetPlaylistQuery } from "@/graphql/operations";

export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function PlaylistDetailPage(props: any) {
  const playlistId = props.params["playlist-id"];
  const client = getClient();
  const { data, error } = await client.query<GetPlaylistQuery>({
    query: GetPlaylistDocument,
    variables: { id: parseInt(playlistId) },
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
