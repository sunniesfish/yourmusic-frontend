/** @type {import('next').NextConfig} */
const config = {
  redirects: async () => [
    {
      source: "/",
      destination: "/playlists/newplaylist",
      permanent: true,
    },
  ],
};

export default config;
