import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatisticRank } from "@/graphql/types";
import { Trophy } from "lucide-react";

export function RankCard({
  title,
  ranks,
}: {
  title: string;
  ranks: StatisticRank;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="font-medium">{ranks.first}</span>
        </div>
        <div className="flex items-center gap-3">
          <Trophy className="h-5 w-5 text-gray-400" />
          <span className="text-muted-foreground">{ranks.second}</span>
        </div>
        <div className="flex items-center gap-3">
          <Trophy className="h-5 w-5 text-amber-700" />
          <span className="text-muted-foreground">{ranks.third}</span>
        </div>
      </CardContent>
    </Card>
  );
}
