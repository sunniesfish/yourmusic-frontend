import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "../styles/frutiger-aero.css";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic here
    console.log("Changing password:", {
      oldPassword,
      newPassword,
      confirmPassword,
    });
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 frutiger-aero-card p-6 rounded-lg shadow-lg w-full max-w-md">
          <Dialog.Title className="text-2xl font-bold text-blue-900 mb-4">
            Change Password
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="old-password"
                className="block text-sm font-medium text-blue-900 mb-1"
              >
                Old Password
              </label>
              <Input
                id="old-password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="frutiger-aero-input w-full"
                required
              />
            </div>
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-blue-900 mb-1"
              >
                New Password
              </label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="frutiger-aero-input w-full"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-blue-900 mb-1"
              >
                Confirm New Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="frutiger-aero-input w-full"
                required
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button
                type="button"
                onClick={onClose}
                variant="secondary"
                className="frutiger-aero-button-secondary"
              >
                Cancel
              </Button>
              <Button type="submit" className="frutiger-aero-button">
                Change Password
              </Button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full w-6 h-6 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              aria-label="Close"
            >
              <X className="h-4 w-4 text-blue-900" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ChangePasswordModal;
