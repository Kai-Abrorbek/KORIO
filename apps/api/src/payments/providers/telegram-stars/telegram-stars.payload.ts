import { randomBytes } from 'crypto';
import { starsProductById, type StarsProduct } from './telegram-stars.const';

/**
 * 인보이스 payload — 결제가 끝나면 텔레그램이 이 문자열을 그대로 돌려준다.
 *
 *   k1.<KORIO userId>.<productId>.<stars>.<nonce>
 *
 * 서명을 안 붙이는 이유: 인보이스는 **우리 봇 토큰으로만** 만들 수 있다.
 * 유저가 payload 를 바꾼 인보이스를 만들 방법이 없다. 그래서 여기 적힌
 * KORIO 계정·상품·가격을 믿는다 (링크를 받은 친구가 대신 내면 선물이 된다).
 *
 * 가격을 박아두는 이유: 상수 가격을 바꾼 뒤에 옛 링크로 결제해도, 유저가
 * 동의한 건 링크에 적힌 가격이다. 결제 직전 검사는 이 값과 실제 금액을 맞춘다.
 *
 * 텔레그램 제한: 1~128 바이트. 지금 모양은 최대 약 60 바이트.
 */
const VERSION = 'k1';

export interface StarsPayload {
  userId: string;
  product: StarsProduct;
  stars: number;
}

export function encodeStarsPayload(
  userId: string,
  product: StarsProduct,
): string {
  const nonce = randomBytes(5).toString('hex');
  return [VERSION, userId, product.id, String(product.stars), nonce].join('.');
}

/** 우리가 만든 게 아니거나 모르는 상품이면 null */
export function decodeStarsPayload(raw: unknown): StarsPayload | null {
  if (typeof raw !== 'string' || raw.length > 128) return null;
  const parts = raw.split('.');
  if (parts.length !== 5 || parts[0] !== VERSION) return null;
  const [, userId, productId, starsRaw] = parts;
  if (!/^[a-f0-9]{24}$/i.test(userId)) return null;
  const product = starsProductById(productId);
  const stars = Number(starsRaw);
  if (!product || !Number.isInteger(stars) || stars <= 0) return null;
  return { userId, product, stars };
}
