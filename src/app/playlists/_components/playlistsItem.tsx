"use client";
import { Button } from "@/components/ui/button";
import { Playlist } from "@/graphql/types";
import { Share2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PlaylistsItemProps {
  playlist: Partial<Playlist>;
  onDelete: (id: number) => void;
}

export function PlaylistsItem({ playlist, onDelete }: PlaylistsItemProps) {
  const [isPrefetched, setIsPrefetched] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    if (!playlist.id) return;
    onDelete(Number(playlist.id));
  };

  const handleMouseEnter = () => {
    console.log("handleMouseEnter", playlist.id);
    if (!isPrefetched) {
      router.prefetch(`/playlists/${playlist.id}`);
      console.log("prefetch", `/playlists/${playlist.id}`);
      setIsPrefetched(true);
    }
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
        <Link
          href={`/playlists/${playlist.id}`}
          prefetch={false}
          onMouseEnter={handleMouseEnter}
        >
          <div className="flex-1 space-y-1">
            <h3 className="font-medium leading-none">{playlist.name}</h3>
            <p className="text-sm text-muted-foreground">
              {playlist.createdAt}
            </p>
          </div>
        </Link>
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
