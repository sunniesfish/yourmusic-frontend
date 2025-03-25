/** @type {import('next').NextConfig} */
const config = {
  redirects: async () => [
    {
      source: "/",
      destination: "/playlists/newplaylist",
      permanent: true,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/image/**",
      },
    ],
  },
};

export default config;
