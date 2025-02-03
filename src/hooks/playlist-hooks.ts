"use client";

import {
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
import { PlaylistJson } from "@/graphql/types";

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
  }: PlaylistQueryParams) => {
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
    playlist,
  }: PlaylistMutationParams): Promise<boolean> => {
    try {
      const { data } = await savePlaylistMutate({
        variables: {
          savePlaylistInput: {
            name: playlist.name,
            listJson: playlist.listJson || [],
          },
        },
        context: { headers: { Authorization: `Bearer ${token}` } },
      });
      return data?.savePlaylist || false;
    } catch (err) {
      console.error("Failed to save playlist:", err);
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
      });
      return !!data?.removePlaylist;
    } catch (err) {
      console.error("Failed to remove playlist:", err);
      return false;
    }
  };

  return { readPlaylist, savePlaylist, removePlaylist };
};

const usePlaylistConverter = () => {
  const [convertToYoutubeMutate] = useConvertToYoutubePlaylistMutation();
  const [convertToSpotifyMutate] = useConvertToSpotifyPlaylistMutation();

  const convertToYoutube = async (data: PlaylistJson[]) => {
    try {
      const { data: result } = await convertToYoutubeMutate({
        variables: { listJSON: data },
      });
      return result?.convertToYoutubePlaylist || false;
    } catch (err) {
      console.error("Failed to convert to YouTube playlist:", err);
      return false;
    }
  };

  const convertToSpotify = async (data: PlaylistJson[]) => {
    try {
      const { data: result } = await convertToSpotifyMutate({
        variables: { listJSON: data },
      });
      return result?.convertToSpotifyPlaylist || false;
    } catch (err) {
      console.error("Failed to convert to Spotify playlist:", err);
      return false;
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
