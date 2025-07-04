"use client";

import {
  GetPlaylistsPageDocument,
  useConvertToSpotifyPlaylistMutation,
  useConvertToYoutubePlaylistMutation,
  useGetPlaylistsByUserQuery,
  useReadPlaylistMutation,
  useRemovePlaylistMutation,
  useSavePlaylistMutation,
  useUpdatePlaylistMutation,
} from "@/graphql/hooks";
import { PlaylistMutationParams, PlaylistNode } from "@/types/playlist";
import { PlaylistEdge, PlaylistJson } from "@/graphql/types";
import { omit } from "lodash";
import { useToast } from "@/hooks/use-toast";
import { ApolloCache } from "@apollo/client/cache/core/cache";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSanitizedData } from "./use-sanitizedata";
import { usePlaylistStore } from "@/store/playlist-store";
import { useShallow } from "zustand/react/shallow";
/**
 * Hook for handling playlist mutations
 * @returns Object containing playlist mutation methods
 */
const usePlaylistMutation = () => {
  const [readPlaylistMutate] = useReadPlaylistMutation();
  const [savePlaylistMutate] = useSavePlaylistMutation();
  const [removePlaylistMutate] = useRemovePlaylistMutation();
  const [updatePlaylistMutate] = useUpdatePlaylistMutation();
  const { toast } = useToast();
  /**
   * Reads playlist data from a URL
   * @param {string} link - URL of the playlist
   * @returns {Promise<PlaylistJson[] | null>} Array of playlist items or null if failed
   */
  const readPlaylist = async (link: string): Promise<PlaylistJson[] | null> => {
    try {
      const { data } = await readPlaylistMutate({
        variables: { link },
      });
      if (!data || !data.readPlaylist) throw Error("Failed to read playlist");

      return data.readPlaylist;
    } catch {
      toast({
        title: "Error",
        description: "Failed to read playlist",
      });
      return null;
    }
  };

  /**
   * Saves a playlist
   * @param {PlaylistMutationParams} params - Playlist data and token
   * @returns {Promise<boolean>} True if save was successful
   */
  const savePlaylist = async ({
    token,
    playlistTitle,
    playlistJson,
  }: PlaylistMutationParams): Promise<boolean> => {
    if (!playlistTitle || !playlistJson) return false;
    const cleanedPlaylistJson = playlistJson.map((item) =>
      omit(item, ["__typename"])
    );
    try {
      const input = {
        variables: {
          mutatePlaylistInput: {
            name: playlistTitle,
            listJson: cleanedPlaylistJson,
          },
        },
        context: { headers: { Authorization: `Bearer ${token}` } },
      };

      const result = await savePlaylistMutate(input);

      return Boolean(result.data?.savePlaylist);
    } catch (err) {
      if (err instanceof Error && "graphQLErrors" in err) {
        toast({
          title: "Error",
          description: "Failed to save playlist",
        });
      }
      if (err instanceof Error && "networkError" in err) {
        toast({
          title: "Error",
          description: "Failed to save playlist",
        });
      }
      return false;
    }
  };

  /**
   * Updates a playlist
   * @param {PlaylistMutationParams} params - Playlist ID, title, and JSON data
   * @returns {Promise<boolean>} True if update was successful
   */
  const updatePlaylist = async ({
    token,
    playlistId,
    playlistTitle,
    playlistJson,
  }: PlaylistMutationParams): Promise<boolean> => {
    if (!playlistTitle || !playlistId) return false;
    const cleanedPlaylistJson = playlistJson?.map((item) =>
      omit(item, ["__typename"])
    );
    try {
      const input = {
        variables: {
          mutatePlaylistInput: {
            playlistId: playlistId,
            name: playlistTitle,
            listJson: cleanedPlaylistJson,
          },
        },
        context: { headers: { Authorization: `Bearer ${token}` } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        update: async (cache: ApolloCache<any>) => {
          cache.evict({
            fieldName: "playlist",
            args: { playlistId: playlistId },
          });
          cache.gc();
        },
      };
      const result = await updatePlaylistMutate(input);
      return Boolean(result.data?.updatePlaylist);
    } catch (err) {
      if (err instanceof Error && "graphQLErrors" in err) {
        toast({
          title: "Error",
          description: "GraphQL Error: Failed to update playlist",
        });
      }
      if (err instanceof Error && "networkError" in err) {
        toast({
          title: "Error",
          description: "Network Error: Failed to update playlist",
        });
      }
      return false;
    }
  };

  /**
   * Removes a playlist
   * @param {PlaylistMutationParams} params - Playlist ID and token
   * @returns {Promise<boolean>} True if removal was successful
   */
  const removePlaylist = async ({
    token,
    playlistId,
  }: PlaylistMutationParams): Promise<boolean> => {
    if (!playlistId) return false;
    try {
      const { data } = await removePlaylistMutate({
        variables: { playlistId },
        context: { headers: { Authorization: `Bearer ${token}` } },
        refetchQueries: [
          {
            query: GetPlaylistsPageDocument,
            variables: {
              limit: 10,
              orderBy: "createdAt",
            },
          },
        ],
        update: (cache) => {
          cache.modify({
            fields: {
              playlists: (existingPlaylists = [], { readField }) => {
                return existingPlaylists.filter(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (playlistRef: any) =>
                    readField("id", playlistRef) !== playlistId
                );
              },
            },
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to remove playlist",
          });
        },
      });

      return !!data?.removePlaylist;
    } catch {
      toast({
        title: "Error",
        description: "Failed to remove playlist",
      });
      return false;
    }
  };

  return { readPlaylist, savePlaylist, removePlaylist, updatePlaylist };
};

interface ConversionResult {
  converted: boolean;
  playlistUrl?: string;
  authUrl?: string;
}
interface ConvertToYoutubeParams {
  data: PlaylistJson[];
  authorizationCode: string | undefined;
  state: string | undefined;
  token: string | undefined;
}
interface ConvertToSpotifyParams {
  data: PlaylistJson[];
  authorizationCode: string | undefined;
  state: string | undefined;
  token: string | undefined;
}

const usePlaylistConverter = () => {
  const [convertToYoutubeMutate] = useConvertToYoutubePlaylistMutation();
  const [convertToSpotifyMutate] = useConvertToSpotifyPlaylistMutation();
  const { toast } = useToast();
  const convertToYoutube = async ({
    data,
    authorizationCode,
    state,
    token,
  }: ConvertToYoutubeParams): Promise<ConversionResult> => {
    try {
      const { data: result } = await convertToYoutubeMutate({
        variables: { listJSON: data, authorizationCode, state },
        context: { headers: { Authorization: `Bearer ${token}` } },
      });

      if (
        result?.convertToYoutubePlaylist.__typename === "AuthRequiredResponse"
      ) {
        return {
          converted: false,
          authUrl: result.convertToYoutubePlaylist.authUrl,
        };
      }

      if (result?.convertToYoutubePlaylist.__typename === "ConvertedPlaylist") {
        const playlistUrl = result.convertToYoutubePlaylist.playlistUrl;
        if (playlistUrl) {
          return {
            converted: true,
            playlistUrl,
          };
        }
      }
      throw new Error("Failed to convert to YouTube playlist");
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to convert to YouTube playlist",
      });
      throw err;
    }
  };

  const convertToSpotify = async ({
    data,
    authorizationCode,
    state,
    token,
  }: ConvertToSpotifyParams): Promise<ConversionResult> => {
    try {
      const input = {
        variables: { listJSON: data, authorizationCode, state },
        context: token ? { headers: { Authorization: `Bearer ${token}` } } : {},
      };
      const { data: result } = await convertToSpotifyMutate(input);
      if (
        result?.convertToSpotifyPlaylist.__typename === "AuthRequiredResponse"
      ) {
        return {
          converted: false,
          authUrl: result.convertToSpotifyPlaylist.authUrl,
        };
      }

      if (result?.convertToSpotifyPlaylist.__typename === "ConvertedPlaylist") {
        const playlistUrl = result.convertToSpotifyPlaylist.playlistUrl;
        if (playlistUrl) {
          return {
            converted: true,
            playlistUrl,
          };
        }
      }
      throw new Error("Failed to convert to Spotify playlist");
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to convert to Spotify playlist",
      });
      throw err;
    }
  };

  return { convertToYoutube, convertToSpotify };
};

