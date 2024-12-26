import {
  useConvertToSpotifyPlaylistMutation,
  useConvertToYoutubePlaylistMutation,
  useGetPlaylistQuery,
  useGetPlaylistsPageQuery,
  useReadPlaylistMutation,
  useRemovePlaylistMutation,
  useSavePlaylistMutation,
} from "@/graphql/hooks";
import { Playlist } from "@/graphql/types";
import { usePlaylistsStore } from "@/store/playlist-store";

export const usePlaylist = () => {
  const getPlaylists = async (
    token: string,
    page: number,
    limit: number,
    orderBy: "createdAt" | "name"
  ) => {
    const { data } = useGetPlaylistsPageQuery({
      context: {
        headers: { Authorization: `Bearer ${token}` },
      },
      variables: {
        page: page,
        limit: limit,
        orderBy: orderBy,
      },
    });
    if (data) {
      usePlaylistsStore.getState().setPlaylists([]);
      return data;
    }

    const getPlaylistDetails = async (token: string, playlistId: number) => {
      const { data } = useGetPlaylistQuery({
        variables: { id: playlistId },
        context: {
          headers: { Authorization: `Bearer ${token}` },
        },
      });
      return data;
    };

    const readPlaylist = async (link: string) => {
      const [mutate] = useReadPlaylistMutation({
        variables: { link },
      });
      const data = await mutate();
      return data.data?.readPlaylist ?? null;
    };

    const savePlaylist = async (token: string, playlist: Playlist) => {
      const [mutate] = useSavePlaylistMutation({
        variables: { savePlaylistInput: playlist },
        context: {
          headers: { Authorization: `Bearer ${token}` },
        },
      });
      const data = await mutate();
      if (data) {
        return data.data;
      }
      return null;
    };

    const removePlaylist = async (token: string, playlistId: number) => {
      const [mutate] = useRemovePlaylistMutation({
        variables: { id: playlistId },
        context: {
          headers: { Authorization: `Bearer ${token}` },
        },
      });
      const data = await mutate();
      if (data) {
        return data.data;
      }
      return null;
    };

    const convertToSpotifyPlaylist = async (data: any) => {
      const [mutate] = useConvertToSpotifyPlaylistMutation({
        variables: { listJSON: data },
      });
      const result = await mutate();
      return result;
    };

    const convertToYoutubePlaylist = async (data: any) => {
      const [mutate] = useConvertToYoutubePlaylistMutation({
        variables: { listJSON: data },
      });
      const result = await mutate();
      return result;
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
};
