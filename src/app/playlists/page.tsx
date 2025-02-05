"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { Plus } from "lucide-react";
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
import { DeletePlaylistDialog } from "./_components/song-table";
import { PlaylistsItem } from "./_components/playlistsItem";
import { Playlist } from "@/graphql/types";
import {
  useGetPlaylistLazyQuery,
  useGetPlaylistsPageLazyQuery,
  useGetPlaylistsPageQuery,
} from "@/graphql/hooks";

export default function PlaylistsPage() {
  const { user, token } = useAuthStore();
  const { data, loading } = useGetPlaylistsPageQuery({
    variables: {
      page: 1,
      limit: 10,
      orderBy: "createdAt",
      includeListJson: false,
    },
    context: { headers: { Authorization: `Bearer ${token}` } },
  });
  const [playlists, setPlaylists] = useState<Partial<Playlist>[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState<number | null>(null);
  const [sortType, setSortType] = useState<"name" | "createdAt">("name");
  const { removePlaylist } = usePlaylist();
  useEffect(() => {
    if (!user) {
      redirect("/auth/sign-in");
    }
    fetchMoreData();
  }, [user]);

  const fetchMoreData = async () => {
    const newPlaylists = data?.playlistsPage?.playlists ?? [];
    setPlaylists([...playlists, ...newPlaylists]);
    setHasMore(newPlaylists.length === 10);
  };

  const handleDelete = async (id: number) => {
    const result = await removePlaylist({
      playlistId: id,
      playlistTitle: "",
      playlistJson: [],
      token: token ?? "",
    });
    if (result) {
      setPlaylistToDelete(id);
      setIsDeleteModalOpen(true);
    }
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
            <Link href="/playlists/newplaylist">
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
              <PlaylistsItem
                playlist={playlist}
                onDelete={handleDelete}
                key={playlist.id}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>

      {isDeleteModalOpen && (
        <DeletePlaylistDialog
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          playlistId={playlistToDelete ?? 0}
        />
      )}
    </div>
  );
}
