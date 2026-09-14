/**
 * 어드민 도구 비밀번호 설정.
 *
 *   pnpm --filter api admin:password <email>              # 강한 비밀번호를 만들어 준다
 *   pnpm --filter api admin:password <email> <비밀번호>    # 직접 정한다
 *   pnpm --filter api admin:password <email> none         # 회수 (로그인 막힘)
 *
 * **왜 앱 비밀번호를 안 쓰나:** 소셜로 가입한 계정은 `password` 가 아예 없다.
 * 운영자를 위해 앱 비밀번호를 만들어 주면, 운영 도구에 들어가려고 **앱 로그인
 * 경로를 하나 더 여는 셈**이 된다. 어드민 문은 이미 따로다(다른 시크릿, 다른
 * 만료, 다른 권한 필드) — 비밀번호만 공유할 이유가 없다.
 *
 * ⚠️ 화면에서 바꾸는 경로는 없다. 첫 어드민을 웹에서 만들 수 없는 것과 같은
 *    이유다 — 아무나 만들 수 있으면 그건 문이 아니다.
 */
import { randomInt } from 'crypto';
import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../app.module';
import { User, UserDocument } from '../users/schemas/user.schema';
import { ADMIN_ROLES, type AdminRole } from '../admin/admin.const';

/** 짧은 비밀번호는 bcrypt 로도 못 막는다. 운영 도구 문이라 더 길게 잡는다 */
const MIN_LENGTH = 12;

/**
 * 헷갈리는 글자(0/O, 1/l/I)를 뺀 알파벳.
 *
 * 이 비밀번호는 터미널에서 눈으로 읽어 옮겨 적는 값이다. 한 글자 잘못 읽으면
 * 그냥 "로그인 안 됨" 이 되고 원인을 못 찾는다.
 */
const ALPHABET = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*';

function generate(length = 20): string {
  let out = '';
  // Math.random 은 예측 가능하다. 비밀번호에는 쓰지 않는다
  for (let i = 0; i < length; i++) out += ALPHABET[randomInt(ALPHABET.length)];
  return out;
}

async function main() {
  // pnpm 은 `--` 를 삼키지 않고 인자로 그대로 넘긴다. 앞의 '--' 는 걷어낸다
  const args = process.argv.slice(2).filter((a) => a !== '--');
  const [rawEmail, ...rest] = args;
  if (!rawEmail) {
    console.error(
      '사용법: pnpm --filter api admin:password <email> [비밀번호|none]\n' +
        '   예: pnpm --filter api admin:password me@example.com\n' +
        '       (비밀번호를 생략하면 강한 값을 만들어서 한 번만 보여준다)',
    );
    process.exit(1);
  }

  const email = rawEmail.trim().toLowerCase();
  // 비밀번호에 공백이 들어갈 수 있다. 쪼개진 인자를 다시 붙인다
  const given = rest.join(' ').trim();
  const revoking = given === 'none';
  const generated = !revoking && !given;
  const password = revoking ? '' : given || generate();

  if (!revoking && password.length < MIN_LENGTH) {
    console.error(`비밀번호가 너무 짧다 (${password.length}자). ${MIN_LENGTH}자 이상으로 해라.`);
    process.exit(1);
  }

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });
  try {
    const userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
    const user = await userModel
      .findOne({ email })
      .select('email nickname adminRole +adminPassword');
    if (!user) {
      console.error(`그런 계정이 없다: ${email}`);
      process.exit(1);
    }

    const role = user.adminRole as AdminRole | null;
    const had = !!user.adminPassword;

    await userModel.updateOne(
      { _id: user._id },
      { $set: { adminPassword: revoking ? null : await bcrypt.hash(password, 12) } },
    );

    if (revoking) {
      console.log(`✅ 어드민 비밀번호 회수: ${email}`);
      console.log('   이제 운영 콘솔 로그인이 막힌다 (권한 자체는 그대로다).');
    } else {
      console.log(`✅ 어드민 비밀번호 ${had ? '변경' : '설정'}: ${email}`);
      if (generated) {
        console.log('');
        console.log(`   ┌─ 비밀번호 (이번 한 번만 보여준다) ─────────`);
        console.log(`   │  ${password}`);
        console.log(`   └────────────────────────────────────────────`);
        console.log('');
        console.log('   ⚠️ 해시만 저장된다. 잃어버리면 다시 만드는 수밖에 없다.');
      }
      console.log('   ℹ️ 이건 **앱 비밀번호가 아니다.** 운영 콘솔 로그인에만 쓰인다.');
    }

    // 권한이 없으면 비밀번호를 넣어도 못 들어온다. 지금 알려주는 게 낫다
    if (!role || !ADMIN_ROLES.includes(role)) {
      console.log('');
      console.log(`⚠️ ${email} 은(는) 아직 어드민이 아니다 (adminRole 없음).`);
      console.log('   pnpm --filter api admin:grant ' + email + ' super_admin');
    }
    if (!process.env.ADMIN_JWT_SECRET?.trim()) {
      console.log('');
      console.log('⚠️ ADMIN_JWT_SECRET 이 없다. 이 값이 없으면 어드민 로그인이 503 으로 막힌다.');
      console.log('   32자 이상, JWT_SECRET 과 다른 값으로 넣어라.');
    }
  } finally {
    await app.close();
  }
}

void main();
