import './config/timezone'; // 반드시 최상단: 서버 타임존 KST 고정
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { raw } from 'express';
import { SPEECH_MAX_BYTES } from './speech/speech.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 발음 평가용 오디오는 raw WAV 로 받는다. 전역 json 파서보다 먼저 물려야 한다.
  app.use(
    '/speech',
    raw({ type: 'audio/wav', limit: SPEECH_MAX_BYTES + 1024 }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
