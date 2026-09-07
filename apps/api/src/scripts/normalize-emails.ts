/**
 * 이미 들어가 있는 유저 이메일을 소문자로 옮긴다. **한 번만** 돌리면 된다.
 *
 *   pnpm --filter api migrate:emails          # 먼저 이걸로 뭘 바꿀지 본다
 *   pnpm --filter api migrate:emails --apply  # 실제로 바꾼다
 *
 * 대소문자만 다른 문서가 둘 다 있으면 손대지 않고 목록으로만 뽑는다.
 * 하나로 합치는 건 어느 계정을 살릴지 정하는 문제라 스크립트가 정할 일이 아니다
 * (학습 기록·구독·친구가 각각 붙어 있다).
 */
import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from '../app.module';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  EmailRow,
  normalizeEmail,
  planEmailNormalization,
} from '../common/normalize-email';

async function run() {
  const apply = process.argv.includes('--apply');
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });
  const userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

  // 전수 조회는 안 한다. 대문자가 섞인 문서만 찾고, 그것들의 소문자 짝만
  // 추가로 읽는다 — 충돌을 판단하는 데 필요한 건 그 둘뿐이다
  const upper = await userModel
    .find({ email: { $regex: '[A-Z]' } })
    .select('email provider createdAt')
    .lean();

  if (!upper.length) {
    console.log('✅ 대문자가 섞인 이메일이 없다. 할 일 없음.');
    await app.close();
    return;
  }

  const lowered = [...new Set(upper.map((u: any) => normalizeEmail(u.email)))];
  const twins = await userModel
    .find({ email: { $in: lowered } })
    .select('email provider createdAt')
    .lean();

  const byId = new Map<string, EmailRow>();
  for (const u of [...upper, ...twins] as any[]) {
    byId.set(String(u._id), {
      id: String(u._id),
      email: u.email,
      provider: u.provider,
      createdAt: u.createdAt,
    });
  }

  const plan = planEmailNormalization([...byId.values()]);

  console.log(`\n대문자 섞인 문서: ${upper.length}건`);
  console.log(`바꿀 것: ${plan.updates.length}건`);
  console.log(`충돌(손 안 댐): ${plan.collisions.length}건\n`);

  for (const u of plan.updates) {
    console.log(`  ${u.from}  →  ${u.to}`);
  }

  if (plan.collisions.length) {
    console.log('\n⚠️ 아래는 소문자로 내리면 서로 부딪힌다. 직접 정리해야 한다:');
    for (const c of plan.collisions) {
      console.log(`\n  [${c.email}]`);
      for (const r of c.rows) {
        console.log(
          `    ${r.id}  ${r.email}  provider=${r.provider ?? '?'}  가입=${
            r.createdAt ? new Date(r.createdAt).toISOString().slice(0, 10) : '?'
          }`,
        );
      }
    }
  }

  if (!apply) {
    console.log('\nℹ️ 미리보기다. 실제로 바꾸려면 --apply 를 붙여라.');
    await app.close();
    return;
  }

  let done = 0;
  let failed = 0;
  for (const u of plan.updates) {
    try {
      await userModel.updateOne({ _id: u.id }, { $set: { email: u.to } });
      done++;
    } catch (e: any) {
      failed++;
      // 계획을 세운 뒤 그 사이에 같은 주소로 가입이 들어오면 여기서 걸린다
      console.error(
        `  ❌ ${u.from}: ${e?.code === 11000 ? '이미 같은 주소가 있다' : e?.message}`,
      );
    }
  }

  console.log(`\n🎉 ${done}건 변경${failed ? `, ${failed}건 실패` : ''}`);
  await app.close();
}

run().catch((e) => {
  console.error('❌ 실패:', e);
  process.exit(1);
});
