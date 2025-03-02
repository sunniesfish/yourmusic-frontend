import { useEffect } from "react";
import { ApiDomain } from "@/graphql/types";
import { OAuthState } from "@/types/api";
export function useOAuthMessage(
  options: {
    onSuccess: (code: string, state: string) => Promise<void>;
    onError: (error: Error) => void;
  },
  apiDomain: ApiDomain,
  dependencies: any[]
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
        if (!state) {
          throw new Error("State is required");
        }
        if (apiDomain !== JSON.parse(state).domain) {
          return;
        }
        if (type !== "OAUTH_CALLBACK") {
          throw new Error("Invalid type");
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
  }, dependencies);
}

export function validateOAuthState(state: OAuthState, receivedState: string) {
  try {
    if (!receivedState) {
      return false;
    }
    const parsedState = JSON.parse(receivedState);
    return state.domain === parsedState.domain && state.id === parsedState.id;
  } catch {
    return false;
  }
}
