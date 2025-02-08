export const handleOAuth = (authUrl: string, apiDomain: string) => {
  let oauthUrl = "";
  if (apiDomain === "youtube") {
    oauthUrl = generateYoutubeOAuthUrl(authUrl);
  }
  if (apiDomain === "spotify") {
    oauthUrl = generateSpotifyOAuthUrl(authUrl);
  }
  window.open(oauthUrl, "_blank");
};

const generateYoutubeOAuthUrl = (authUrl: string) => {
  const clientId = process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_YOUTUBE_REDIRECT_URI;
  const scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"];
  const oauthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    " "
  )}&response_type=code`;
  return oauthUrl;
};

const generateSpotifyOAuthUrl = (authUrl: string) => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
  const scopes = ["playlist-modify-private"];
  const oauthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    " "
  )}&response_type=code`;
  return oauthUrl;
};
