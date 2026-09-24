/* global process */

const apiProxyTarget = process.env.API_PROXY_TARGET?.trim().replace(/\/+$/, "");
const isStaticExport = process.env.TELEGRAM_STATIC_EXPORT === "true";

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    unoptimized: isStaticExport,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
      }
    : {
        async rewrites() {
          if (!apiProxyTarget) return [];
          return [
            {
              source: "/api/:path*",
              destination: `${apiProxyTarget}/:path*`,
            },
          ];
        },
      }),
};

export default nextConfig;
