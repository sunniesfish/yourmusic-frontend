"use client";

import { Button } from "@/components/ui/button";
import { GetPlaylistsPageDocument } from "@/graphql/hooks";
import { ApiDomain, PlaylistJson } from "@/graphql/types";
import { usePlaylist } from "@/hooks/use-playlist";
import { useToast } from "@/hooks/use-toast";
import { useOAuthMessage, validateOAuthState } from "@/lib/oauth";
import { openInNewTab } from "@/lib/utils";
import { OAuthState } from "@/types/api";
import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient";
import { ArrowRight, Check, Copy, Loader2 } from "lucide-react";
import { useState, memo } from "react";
import { v4 as uuidv4 } from "uuid";

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

export const ConvertToSpotifyPlaylistButton = memo(
  function ConvertToSpotifyPlaylistButton({
    playlistData,
    token,
  }: {
    playlistData: PlaylistJson[];
    token: string | undefined;
  }) {
    const { convertToSpotify } = usePlaylist();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState<OAuthState | null>(null);
    useOAuthMessage(
      {
        onSuccess: async (authCode, receivedState) => {
          try {
            setIsLoading(true);
            if (!state) {
              throw new Error("State is null");
            }
            if (!validateOAuthState(state, receivedState)) {
              throw new Error("Invalid state");
            }
            const result = await convertToSpotify({
              data: playlistData,
              authorizationCode: authCode,
              state: undefined,
              token,
            });
            if (result.converted) {
              if (result.playlistUrl) {
                openInNewTab(result.playlistUrl);
              }
              toast({
                title: "Success",
                description: "Converted to Spotify playlist",
              });
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
      },
      ApiDomain.Spotify,
      [state]
    );
    const handleClick = async () => {
      const newState: OAuthState = { domain: ApiDomain.Spotify, id: uuidv4() };
      setState(newState);
      setIsLoading(true);
      const result = await convertToSpotify({
        data: playlistData,
        authorizationCode: undefined,
        token,
        state: JSON.stringify(newState),
      });
      if (result.converted) {
        setIsLoading(false);
      }
      if (result.authUrl) {
        window.open(result.authUrl, "oauth_popup", "width=500,height=600");
      }
      setIsLoading(false);
    };
    return (
      <Button variant="spotify" onClick={handleClick} disabled={isLoading}>
        Spotify
      </Button>
    );
  }
);

export const ConvertToYoutubePlaylistButton = memo(
  function ConvertToYoutubePlaylistButton({
    playlistData,
    token,
  }: {
    playlistData: PlaylistJson[];
    token: string | undefined;
  }) {
    const { convertToYoutube } = usePlaylist();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState<OAuthState | null>(null);

    useOAuthMessage(
      {
        onSuccess: async (authCode, receivedState) => {
          try {
            setIsLoading(true);
            if (!state) {
              throw new Error("State is null");
            }
            if (!validateOAuthState(state, receivedState)) {
              throw new Error("Invalid state");
            }
            const result = await convertToYoutube({
              data: playlistData,
              authorizationCode: authCode,
              state: undefined,
              token,
            });
            if (result.converted) {
              console.log("converted result", result);
              if (result.playlistUrl) {
                openInNewTab(result.playlistUrl);
              }
              toast({
                title: "Success",
                description: "Converted to Youtube playlist",
              });
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
      },
      ApiDomain.Youtube,
      [state]
    );
    const handleClick = async () => {
      const newState: OAuthState = { domain: ApiDomain.Youtube, id: uuidv4() };
      setState(newState);
      setIsLoading(true);
      const result = await convertToYoutube({
        data: playlistData,
        authorizationCode: undefined,
        token,
        state: JSON.stringify(newState),
      });
      console.log("result", result);
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
);

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
      process.env.NEXT_PUBLIC_DOMAIN + `/playlists/${playlistId}`
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
