import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
export async function POST(request: NextRequest) {
  const { playlistId } = await request.json();

  if (!playlistId) {
    return new Response("Playlist ID is required", { status: 400 });
  }

  revalidatePath(`/playlists/${playlistId}`);

  return new Response("OK", { status: 200 });
}
