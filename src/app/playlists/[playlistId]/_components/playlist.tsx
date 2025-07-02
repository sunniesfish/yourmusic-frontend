"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ConvertToSpotifyPlaylistButton,
  ConvertToYoutubePlaylistButton,
} from "@/app/playlists/_components/buttons";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth-store";
import { Title } from "./title";
import { PlaylistJson } from "@/graphql/types";

const HEADERS = ["Title", "Artist", "Album"];
const BOM = "\uFEFF";

const sanitizeFileName = (name: string): string =>
  name.replace(/[<>:"\/\\|?*\x00-\x1F]/g, "").trim() || "playlist";

interface PlaylistDetailProps {
  playlistId: string;
  userId?: string;
  playlistData: PlaylistJson[];
  playlistName: string;
}

export default function PlaylistDetail({
  playlistId,
  userId,
  playlistData,
  playlistName,
}: PlaylistDetailProps) {
  const { toast } = useToast();
  const { token, user } = useAuthStore();

  if (!playlistId) return <div>Playlist not found</div>;

  const handleDownloadCSV = () => {
    try {
      if (!playlistData) return;
      const headerString = HEADERS.map((header) => `"${header}"`).join(",");

      const rows = playlistData.reduce((acc, song) => {
        return (
          acc +
          "\n" +
          [song.title, song.artist, song.album]
            .map((cell) => `"${(cell || "").replace(/"/g, '""')}"`)
            .join(",")
        );
      }, headerString);

      const sanitizedFileName = sanitizeFileName(playlistName);

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
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to download CSV file",
      });
    }
  };

  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <Title
          isBelongsToUser={userId === user?.id}
          token={token}
          playlistId={playlistId}
          playlistName={playlistName}
        />
      </header>

      <section className="flex flex-col md:flex gap-4 w-full">
        <ConvertToYoutubePlaylistButton
          playlistData={playlistData || []}
          token={token}
        />
        <ConvertToSpotifyPlaylistButton
          playlistData={playlistData || []}
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
      </section>
    </>
  );
}
