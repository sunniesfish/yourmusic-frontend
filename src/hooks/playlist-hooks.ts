import {
  useConvertToSpotifyPlaylistMutation,
  useConvertToYoutubePlaylistMutation,
  useGetPlaylistQuery,
  useGetPlaylistsPageQuery,
  useReadPlaylistMutation,
  useRemovePlaylistMutation,
  useSavePlaylistMutation,
} from "@/graphql/hooks";
import { Playlist, PlaylistJson } from "@/graphql/types";
import { usePlaylistsStore } from "@/store/playlist-store";

// 타입 정의
interface PlaylistQueryParams {
  token: string;
  page: number;
  limit: number;
  orderBy: "createdAt" | "name";
}

interface PlaylistMutationParams {
  token: string;
  playlist: Playlist;
  playlistId?: number;
}

// 쿼리 관련 훅
const usePlaylistQuery = () => {
  const getPlaylists = async ({
    token,
    page,
    limit,
    orderBy,
  }: PlaylistQueryParams) => {
    try {
      const { data } = await useGetPlaylistsPageQuery({
        context: { headers: { Authorization: `Bearer ${token}` } },
        variables: { page, limit, orderBy, includeListJson: false },
      });
      if (data) {
        usePlaylistsStore.getState().setPlaylists([]);
      }
      return data || null;
    } catch (err) {
      console.error("Failed to fetch playlists:", err);
      return null;
    }
  };

  const getPlaylistDetails = async (token: string, playlistId: number) => {
    try {
      const { data } = await useGetPlaylistQuery({
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

// 뮤테이션 관련 훅
const usePlaylistMutation = () => {
  const [readPlaylistMutate] = useReadPlaylistMutation();
  const [savePlaylistMutate] = useSavePlaylistMutation();
  const [removePlaylistMutate] = useRemovePlaylistMutation();

  const readPlaylist = async (link: string) => {
    try {
      const { data } = await readPlaylistMutate({ variables: { link } });
      return data?.readPlaylist || null;
    } catch (err) {
      console.error("Failed to read playlist:", err);
      return null;
    }
  };

  const savePlaylist = async ({ token, playlist }: PlaylistMutationParams) => {
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
      return data?.savePlaylist || null;
    } catch (err) {
      console.error("Failed to save playlist:", err);
      return null;
    }
  };

  const removePlaylist = async ({
    token,
    playlistId,
  }: PlaylistMutationParams) => {
    if (!playlistId) return null;
    try {
      const { data } = await removePlaylistMutate({
        variables: { id: playlistId },
        context: { headers: { Authorization: `Bearer ${token}` } },
      });
      return data?.removePlaylist || null;
    } catch (err) {
      console.error("Failed to remove playlist:", err);
      return null;
    }
  };

  return { readPlaylist, savePlaylist, removePlaylist };
};

// 변환 관련 훅
const usePlaylistConverter = () => {
  const [convertToYoutubeMutate] = useConvertToYoutubePlaylistMutation();

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

  return { convertToYoutube };
};

// 메인 훅
export const usePlaylist = () => {
  const { getPlaylists, getPlaylistDetails } = usePlaylistQuery();
  const { readPlaylist, savePlaylist, removePlaylist } = usePlaylistMutation();
  const { convertToYoutube } = usePlaylistConverter();

  return {
    getPlaylists,
    getPlaylistDetails,
    readPlaylist,
    savePlaylist,
    removePlaylist,
    convertToYoutube,
  };
};
