import { digitsOnly, luhnValid } from '../payments/card/card-number';
import type { PayoutBrand } from './gem-payout.const';

/**
 * 유저가 보석을 받을 카드 번호 검사. 한 자리만 틀려도 남의 카드로 돈이 간다 —
 * 서버가 다시 본다 (앱도 같은 규칙으로 미리 막는다: mobile/telegram payout-card).
 *   1. 숫자 16자리 (공백·하이픈은 지운다)
 *   2. 앞자리로 카드 종류 — Uzcard 8600·6262, Humo 9860, Visa 4, Mastercard 51–55·2221–2720
 *   3. 고른 카드 종류와 번호가 맞는지
 *   4. Luhn 체크섬 — 한 자리 오타·인접 두 자리 바뀜을 잡는다.
 *      Uzcard–UnionPay(6262)는 Luhn 이 안 맞는 진짜 번호가 있다고 알려져 있어 건너뛴다
 */
export type PayoutCardProblem =
  | 'NOT_DIGITS'
  | 'LENGTH'
  | 'BRAND'
  | 'BRAND_MISMATCH'
  | 'LUHN';

export function payoutCardBrand(digits: string): PayoutBrand | null {
  if (/^(8600|6262)/.test(digits)) return 'uzcard';
  if (/^9860/.test(digits)) return 'humo';
  if (/^4/.test(digits)) return 'visa';
  if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d\d|27[01]\d|2720)/.test(digits))
    return 'mastercard';
  return null;
}

/** 문제가 없으면 null */
export function payoutCardProblem(
  raw: string,
  brand: PayoutBrand,
): PayoutCardProblem | null {
  const digits = digitsOnly(raw);
  if (!/^\d+$/.test(digits)) return 'NOT_DIGITS';
  if (digits.length !== 16) return 'LENGTH';
  const detected = payoutCardBrand(digits);
  if (!detected) return 'BRAND';
  if (detected !== brand) return 'BRAND_MISMATCH';
  if (!digits.startsWith('6262') && !luhnValid(digits)) return 'LUHN';
  return null;
}

/**
 * 카드에 적힌 이름 — 운영자가 송금할 때 받는 사람 이름과 맞춰 본다.
 * 카드 이름은 라틴 대문자라 대문자로 맞춘다. 맞지 않으면 null.
 */
export function normalizeCardHolder(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const name = raw
    .replace(/[ʻʼ‘’`]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
  if (!/^[A-Z][A-Z '.-]{1,39}$/.test(name)) return null;
  if ((name.match(/[A-Z]/g) ?? []).length < 2) return null;
  return name;
}

/** 9860 •••• •••• 9012 — 끝난 요청에 남기는 모양 */
export const maskPayoutCard = (digits: string) => {
  const d = digitsOnly(digits);
  return `${d.slice(0, 4)} •••• •••• ${d.slice(-4)}`;
};
