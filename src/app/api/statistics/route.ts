import { Playlist } from "@/graphql/types";
import { calculateTopRanks } from "@/lib/statistic-calculator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { playlists }: { playlists: Playlist[] } = body;
  try {
    const result = calculateTopRanks(playlists);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
