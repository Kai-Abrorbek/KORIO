/**
 * 어드민 권한 주기/뺏기.
 *
 * 지금까지 관리자 권한을 주는 방법이 **Mongo 를 직접 여는 것뿐**이었다.
 * 그건 기록도 안 남고, 오타 하나로 엉뚱한 계정에 권한이 붙는다.
 *
 *   pnpm --filter api admin:grant -- <email> <role>
 *   pnpm --filter api admin:grant -- <email> none      # 권한 회수
 *
 * role: super_admin | content_admin | support | analyst
 *
 * ⚠️ 첫 어드민은 이 스크립트로만 만들 수 있다. 어드민을 웹에서 만들려면
 *    이미 어드민이어야 하기 때문이다 (그게 맞다 — 아무나 만들 수 있으면
 *    그건 문이 아니다).
 */
import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from '../app.module';
import { User, UserDocument } from '../users/schemas/user.schema';
import { ADMIN_ROLES, permissionsFor, type AdminRole } from '../admin/admin.const';

async function main() {
  const [rawEmail, rawRole] = process.argv.slice(2);
  if (!rawEmail || !rawRole) {
    console.error('사용법: admin:grant -- <email> <super_admin|content_admin|support|analyst|none>');
    process.exit(1);
  }
  const email = rawEmail.trim().toLowerCase();
  const role = rawRole.trim();
  const revoking = role === 'none';

  if (!revoking && !ADMIN_ROLES.includes(role as AdminRole)) {
    console.error(`모르는 역할: ${role}\n가능한 값: ${ADMIN_ROLES.join(' | ')} | none`);
    process.exit(1);
  }

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });
  try {
    const userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
    const user = await userModel.findOne({ email }).select('email nickname adminRole');
    if (!user) {
      console.error(`그런 계정이 없다: ${email}`);
      process.exit(1);
    }

    const before = user.adminRole ?? '(없음)';
    await userModel.updateOne(
      { _id: user._id },
      { $set: { adminRole: revoking ? null : role } },
    );

    if (revoking) {
      console.log(`✅ 권한 회수: ${email}  ${before} → (없음)`);
      console.log('   ⚠️ 이미 발급된 토큰은 다음 요청에서 막힌다 (권한은 매 요청 DB 에서 읽는다).');
    } else {
      console.log(`✅ ${email}  ${before} → ${role}`);
      console.log(`   권한: ${permissionsFor(role as AdminRole).join(', ')}`);
    }

    if (!process.env.ADMIN_JWT_SECRET?.trim()) {
      console.log('\n⚠️ ADMIN_JWT_SECRET 이 없다. 이 값이 없으면 어드민 로그인이 503 으로 막힌다.');
      console.log('   32자 이상, JWT_SECRET 과 다른 값으로 넣어라.');
    }
  } finally {
    await app.close();
  }
}

void main();
