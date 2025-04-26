"use client";
// import { getClient } from "@/lib/apollo-client";
import PlaylistDetail from "./_components/playlist";
import { useGetPlaylistQuery } from "@/graphql/hooks";
// import { GetPlaylistQuery } from "@/graphql/operations";
import NotFound from "@/app/not-found";
// import ApolloProvider from "@/providers/apollo-provider";
import { sanitizeData } from "@/lib/sanitize-data";
import { SongTable } from "../_components/song-table";
import { useParams } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PlaylistDetailPage() {
  const params = useParams<{ "playlist-id": string }>();
  const playlistId = params["playlist-id"];
  // const client = getClient();
  // const { data, error } = await client.query<GetPlaylistQuery>({
  //   query: GetPlaylistDocument,
  //   variables: { id: parseInt(playlistId) },
  // });
  const { data, error } = useGetPlaylistQuery({
    variables: { id: parseInt(playlistId) },
  });
  const sanitizedData = sanitizeData(data?.playlist.listJson);

  if (error) {
    return <NotFound />;
  }

  return (
    <>
      {/* <ApolloProvider> */}
      <PlaylistDetail
        playlistId={playlistId}
        userId={data?.playlist.userId}
        playlistData={sanitizedData || []}
        playlistName={data?.playlist.name || ""}
      />
      {/* </ApolloProvider> */}
      <SongTable songs={sanitizedData || []} />
    </>
  );
}
