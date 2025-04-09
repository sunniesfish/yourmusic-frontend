"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/store/auth-store";
import { redirect } from "next/navigation";
import { Pagination } from "@/components/ui/pagination";
import { useGetPlaylistsPageQuery } from "@/graphql/hooks";
import { useHydration } from "@/hooks/use-hydration";
import PlaylistsItem from "./playlistsItem";
import dynamic from "next/dynamic";
import PlaylistsHeader from "./playlists-header";

const DeletePlaylistDialog = dynamic(
  () =>
    import("./delete-playlist-modal").then((mod) => mod.DeletePlaylistDialog),
  {
    ssr: false,
  }
);

export function Playlists() {
  const { user, token } = useAuthStore();
  const isHydrated = useHydration();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState<number | null>(null);
  const [sortType, setSortType] = useState<"name" | "createdAt">("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, fetchMore } = useGetPlaylistsPageQuery({
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

  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      fetchMore({
        variables: {
          page: newPage,
        },
      });
    },
    [fetchMore]
  );

  const handleSortChange = useCallback(
    (newSortType: "name" | "createdAt") => {
      setSortType(newSortType);
      fetchMore({
        variables: {
          orderBy: newSortType,
        },
      });
    },
    [fetchMore]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (token) {
        setPlaylistToDelete(id);
        setIsDeleteModalOpen(true);
      }
    },
    [token]
  );

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <PlaylistsHeader
        userName={user?.name ?? ""}
        sortType={sortType}
        handleSortChange={(value) =>
          handleSortChange(value as "name" | "createdAt")
        }
      />

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.playlistsPage.playlists.map((playlist) => (
          <PlaylistsItem
            playlist={playlist}
            onDelete={handleDelete}
            key={playlist.id}
          />
        ))}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {isDeleteModalOpen && token && (
        <DeletePlaylistDialog
          token={token}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          playlistId={playlistToDelete ?? 0}
          fetchMore={() => fetchMore({ variables: { page: currentPage } })}
        />
      )}
    </main>
  );
}
