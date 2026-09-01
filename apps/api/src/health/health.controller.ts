import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

/**
 * 무중단 배포용 상태 확인.
 *
 * 리버스 프록시(Caddy)가 이 두 경로를 찔러서 트래픽을 보낼지 정한다.
 * 인증을 걸지 않는다 — 프록시가 토큰을 들고 있을 수 없다. 대신 내부 상태를
 * 숫자 하나도 흘리지 않는다.
 *
 *  /health  살아 있나 (liveness). 프로세스가 응답만 하면 OK
 *  /ready   요청을 받아도 되나 (readiness). DB 가 붙어야 OK
 *
 * 둘을 나누는 이유: 새 컨테이너는 뜬 직후 DB 연결이 아직 없다. 그때
 * 트래픽을 받으면 전부 500 이 난다. /ready 가 통과할 때까지 프록시가
 * 옛 컨테이너로만 보내야 진짜 무중단이 된다.
 *
 * 종료 중에는 /ready 가 곧바로 503 을 낸다. main.ts 가 SIGTERM 을 받으면
 * markShuttingDown() 을 부르고, 프록시가 그걸 보고 새 요청을 끊는다.
 * 이미 처리 중인 요청은 그대로 끝난다 (드레인).
 */
let shuttingDown = false;
export function markShuttingDown() {
  shuttingDown = true;
}
export function isShuttingDown() {
  return shuttingDown;
}

@Controller()
export class HealthController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get('health')
  liveness() {
    return { status: 'ok' };
  }

  @Get('ready')
  readiness() {
    if (shuttingDown) {
      // 종료 중 — 프록시야, 나한테 새 요청 보내지 마라
      throw new ServiceUnavailableException('SHUTTING_DOWN');
    }
    // 1 = connected. 0 disconnected / 2 connecting / 3 disconnecting
    if (this.connection.readyState !== 1) {
      throw new ServiceUnavailableException('DB_NOT_READY');
    }
    return { status: 'ok' };
  }
}
