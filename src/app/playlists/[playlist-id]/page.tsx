import { client } from "@/lib/apollo-client";
import PlaylistComponent from "./component";
import { GetPlaylistQuery } from "@/graphql/types/generated";
import { GET_PLAYLIST } from "@/graphql/queries/playlist";

export default async function PlaylistPage({
  params,
}: {
  params: { playlistId: string };
}) {
  const { data } = await client.query<GetPlaylistQuery>({
    query: GET_PLAYLIST,
    variables: { id: params.playlistId },
  });
  return <PlaylistComponent playlistProps={data?.playlist} />;
}
