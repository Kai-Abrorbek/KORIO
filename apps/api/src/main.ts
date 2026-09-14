import './config/timezone'; // 반드시 최상단: 서버 타임존 KST 고정
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ForbiddenException, Logger, ValidationPipe } from '@nestjs/common';
import { json, raw, urlencoded } from 'express';
import { SPEECH_MAX_BYTES } from './speech/speech.constants';
import {
  corsOrigins,
  warnDirtySecrets,
  warnMissingOptionalSecrets,
} from './config/secrets';
import { securityHeaders } from './common/security-headers';
import { markShuttingDown } from './health/health.controller';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 리버스 프록시(Nginx/로드밸런서) 뒤에서 req.ip 가 프록시 IP 로 고정되면
  // 요청 제한이 전 세계를 한 명으로 묶어 버린다. X-Forwarded-For 를 믿게 한다.
  app.set('trust proxy', 1);
  app.use(securityHeaders());

  // 발음 평가용 오디오는 raw WAV 로 받는다. 전역 json 파서보다 먼저 물려야 한다.
  app.use(
    '/speech',
    raw({ type: 'audio/wav', limit: SPEECH_MAX_BYTES + 1024 }),
  );

  // 우리 API 에 오는 body 는 전부 작다. 기본값(100kb)도 굳이 열어둘 이유가 없다.
  // verify 로 원문을 붙여둔다 — 결제 웹훅 서명 검증은 파싱 전 바이트가 필요하다
  // (Toss·Uzum 등. 구글 RTDN 은 토큰만 꺼내 재조회하므로 원문이 필요 없다)
  app.use(
    json({
      limit: '64kb',
      verify: (req, _res, buf) => {
        (req as any).rawBody = buf;
      },
    }),
  );
  app.use(urlencoded({ extended: true, limit: '64kb' }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  // 네이티브 앱은 Origin 을 안 보내서 CORS 대상이 아니다(origin === undefined → 허용).
  // 브라우저에서 열린 제3자 사이트가 유저 토큰으로 우리 API 를 대신 호출하는 것만 막는다.
  // ALLOWED_ORIGINS=https://korio.app,https://admin.korio.app 형태로 넣으면 된다.
  //
  // ⚠️ **브라우저에서 도는 우리 것도 여기 넣어야 한다.** Telegram Mini App 이
  //    정확히 이것 때문에 통째로 막혔었다. 놓치기 쉬운 이유:
  //      · GET 은 Origin 을 안 보낸다 → /ready 같은 확인 요청은 멀쩡히 통과한다
  //      · curl 도 Origin 을 안 보낸다 → 손으로 테스트하면 정상으로 보인다
  //      · 브라우저는 **same-origin 이어도** POST/PATCH/DELETE 에 Origin 을 붙인다
  //    그래서 "사람이 열 때만 터지고 확인할 때는 멀쩡한" 상태가 된다.
  const allowed = corsOrigins();
  const rejectedOrigins = new Set<string>();
  /**
   * 개발에서는 localhost 를 자동으로 허용한다.
   *
   * ⚠️ Next 의 `/api/*` 프록시(rewrites)는 브라우저 헤더를 **그대로 전달한다.**
   *    서버가 대신 호출해 주니 Origin 이 없을 거라 생각하기 쉬운데, 아니다 —
   *    `Origin: http://localhost:3100` 이 살아서 여기까지 온다. 그래서 어드민을
   *    처음 띄우면 ALLOWED_ORIGINS 를 손보기 전까지 로그인이 403 으로 막힌다.
   *    (Telegram Mini App 을 며칠 헤맨 것과 정확히 같은 원인이다)
   *
   * 운영(NODE_ENV=production)에서는 켜지지 않는다. 배포 도메인은 반드시
   * ALLOWED_ORIGINS 에 명시해야 한다.
   */
  const allowLocalhost = process.env.NODE_ENV !== 'production';
  const LOCALHOST = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/;

  app.enableCors({
    origin: (origin, cb) => {
      if (!origin || allowed.includes(origin)) return cb(null, true);
      if (allowLocalhost && LOCALHOST.test(origin)) return cb(null, true);

      // 어느 출처가 막혔는지 반드시 남긴다. 예전엔 'CORS_NOT_ALLOWED' 만 찍혀서
      // 스택만 보고는 무엇을 허용해야 하는지 알 수가 없었다.
      // 같은 출처는 한 번만 — 봇이 두드리면 로그가 그걸로 덮인다.
      if (!rejectedOrigins.has(origin)) {
        rejectedOrigins.add(origin);
        Logger.warn(
          `CORS 거부: ${origin} — 우리 서비스면 ALLOWED_ORIGINS 에 추가해라 ` +
            `(현재: ${allowed.length ? allowed.join(', ') : '비어 있음'}` +
            `${allowLocalhost ? ' / 개발이라 localhost 는 자동 허용' : ''})`,
          'Bootstrap',
        );
      }
      // 평범한 Error 를 넘기면 Nest 가 처리 못 한 예외로 보고 **500** 을 낸다.
      // 클라이언트는 'Internal server error' 만 받아서 원인을 알 수 없다.
      // HttpException 을 넘기면 403 + 코드로 나간다.
      cb(new ForbiddenException('CORS_NOT_ALLOWED'), false);
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  });

  // ── 무중단 배포용 종료 절차 ──
  //
  // 컨테이너를 멈추면 도커가 SIGTERM 을 보낸다. 여기서 바로 죽으면 그 순간
  // 처리 중이던 요청이 전부 끊긴다 — 유저에겐 네트워크 에러로 보인다.
  // 그래서 세 단계로 내려간다.
  //
  //  1) /ready 를 503 으로 바꾼다 → 프록시가 새 요청을 안 보낸다
  //  2) 프록시가 그걸 알아챌 시간만큼 기다린다 (헬스체크 주기보다 길게)
  //  3) app.close() 로 열린 연결을 끝까지 처리하고 내려간다
  //
  // enableShutdownHooks 는 Nest 모듈의 onModuleDestroy 까지 태워서
  // 몽고 연결·크론을 정리한다.
  // 없어도 뜨지만 없으면 그 기능이 통째로 죽는 것들. 부팅 로그 맨 위에서 알린다
  warnMissingOptionalSecrets((m) => Logger.warn(m, 'Bootstrap'));
  // CRLF 로 오염된 값은 URL 에서는 멀쩡하고 서명에서만 틀어진다 — 찾기가 아주 어렵다
  warnDirtySecrets((m) => Logger.error(m, 'Bootstrap'));

  app.enableShutdownHooks();

  const DRAIN_MS = Number(process.env.SHUTDOWN_DRAIN_MS ?? 8000);
  let closing = false;
  const shutdown = async (signal: string) => {
    if (closing) return;
    closing = true;
    console.log(`[shutdown] ${signal} 수신 — 새 요청 차단 후 ${DRAIN_MS}ms 대기`);
    markShuttingDown();
    await new Promise((r) => setTimeout(r, DRAIN_MS));
    try {
      await app.close();
      console.log('[shutdown] 정상 종료');
    } catch (e) {
      console.error('[shutdown] 종료 중 오류', e);
    } finally {
      process.exit(0);
    }
  };
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`[boot] listening on ${process.env.PORT ?? 3000}`);
}
bootstrap();
