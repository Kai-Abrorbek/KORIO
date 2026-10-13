/**
 * 보석 출금 카드 검사 — 서버(api/src/gem-payouts/payout-card.ts)·텔레그램(features/misc/model/payout.ts)과 **같은 규칙**.
 * 서버가 다시 보지만, 한 자리 오타로 남의 카드에 돈이 가는 걸 입력하는 순간 잡으려고 앱에서도 본다.
 *   1. 숫자 16자리
 *   2. 앞자리로 카드 종류 — Uzcard 8600·6262, Humo 9860, Visa 4, Mastercard 51–55·2221–2720
 *   3. 고른 카드 종류와 번호가 맞는지
 *   4. Luhn 체크섬 (Uzcard–UnionPay 6262 는 건너뛴다 — 서버와 같다)
 */
export type PayoutBrand = "uzcard" | "humo" | "visa" | "mastercard";
export type PayoutCardProblem = "LENGTH" | "BRAND" | "BRAND_MISMATCH" | "LUHN";

export const PAYOUT_BRANDS: { id: PayoutBrand; label: string; color: string }[] = [
  { id: "uzcard", label: "UZCARD", color: "#1B5FAA" },
  { id: "humo", label: "HUMO", color: "#0FA36B" },
  { id: "visa", label: "VISA", color: "#1A1F71" },
  { id: "mastercard", label: "Mastercard", color: "#EB001B" },
];

export const brandLabel = (brand: string) =>
  PAYOUT_BRANDS.find((b) => b.id === brand)?.label ?? brand.toUpperCase();

export const cardDigits = (value: string) => value.replace(/\D/g, "");

/** 4자리씩 끊어 보여준다 — 16자리를 붙여 쓰면 오타를 못 잡는다 */
export const formatCardInput = (value: string) =>
  cardDigits(value)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

/** 앞자리만으로 카드 종류를 안다 (입력 중에도 바로 칩을 골라 준다) */
export function detectPayoutBrand(digits: string): PayoutBrand | null {
  if (/^(8600|6262)/.test(digits)) return "uzcard";
  if (/^9860/.test(digits)) return "humo";
  if (/^4/.test(digits)) return "visa";
  if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d\d|27[01]\d|2720)/.test(digits)) return "mastercard";
  return null;
}

function luhnValid(digits: string) {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

/** 문제가 없으면 null. 16자리가 다 차기 전엔 LENGTH */
export function payoutCardProblem(
  digits: string,
  brand: PayoutBrand | null,
): PayoutCardProblem | null {
  if (digits.length !== 16) return "LENGTH";
  const detected = detectPayoutBrand(digits);
  if (!detected) return "BRAND";
  if (brand && detected !== brand) return "BRAND_MISMATCH";
  if (!digits.startsWith("6262") && !luhnValid(digits)) return "LUHN";
  return null;
}

/** 입력 중 — 대문자로, 휘어진 따옴표는 ' 로. 라틴이 아닌 글자는 지우지 않고 검사에서 알려 준다 */
export const formatHolderInput = (value: string) =>
  value
    .replace(/[ʻʼ‘’`]/g, "'")
    .toUpperCase()
    .replace(/\s{2,}/g, " ")
    .slice(0, 40);

/** 서버 normalizeCardHolder 와 같다. 맞지 않으면 null */
export function normalizeHolder(value: string): string | null {
  const name = formatHolderInput(value).trim();
  if (!/^[A-Z][A-Z '.-]{1,39}$/.test(name)) return null;
  if ((name.match(/[A-Z]/g) ?? []).length < 2) return null;
  return name;
}
