import { PlaylistEdge } from "@/types/playlist";
import { CursorLinkedList } from "@/lib/cursor-linked-list";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PlaylistState {
  listData: ReturnType<CursorLinkedList<PlaylistEdge>["serialize"]>;
  setList: (data: CursorLinkedList<PlaylistEdge>) => void;
}

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (set) => ({
      listData: new CursorLinkedList<PlaylistEdge>().serialize(),
      setList: (list) => set({ listData: list.serialize() }),
    }),
    {
      name: "playlist-list",
    }
  )
);
