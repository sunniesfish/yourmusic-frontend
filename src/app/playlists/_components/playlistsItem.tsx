import { Button } from "@/components/ui/button";
import { Playlist } from "@/graphql/types";
import { Share2, Trash2 } from "lucide-react";
import Image from "next/image";

export function PlaylistsItem({
  playlist,
  onDelete,
}: {
  playlist: Partial<Playlist>;
  onDelete: (id: number) => void;
}) {
  const handleDelete = () => {
    if (!playlist.id) return;
    onDelete(Number(playlist.id));
  };
  return (
    <div
      key={playlist.id}
      className="group relative rounded-lg border bg-card p-4 hover:shadow-sm transition-shadow"
    >
      <div className="flex gap-4">
        <div className="relative h-20 w-20 shrink-0">
          <Image
            src={playlist.listJson?.[0]?.thumbnail ?? "/placeholder.svg"}
            alt=""
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="font-medium leading-none">{playlist.name}</h3>
          <p className="text-sm text-muted-foreground">{playlist.createdAt}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share playlist</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete playlist</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
