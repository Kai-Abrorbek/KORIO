import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';

/**
 * 전역으로 둔다. 메일은 앞으로 여러 도메인(가입 확인, 결제 영수증 등)에서
 * 부르게 될 텐데, 그때마다 import 를 추가하게 만들 이유가 없다.
 */
@Global()
@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
