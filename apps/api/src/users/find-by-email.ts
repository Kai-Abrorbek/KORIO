import { Model } from 'mongoose';
import { normalizeEmail } from '../common/normalize-email';
import { UserDocument } from './schemas/user.schema';

/**
 * 이메일로 유저 하나를 찾는다. **이메일 조회는 전부 이걸 거친다.**
 *
 * 소문자로 맞춰서 먼저 정확히 본다. 못 찾으면 대소문자 무시로 한 번 더 보는데,
 * 이건 정규화를 넣기 전에 'Kai@x.com' 으로 저장된 문서가 남아 있기 때문이다.
 * 이 두 번째 조회가 없으면 정규화를 배포하는 순간 그런 계정들이 전부
 * "비밀번호가 틀렸다" 가 된다 (문서는 멀쩡히 있는데 못 찾는 것뿐이다).
 *
 * 대소문자 무시로 **둘 이상** 걸리면 아무것도 돌려주지 않는다. 어느 쪽이
 * 진짜인지 알 방법이 없고, 잘못 고르면 남의 계정을 열어주는 셈이 된다.
 * 그런 쌍은 `pnpm --filter api migrate:emails` 가 목록으로 뽑아준다.
 *
 * 마이그레이션을 돌리고 충돌까지 정리하고 나면 두 번째 조회는 지워도 된다.
 */
export async function findUserByEmail(
  model: Model<UserDocument>,
  raw: string,
  select = '',
) {
  const email = normalizeEmail(raw);
  if (!email) return null;

  const one = model.findOne({ email });
  if (select) one.select(select);
  const exact = await one;
  if (exact) return exact;

  const many = model.find({ email: new RegExp(`^${escapeRegex(email)}$`, 'i') });
  many.limit(2);
  if (select) many.select(select);
  const matches = await many;
  return matches.length === 1 ? matches[0] : null;
}

function escapeRegex(v: string): string {
  return v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
