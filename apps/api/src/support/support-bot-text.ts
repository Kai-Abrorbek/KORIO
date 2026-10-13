import type { BotLang } from '../payments/providers/telegram-stars/telegram-stars.texts';

/** 텔레그램 메시지 한 통의 최대 길이 */
const TELEGRAM_TEXT_MAX = 4096;

const FRAME: Record<
  BotLang,
  { head: (subject: string) => string; foot: string }
> = {
  uz: {
    head: (s) =>
      `💬 KORIO yordam markazidan javob\n«${s}» murojaatingiz bo'yicha:`,
    foot: "Javobni ilovadagi «Murojaatlarim» bo'limida ham ko'rasiz.",
  },
  ko: {
    head: (s) => `💬 KORIO 고객지원 답변\n「${s}」 문의에 답변드려요:`,
    foot: '앱의 「내 문의」에서도 다시 볼 수 있어요.',
  },
  en: {
    head: (s) => `💬 Reply from KORIO support\nAbout your request "${s}":`,
    foot: 'You can also find it under "My requests" in the app.',
  },
  ru: {
    head: (s) => `💬 Ответ поддержки KORIO\nПо вашему обращению «${s}»:`,
    foot: 'Ответ также есть в разделе «Мои обращения» в приложении.',
  },
};

/**
 * 문의 답장 (텔레그램 미니앱 유저에게 봇으로). 서식(parse_mode) 없이 평문 —
 * 관리자 답장에 * _ 같은 글자가 있어도 깨지지 않는다.
 * 너무 길면 본문만 자른다 — 전체는 앱 "내 문의" 에 남아 있다.
 */
export function supportReplyBotText(
  lang: BotLang,
  subject: string,
  message: string,
): string {
  const frame = FRAME[lang] ?? FRAME.uz;
  const head = frame.head(subject);
  const room = TELEGRAM_TEXT_MAX - head.length - frame.foot.length - 4;
  const body =
    message.length > room
      ? `${message.slice(0, Math.max(0, room - 1))}…`
      : message;
  return `${head}\n\n${body}\n\n${frame.foot}`;
}
