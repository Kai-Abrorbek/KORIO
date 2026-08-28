import './config/timezone'; // 반드시 최상단: 서버 타임존 KST 고정
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { json, raw, urlencoded } from 'express';
import { SPEECH_MAX_BYTES } from './speech/speech.constants';
import { corsOrigins } from './config/secrets';
import { securityHeaders } from './common/security-headers';

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
  app.use(json({ limit: '64kb' }));
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
  const allowed = corsOrigins();
  app.enableCors({
    origin: (origin, cb) => {
      if (!origin || allowed.includes(origin)) return cb(null, true);
      cb(new Error('CORS_NOT_ALLOWED'), false);
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
