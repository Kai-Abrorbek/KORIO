/**
 * 스키마가 **런타임에** 만들어지는지 + 유니크 인덱스 조건이 맞는지 본다.
 *
 * tsc 는 통과하는데 앱이 부팅하다 죽는 종류가 있다:
 *  - `Date | null` 같은 유니온 @Prop → CannotDetermineTypeError
 *  - default: null + sparse unique → 두 번째 문서부터 E11000
 * DB 없이 잡을 수 있는 것들이라 배포 전에 여기서 거른다.
 */
import { UserSchema } from '../users/schemas/user.schema';
import { ReferralSchema } from '../referral/schemas/referral.schema';
import { DeviceTokenSchema } from '../push/schemas/device-token.schema';
import { PushLogSchema } from '../push/schemas/push-log.schema';

let fail = 0;
const say = (ok: boolean, msg: string) => {
  if (!ok) fail++;
  console.log(`${ok ? '✅' : '❌'} ${msg}`);
};

const schemas: [string, any][] = [
  ['User', UserSchema],
  ['Referral', ReferralSchema],
  ['DeviceToken', DeviceTokenSchema],
  ['PushLog', PushLogSchema],
];
for (const [name, sc] of schemas) say(!!sc?.obj, `${name} 스키마 생성됨`);

/**
 * 값이 없을 수 있는 필드에 걸린 유니크 인덱스는 반드시 sparse 이거나
 * partialFilterExpression 이 있어야 한다. 없으면 null 이 둘 이상 생기는
 * 순간 그 컬렉션에 문서를 못 넣는다.
 */
for (const [name, sc] of schemas) {
  for (const [keys, opts] of sc.indexes() as [any, any][]) {
    if (!opts?.unique) continue;
    const field = Object.keys(keys)[0];
    const guarded = !!opts.sparse || !!opts.partialFilterExpression;
    const alwaysSet = ['inviteeId', 'token', 'dedupKey', 'userId'].includes(field);
    say(
      guarded || alwaysSet,
      `${name}.${field} 유니크 — ${guarded ? '조건부(안전)' : '항상 채워지는 필드(안전)'}`,
    );
  }
}

// default 가 null 인데 유니크면 그게 정확히 그 사고다
const userPaths: any = (UserSchema as any).paths;
for (const f of ['referralCode', 'phoneHash']) {
  const d = userPaths[f]?.options?.default;
  say(d === undefined, `User.${f} 에 default 없음 (있으면 null 이 인덱스에 쌓인다)`);
}

console.log(fail ? `\n💥 실패 ${fail}건` : '\n🎉 전부 통과');
process.exit(fail ? 1 : 0);
