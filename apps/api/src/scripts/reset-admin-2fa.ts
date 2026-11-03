/**
 * 어드민 2단계 인증 끄기 (인증 앱이 깔린 폰을 잃어버렸을 때).
 *
 *   pnpm --filter api admin:2fa-reset <email>
 *
 * 서버에 들어올 수 있는 사람만 할 수 있다 — 웹에 "폰 잃어버렸어요" 버튼을 두면
 * 그게 곧 2단계를 건너뛰는 문이 된다. 끄면 열려 있던 운영 콘솔 세션도 끊긴다.
 * 그 다음 로그인해서 "내 보안" 에서 다시 등록한다.
 *
 * ADMIN_JWT_SECRET 을 바꾼 뒤에도 필요하다 — 저장된 비밀이 그 값으로 암호화돼
 * 있어서 못 읽는다 (admin/totp.ts).
 */
import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from '../app.module';
import { User, UserDocument } from '../users/schemas/user.schema';

async function main() {
  const [rawEmail] = process.argv.slice(2).filter((a) => a !== '--');
  if (!rawEmail) {
    console.error('사용법: pnpm --filter api admin:2fa-reset <email>');
    process.exit(1);
  }
  const email = rawEmail.trim().toLowerCase();

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });
  try {
    const userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
    const result = await userModel.updateOne(
      { email },
      {
        $set: {
          adminTotpSecret: null,
          adminTotpPending: null,
          adminTotpLastStep: null,
          adminTotpEnabledAt: null,
        },
        $inc: { adminTokenVersion: 1 },
      },
    );
    if (!result.matchedCount) {
      console.error(`그런 계정이 없다: ${email}`);
      process.exit(1);
    }
    console.log(`✅ 2단계 인증 끔: ${email}`);
    console.log(
      '   열려 있던 운영 콘솔 세션도 끊겼다. 로그인해서 "내 보안" 에서 다시 켜라.',
    );
  } finally {
    await app.close();
  }
}

void main();
