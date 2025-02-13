import { useEffect } from "react";
import { ApiDomain } from "@/graphql/types";
import { OAuthState } from "@/types/api";
export function useOAuthMessage(
  options: {
    onSuccess: (code: string, state: string) => Promise<void>;
    onError: (error: Error) => void;
  },
  apiDomain: ApiDomain
) {
  const { onSuccess, onError } = options;

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const { code, state, type } = event.data;
      console.log("handleMessage called", event.data);
      try {
        if (event.origin !== window.location.origin) {
          throw new Error("Invalid origin");
        }
        if (apiDomain !== JSON.parse(state).domain) {
          return;
        }
        if (type !== "OAUTH_CALLBACK") {
          throw new Error("Invalid type");
        }
        if (!state) {
          throw new Error("State is required");
        }
        await onSuccess(code, state);
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

export function validateOAuthState(state: OAuthState, receivedState: string) {
  if (state.domain !== JSON.parse(receivedState).domain) {
    return false;
  }
  if (state.id !== JSON.parse(receivedState).id) {
    return false;
  }
  return true;
}
