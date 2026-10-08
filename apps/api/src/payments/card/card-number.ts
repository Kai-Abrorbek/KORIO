/**
 * 우리가 돈을 받는 카드(Humo·Uzcard) 번호 검사.
 *
 * 카드번호는 env 로 들어온다 (CARD_PAYMENT_CARDS). 한 자리만 틀려도 유저 돈이
 * 남의 카드로 간다 — 그래서 화면에 띄우기 전에 서버가 세 가지를 본다.
 *   1. 숫자 16자리 (공백·하이픈은 지운다)
 *   2. 앞자리 — Uzcard 8600, Humo 9860
 *   3. Luhn 체크섬 — 한 자리 오타·인접 두 자리 바뀜을 잡는다
 * 하나라도 틀리면 그 카드는 안 띄운다. 남은 카드가 없으면 카드 결제가 꺼진다.
 *
 * Luhn 이 실제 카드인데도 틀린다고 나오면(국내 카드 중 예외가 있을 수 있다)
 * CARD_PAYMENT_SKIP_LUHN=true 로 체크섬만 건너뛴다.
 */
export type CardBrand = 'humo' | 'uzcard';

export interface ReceivingCard {
  brand: CardBrand;
  /** 숫자만 16자리 */
  number: string;
  /** 카드에 적힌 이름 (없으면 빈 문자열) */
  holder: string;
  last4: string;
}

const BRAND_PREFIX: { prefix: string; brand: CardBrand }[] = [
  { prefix: '8600', brand: 'uzcard' },
  { prefix: '9860', brand: 'humo' },
];

export const digitsOnly = (raw: string) => (raw ?? '').replace(/[\s-]/g, '');

/** ISO/IEC 7812 Luhn */
export function luhnValid(digits: string): boolean {
  if (!/^\d+$/.test(digits)) return false;
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits.charCodeAt(i) - 48;
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

export function cardBrand(digits: string): CardBrand | null {
  return BRAND_PREFIX.find((b) => digits.startsWith(b.prefix))?.brand ?? null;
}

export type CardProblem = 'LENGTH' | 'NOT_DIGITS' | 'BRAND' | 'LUHN';

/** 문제가 없으면 null */
export function cardProblem(raw: string, skipLuhn = false): CardProblem | null {
  const digits = digitsOnly(raw);
  if (!/^\d+$/.test(digits)) return 'NOT_DIGITS';
  if (digits.length !== 16) return 'LENGTH';
  if (!cardBrand(digits)) return 'BRAND';
  if (!skipLuhn && !luhnValid(digits)) return 'LUHN';
  return null;
}

/** 9860 1234 5678 9012 */
export const formatCardNumber = (digits: string) =>
  digitsOnly(digits).replace(/(\d{4})(?=\d)/g, '$1 ');

/** 9860 •••• •••• 9012 — 로그·운영자 메시지용 */
export const maskCardNumber = (digits: string) => {
  const d = digitsOnly(digits);
  return `${d.slice(0, 4)} •••• •••• ${d.slice(-4)}`;
};

/**
 * CARD_PAYMENT_CARDS 읽기.
 *   "9860 1234 5678 9012:ABRORBEK X; 8600 1234 5678 9012:ABRORBEK X"
 * 카드끼리는 ; 로, 번호와 이름은 : 로 나눈다. 이름은 생략해도 된다.
 */
export function parseReceivingCards(
  raw: string | undefined,
  skipLuhn = false,
): {
  cards: ReceivingCard[];
  problems: { masked: string; problem: CardProblem }[];
} {
  const cards: ReceivingCard[] = [];
  const problems: { masked: string; problem: CardProblem }[] = [];
  for (const entry of (raw ?? '').split(';')) {
    const trimmed = entry.trim();
    if (!trimmed) continue;
    const [numberPart, ...holderParts] = trimmed.split(':');
    const digits = digitsOnly(numberPart);
    const problem = cardProblem(digits, skipLuhn);
    if (problem) {
      problems.push({
        masked: digits.length >= 8 ? maskCardNumber(digits) : '(짧음)',
        problem,
      });
      continue;
    }
    if (cards.some((c) => c.number === digits)) continue;
    cards.push({
      brand: cardBrand(digits)!,
      number: digits,
      holder: holderParts.join(':').trim().toUpperCase(),
      last4: digits.slice(-4),
    });
  }
  return { cards, problems };
}

/** 유저가 입력한 "보낸 카드 끝 4자리" */
export const isLast4 = (raw: unknown): raw is string =>
  typeof raw === 'string' && /^\d{4}$/.test(raw);
