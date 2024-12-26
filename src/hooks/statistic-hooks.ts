import {
  useGetPlaylistsPageQuery,
  useGetStatisticQuery,
} from "@/graphql/hooks";
import { parsePlaylistJSONArray } from "@/lib/utils";

export const useStatistic = () => {
  const getStatistic = async (user: { id: string }) => {
    const { data } = useGetStatisticQuery({
      variables: { userId: user?.id },
    });
    return data;
  };

  const analyzeStatistic = async (user: { id: string }, data: any) => {
    const statistic = await getStatistic(user);
    if (
      !statistic ||
      new Date(statistic.statistic.updatedAt).toDateString() !==
        new Date().toDateString()
    ) {
      const { data } = useGetPlaylistsPageQuery({
        variables: {
          limit: 1000,
          orderBy: "createdAt",
          page: 1,
          includeListJson: true,
        },
      });
      data?.playlistsPage.playlists.map((playlist) => {
        if (playlist.listJson) {
          // const playlistData = parsePlaylistJSONArray();
          // console.log(playlistData);
        }
      });
    }
    return statistic?.statistic;
  };

  return { getStatistic, analyzeStatistic };
};
