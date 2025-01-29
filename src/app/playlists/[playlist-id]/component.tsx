"use client";

import React from "react";
import { Search, Download, Youtube, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlaylist } from "@/hooks/playlist-hooks";
import { SongTable } from "@/app/playlists/components";
import { GetPlaylistQuery } from "@/graphql/operations";

export default function PlaylistComponent({
  playlistProps,
}: {
  playlistProps: GetPlaylistQuery["playlist"];
}) {
  const { convertToYoutube, convertToSpotify } = usePlaylist();

  const handleConvertToSpotify = async () => {
    await convertToSpotify(playlistProps.listJson);
  };

  const handleConvertToYoutube = async () => {
    await convertToYoutube(playlistProps.listJson);
  };

  const handleDownloadJSON = () => {
    const jsonString = JSON.stringify(playlistProps.listJson);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${playlistProps.name}.json`;
    a.click();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            {playlistProps.name}
          </h1>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleConvertToYoutube}
          >
            <Youtube className="h-4 w-4" />
            Convert to YouTube
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleConvertToSpotify}
          >
            <Music className="h-4 w-4" />
            Convert to Spotify
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleDownloadJSON}
          >
            <Download className="h-4 w-4" />
            Download JSON
          </Button>
        </div>

        <SongTable songs={playlistProps.listJson} />
      </div>
    </div>
  );
}
