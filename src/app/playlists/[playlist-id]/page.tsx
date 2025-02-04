"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SongTable } from "@/app/playlists/_components/song-table";
import { useAuthStore } from "@/store/auth-store";
import {
  ConvertToSpotifyPlaylistButton,
  ConvertToYoutubePlaylistButton,
} from "@/app/playlists/_components/buttons";
import Loader from "@/components/loader";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useGetPlaylistQuery } from "@/graphql/hooks";

const HEADERS = ["Title", "Artist", "Album"];
const BOM = "\uFEFF";

const sanitizeFileName = (name: string): string =>
  name.replace(/[<>:"\/\\|?*\x00-\x1F]/g, "").trim() || "playlist";

export default async function PlaylistDetailPage() {
  const params = useParams();
  const playlistId = params["playlist-id"] as string;
  const router = useRouter();
  const { token } = useAuthStore();
  const { toast } = useToast();

  const { data, loading, error } = useGetPlaylistQuery({
    variables: {
      id: parseInt(playlistId),
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    skip: !token,
    onError: (error) => {
      console.log("error", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load playlist",
      });
    },
  });

  const handleDownloadCSV = () => {
    if (!data?.playlist?.listJson) return;

    try {
      const headerString = HEADERS.map((header) => `"${header}"`).join(",");

      const rows = data.playlist.listJson.reduce((acc, song) => {
        return (
          acc +
          "\n" +
          [song.title, song.artist, song.album]
            .map((cell) => `"${(cell || "").replace(/"/g, '""')}"`)
            .join(",")
        );
      }, headerString);

      const sanitizedFileName = sanitizeFileName(data.playlist.name);

      const blob = new Blob([BOM + rows], {
        type: "text/csv;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${sanitizedFileName}.csv`;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to download CSV file",
      });
    }
  };

  if (loading || !data) return <Loader />;
  if (error || !data?.playlist) return <div>No playlist found</div>;

  const { playlist: queryPlaylist } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            {queryPlaylist.name}
          </h1>
        </div>

        <div className="flex flex-wrap gap-4">
          <ConvertToYoutubePlaylistButton
            playlistData={queryPlaylist.listJson || []}
          />
          <ConvertToSpotifyPlaylistButton
            playlistData={queryPlaylist.listJson || []}
          />
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleDownloadCSV}
          >
            <Download className="h-4 w-4" />
            Download CSV
          </Button>
        </div>

        <SongTable songs={queryPlaylist.listJson || []} />
      </div>
    </div>
  );
}
