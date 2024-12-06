import { useQuery } from "@apollo/client";
import { GET_STATISTIC } from "@/graphql/queries/statistic";
import { Statistic } from "@/graphql/types/generated";

export const useStatistic = () => {
  const getStatistic = async (user: { id: string }) => {
    const { data } = useQuery<Statistic>(GET_STATISTIC, {
      variables: { id: user?.id },
    });
    return data;
  };

  const analyzeStatistic = async (user: { id: string }, data: any) => {
    return data;
  };

  return { getStatistic, analyzeStatistic };
};
