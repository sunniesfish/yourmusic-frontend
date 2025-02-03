import {
  useGetPlaylistsPageQuery,
  useGetStatisticQuery,
  useSaveStatisticMutation,
} from "@/graphql/hooks";
import { MutateStatisticInput, Playlist, Statistic } from "@/graphql/types";
import { useCallback, useState, useEffect } from "react";

const ERROR_CODES = {
  NO_USER: "NO_USER",
  FETCH_ERROR: "FETCH_ERROR",
  SAVE_ERROR: "SAVE_ERROR",
} as const;

type StatisticErrorCode = keyof typeof ERROR_CODES;

interface StatisticError extends Error {
  code: StatisticErrorCode;
}

export interface TopRanks {
  artistRank: RankItem[];
  albumRank: RankItem[];
  titleRank: RankItem[];
}

interface RankItem {
  name: string;
  count: number;
  rank?: number;
}

/**
 * Hook for handling user statistics
 * @param {string} userId - ID of the user to get statistics for
 * @returns {Object} Object containing statistic data and loading state
 */
export const useStatistic = (userId: string) => {
  const [calculatedStatistic, setCalculatedStatistic] =
    useState<Partial<Statistic> | null>(null);
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
        includeListJson: true,
      },
      skip:
        !userId ||
        (statisticData?.statistic &&
          !isStatisticOutdated(statisticData.statistic)),
    });

  const [saveStatistic] = useSaveStatisticMutation();

  const calculateStatisticWithWorker = useCallback(
    (playlists: Playlist[]): Promise<TopRanks> => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(
          new URL("../../public/statistics.js", import.meta.url)
        );

        const cleanup = () => worker.terminate();

        worker.onmessage = (event) => {
          cleanup();
          resolve(event.data);
        };

        worker.onerror = (error) => {
          cleanup();
          reject(error);
        };

        worker.postMessage({ playlists });
      });
    },
    []
  );

  useEffect(() => {
    const calculateAndSetStatistic = async () => {
      if (!userId) {
        return;
      }

      try {
        if (
          statisticData?.statistic &&
          !isStatisticOutdated(statisticData.statistic)
        ) {
          setCalculatedStatistic(statisticData.statistic);
          return;
        }

        if (!playlistData?.playlistsPage?.playlists) {
          throw createStatisticError(
            ERROR_CODES.FETCH_ERROR,
            "Fail to fetch playlist data"
          );
        }

        const topRanks = await calculateStatisticWithWorker(
          playlistData.playlistsPage.playlists
        );

        const statisticInput: MutateStatisticInput = {
          userId,
          artistRankJson: {
            first: topRanks.artistRank[0]?.name ?? "",
            second: topRanks.artistRank[1]?.name ?? "",
            third: topRanks.artistRank[2]?.name ?? "",
          },
          albumRankJson: {
            first: topRanks.albumRank[0]?.name ?? "",
            second: topRanks.albumRank[1]?.name ?? "",
            third: topRanks.albumRank[2]?.name ?? "",
          },
          titleRankJson: {
            first: topRanks.titleRank[0]?.name ?? "",
            second: topRanks.titleRank[1]?.name ?? "",
            third: topRanks.titleRank[2]?.name ?? "",
          },
        };

        await saveStatistic({
          variables: {
            saveStatisticInput: statisticInput,
          },
        });

        setCalculatedStatistic(statisticInput);
      } catch (err) {
        console.error(err);
        // 에러 처리를 위한 상태 관리가 필요하다면 여기에 추가
      }
    };

    if (!statisticLoading && !playlistLoading) {
      calculateAndSetStatistic();
    }
  }, [
    userId,
    statisticData,
    playlistData,
    statisticLoading,
    playlistLoading,
    saveStatistic,
    calculateStatisticWithWorker,
  ]);

  return {
    statistic: calculatedStatistic,
    isLoading: statisticLoading || playlistLoading,
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
