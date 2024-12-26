import {
  useGetPlaylistsPageQuery,
  useGetStatisticQuery,
  useSaveStatisticMutation,
} from "@/graphql/hooks";
import { calculateTopRanks } from "@/hooks/lib/statistic-calculator";

interface StatisticError extends Error {
  code: "NO_USER" | "FETCH_ERROR" | "SAVE_ERROR";
}

export const useStatistic = () => {
  const getStatistic = async (user: { id: string }): Promise<any> => {
    if (!user?.id) {
      throw createStatisticError("NO_USER", "사용자 ID가 필요합니다.");
    }

    try {
      const { data } = await useGetStatisticQuery({
        variables: { userId: user.id },
      });
      return data;
    } catch (err) {
      throw createStatisticError(
        "FETCH_ERROR",
        "Failed to fetch statistic data. Please try again later."
      );
    }
  };

  const analyzeStatistic = async (user: { id: string }) => {
    if (!user?.id) {
      throw createStatisticError("NO_USER", "사용자 ID가 필요합니다.");
    }

    try {
      const statistic = await getStatistic(user);
      const isStatisticOutdated =
        !statistic ||
        new Date(statistic.statistic.updatedAt).toDateString() !==
          new Date().toDateString();

      if (isStatisticOutdated) {
        const { data } = await useGetPlaylistsPageQuery({
          variables: {
            limit: 1000,
            orderBy: "createdAt",
            page: 1,
            includeListJson: true,
          },
        });

        if (!data?.playlistsPage?.playlists) {
          throw createStatisticError(
            "FETCH_ERROR",
            "Failed to fetch playlist data. Please try again later."
          );
        }

        const topRanks = calculateTopRanks(data.playlistsPage.playlists);

        try {
          await useSaveStatisticMutation({
            variables: {
              saveStatisticInput: {
                userId: user.id,
                artistRankJson: {
                  first: topRanks.artistRank[0]?.name,
                  second: topRanks.artistRank[1]?.name,
                  third: topRanks.artistRank[2]?.name,
                },
                albumRankJson: {
                  first: topRanks.albumRank[0]?.name,
                  second: topRanks.albumRank[1]?.name,
                  third: topRanks.albumRank[2]?.name,
                },
                titleRankJson: {
                  first: topRanks.titleRank[0]?.name,
                  second: topRanks.titleRank[1]?.name,
                  third: topRanks.titleRank[2]?.name,
                },
              },
            },
          });
        } catch (err) {
          throw createStatisticError(
            "SAVE_ERROR",
            "Failed to save statistic data. Please try again later."
          );
        }
      }

      return statistic?.statistic;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw createStatisticError(
        "FETCH_ERROR",
        "An error occurred while analyzing the statistic. Please try again later."
      );
    }
  };

  return { getStatistic, analyzeStatistic };
};

function createStatisticError(
  code: StatisticError["code"],
  message: string
): StatisticError {
  const error = new Error(message) as StatisticError;
  error.code = code;
  return error;
}
