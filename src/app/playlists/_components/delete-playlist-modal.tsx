import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { usePlaylist } from "@/hooks/use-playlist";

interface DeletePlaylistDialogProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;
  playlistId: number;
  fetchMore: () => void;
  token: string;
}

export function DeletePlaylistDialog({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  playlistId,
  token,
  fetchMore,
}: DeletePlaylistDialogProps) {
  const { removePlaylist } = usePlaylist();

  const handleDelete = async () => {
    const result = await removePlaylist({
      token: token ?? "",
      playlistId: playlistId,
    });
    if (result) {
      setIsDeleteModalOpen(false);
      fetchMore();
    }
  };

  return (
    <Dialog.Root open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-lg z-50">
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
            <Button variant="destructive" onClick={handleDelete}>
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