/**
 * Main hook for playlist operations
 * @returns {Object} Combined playlist operations
 */
export const usePlaylist = () => {
  const { readPlaylist, savePlaylist, removePlaylist, updatePlaylist } =
    usePlaylistMutation();
  const { convertToYoutube, convertToSpotify } = usePlaylistConverter();

  return {
    readPlaylist,
    savePlaylist,
    removePlaylist,
    updatePlaylist,
    convertToYoutube,
    convertToSpotify,
  };
};

export const usePlaylistsPageNation = (
  userId: string,
  orderBy: "createdAt" | "name" = "createdAt",
  limit: number = 10
) => {
  const [shouldSkip, setShouldSkip] = useState(true);

  const {
    cursorList,
    playlistMap,
    orderBy: orderByState,
    setOrderBy,
    addPlaylist,
    setPlaylists,
    firstCursor,
    lastCursor,
    setFirstCursor,
    setLastCursor,
    getNextEdge,
    getPrevEdge,
    getHeadEdge,
    getTailEdge,
  } = usePlaylistStore(useShallow((state) => state));
  const [thisPlaylistEdges, setThisPlaylistEdges] = useState<PlaylistEdge[]>(
    []
  );

  const { data, loading, fetchMore, error } = useGetPlaylistsByUserQuery({
    variables: {
      userId,
      orderBy,
      limit,
      after: lastCursor,
    },
    skip: shouldSkip,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data.playlistsByUser.edges.length > 0) {
        for (const edge of data.playlistsByUser.edges) {
          addPlaylist(edge);
        }
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (!firstCursor || orderByState !== orderBy) {
      setShouldSkip(false);
      setOrderBy(orderBy);
    }
    getThisPlaylistEdges(lastCursor, limit);
  }, [firstCursor, orderByState, orderBy]);

  const getThisPlaylistEdges = async (
    endCursor: string | null,
    limit: number
  ) => {
    const arr: PlaylistEdge[] = [];
    let cursor = endCursor;
    while (arr.length < limit) {
      const playlistEdge = cursor ? getNextEdge(cursor) : null;
      if (playlistEdge) {
        arr.push(playlistEdge);
        cursor = playlistEdge.cursor;
      } else {
        await fetchMore({
          variables: {
            userId,
            orderBy,
            limit,
            after: cursor,
          },
        });
        const playlistEdge = cursor ? getHeadEdge() : null;
        if (playlistEdge) {
          arr.push(playlistEdge);
          cursor = playlistEdge.cursor;
        } else {
          break;
        }
      }
    }
    setThisPlaylistEdges(arr);
  };
  const hasNext = useMemo(() => {}, []);

  const hasPrev = useMemo(() => {}, []);

  const getNext = useCallback(async () => {}, []);

  const getPrev = useCallback(() => {
    if (!firstCursor) return;
    let itemCount = 0;
    let arr: PlaylistEdge[] = [];
    let currentCursor = firstCursor;
    while (itemCount < limit) {
      const prevCursor = cursorList.getPrevNode(currentCursor);
      if (!prevCursor) break;
      const playlistEdge = playlistMap[prevCursor.payload];
      if (playlistEdge) {
        arr.push(playlistEdge);
        itemCount++;
        currentCursor = prevCursor.payload;
      } else {
        break;
      }
    }
    arr.reverse();
    setThisPlaylistEdges(arr);
    setFirstCursor(arr[0]?.cursor || null);
    setLastCursor(arr[arr.length - 1]?.cursor || null);
  }, [firstCursor, limit, cursorList, playlistMap]);

  return {
    playlists: thisPlaylistEdges,
    loading,
    hasNext,
    hasPrev,
    getNext,
    getPrev,
    error,
  };
};
