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

export interface Song {
  title?: string | null;
  artist?: string | null;
  album?: string | null;
  thumbnail?: string | null;
}

export interface SongTableProps {
  songs: Song[];
}
