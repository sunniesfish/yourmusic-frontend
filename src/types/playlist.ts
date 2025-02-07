import { PlaylistJson } from "@/graphql/types";

export interface PlaylistQueryParams {
  token: string;
  page: number;
  limit: number;
  orderBy: "createdAt" | "name";
  includeListJson?: boolean;
}

export interface PlaylistMutationParams {
  token: string;
  playlistTitle?: string;
  playlistJson?: PlaylistJson[];
  playlistId?: number;
}
