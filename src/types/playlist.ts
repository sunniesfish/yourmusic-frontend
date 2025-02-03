import { Playlist as GQLPlaylist } from "@/graphql/types";

export interface PlaylistQueryParams {
  token: string;
  page: number;
  limit: number;
  orderBy: "createdAt" | "name";
  includeListJson?: boolean;
}

export interface PlaylistMutationParams {
  token: string;
  playlist: GQLPlaylist;
  playlistId?: number;
}
