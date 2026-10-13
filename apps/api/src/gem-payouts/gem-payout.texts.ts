import type { BotLang } from '../payments/providers/telegram-stars/telegram-stars.texts';
import type { PayoutRejectReason } from './gem-payout.const';

/**
 * 텔레그램 봇 메시지 (미니앱 유저에게). 앱 유저는 푸시(push-copy)로 간다.
 * 숫자는 "1,000" 처럼 끊어서 넣는다.
 */
const REASON: Record<BotLang, Record<PayoutRejectReason, string>> = {
  ko: {
    invalid_card: '카드 정보로 송금할 수 없었어요',
    name_mismatch: '카드 이름이 맞지 않았어요',
    suspicious: '확인이 필요한 신청이었어요',
    other: '운영 정책에 따라 처리할 수 없었어요',
  },
  uz: {
    invalid_card: "Karta ma'lumotlari bilan pul o'tkazib bo'lmadi",
    name_mismatch: 'Karta egasining ismi mos kelmadi',
    suspicious: "So'rovni tekshirish kerak bo'ldi",
    other: "Qoidalarga ko'ra bajarib bo'lmadi",
  },
  en: {
    invalid_card: "We couldn't send money with these card details",
    name_mismatch: "The cardholder name didn't match",
    suspicious: 'The request needed review',
    other: "We couldn't process it under our policy",
  },
  ru: {
    invalid_card: 'Не удалось отправить деньги по этим данным карты',
    name_mismatch: 'Имя владельца карты не совпало',
    suspicious: 'Заявка требует проверки',
    other: 'Не удалось обработать по правилам сервиса',
  },
};

export function payoutReasonText(lang: BotLang, reason: string | null) {
  const table = REASON[lang];
  return table[(reason as PayoutRejectReason) ?? 'other'] ?? table.other;
}

export function payoutDoneBotText(
  lang: BotLang,
  p: { amount: string; last4: string },
) {
  switch (lang) {
    case 'ko':
      return `✅ 보석 출금이 끝났어요\n${p.amount} so'm 을 •••• ${p.last4} 카드로 보냈어요. 은행에 따라 도착까지 조금 걸릴 수 있어요.`;
    case 'en':
      return `✅ Your gem withdrawal is done\nWe sent ${p.amount} so'm to the card •••• ${p.last4}. It may take a little while to arrive, depending on the bank.`;
    case 'ru':
      return `✅ Вывод самоцветов выполнен\nМы отправили ${p.amount} сум на карту •••• ${p.last4}. Зачисление может занять немного времени.`;
    default:
      return `✅ Gavhar yechish bajarildi\n${p.amount} so'm •••• ${p.last4} kartaga yuborildi. Bankka qarab tushishi biroz vaqt olishi mumkin.`;
  }
}

export function payoutRejectedBotText(
  lang: BotLang,
  p: { gems: string; reason: string | null },
) {
  const why = payoutReasonText(lang, p.reason);
  switch (lang) {
    case 'ko':
      return `↩️ 보석 출금 신청이 반려됐어요\n${why}. 보석 ${p.gems}개는 돌려드렸어요.`;
    case 'en':
      return `↩️ Your gem withdrawal was declined\n${why}. Your ${p.gems} gems have been returned.`;
    case 'ru':
      return `↩️ Заявка на вывод самоцветов отклонена\n${why}. ${p.gems} самоцветов вернули на ваш счёт.`;
    default:
      return `↩️ Gavhar yechish so'rovi rad etildi\n${why}. ${p.gems} ta gavhar hisobingizga qaytarildi.`;
  }
}
