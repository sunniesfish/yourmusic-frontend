"use client";

import {
  GetPlaylistsPageDocument,
  useConvertToSpotifyPlaylistMutation,
  useConvertToYoutubePlaylistMutation,
  useGetPlaylistLazyQuery,
  useGetPlaylistQuery,
  useGetPlaylistsPageLazyQuery,
  useReadPlaylistMutation,
  useRemovePlaylistMutation,
  useSavePlaylistMutation,
} from "@/graphql/hooks";
import { PlaylistQueryParams, PlaylistMutationParams } from "@/types/playlist";
import { usePlaylistsStore } from "@/store/playlist-store";
import { PlaylistJson, PlaylistsResponse } from "@/graphql/types";
import { omit } from "lodash";

/**
 * Hook for handling playlist-related queries
 * @returns Object containing playlist query methods
 */
const usePlaylistQuery = () => {
  const [getPlaylistsQuery] = useGetPlaylistsPageLazyQuery();
  const [getPlaylistQuery] = useGetPlaylistLazyQuery();

  /**
   * Fetches playlists with pagination and sorting
   * @param {PlaylistQueryParams} params - Query parameters including token, page, limit, and sorting
   * @returns {Promise<PlaylistsResponse | null>} Paginated playlist data or null if failed
   */
  const getPlaylists = async ({
    token,
    page,
    limit,
    orderBy,
    includeListJson = false,
  }: PlaylistQueryParams): Promise<PlaylistsResponse | null> => {
    try {
      const { data } = await getPlaylistsQuery({
        variables: { page, limit, orderBy, includeListJson },
        context: { headers: { Authorization: `Bearer ${token}` } },
      });

      if (data) {
        usePlaylistsStore.getState().setPlaylists(data.playlistsPage.playlists);
        return data.playlistsPage;
      }
      return null;
    } catch (err) {
      console.error("Failed to fetch playlists:", err);
      return null;
    }
  };

  /**
   * Fetches details of a specific playlist
   * @param {string} token - Authentication token
   * @param {number} playlistId - ID of the playlist to fetch
   * @returns {Promise<GetPlaylistQuery | null>} Playlist details or null if failed
   */
  const getPlaylistDetails = async (token: string, playlistId: number) => {
    try {
      const { data } = await getPlaylistQuery({
        variables: { id: playlistId },
        context: { headers: { Authorization: `Bearer ${token}` } },
      });
      return data || null;
    } catch (err) {
      console.error("Failed to fetch playlist details:", err);
      return null;
    }
  };

  return { getPlaylists, getPlaylistDetails };
};

/**
 * Hook for handling playlist mutations
 * @returns Object containing playlist mutation methods
 */
const usePlaylistMutation = () => {
  const [readPlaylistMutate] = useReadPlaylistMutation();
  const [savePlaylistMutate] = useSavePlaylistMutation();
  const [removePlaylistMutate] = useRemovePlaylistMutation();

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
      return data?.readPlaylist || null;
    } catch (err) {
      console.error("Failed to read playlist:", err);
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
    console.log("props", token, playlistTitle, playlistJson);
    if (!playlistTitle || !playlistJson) return false;
    const cleanedPlaylistJson = playlistJson.map((item) =>
      omit(item, ["__typename"])
    );
    console.log("cleanedPlaylistJson", cleanedPlaylistJson);
    try {
      const input = {
        variables: {
          savePlaylistInput: {
            name: playlistTitle,
            listJson: cleanedPlaylistJson,
          },
        },
        context: { headers: { Authorization: `Bearer ${token}` } },
      };

      // mutation 실행 전 input 검사
      console.log("Mutation Input:", JSON.stringify(input, null, 2));

      const result = await savePlaylistMutate(input);

      // 전체 응답 로깅
      console.log("Full Mutation Result:", JSON.stringify(result, null, 2));

      return Boolean(result.data?.savePlaylist);
    } catch (err) {
      if (err instanceof Error && "graphQLErrors" in err) {
        console.error("GraphQL Errors:", err.graphQLErrors);
      }
      if (err instanceof Error && "networkError" in err) {
        console.error("Network Error:", err.networkError);
      }
      console.error("Full Error:", err);
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
    console.log("props", token, playlistId);
    if (!playlistId) return false;
    try {
      const { data } = await removePlaylistMutate({
        variables: { id: playlistId },
        context: { headers: { Authorization: `Bearer ${token}` } },
        refetchQueries: [
          {
            query: GetPlaylistsPageDocument,
            variables: {
              page: 1,
              limit: 10,
              orderBy: "createdAt",
              includeListJson: false,
            },
          },
        ],
        update: (cache) => {
          console.log("cache", cache);
          // 캐시에서 해당 플레이리스트 제거
          cache.modify({
            fields: {
              playlists: (existingPlaylists = [], { readField }) => {
                return existingPlaylists.filter(
                  (playlistRef: any) =>
                    readField("id", playlistRef) !== playlistId
                );
              },
            },
          });
        },
        onError: (error) => {
          console.log("Failed to remove playlist:", error);
        },
      });
      console.log("data", data);

      return !!data?.removePlaylist;
    } catch (err) {
      console.error("Failed to remove playlist:", err);
      return false;
    }
  };

  return { readPlaylist, savePlaylist, removePlaylist };
};

interface ConversionResult {
  converted: boolean;
  playlistUrl?: string;
  authUrl?: string;
}

const usePlaylistConverter = () => {
  const [convertToYoutubeMutate] = useConvertToYoutubePlaylistMutation();
  const [convertToSpotifyMutate] = useConvertToSpotifyPlaylistMutation();

  const convertToYoutube = async (
    data: PlaylistJson[]
  ): Promise<ConversionResult> => {
    try {
      const { data: result } = await convertToYoutubeMutate({
        variables: { listJSON: data },
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
      console.log("Failed to convert to YouTube playlist:", err);
      throw err;
    }
  };

  const convertToSpotify = async (
    data: PlaylistJson[]
  ): Promise<ConversionResult> => {
    try {
      const { data: result } = await convertToSpotifyMutate({
        variables: { listJSON: data },
      });
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
      console.log("Failed to convert to Spotify playlist:", err);
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
  const { getPlaylists, getPlaylistDetails } = usePlaylistQuery();
  const { readPlaylist, savePlaylist, removePlaylist } = usePlaylistMutation();
  const { convertToYoutube, convertToSpotify } = usePlaylistConverter();

  return {
    getPlaylists,
    getPlaylistDetails,
    readPlaylist,
    savePlaylist,
    removePlaylist,
    convertToYoutube,
    convertToSpotify,
  };
};
