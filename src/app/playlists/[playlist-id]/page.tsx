import { getClient } from "@/lib/apollo-client";
import PlaylistDetail from "./_components/playlist";
import { GetPlaylistDocument } from "@/graphql/hooks";
import { GetPlaylistQuery } from "@/graphql/operations";
import NotFound from "@/app/not-found";

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
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 w-full">
        <PlaylistDetail
          playlistId={playlistId}
          userId={data?.playlist.userId}
          playlistData={data}
        />
      </div>
    </div>
  );
}
