import { useMutation, useQuery } from "@apollo/client";
import { Playlist } from "@/graphql/types/generated";
import { GET_PLAYLIST, GET_PLAYLISTS } from "@/graphql/queries/playlist";
import {
  READ_PLAYLIST,
  SAVE_PLAYLIST,
  REMOVE_PLAYLIST,
  CONVERT_TO_SPOTIFY_PLAYLIST,
  CONVERT_TO_YOUTUBE_PLAYLIST,
} from "@/graphql/mutations/playlist";

export const usePlaylist = () => {
  const getPlaylists = async (token: string) => {
    const { data } = useQuery<Playlist[]>(GET_PLAYLISTS, {
      context: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    return data;
  };

  const getPlaylistDetails = async (token: string, playlistId: string) => {
    const { data } = useQuery<Playlist>(GET_PLAYLIST, {
      variables: { id: playlistId },
      context: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    return data;
  };

  const readPlaylist = async (link: string) => {
    const [mutate] = useMutation<Playlist>(READ_PLAYLIST, {
      variables: { link },
    });
    return mutate;
  };

  const savePlaylist = async (token: string, playlist: Playlist) => {
    const [mutate] = useMutation<Playlist>(SAVE_PLAYLIST, {
      variables: { playlist },
      context: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    return mutate;
  };

  const removePlaylist = async (token: string, playlistId: string) => {
    const [mutate] = useMutation<Boolean>(REMOVE_PLAYLIST, {
      variables: { id: playlistId },
      context: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    return mutate;
  };

  const convertToSpotifyPlaylist = async (data: any) => {
    const [mutate] = useMutation<Boolean>(CONVERT_TO_SPOTIFY_PLAYLIST, {
      variables: { data },
    });
    return mutate;
  };

  const convertToYoutubePlaylist = async (data: any) => {
    const [mutate] = useMutation<Boolean>(CONVERT_TO_YOUTUBE_PLAYLIST, {
      variables: { data },
    });
    return mutate;
  };

  return {
    getPlaylists,
    getPlaylistDetails,
    readPlaylist,
    savePlaylist,
    removePlaylist,
    convertToSpotifyPlaylist,
    convertToYoutubePlaylist,
  };
};
