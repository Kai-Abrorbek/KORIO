/** 메일 문구가 준비된 언어. 앱 i18n(ko/uz/en/ru)과 같은 집합이다 */
export const MAIL_LANGS = ['ko', 'uz', 'en', 'ru'] as const;
export type MailLang = (typeof MAIL_LANGS)[number];
export const DEFAULT_MAIL_LANG: MailLang = 'uz';

/** 'ko-KR', 'uz', null 같은 값을 아는 언어 하나로 좁힌다 */
export function resolveMailLang(raw?: string | null): MailLang {
  const v = (raw ?? '').slice(0, 2).toLowerCase() as MailLang;
  return MAIL_LANGS.includes(v) ? v : DEFAULT_MAIL_LANG;
}

export interface MailMessage {
  to: string;
  subject: string;
  html: string;
  /** HTML 을 못 읽는 클라이언트용. 이게 없으면 스팸 점수가 올라간다 */
  text: string;
}

/**
 * 메일을 실제로 내보내는 곳.
 *
 * 지금은 Resend 하나뿐이다. 다른 곳으로 옮길 때는 이 인터페이스만 구현해서
 * MailService 의 pickTransport 에 끼우면 되고, 부르는 쪽은 안 건드려도 된다.
 */
export interface MailTransport {
  readonly name: string;
  send(msg: MailMessage): Promise<void>;
}
