import { useEffect } from "react";

export default function OAuthCallbackPage() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code && state) {
      window.opener?.postMessage(
        {
          type: "OAUTH_CALLBACK",
          code,
          state,
        },
        window.location.origin
      );
    }
    window.close();
  }, []);
}
