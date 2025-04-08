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

const applyBundleAnalyzer = async () => {
  if (process.env.ANALYZE === "true") {
    const { default: withBundleAnalyzer } = await import(
      "@next/bundle-analyzer"
    );
    return withBundleAnalyzer({ enabled: true })(config);
  }
  return config;
};

export default applyBundleAnalyzer;
