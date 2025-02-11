"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SongTable } from "@/app/playlists/_components/song-table";
import {
  ConvertToSpotifyPlaylistButton,
  ConvertToYoutubePlaylistButton,
} from "@/app/playlists/_components/buttons";
import { useToast } from "@/hooks/use-toast";
import { Playlist } from "@/graphql/types";
import { useAuthStore } from "@/store/auth-store";
import { useSanitizedData } from "@/hooks/use-sanitizedata";

const HEADERS = ["Title", "Artist", "Album"];
const BOM = "\uFEFF";

const sanitizeFileName = (name: string): string =>
  name.replace(/[<>:"\/\\|?*\x00-\x1F]/g, "").trim() || "playlist";

interface PlaylistDetailProps {
  playlistId: string;
  playlist: Playlist;
}

export default function PlaylistDetail({ playlist }: PlaylistDetailProps) {
  if (!playlist) return <div>No playlist found</div>;
  const { toast } = useToast();
  const { token } = useAuthStore();

  const sanitizedPlaylistJson = useSanitizedData(playlist.listJson);
  const handleDownloadCSV = () => {
    try {
      if (!sanitizedPlaylistJson) return;
      const headerString = HEADERS.map((header) => `"${header}"`).join(",");

      const rows = sanitizedPlaylistJson.reduce((acc, song) => {
        return (
          acc +
          "\n" +
          [song.title, song.artist, song.album]
            .map((cell) => `"${(cell || "").replace(/"/g, '""')}"`)
            .join(",")
        );
      }, headerString);

      const sanitizedFileName = sanitizeFileName(playlist.name);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            {playlist.name}
          </h1>
        </div>

        <div className="flex flex-wrap gap-4">
          <ConvertToYoutubePlaylistButton
            playlistData={sanitizedPlaylistJson || []}
            token={token}
          />
          <ConvertToSpotifyPlaylistButton
            playlistData={sanitizedPlaylistJson || []}
            token={token}
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

        <SongTable songs={sanitizedPlaylistJson || []} />
      </div>
    </div>
  );
}
