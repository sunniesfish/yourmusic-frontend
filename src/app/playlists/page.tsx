"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeletePlaylistDialog } from "./_components/delete-playlist-modal";
import { PlaylistsItem } from "./_components/playlistsItem";
import { Pagination } from "@/components/ui/pagination";
import Loader from "@/components/loader";
import { useGetPlaylistsPageQuery } from "@/graphql/hooks";
import { useHydration } from "@/hooks/use-hydration";

export default function PlaylistsPage() {
  const { user, token } = useAuthStore();
  const isHydrated = useHydration();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState<number | null>(null);
  const [sortType, setSortType] = useState<"name" | "createdAt">("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, loading, fetchMore } = useGetPlaylistsPageQuery({
    variables: {
      page: currentPage,
      limit: 10,
      orderBy: sortType,
      includeListJson: false,
    },
    context: { headers: { Authorization: `Bearer ${token}` } },
    fetchPolicy: "cache-first",
    skip: !token,
  });

  useEffect(() => {
    if (!user && isHydrated) {
      redirect("/auth/sign-in");
    }
  }, [user, isHydrated]);

  useEffect(() => {
    if (data) {
      setTotalPages(data.playlistsPage.totalPages);
    }
  }, [data]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchMore({
      variables: {
        page: newPage,
      },
    });
  };

  const handleSortChange = (newSortType: "name" | "createdAt") => {
    setSortType(newSortType);
    fetchMore({
      variables: {
        orderBy: newSortType,
      },
    });
  };

  const handleDelete = async (id: number) => {
    if (token) {
      setPlaylistToDelete(id);
      setIsDeleteModalOpen(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            {user?.name} &apos;s Playlists
          </h1>
          <div className="flex items-center gap-4">
            <Select
              value={sortType}
              onValueChange={(value) =>
                handleSortChange(value as "name" | "createdAt")
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
        {loading ? (
          <Loader />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.playlistsPage.playlists.map((playlist) => (
              <PlaylistsItem
                playlist={playlist}
                onDelete={handleDelete}
                key={playlist.id}
              />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {isDeleteModalOpen && token && (
        <DeletePlaylistDialog
          token={token}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          playlistId={playlistToDelete ?? 0}
          fetchMore={() => fetchMore({ variables: { page: currentPage } })}
        />
      )}
    </div>
  );
}
