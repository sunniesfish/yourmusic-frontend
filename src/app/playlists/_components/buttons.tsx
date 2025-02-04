"use client";

import { Button } from "@/components/ui/button";
import { PlaylistJson } from "@/graphql/types";
import { usePlaylist } from "@/hooks/playlist-hooks";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";

export function GetListButton({
  isLoading,
  handleClick,
}: {
  isLoading: boolean;
  handleClick: () => void;
}) {
  return (
    <Button onClick={handleClick}>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          Get List <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export function ConvertToSpotifyPlaylistButton({
  playlistData,
}: {
  playlistData: PlaylistJson[];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { convertToSpotify } = usePlaylist();
  const handleClick = async () => {
    setIsLoading(true);
    await convertToSpotify(playlistData);
    setIsLoading(false);
  };
  return (
    <Button variant="spotify" onClick={handleClick} disabled={isLoading}>
      Spotify
    </Button>
  );
}

export function ConvertToYoutubePlaylistButton({
  playlistData,
}: {
  playlistData: PlaylistJson[];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { convertToYoutube } = usePlaylist();
  const handleClick = async () => {
    setIsLoading(true);
    await convertToYoutube(playlistData);
    setIsLoading(false);
  };
  return (
    <Button variant="youtube" onClick={handleClick} disabled={isLoading}>
      Youtube
    </Button>
  );
}

export function SavePlaylistButton({
  playlistData,
  playlistTitle,
  token,
}: {
  playlistData: PlaylistJson[];
  playlistTitle: string;
  token: string;
}) {
  const { savePlaylist } = usePlaylist();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleClick = async () => {
    setIsError(false);
    setIsSuccess(false);
    setIsLoading(true);
    const result = await savePlaylist({
      playlistTitle: playlistTitle,
      playlistJson: playlistData,
      token: token,
    });
    setIsLoading(false);
    setIsError(!result);
    setIsSuccess(result);
  };
  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isError ? (
        <>Try Again</>
      ) : isSuccess ? (
        <Check className="h-4 w-4" />
      ) : (
        <>Save</>
      )}
    </Button>
  );
}
