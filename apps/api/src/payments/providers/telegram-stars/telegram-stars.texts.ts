import type { SubscriptionTier } from '../../subscriptions/subscription.types';

/**
 * 봇이 텔레그램 안에서 직접 보여주는 글 (인보이스·결제 확인·명령 답장).
 * 앱 i18n 밖이라 여기 4개 언어를 같이 둔다. 기본은 우즈벡어.
 */
export type BotLang = 'uz' | 'ko' | 'en' | 'ru';

export const BOT_LANGS: readonly BotLang[] = ['uz', 'ko', 'en', 'ru'];

export function botLang(...candidates: (string | null | undefined)[]): BotLang {
  for (const c of candidates) {
    const code = (c ?? '').toLowerCase().slice(0, 2);
    if ((BOT_LANGS as readonly string[]).includes(code)) return code as BotLang;
  }
  return 'uz';
}

const PERIOD: Record<BotLang, Record<number, string>> = {
  uz: { 1: '1 oy', 3: '3 oy', 6: '6 oy', 12: '1 yil' },
  ko: { 1: '1개월', 3: '3개월', 6: '6개월', 12: '1년' },
  en: { 1: '1 month', 3: '3 months', 6: '6 months', 12: '1 year' },
  ru: { 1: '1 месяц', 3: '3 месяца', 6: '6 месяцев', 12: '1 год' },
};

const DESCRIPTION: Record<BotLang, Record<SubscriptionTier, string>> = {
  uz: {
    super:
      "Cheksiz energiya, reklamasiz, cheksiz takrorlash va barcha kurslar. Bir martalik to'lov — avtomatik yechib olinmaydi.",
    max: "AI ustoz bilan suhbat (kuniga 1 soatgacha, oyiga 200 daqiqa) + SUPER ning barcha imkoniyatlari. Bir martalik to'lov — avtomatik yechib olinmaydi.",
  },
  ko: {
    super:
      '에너지 무제한, 광고 없음, 무제한 복습, 모든 과정. 한 번 결제 — 자동으로 결제되지 않아요.',
    max: 'AI 튜터 회화(하루 최대 1시간, 한 달 200분) + SUPER 전체 혜택. 한 번 결제 — 자동으로 결제되지 않아요.',
  },
  en: {
    super:
      'Unlimited energy, no ads, unlimited review and every course. One-time payment — no auto-renewal.',
    max: 'AI tutor conversations (up to 1 hour a day, 200 min a month) + everything in SUPER. One-time payment — no auto-renewal.',
  },
  ru: {
    super:
      'Безлимитная энергия, без рекламы, безлимитное повторение и все курсы. Разовый платёж — без автопродления.',
    max: 'Разговоры с AI-репетитором (до 1 часа в день, 200 минут в месяц) + всё из SUPER. Разовый платёж — без автопродления.',
  },
};

const TEXT = {
  uz: {
    precheckoutFailed:
      "Bu to'lovni hozir qabul qilib bo'lmadi. Ilovani qayta ochib, yana urinib ko'ring.",
    paid: "✅ KORIO {tier} faollashtirildi — {date} gacha.\nRahmat! Ilovaga qaytib, o'rganishni davom ettiring.",
    paySupport:
      "To'lov bo'yicha yordam: {contact}\nYozayotganda to'lov chekidagi tranzaksiya ID sini ham yuboring.",
    terms: 'Foydalanish shartlari: {terms}\nMaxfiylik siyosati: {privacy}',
    start:
      "KORIO'ga xush kelibsiz! 🇰🇷 Koreys tilini o'yin kabi o'rganing — pastdagi tugmani bosing.",
    open: "KORIO'ni ochish",
    refunded:
      "↩️ To'lov qaytarildi. KORIO {tier} muddati shu to'lov uchun bekor qilindi.",
  },
  ko: {
    precheckoutFailed:
      '지금은 이 결제를 받을 수 없어요. 앱을 다시 열고 다시 시도해 주세요.',
    paid: '✅ KORIO {tier} 활성화 — {date}까지.\n고마워요! 앱으로 돌아가서 계속 공부해요.',
    paySupport:
      '결제 문의: {contact}\n문의할 때 결제 영수증의 거래 ID 도 같이 보내 주세요.',
    terms: '이용약관: {terms}\n개인정보 처리방침: {privacy}',
    start:
      'KORIO에 온 걸 환영해요! 🇰🇷 게임처럼 한국어를 배워 보세요 — 아래 버튼을 눌러요.',
    open: 'KORIO 열기',
    refunded:
      '↩️ 결제가 환불됐어요. 이 결제로 받은 KORIO {tier} 기간은 취소됐어요.',
  },
  en: {
    precheckoutFailed:
      "We can't accept this payment right now. Reopen the app and try again.",
    paid: '✅ KORIO {tier} is active until {date}.\nThank you! Head back to the app and keep learning.',
    paySupport:
      'Payment support: {contact}\nPlease include the transaction ID from your payment receipt.',
    terms: 'Terms of use: {terms}\nPrivacy policy: {privacy}',
    start:
      'Welcome to KORIO! 🇰🇷 Learn Korean like a game — tap the button below.',
    open: 'Open KORIO',
    refunded:
      '↩️ Your payment was refunded. The KORIO {tier} time from it has been removed.',
  },
  ru: {
    precheckoutFailed:
      'Сейчас не получается принять этот платёж. Откройте приложение заново и попробуйте ещё раз.',
    paid: '✅ KORIO {tier} активирован до {date}.\nСпасибо! Возвращайтесь в приложение и продолжайте учиться.',
    paySupport:
      'Помощь с оплатой: {contact}\nПожалуйста, укажите ID транзакции из чека об оплате.',
    terms:
      'Условия использования: {terms}\nПолитика конфиденциальности: {privacy}',
    start:
      'Добро пожаловать в KORIO! 🇰🇷 Учите корейский как в игре — нажмите кнопку ниже.',
    open: 'Открыть KORIO',
    refunded:
      '↩️ Платёж возвращён. Время KORIO {tier} за этот платёж отменено.',
  },
} satisfies Record<BotLang, Record<string, string>>;

export type BotTextKey = keyof (typeof TEXT)['uz'];

export function botText(
  lang: BotLang,
  key: BotTextKey,
  vars: Record<string, string> = {},
): string {
  return TEXT[lang][key].replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? '');
}

/** 인보이스 제목 (텔레그램 제한 1~32자) */
export function invoiceTitle(
  lang: BotLang,
  tier: SubscriptionTier,
  months: number,
) {
  return `KORIO ${tier.toUpperCase()} · ${PERIOD[lang][months] ?? `${months}`}`;
}

/** 인보이스 설명 (텔레그램 제한 1~255자) */
export function invoiceDescription(lang: BotLang, tier: SubscriptionTier) {
  return DESCRIPTION[lang][tier];
}

/** 결제 확인 메시지의 날짜. 유저 시간대로 자른다 */
export function botDate(lang: BotLang, date: Date, timeZone?: string | null) {
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: timeZone || 'Asia/Tashkent',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(date);
  } catch {
    parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tashkent',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(date);
  }
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return lang === 'ko'
    ? `${get('year')}.${get('month')}.${get('day')}`
    : `${get('day')}.${get('month')}.${get('year')}`;
}
