import { CODE_ALPHABET, CODE_LENGTH } from './referral.constants';
import * as crypto from 'crypto';

/**
 * 초대 코드 한 개.
 *
 * 닉네임을 섞지 않는다 — 닉네임에 우즈벡어·한글·이모지가 들어가면 코드가
 * 입력 불가능해지고, 코드로 남의 닉네임이 새기도 한다. 순수 랜덤이 낫다.
 * 31글자 7자리 = 약 275억 가지라 충돌은 사실상 없지만, 서비스에서
 * 유니크 인덱스로 한 번 더 막는다.
 */
export function generateCode(): string {
  const bytes = crypto.randomBytes(CODE_LENGTH * 2);
  let out = '';
  for (let i = 0; out.length < CODE_LENGTH; i++) {
    out += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  }
  return out;
}

/**
 * 사람이 입력한 값을 코드로 정리한다.
 *
 * 유저는 " kai7x2 ", "KAI-7X2", "https://korio.online/i/KAI7X2?utm=..." 를
 * 전부 붙여넣는다. 여기서 다 받아주지 않으면 "코드가 안 먹어요" 가 문의의
 * 절반이 된다.
 *
 * ⚠️ 헷갈리는 글자(O→Q 같은)를 **추측해서 바꾸지 않는다.** 잘못 추측하면
 * 오타 코드가 "다른 사람의 유효한 코드" 로 바뀌어서, 엉뚱한 사람에게 보상이
 * 간다. 알파벳에 없는 글자가 섞였으면 그냥 무효로 두고 다시 입력받는다.
 * (애초에 0/O/1/I/L 을 코드에 안 쓰는 이유가 이 오타를 막으려는 것이다)
 */
export function normalizeCode(raw: string): string {
  const input = (raw ?? '').trim();

  // 1) ?code=XXX 형태가 먼저다 (mobile://invite?code=ABC2345)
  const q = input.match(/[?&]code=([A-Za-z0-9]+)/);
  // 2) 아니면 경로의 마지막 조각 (https://korio.online/i/ABC2345?utm=kakao)
  //    ⚠️ 쿼리·해시를 **먼저 잘라내야** 한다. 안 그러면 "?utm=kakao" 의
  //    마지막 조각을 코드로 읽는다 (실제로 그랬다).
  const tail =
    q?.[1] ?? input.split(/[?#]/)[0].split('/').filter(Boolean).pop() ?? '';

  return tail
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, CODE_LENGTH);
}

/** 우리가 발급할 수 있는 모양인지. DB 조회 전에 걸러낸다 */
export function isValidCode(code: string): boolean {
  if (code.length !== CODE_LENGTH) return false;
  return [...code].every((ch) => CODE_ALPHABET.includes(ch));
}
