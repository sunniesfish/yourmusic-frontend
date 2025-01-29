import * as Dialog from "@radix-ui/react-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useRemovePlaylistMutation } from "@/graphql/hooks";

interface DeletePlaylistDialogProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;
  playlistId: number;
}

export function DeletePlaylistDialog({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  playlistId,
}: DeletePlaylistDialogProps) {
  const [deletePlaylist] = useRemovePlaylistMutation({
    onCompleted: () => setIsDeleteModalOpen(false),
  });

  return (
    <Dialog.Root open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold">
            Confirm Deletion
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-muted-foreground">
            Are you sure you want to delete this playlist? This action cannot be
            undone.
          </Dialog.Description>

          <div className="mt-6 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deletePlaylist({ variables: { id: playlistId } })}
            >
              Delete
            </Button>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface Song {
  title?: string | null;
  artist?: string | null;
  album?: string | null;
  thumbnail?: string | null;
}

interface SongTableProps {
  songs: Song[];
}

export function SongTable({ songs }: SongTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Cover</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead className="hidden md:table-cell">Album</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song, index) => (
            <TableRow key={`${song.title}-${index}`}>
              <TableCell>
                <div className="relative h-10 w-10">
                  <Image
                    src={song.thumbnail || "/placeholder.svg"}
                    alt={song.title || ""}
                    fill
                    className="rounded object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell className="hidden md:table-cell">
                {song.album}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search song</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
