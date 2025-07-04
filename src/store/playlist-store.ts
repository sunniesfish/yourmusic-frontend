import { PlaylistEdge } from "@/graphql/types";
import {
  LinkedList,
  SerializableLinkedListData,
} from "@/lib/cursor-linked-list";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PlaylistsState {
  cursorList: LinkedList<string>;
  playlistMap: Record<string, PlaylistEdge>;
  lastCursor: string | null;
  firstCursor: string | null;
  orderBy: "createdAt" | "name";
  setOrderBy: (orderBy: "createdAt" | "name") => void;
  setLastCursor: (cursor: string | null) => void;
  setFirstCursor: (cursor: string | null) => void;
  setPlaylists: (playlistEdges: PlaylistEdge[]) => void;
  addPlaylist: (playlistEdge: PlaylistEdge) => void;
  removePlaylist: (cursor: string) => void;
  clearPlaylists: () => void;
  getNextEdge: (key: string) => PlaylistEdge | undefined;
  getPrevEdge: (key: string) => PlaylistEdge | undefined;
  getHeadEdge: () => PlaylistEdge | undefined;
  getTailEdge: () => PlaylistEdge | undefined;
}

export const usePlaylistStore = create<PlaylistsState>()(
  persist(
    (set, get) => ({
      cursorList: new LinkedList<string>(),
      playlistMap: {},
      lastCursor: null,
      firstCursor: null,
      orderBy: "createdAt",
      setOrderBy: (orderBy) => set({ orderBy }),
      setLastCursor: (cursor) => set({ lastCursor: cursor }),
      setFirstCursor: (cursor) => set({ firstCursor: cursor }),
      setPlaylists: (playlistEdges) => {
        playlistEdges.forEach((playlistEdge) => {
          get().cursorList.insertLast(playlistEdge.cursor, playlistEdge.cursor);
          get().playlistMap[playlistEdge.cursor] = playlistEdge;
        });
      },
      addPlaylist: (playlistEdge) => {
        if (get().playlistMap[playlistEdge.cursor]) {
          get().cursorList.deleteNode(playlistEdge.cursor);
          delete get().playlistMap[playlistEdge.cursor];
        }
        get().cursorList.insertLast(playlistEdge.cursor, playlistEdge.cursor);
        get().playlistMap[playlistEdge.cursor] = playlistEdge;
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
      getHeadEdge: () => {
        const headNode = get().cursorList.head;
        if (!headNode) return undefined;
        return get().playlistMap[headNode.payload];
      },
      getTailEdge: () => {
        const tailNode = get().cursorList.tail;
        if (!tailNode) return undefined;
        return get().playlistMap[tailNode.payload];
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
