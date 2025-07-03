import { PlaylistEdge } from "@/types/playlist";
import {
  LinkedList,
  SerializableLinkedListData,
} from "@/lib/cursor-linked-list";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PlaylistsState {
  cursorList: LinkedList<string>;
  playlistMap: Record<string, PlaylistEdge>;
  setPlaylists: (playlists: PlaylistEdge[]) => void;
  addPlaylist: (playlist: PlaylistEdge) => void;
  removePlaylist: (cursor: string) => void;
  clearPlaylists: () => void;
  getNextEdge: (key: string) => PlaylistEdge | undefined;
  getPrevEdge: (key: string) => PlaylistEdge | undefined;
}

export const usePlaylistStore = create<PlaylistsState>()(
  persist(
    (set, get) => ({
      cursorList: new LinkedList<string>(),
      playlistMap: {},
      setPlaylists: (playlists) => {
        playlists.forEach((playlist) => {
          get().cursorList.insertLast(playlist.cursor);
          get().playlistMap[playlist.cursor] = playlist;
        });
      },
      addPlaylist: (playlist) => {
        get().cursorList.insertLast(playlist.cursor);
        get().playlistMap[playlist.cursor] = playlist;
      },
      removePlaylist: (cursor) => {
        get().cursorList.deleteNode(cursor);
        delete get().playlistMap[cursor];
      },
      clearPlaylists: () => {
        get().cursorList.clear();
        get().playlistMap = {};
      },
      getNextEdge: (key) => {
        const nextNode = get().cursorList.getNextNode(key);
        if (!nextNode) return undefined;
        return get().playlistMap[nextNode.payload];
      },
      getPrevEdge: (key) => {
        const prevNode = get().cursorList.getPrevNode(key);
        if (!prevNode) return undefined;
        return get().playlistMap[prevNode.payload];
      },
    }),
    {
      name: "playlist-list",
      partialize: (state) => ({
        cursorList: state.cursorList.toJSON(),
        playlistMap: state.playlistMap,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.cursorList) {
          state.cursorList = LinkedList.fromJSON(
            state.cursorList as unknown as SerializableLinkedListData<string>
          );
        }
      },
    }
  )
);
