"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useStatistic } from "@/hooks/use-statistic";
import { redirect } from "next/navigation";
import { RankCard } from "../../components/rank-card";
import { useHydration } from "@/hooks/use-hydration";

export default function StatisticsPage() {
  const { user } = useAuthStore();
  const isHydrated = useHydration();
  const { statistic, isLoading } = useStatistic(user?.id ?? "");

  useEffect(() => {
    if (!user && isHydrated) {
      redirect("/auth/sign-in");
    }
  }, [user, isHydrated]);
  return (
    <>
      {isLoading && !statistic ? (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">Loading...</div>
        </div>
      ) : !isLoading && !statistic ? (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            No statistic data
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Your Music Statistics
              </h1>
              <p className="text-sm text-muted-foreground">
                Based on your playlist history
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <RankCard
                title="Top Artists"
                ranks={
                  statistic?.artistRankJson ?? {
                    first: "",
                    second: "",
                    third: "",
                  }
                }
              />
              <RankCard
                title="Top Albums"
                ranks={
                  statistic?.albumRankJson ?? {
                    first: "",
                    second: "",
                    third: "",
                  }
                }
              />
              <RankCard
                title="Top Songs"
                ranks={
                  statistic?.titleRankJson ?? {
                    first: "",
                    second: "",
                    third: "",
                  }
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
