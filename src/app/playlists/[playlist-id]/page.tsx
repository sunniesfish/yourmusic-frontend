// export const revalidate = 3600;

import { GetPlaylistDocument, useGetPlaylistQuery } from "@/graphql/hooks";
import NotFound from "@/app/not-found";
import ApolloProvider from "@/providers/apollo-provider";
import { sanitizeData } from "@/lib/sanitize-data";
import { SongTable } from "../_components/song-table";
import PlaylistDetail from "./_components/playlist";
import { useParams } from "next/navigation";
import { GetPlaylistQuery } from "@/graphql/operations";
import { getClient } from "@/lib/apollo-client";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function PlaylistDetailPage(props: any) {
  // const params = useParams<{ "playlist-id": string }>();
  // const playlistId = params["playlist-id"];
  // const { data, error } = useGetPlaylistQuery({
  //   variables: { id: parseInt(playlistId) },
  // });
  const playlistId = props.params["playlist-id"];
  const client = getClient();
  const { data, error } = await client.query<GetPlaylistQuery>({
    query: GetPlaylistDocument,
    variables: { id: parseInt(playlistId) },
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
          playlistName={data?.playlist.name || ""}
        />
      </ApolloProvider>
      <SongTable songs={sanitizedData || []} />
    </>
  );
}
