import { useEffect } from "react";
import { ApiDomain } from "@/graphql/types";
import { OAuthState } from "@/types/api";
export function useOAuthMessage(
  options: {
    onSuccess: (code: string, state: string) => Promise<void>;
    onError: (error: Error) => void;
  },
  apiDomain: ApiDomain,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: any[]
) {
  const { onSuccess, onError } = options;

  useEffect(() => {
    if (!dependencies[0]) return;

    const handleMessage = async (event: MessageEvent) => {
      const { code, state, type } = event.data;

      if (
        event.origin !== window.location.origin ||
        type !== "OAUTH_CALLBACK" ||
        !state
      ) {
        return;
      }

      try {
        let parsedState;
        try {
          parsedState = JSON.parse(state);
        } catch (e) {
          console.log(e)
          return;
        }

        if (apiDomain !== parsedState.domain) {
          return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
