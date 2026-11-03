import * as crypto from 'crypto';

/**
 * 어드민 2단계 인증 — TOTP (RFC 6238, 구글 OTP·Authy·1Password 등 전부 호환).
 *
 * 비밀번호는 브라우저에 저장돼 있거나 새면 끝이다. 휴대폰 앱이 30초마다 만드는
 * 6자리를 같이 받으면, 비밀번호가 새도 그 폰이 없는 사람은 못 들어온다.
 *
 * 라이브러리 없이 직접 구현한 이유: 필요한 건 HMAC-SHA1 한 번과 base32 뿐이고,
 * 운영 도구 문에 의존성을 하나 더 들이는 것보다 RFC 테스트 벡터로 검증한
 * 50줄이 낫다 (totp.spec.ts).
 */
const STEP_SECONDS = 30;
const DIGITS = 6;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function base32Encode(bytes: Buffer): string {
  let bits = 0;
  let value = 0;
  let out = '';
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

export function base32Decode(text: string): Buffer {
  const clean = text.toUpperCase().replace(/[\s=-]/g, '');
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (const char of clean) {
    const index = ALPHABET.indexOf(char);
    if (index < 0) throw new Error('INVALID_BASE32');
    value = (value << 5) | index;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return Buffer.from(out);
}

/** 새 비밀 (160비트 — RFC 4226 권장) */
export function generateTotpSecret(): string {
  return base32Encode(crypto.randomBytes(20));
}

export function totpStep(nowMs = Date.now()): number {
  return Math.floor(nowMs / 1000 / STEP_SECONDS);
}

export function totpAt(secret: string, step: number, digits = DIGITS): string {
  const counter = Buffer.alloc(8);
  counter.writeBigUInt64BE(BigInt(step));
  const mac = crypto
    .createHmac('sha1', base32Decode(secret))
    .update(counter)
    .digest();
  const offset = mac[mac.length - 1] & 0xf;
  const code = (mac.readUInt32BE(offset) & 0x7fffffff) % 10 ** digits;
  return String(code).padStart(digits, '0');
}

/**
 * 맞으면 그 코드의 step 을 돌려준다 (재사용 막기용). 틀리면 null.
 *
 * 앞뒤 30초까지 받는다 — 폰 시계가 조금 틀려도 되게. `notAfterStep` 이하의
 * step 은 거절한다: 이미 쓴 코드를 30초 안에 다시 넣는 것(어깨 너머로 본 코드,
 * 가로챈 요청 재전송)을 막는다.
 */
export function verifyTotp(
  secret: string,
  code: unknown,
  options: { nowMs?: number; notAfterStep?: number | null } = {},
): number | null {
  if (typeof code !== 'string') return null;
  const given = code.replace(/\s/g, '');
  if (!/^\d{6}$/.test(given)) return null;
  const current = totpStep(options.nowMs);
  for (const step of [current - 1, current, current + 1]) {
    if (options.notAfterStep != null && step <= options.notAfterStep) continue;
    const expected = totpAt(secret, step);
    if (crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(given)))
      return step;
  }
  return null;
}

/** 인증 앱이 읽는 등록 주소 (QR 대신 앱에 직접 넣어도 된다) */
export function otpauthUrl(secret: string, account: string): string {
  const issuer = 'KORIO Admin';
  return (
    `otpauth://totp/${encodeURIComponent(`${issuer}:${account}`)}` +
    `?secret=${secret}&issuer=${encodeURIComponent(issuer)}` +
    `&algorithm=SHA1&digits=${DIGITS}&period=${STEP_SECONDS}`
  );
}

/**
 * DB 에 넣을 때 암호화한다 (AES-256-GCM).
 *
 * DB 만 새면 비밀번호 해시는 깨기 어렵지만, TOTP 비밀이 평문이면 2단계가 그냥
 * 사라진다. 키는 ADMIN_JWT_SECRET 에서 뽑는다 — DB 와 서버 환경변수가 **둘 다**
 * 새야 풀린다.
 *
 * ⚠️ ADMIN_JWT_SECRET 을 바꾸면 저장된 비밀을 못 읽는다 → 그 어드민은 로그인
 *    때 코드가 계속 틀린다. 바꿨으면 `pnpm --filter api admin:2fa-reset <email>`
 *    으로 끄고 다시 등록한다.
 */
function keyFrom(adminSecret: string): Buffer {
  return crypto
    .createHash('sha256')
    .update(`korio:admin-totp:${adminSecret}`)
    .digest();
}

export function sealTotpSecret(secret: string, adminSecret: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', keyFrom(adminSecret), iv);
  const data = Buffer.concat([cipher.update(secret, 'utf8'), cipher.final()]);
  return [
    'v1',
    iv.toString('base64url'),
    cipher.getAuthTag().toString('base64url'),
    data.toString('base64url'),
  ].join(':');
}

export function openTotpSecret(
  sealed: string | null | undefined,
  adminSecret: string,
): string | null {
  if (!sealed) return null;
  const [version, iv, tag, data] = sealed.split(':');
  if (version !== 'v1' || !iv || !tag || !data) return null;
  try {
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      keyFrom(adminSecret),
      Buffer.from(iv, 'base64url'),
    );
    decipher.setAuthTag(Buffer.from(tag, 'base64url'));
    return Buffer.concat([
      decipher.update(Buffer.from(data, 'base64url')),
      decipher.final(),
    ]).toString('utf8');
  } catch {
    return null;
  }
}
