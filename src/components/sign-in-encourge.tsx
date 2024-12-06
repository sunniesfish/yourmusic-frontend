import React from "react";
import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import "../styles/frutiger-aero.css";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: string;
}

const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  action,
}) => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/signup");
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 frutiger-aero-card p-6 rounded-lg shadow-lg w-full max-w-md">
          <Dialog.Title className="text-2xl font-bold text-blue-900 mb-4">
            Sign In Required
          </Dialog.Title>
          <Dialog.Description className="text-blue-800 mb-6">
            To {action}, please sign in to your account.
          </Dialog.Description>
          <div className="flex justify-end space-x-4">
            <Button
              onClick={onClose}
              variant="secondary"
              className="frutiger-aero-button-secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleSignIn} className="frutiger-aero-button">
              Sign In
            </Button>
          </div>
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

export default SignInModal;
