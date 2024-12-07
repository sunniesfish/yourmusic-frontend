import { client } from "@/lib/apollo-client";
import PlaylistComponent from "./component";
import { GetPlaylistQuery } from "@/graphql/operations";
import { GetPlaylistDocument } from "@/graphql/hooks";
export default async function PlaylistPage({
  params,
}: {
  params: { playlistId: string };
}) {
  const { data } = await client.query<GetPlaylistQuery>({
    query: GetPlaylistDocument,
    variables: { id: params.playlistId },
  });
  return <PlaylistComponent playlistProps={data?.playlist} />;
}
