"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { Share2, Trash2, ChevronDown } from "lucide-react";
import { DeletePlaylistDialog } from "./components";
import { useAuthStore } from "@/store/auth-store";
import { redirect } from "next/navigation";
import { usePlaylist } from "@/hooks/playlist-hooks";

interface Playlist {
  id: string;
  title: string;
  coverArt: string;
  createdAt: string;
}

export default function PlaylistsPage() {
  const { user, token } = useAuthStore();
  useEffect(() => {
    if (!user) {
      redirect("/auth/sign-in");
    }
  }, [user]);
  const { getPlaylists } = usePlaylist();
  const [playlists, setPlaylists] = useState<Partial<Playlist>[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState<string | null>(null);
  const [sortType, setSortType] = useState<"name" | "createdAt">("name");

  useEffect(() => {
    // 초기 플레이리스트 로드
    fetchMoreData();
  }, []);

  const fetchMoreData = async () => {
    const data = await getPlaylists(token ?? "", 1, 10, sortType);
    const newPlaylists = data?.playlistsPage.playlists ?? [];

    setPlaylists([...playlists, ...newPlaylists]);
    if (playlists.length + newPlaylists.length >= 50) {
      setHasMore(false);
    }
  };

  const handleSort = (type: "name" | "createdAt") => {
    setSortType(type);
    fetchMoreData();
  };

  const handleDelete = (id: string) => {
    setPlaylistToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (playlistToDelete) {
      setPlaylists((prevPlaylists) =>
        prevPlaylists.filter((playlist) => playlist.id !== playlistToDelete)
      );
      setIsDeleteModalOpen(false);
      setPlaylistToDelete(null);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          {user?.name}'s Playlists
        </h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <button className="frutiger-aero-button px-4 py-2 rounded-md text-white">
            Create New Playlist
          </button>
          <div className="relative">
            <select
              className="frutiger-aero-input appearance-none px-4 py-2 pr-8 rounded-md text-blue-900"
              value={sortType}
              onChange={(e) =>
                handleSort(e.target.value as "name" | "createdAt")
              }
            >
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Date</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-900 pointer-events-none" />
          </div>
        </div>
        <InfiniteScroll
          dataLength={playlists.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p className="text-center mt-4 text-blue-900">
              No more playlists to load.
            </p>
          }
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="frutiger-aero-card p-4 rounded-lg flex items-center space-x-4"
              >
                <Image
                  src={playlist.coverArt ?? ""}
                  alt={playlist.title ?? ""}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-blue-900">
                    {playlist.title}
                  </h3>
                  <p className="text-sm text-blue-700">{playlist.createdAt}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-blue-100 transition-colors">
                    <Share2 className="w-5 h-5 text-blue-900" />
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                    onClick={() => handleDelete(playlist.id ?? "")}
                  >
                    <Trash2 className="w-5 h-5 text-blue-900" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
      {isDeleteModalOpen && (
        <DeletePlaylistDialog
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          playlistId={playlistToDelete ? parseInt(playlistToDelete) : 0}
        />
      )}
    </>
  );
}
