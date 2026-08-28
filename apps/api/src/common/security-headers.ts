import type { NextFunction, Request, Response } from 'express';

/**
 * 보안 헤더.
 *
 * helmet 을 안 쓴 이유: 우리 API 는 사실상 JSON 만 뱉고, helmet 이 켜는 것 중
 * 실제로 의미 있는 건 아래 몇 개뿐이다. 게다가 /auth/telegram/widget 은
 * 텔레그램 스크립트를 불러오는 HTML 이라 helmet 기본 CSP 를 그대로 켜면 깨진다.
 * 의존성 하나 늘리는 대신 필요한 것만 명시적으로 건다.
 */
export function securityHeaders() {
  return (req: Request, res: Response, next: NextFunction) => {
    // 브라우저가 Content-Type 을 무시하고 추측하지 못하게 (JSON → HTML 로 오해 방지)
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // 우리 응답을 남의 iframe 에 넣어 클릭재킹하는 걸 막는다
    res.setHeader('X-Frame-Options', 'DENY');
    // Referer 로 경로·쿼리(토큰 포함 가능)가 외부로 새 나가지 않게
    res.setHeader('Referrer-Policy', 'no-referrer');
    // 우리 API 는 카메라·마이크·위치 같은 걸 쓸 일이 없다
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=()',
    );
    // 서버 정체를 굳이 알려줄 필요 없다
    res.removeHeader('X-Powered-By');

    // HSTS 는 https 로 서비스될 때만 의미가 있다
    if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains',
      );
    }
    next();
  };
}
