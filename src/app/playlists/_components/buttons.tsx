"use client";

import { Button } from "@/components/ui/button";
import { GetPlaylistsPageDocument } from "@/graphql/hooks";
import { PlaylistJson } from "@/graphql/types";
import { usePlaylist } from "@/hooks/use-playlist";
import { useToast } from "@/hooks/use-toast";
import { useOAuthMessage } from "@/lib/oauth";
import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient";
import { ArrowRight, Check, Copy, Loader2 } from "lucide-react";
import { useState } from "react";
import { randomUUID } from "node:crypto";
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
  token,
}: {
  playlistData: PlaylistJson[];
  token: string | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { convertToSpotify } = usePlaylist();
  const { toast } = useToast();

  useOAuthMessage({
    onSuccess: async (authCode, redirectUri) => {
      try {
        setIsLoading(true);
        const result = await convertToSpotify(
          playlistData,
          authCode,
          redirectUri,
          token
        );
        if (result.converted) {
          toast({
            title: "Success",
            description: "Converted to Spotify playlist",
          });
          window.open(result.playlistUrl, "_blank");
        } else {
          toast({
            title: "Error",
            description: "Failed to convert to Spotify playlist",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const handleClick = async () => {
    setIsLoading(true);
    const result = await convertToSpotify(playlistData, token);
    if (result.converted) {
      toast({
        title: "Success",
        description: "Converted to Spotify playlist",
      });
      window.open(result.playlistUrl, "_blank");
    } else {
      toast({
        title: "Error",
        description: "Failed to convert to Spotify playlist",
      });
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
  token,
}: {
  playlistData: PlaylistJson[];
  token: string | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<string | null>(null);
  const { convertToYoutube } = usePlaylist();
  const { toast } = useToast();

  useOAuthMessage({
    onSuccess: async (authCode, receivedState) => {
      try {
        setIsLoading(true);
        if (state !== receivedState) {
          throw new Error("Invalid state");
        }
        const result = await convertToYoutube(playlistData, authCode, token);
        if (result.converted) {
          toast({
            title: "Success",
            description: "Converted to Youtube playlist",
          });
          window.open(result.playlistUrl, "_blank");
        } else {
          toast({
            title: "Error",
            description: "Failed to convert to Youtube playlist",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const handleClick = async () => {
    const state = randomUUID();
    setState(state);
    setIsLoading(true);
    const result = await convertToYoutube(playlistData, token, state);
    if (result.converted) {
      console.log(result.authUrl);
      setIsLoading(false);
    }
    if (result.authUrl) {
      window.open(result.authUrl, "oauth_popup", "width=500,height=600");
    }
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
