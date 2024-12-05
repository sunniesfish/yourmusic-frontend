import { useMutation } from "@apollo/client";
import { REMOVE_PLAYLIST } from "@/graphql/mutations/playlist";
import * as Dialog from "@radix-ui/react-dialog";

interface DeletePlaylistDialogProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;
  playlistId: number;
}

export default function DeletePlaylistDialog({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  playlistId,
}: DeletePlaylistDialogProps) {
  const [deletePlaylist] = useMutation(REMOVE_PLAYLIST, {
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
