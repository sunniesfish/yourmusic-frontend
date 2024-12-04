"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { Share2, Trash2, ChevronDown } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import Navbar from "../../components/nav-bar";
import "../../styles/theme-frutiger-aero.css";

interface Playlist {
  id: string;
  title: string;
  coverArt: string;
  savedDate: string;
}

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState<"name" | "date">("date");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState<string | null>(null);

  const username = "John Doe"; // 실제 사용시 사용자 정보에서 가져와야 합니다

  useEffect(() => {
    // 초기 플레이리스트 로드
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    // 실제 구현시 API 호출로 대체해야 합니다
    const newPlaylists: Playlist[] = Array(10)
      .fill(null)
      .map((_, index) => ({
        id: `playlist-${playlists.length + index}`,
        title: `Playlist ${playlists.length + index + 1}`,
        coverArt: `/placeholder.svg?height=80&width=80`,
        savedDate: new Date(Date.now() - Math.random() * 10000000000)
          .toISOString()
          .split("T")[0],
      }));

    setPlaylists([...playlists, ...newPlaylists]);
    if (playlists.length + newPlaylists.length >= 50) {
      setHasMore(false);
    }
  };

  const handleSort = (type: "name" | "date") => {
    setSortBy(type);
    setPlaylists((prevPlaylists) => {
      const sortedPlaylists = [...prevPlaylists];
      sortedPlaylists.sort((a, b) => {
        if (type === "name") {
          return a.title.localeCompare(b.title);
        } else {
          return (
            new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime()
          );
        }
      });
      return sortedPlaylists;
    });
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
    <div className="min-h-screen frutiger-aero-bg">
      <Navbar
        isLoggedIn={true}
        username={username}
        profileImage="/placeholder.svg?height=32&width=32"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          {username}'s Playlists
        </h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <button className="frutiger-aero-button px-4 py-2 rounded-md text-white">
            Create New Playlist
          </button>
          <div className="relative">
            <select
              className="frutiger-aero-input appearance-none px-4 py-2 pr-8 rounded-md text-blue-900"
              value={sortBy}
              onChange={(e) => handleSort(e.target.value as "name" | "date")}
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
                  src={playlist.coverArt}
                  alt={playlist.title}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-blue-900">
                    {playlist.title}
                  </h3>
                  <p className="text-sm text-blue-700">{playlist.savedDate}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-blue-100 transition-colors">
                    <Share2 className="w-5 h-5 text-blue-900" />
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                    onClick={() => handleDelete(playlist.id)}
                  >
                    <Trash2 className="w-5 h-5 text-blue-900" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <Dialog.Root open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 frutiger-aero-card p-6 rounded-lg w-full max-w-md">
            <Dialog.Title className="text-xl font-bold text-blue-900 mb-4">
              Confirm Deletion
            </Dialog.Title>
            <Dialog.Description className="text-blue-800 mb-6">
              Are you sure you want to delete this playlist? This action cannot
              be undone.
            </Dialog.Description>
            <div className="flex justify-end space-x-4">
              <button
                className="frutiger-aero-button-secondary px-4 py-2 rounded-md"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="frutiger-aero-button px-4 py-2 rounded-md text-white"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
