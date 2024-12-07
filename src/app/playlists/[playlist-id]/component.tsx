"use client";

import React from "react";
import {
  Search,
  Download,
  Youtube,
  AirplayIcon as Spotify,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlaylist } from "@/hooks/playlist-hooks";
import { SongTable } from "@/app/playlists/components";
import { GetPlaylistQuery } from "@/graphql/operations";
export default function PlaylistComponent({
  playlistProps,
}: {
  playlistProps: GetPlaylistQuery["playlist"];
}) {
  const { convertToSpotifyPlaylist, convertToYoutubePlaylist } = usePlaylist();

  const handleConvertToSpotify = async () => {
    await convertToSpotifyPlaylist(playlistProps.id);
  };
  const handleConvertToYoutube = async () => {
    await convertToYoutubePlaylist(playlistProps.id);
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
    <>
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        {playlistProps.name}
      </h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <Button
          className="frutiger-aero-button"
          onClick={handleConvertToYoutube}
        >
          <Youtube className="mr-2 h-4 w-4" /> Convert to YouTube
        </Button>
        <Button
          className="frutiger-aero-button"
          onClick={handleConvertToSpotify}
        >
          <Spotify className="mr-2 h-4 w-4" /> Convert to Spotify
        </Button>
        <Button className="frutiger-aero-button" onClick={handleDownloadJSON}>
          <Download className="mr-2 h-4 w-4" /> Download JSON
        </Button>
      </div>
      <SongTable songs={playlistProps.listJson} />
    </>
  );
}
