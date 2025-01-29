"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { Share2, Trash2, Plus } from "lucide-react";
import { DeletePlaylistDialog } from "./components";
import { useAuthStore } from "@/store/auth-store";
import { redirect } from "next/navigation";
import { usePlaylist } from "@/hooks/playlist-hooks";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Playlist {
  id: string;
  title: string;
  coverArt: string;
  createdAt: string;
}

export default function PlaylistsPage() {
  const { user, token } = useAuthStore();
  const { getPlaylists } = usePlaylist();
  const [playlists, setPlaylists] = useState<Partial<Playlist>[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState<string | null>(null);
  const [sortType, setSortType] = useState<"name" | "createdAt">("name");

  useEffect(() => {
    if (!user) {
      redirect("/auth/sign-in");
    }
    fetchMoreData();
  }, [user]);

  const fetchMoreData = async () => {
    const data = await getPlaylists({
      token: token ?? "",
      page: 1,
      limit: 10,
      orderBy: sortType,
      includeListJson: true,
    });
    const newPlaylists = data?.playlistsPage.playlists ?? [];
    setPlaylists([...playlists, ...newPlaylists]);
    setHasMore(newPlaylists.length === 10);
  };

  const handleDelete = (id: string) => {
    setPlaylistToDelete(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            {user?.name}'s Playlists
          </h1>
          <div className="flex items-center gap-4">
            <Select
              value={sortType}
              onValueChange={(value) =>
                setSortType(value as "name" | "createdAt")
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="createdAt">Sort by Date</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/playlists/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Playlist
              </Button>
            </Link>
          </div>
        </div>

        <InfiniteScroll
          dataLength={playlists.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p className="text-center py-4">Loading...</p>}
          endMessage={
            <p className="text-center py-4 text-muted-foreground">
              No more playlists to load.
            </p>
          }
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="group relative rounded-lg border bg-card p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0">
                    <Image
                      src={playlist.coverArt ?? "/placeholder.svg"}
                      alt=""
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium leading-none">
                      {playlist.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {playlist.createdAt}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share playlist</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(playlist.id ?? "")}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete playlist</span>
                    </Button>
                  </div>
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
    </div>
  );
}
