"use client";

import {
  GetPlaylistsPageDocument,
  useConvertToSpotifyPlaylistMutation,
  useConvertToYoutubePlaylistMutation,
  useGetPlaylistLazyQuery,
  useGetPlaylistsPageLazyQuery,
  useReadPlaylistMutation,
  useRemovePlaylistMutation,
  useSavePlaylistMutation,
  useUpdatePlaylistMutation,
} from "@/graphql/hooks";
import { PlaylistQueryParams, PlaylistMutationParams } from "@/types/playlist";
import { usePlaylistsStore } from "@/store/playlist-store";
import { PlaylistJson, PlaylistsResponse } from "@/graphql/types";
import { omit } from "lodash";
import { useToast } from "@/hooks/use-toast";
/**
 * Hook for handling playlist-related queries
 * @returns Object containing playlist query methods
 */
const usePlaylistQuery = () => {
  const [getPlaylistsQuery] = useGetPlaylistsPageLazyQuery();
  const [getPlaylistQuery] = useGetPlaylistLazyQuery();
  const { toast } = useToast();

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
      console.log(err);
      toast({
        title: "Error",
        description: "Failed to fetch playlists",
      });
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
      console.log(err);
      toast({
        title: "Error",
        description: "Failed to fetch playlist",
      });
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
      console.log("readPlaylist", data);
      if (!data || !data.readPlaylist) throw Error("Failed to read playlist");

      return data.readPlaylist;
    } catch (err) {
      console.log(err);
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
      console.log(err);
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
    if (!playlistTitle) return false;
    const cleanedPlaylistJson = playlistJson?.map((item) =>
      omit(item, ["__typename"])
    );
    try {
      const input = {
        variables: {
          mutatePlaylistInput: {
            id: playlistId,
            name: playlistTitle,
            listJson: cleanedPlaylistJson,
          },
        },
        context: { headers: { Authorization: `Bearer ${token}` } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        update: (cache: any) => {
          cache.evict({
            fieldName: "playlist",
            args: { id: playlistId },
          });
          cache.gc();
        },
      };
      const result = await updatePlaylistMutate(input);
      return Boolean(result.data?.updatePlaylist);
    } catch (err) {
      console.log(err);
      if (err instanceof Error && "graphQLErrors" in err) {
        toast({
          title: "Error",
          description: "Failed to update playlist",
        });
      }
      if (err instanceof Error && "networkError" in err) {
        toast({
          title: "Error",
          description: "Failed to update playlist",
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
        onError: (error) => {
          console.log(error);
          toast({
            title: "Error",
            description: "Failed to remove playlist",
          });
        },
      });

      return !!data?.removePlaylist;
    } catch (err) {
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
  const { getPlaylists, getPlaylistDetails } = usePlaylistQuery();
  const { readPlaylist, savePlaylist, removePlaylist, updatePlaylist } =
    usePlaylistMutation();
  const { convertToYoutube, convertToSpotify } = usePlaylistConverter();

  return {
    getPlaylists,
    getPlaylistDetails,
    readPlaylist,
    savePlaylist,
    removePlaylist,
    updatePlaylist,
    convertToYoutube,
    convertToSpotify,
  };
};
