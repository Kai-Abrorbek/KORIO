/**
 * 어드민은 **정적 export** 로 나간다 (telegram-app 과 같은 방식).
 *
 * 왜: 배포 인프라가 이미 그 모양이다 — nginx 로 정적 파일을 서빙하고 Caddy 가
 * `/api/*` 를 API 로 넘긴다. 같은 오리진이라 CORS 설정이 하나 줄고, blue/green
 * 무중단 교체도 그대로 재사용된다.
 *
 * 서버 렌더링을 안 쓰는 대가는 없다 — 어드민의 모든 데이터는 로그인한 뒤
 * 토큰으로 가져오므로 어차피 클라이언트에서 부른다.
 */
const staticExport = process.env.ADMIN_STATIC_EXPORT === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(staticExport ? { output: "export" } : {}),
  // 개발 중에는 로컬 API 로 프록시한다. 배포에서는 Caddy 가 같은 일을 한다
  ...(staticExport
    ? {}
    : {
        async rewrites() {
          return [
            {
              source: "/api/:path*",
              destination: `${process.env.API_PROXY_TARGET ?? "http://127.0.0.1:3000"}/:path*`,
            },
          ];
        },
      }),
};

export default nextConfig;
