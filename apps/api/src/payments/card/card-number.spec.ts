import {
  cardBrand,
  cardProblem,
  formatCardNumber,
  isLast4,
  luhnValid,
  maskCardNumber,
  parseReceivingCards,
} from './card-number';
import {
  CARD_AMOUNT_OFFSET_MAX,
  cardCatalog,
  formatSom,
  pickUniqueAmount,
} from './card-payment.const';

/** 앞 15자리에 Luhn 체크 숫자를 붙인다 */
function withCheckDigit(first15: string) {
  for (let d = 0; d <= 9; d++) {
    if (luhnValid(first15 + d)) return first15 + d;
  }
  throw new Error('unreachable');
}

const HUMO = withCheckDigit('986012345678901');
const UZCARD = withCheckDigit('860049494949494');
/** Uzcard–UnionPay 코뱃지 */
const UZCARD_UP = withCheckDigit('626212345678901');
/** 마지막 숫자 하나만 틀린 오타 */
const HUMO_TYPO = HUMO.slice(0, 15) + String((Number(HUMO[15]) + 1) % 10);

describe('카드번호 검사', () => {
  it('Luhn', () => {
    expect(luhnValid('4111111111111111')).toBe(true);
    expect(luhnValid('4111111111111112')).toBe(false);
    expect(luhnValid(HUMO)).toBe(true);
    expect(luhnValid(HUMO_TYPO)).toBe(false);
    expect(luhnValid('abc')).toBe(false);
  });

  it('앞자리로 Humo·Uzcard 를 가린다', () => {
    expect(cardBrand(HUMO)).toBe('humo');
    expect(cardBrand(UZCARD)).toBe('uzcard');
    expect(cardBrand(UZCARD_UP)).toBe('uzcard');
    expect(cardBrand('4111111111111111')).toBeNull();
    expect(cardBrand('6200123456789012')).toBeNull();
  });

  it('문제를 이름으로 돌려준다', () => {
    expect(
      cardProblem(`${HUMO.slice(0, 4)} ${HUMO.slice(4, 8)}-${HUMO.slice(8)}`),
    ).toBeNull();
    expect(cardProblem(HUMO.slice(0, 15))).toBe('LENGTH');
    expect(cardProblem('9860abcd12345678')).toBe('NOT_DIGITS');
    expect(cardProblem('4111111111111111')).toBe('BRAND');
    expect(cardProblem(HUMO_TYPO)).toBe('LUHN');
    expect(cardProblem(HUMO_TYPO, true)).toBeNull();
    expect(cardProblem(UZCARD_UP)).toBeNull();
    // 사용자가 실제로 넣었던 테스트 값 — 15자리 / Luhn 불일치
    expect(cardProblem('9860 0000 000 0000')).toBe('LENGTH');
    expect(cardProblem('8600 0000 0000 0000')).toBe('LUHN');
  });

  it('env 를 읽어 맞는 카드만 띄우고 틀린 건 가려서 알린다', () => {
    const raw = [
      `${formatCardNumber(HUMO)}: abrorbek x`,
      `${UZCARD}`,
      HUMO_TYPO,
      '4111111111111111:VISA',
      '9860 1234',
      HUMO, // 중복
      '',
    ].join(';');
    const { cards, problems } = parseReceivingCards(raw);
    expect(cards).toEqual([
      {
        brand: 'humo',
        number: HUMO,
        holder: 'ABRORBEK X',
        last4: HUMO.slice(-4),
      },
      { brand: 'uzcard', number: UZCARD, holder: '', last4: UZCARD.slice(-4) },
    ]);
    expect(problems.map((p) => p.problem)).toEqual(['LUHN', 'BRAND', 'LENGTH']);
    // 로그·운영자 메시지에는 가운데를 가린다
    expect(problems[0].masked).toBe(maskCardNumber(HUMO_TYPO));
    expect(problems[0].masked).toContain('••••');
    expect(parseReceivingCards(undefined).cards).toEqual([]);
  });

  it('보기 좋게 4자리씩', () => {
    expect(formatCardNumber(HUMO)).toMatch(/^\d{4} \d{4} \d{4} \d{4}$/);
  });

  it('보낸 카드 끝 4자리만 받는다', () => {
    expect(isLast4('1234')).toBe(true);
    expect(isLast4('123')).toBe(false);
    expect(isLast4('12a4')).toBe(false);
    expect(isLast4(1234)).toBe(false);
    expect(isLast4(HUMO)).toBe(false);
  });
});

describe('고유 금액', () => {
  it('정가에서 1~999 를 빼고, 최근 주문과 겹치지 않는다', () => {
    const base = 59_000;
    const taken = new Set<number>();
    for (let i = 0; i < 300; i++) {
      const amount = pickUniqueAmount(base, taken);
      expect(amount).toBeLessThan(base);
      expect(amount).toBeGreaterThanOrEqual(base - CARD_AMOUNT_OFFSET_MAX);
      expect(taken.has(amount)).toBe(false);
      taken.add(amount);
    }
  });

  it('거의 다 찼어도 빈 값을 찾는다', () => {
    const base = 59_000;
    const taken = new Set<number>();
    for (let o = 1; o <= CARD_AMOUNT_OFFSET_MAX; o++)
      if (o !== 777) taken.add(base - o);
    expect(pickUniqueAmount(base, taken)).toBe(base - 777);
  });

  it("so'm 표기", () => {
    expect(formatSom(1_139_000)).toBe('1 139 000');
    expect(formatSom(58_563)).toBe('58 563');
  });

  it('가격표 — 1년권이 best, 할인율', () => {
    const catalog = cardCatalog();
    expect(catalog.filter((p) => p.best).map((p) => p.id)).toEqual([
      'super_12m',
      'max_12m',
    ]);
    const save = (id: string) => catalog.find((p) => p.id === id)!.savePercent;
    expect([save('super_3m'), save('super_6m'), save('super_12m')]).toEqual([
      12, 21, 37,
    ]);
    expect([save('max_3m'), save('max_6m'), save('max_12m')]).toEqual([
      15, 19, 26,
    ]);
  });
});
