import { getClient } from "@/lib/apollo-client";
import PlaylistDetail from "./_components/playlist";
import { GetPlaylistDocument } from "@/graphql/hooks";
import { GetPlaylistQuery } from "@/graphql/operations";
import NotFound from "@/app/not-found";
import { Suspense } from "react";
import Loader from "@/components/loader";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function PlaylistDetailPage(props: any) {
  const playlistId = props.params["playlist-id"];
  const client = getClient();
  const { data, error } = await client.query<GetPlaylistQuery>({
    query: GetPlaylistDocument,
    variables: { id: parseInt(playlistId) },
  });
  if (error) {
    return <NotFound />;
  }

  return (
    <Suspense fallback={<Loader message="Loading playlist..." />}>
      <PlaylistDetail playlistId={playlistId} userId={data?.playlist.userId} />
    </Suspense>
  );
}
