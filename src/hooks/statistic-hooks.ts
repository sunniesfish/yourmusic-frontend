import {
  useGetPlaylistsPageQuery,
  useGetStatisticQuery,
  useSaveStatisticMutation,
} from "@/graphql/hooks";
import { MutateStatisticInput, Statistic } from "@/graphql/types";
import { TopRanks } from "@/lib/statistic-calculator";
import { useCallback } from "react";

const ERROR_CODES = {
  NO_USER: "NO_USER",
  FETCH_ERROR: "FETCH_ERROR",
  SAVE_ERROR: "SAVE_ERROR",
} as const;

type StatisticErrorCode = keyof typeof ERROR_CODES;

interface StatisticError extends Error {
  code: StatisticErrorCode;
}

export const useStatistic = (userId: string) => {
  const { data: statisticData, loading: statisticLoading } =
    useGetStatisticQuery({
      variables: { userId },
      skip: !userId,
    });

  const { data: playlistData, loading: playlistLoading } =
    useGetPlaylistsPageQuery({
      variables: {
        limit: 1000,
        orderBy: "createdAt",
        page: 1,
      },
      skip:
        !userId ||
        (statisticData?.statistic &&
          !isStatisticOutdated(statisticData.statistic)),
    });

  const [saveStatistic] = useSaveStatisticMutation();

  const calculateStatisticWithWorker = useCallback(
    (playlists: any[]): Promise<TopRanks> => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(
          new URL("../../public/statistics.js", import.meta.url)
        );

        worker.onmessage = (event) => {
          worker.terminate();
          resolve(event.data);
        };

        worker.onerror = (error) => {
          worker.terminate();
          reject(error);
        };

        worker.postMessage({ playlists });
      });
    },
    []
  );

  const analyzeStatistic = useCallback(async (): Promise<
    Partial<Statistic>
  > => {
    if (!userId) {
      throw createStatisticError(ERROR_CODES.NO_USER, "User ID is required");
    }

    try {
      if (
        statisticData?.statistic &&
        !isStatisticOutdated(statisticData.statistic)
      ) {
        return statisticData.statistic;
      }

      if (playlistData?.playlistsPage?.playlists) {
        const topRanks = await calculateStatisticWithWorker(
          playlistData.playlistsPage.playlists
        );

        const statisticInput: MutateStatisticInput = {
          userId,
          artistRankJson: {
            first: topRanks.artistRank[0]?.name || "",
            second: topRanks.artistRank[1]?.name || "",
            third: topRanks.artistRank[2]?.name || "",
          },
          albumRankJson: {
            first: topRanks.albumRank[0]?.name || "",
            second: topRanks.albumRank[1]?.name || "",
            third: topRanks.albumRank[2]?.name || "",
          },
          titleRankJson: {
            first: topRanks.titleRank[0]?.name || "",
            second: topRanks.titleRank[1]?.name || "",
            third: topRanks.titleRank[2]?.name || "",
          },
        };

        await saveStatistic({
          variables: {
            saveStatisticInput: statisticInput,
          },
        });
        return statisticInput;
      }

      throw createStatisticError(
        ERROR_CODES.FETCH_ERROR,
        "Fail to fetch playlist data"
      );
    } catch (err) {
      if (err instanceof Error) throw err;
      throw createStatisticError(
        ERROR_CODES.FETCH_ERROR,
        "Fail to analyze statistic"
      );
    }
  }, [
    userId,
    statisticData,
    playlistData,
    saveStatistic,
    calculateStatisticWithWorker,
  ]);

  return {
    analyzeStatistic,
    isLoading: statisticLoading || playlistLoading,
    statistic: statisticData?.statistic,
  };
};

function isStatisticOutdated(statistic: { updatedAt: string }): boolean {
  const today = new Date();
  const updatedDate = new Date(statistic.updatedAt);

  return updatedDate.toDateString() !== today.toDateString();
}

function createStatisticError(
  code: StatisticError["code"],
  message: string
): StatisticError {
  const error = new Error(message) as StatisticError;
  error.code = code;
  return error;
}
