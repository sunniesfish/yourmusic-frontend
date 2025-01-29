"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useStatistic } from "@/hooks/statistic-hooks";
import { redirect } from "next/navigation";
import { RankCard } from "./components/rank-card";

export default function StatisticsPage() {
  const { user } = useAuthStore();
  const { statistic, isLoading } = useStatistic(user?.id ?? "");

  useEffect(() => {
    if (!user || user.id === "") {
      redirect("/auth/sign-in");
    }
  }, [user]);
  return (
    <>
      {isLoading || !statistic ? (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">Loading...</div>
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
