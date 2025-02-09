import { useEffect } from "react";

export function useOAuthMessage(options: {
  onSuccess: (authCode: string, receivedState: string) => Promise<void>;
  onError: (error: Error) => void;
}) {
  const { onSuccess, onError } = options;

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const { authCode, receivedState, type } = event.data;
      try {
        if (event.origin !== window.location.origin) {
          throw new Error("Invalid origin");
        }
        if (type !== "OAUTH_CALLBACK") {
          throw new Error("Invalid type");
        }
        if (!receivedState) {
          throw new Error("State is required");
        }
        await onSuccess(authCode, receivedState);
      } catch (error) {
        onError(error as Error);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [onSuccess, onError]);
}
