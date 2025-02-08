"use client";

import { Button } from "@/components/ui/button";
import { GetPlaylistsPageDocument } from "@/graphql/hooks";
import { PlaylistJson } from "@/graphql/types";
import { usePlaylist } from "@/hooks/use-playlist";
import { useToast } from "@/hooks/use-toast";
import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient";
import { ArrowRight, Check, Copy, Loader2 } from "lucide-react";
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
    const result = await convertToSpotify(playlistData);
    if (result.converted) {
      window.open(result.playlistUrl, "_blank");
    } else {
      window.open(result.authUrl, "_blank");
    }
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
  const client = useApolloClient();
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
    if (result) {
      await client.refetchQueries({
        include: [GetPlaylistsPageDocument],
        updateCache: (cache) => {
          cache.evict({ fieldName: "playlistsPage" });
          cache.gc();
        },
      });
    }
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

export function CopyLinkButton({ playlistId }: { playlistId: string }) {
  const { toast } = useToast();

  const handleCopyLink = () => {
    if (!playlistId) return;
    navigator.clipboard.writeText(
      "http://" + process.env.NEXT_PUBLIC_DOMAIN + `/playlists/${playlistId}`
    );
    toast({
      title: "Copied to clipboard",
      description: "Link copied to clipboard",
      duration: 1000,
    });
  };

  return (
    <Button className="h-8 w-8" onClick={handleCopyLink}>
      <Copy className="h-4 w-4" />
    </Button>
  );
}
