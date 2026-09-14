/* global process */

const apiProxyTarget = process.env.API_PROXY_TARGET?.trim().replace(/\/+$/, "");
const isStaticExport = process.env.TELEGRAM_STATIC_EXPORT === "true";

/** @type {import("next").NextConfig} */
const nextConfig = {
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
              source: "/api/auth/telegram/mini-app",
              destination: `${apiProxyTarget}/auth/telegram/mini-app`,
            },
          ];
        },
      }),
};

export default nextConfig;
