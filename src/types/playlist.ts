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
  playlistId?: string;
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

export interface PlaylistNode {
  playlistId?: string;
  name?: string;
  createdAt?: string;
  thumbnail?: string;
  userId?: string;
  listJson?: {
    title: string;
    artist: string;
    album?: string;
    thumbnail?: string;
  }[];
}

export interface PlaylistEdge {
  node: PlaylistNode;
  cursor: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface PlaylistsResponse {
  edges: PlaylistEdge[];
  pageInfo: PageInfo;
}

export interface GetPlaylistsByUserData {
  playlistsByUser: PlaylistsResponse;
}

export interface GetPlaylistsByUserVariables {
  userId: string;
  orderBy: "createdAt" | "name";
  limit: number;
  after: string;
}
