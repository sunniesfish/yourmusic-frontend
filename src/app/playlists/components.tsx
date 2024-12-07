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
import { Search } from "lucide-react";
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
    onCompleted: () => {
      setIsDeleteModalOpen(false);
    },
  });
  const confirmDelete = () => {
    deletePlaylist({ variables: { id: playlistId } });
  };

  return (
    <Dialog.Root open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 frutiger-aero-card p-6 rounded-lg w-full max-w-md">
          <Dialog.Title className="text-xl font-bold text-blue-900 mb-4">
            Confirm Deletion
          </Dialog.Title>
          <Dialog.Description className="text-blue-800 mb-6">
            Are you sure you want to delete this playlist?
          </Dialog.Description>
          <div className="flex justify-end space-x-4">
            <button
              className="frutiger-aero-button-secondary px-4 py-2 rounded-md"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="frutiger-aero-button px-4 py-2 rounded-md text-white"
              onClick={confirmDelete}
            >
              Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface Song {
  _typename?: "PlaylistJSON";
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
    <div className="frutiger-aero-card overflow-hidden rounded-lg">
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
          {songs.map((song) => (
            <TableRow key={song.title}>
              <TableCell>
                <Image
                  src={song.thumbnail || "/placeholder.svg?height=40&width=40"}
                  alt={song.title || ""}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell className="font-medium">{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell className="hidden md:table-cell">
                {song.album}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
