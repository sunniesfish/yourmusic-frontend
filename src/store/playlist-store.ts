import { Playlist } from "@/graphql/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PlaylistsState {
  playlists: Playlist[];
  setPlaylists: (playlists: Playlist[]) => void;
}

export const usePlaylistsStore = create<PlaylistsState>()(
  persist(
    (set) => ({
      playlists: [],
      setPlaylists: (playlists) => set({ playlists }),
    }),
    { name: "playlists-store" }
  )
);
