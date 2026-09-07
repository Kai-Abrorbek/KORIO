import { MailLang, MailMessage } from './mail.types';

/**
 * 메일 문구와 모양.
 *
 * 메일 클라이언트는 <style> 태그와 최신 CSS 를 반쯤만 지원한다. 그래서 여기선
 * 테이블 + 인라인 스타일만 쓰고, 다크모드 대응도 하지 않는다 (클라이언트가
 * 제멋대로 반전시키면 오히려 읽기 나빠진다). 색은 전부 밝은 배경 기준.
 */

const BRAND = '#776ee2';
const INK = '#1B1B22';
const MUTED = '#6B6B7B';

type Copy = {
  subject: string;
  heading: string;
  lead: string;
  codeLabel: string;
  expiry: string;
  ignore: string;
  footer: string;
};

const RESET_COPY: Record<MailLang, Copy> = {
  ko: {
    subject: 'KORIO 비밀번호 재설정 코드',
    heading: '비밀번호를 재설정할까요?',
    lead: '앱에 아래 코드를 입력하면 새 비밀번호를 만들 수 있어요.',
    codeLabel: '인증 코드',
    expiry: '이 코드는 {{minutes}}분 뒤에 만료돼요.',
    ignore:
      '본인이 요청한 게 아니라면 이 메일은 무시해도 괜찮아요. 비밀번호는 그대로예요.',
    footer: 'KORIO — 한국어를 재미있게',
  },
  uz: {
    subject: 'KORIO parolni tiklash kodi',
    heading: 'Parolni tiklaymizmi?',
    lead: 'Yangi parol yaratish uchun ilovaga quyidagi kodni kiriting.',
    codeLabel: 'Tasdiqlash kodi',
    expiry: 'Kod {{minutes}} daqiqadan keyin eskiradi.',
    ignore:
      "Agar buni siz so'ramagan bo'lsangiz, xatni e'tiborsiz qoldiring. Parolingiz o'zgarmaydi.",
    footer: 'KORIO — koreys tilini qiziqarli o‘rganing',
  },
  en: {
    subject: 'Your KORIO password reset code',
    heading: 'Reset your password',
    lead: 'Enter the code below in the app to create a new password.',
    codeLabel: 'Verification code',
    expiry: 'This code expires in {{minutes}} minutes.',
    ignore:
      "If you didn't request this, you can ignore this email. Your password stays the same.",
    footer: 'KORIO — Korean, made fun',
  },
  ru: {
    subject: 'Код для сброса пароля KORIO',
    heading: 'Сбросить пароль?',
    lead: 'Введите код ниже в приложении, чтобы задать новый пароль.',
    codeLabel: 'Код подтверждения',
    expiry: 'Код действует ещё {{minutes}} мин.',
    ignore:
      'Если это были не вы — просто проигнорируйте письмо. Пароль останется прежним.',
    footer: 'KORIO — корейский с удовольствием',
  },
};

type SocialCopy = {
  subject: string;
  heading: string;
  lead: string;
  ignore: string;
  footer: string;
};

const SOCIAL_COPY: Record<MailLang, SocialCopy> = {
  ko: {
    subject: 'KORIO 로그인 방법 안내',
    heading: '이 계정에는 비밀번호가 없어요',
    lead: '이 이메일은 {{provider}} 계정으로 가입돼 있어요. 앱에서 {{provider}} 버튼으로 로그인해 주세요.',
    ignore: '본인이 요청한 게 아니라면 이 메일은 무시해도 괜찮아요.',
    footer: 'KORIO — 한국어를 재미있게',
  },
  uz: {
    subject: 'KORIO — qanday kirish kerak',
    heading: 'Bu hisobda parol yo‘q',
    lead: "Bu e'tibor {{provider}} orqali ro'yxatdan o'tgan. Ilovada {{provider}} tugmasi bilan kiring.",
    ignore: "Agar buni siz so'ramagan bo'lsangiz, xatni e'tiborsiz qoldiring.",
    footer: 'KORIO — koreys tilini qiziqarli o‘rganing',
  },
  en: {
    subject: 'How to sign in to KORIO',
    heading: 'This account has no password',
    lead: 'This email is registered with {{provider}}. Use the {{provider}} button in the app to sign in.',
    ignore: "If you didn't request this, you can ignore this email.",
    footer: 'KORIO — Korean, made fun',
  },
  ru: {
    subject: 'Как войти в KORIO',
    heading: 'У этого аккаунта нет пароля',
    lead: 'Эта почта зарегистрирована через {{provider}}. Войдите кнопкой {{provider}} в приложении.',
    ignore: 'Если это были не вы — просто проигнорируйте письмо.',
    footer: 'KORIO — корейский с удовольствием',
  },
};

const PROVIDER_LABEL: Record<string, string> = {
  google: 'Google',
  kakao: 'Kakao',
  naver: 'Naver',
  telegram: 'Telegram',
  apple: 'Apple',
};

function fill(s: string, params: Record<string, string | number>): string {
  return s.replace(/\{\{(\w+)\}\}/g, (_, k: string) =>
    params[k] === undefined ? '' : String(params[k]),
  );
}

/** 메일 클라이언트가 HTML 을 못 열 때를 대비해 태그를 벗긴 본문도 같이 보낸다 */
function stripTags(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function shell(inner: string, footer: string): string {
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#F4F4F8;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F8;padding:32px 12px;">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#FFFFFF;border-radius:20px;overflow:hidden;">
      <tr><td style="height:6px;background:${BRAND};"></td></tr>
      <tr><td style="padding:36px 32px 32px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <div style="font-size:22px;font-weight:800;color:${BRAND};letter-spacing:-0.5px;margin-bottom:26px;">KORIO</div>
        ${inner}
      </td></tr>
    </table>
    <div style="max-width:480px;margin-top:18px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:#9A9AAB;text-align:center;">${footer}</div>
  </td></tr>
</table>
</body></html>`;
}

/** 재설정 코드 메일 */
export function passwordResetMail(
  to: string,
  lang: MailLang,
  code: string,
  minutes: number,
): MailMessage {
  const c = RESET_COPY[lang];
  const inner = `
    <div style="font-size:21px;font-weight:800;color:${INK};margin-bottom:10px;">${c.heading}</div>
    <div style="font-size:15px;line-height:1.6;color:${MUTED};margin-bottom:26px;">${c.lead}</div>
    <div style="font-size:12px;font-weight:700;color:${MUTED};letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">${c.codeLabel}</div>
    <div style="background:#F1F0FB;border-radius:14px;padding:18px 0;text-align:center;font-size:34px;font-weight:800;letter-spacing:10px;color:${INK};">${code}</div>
    <div style="font-size:13px;color:${MUTED};margin-top:14px;">${fill(c.expiry, { minutes })}</div>
    <div style="height:1px;background:#EDEDF3;margin:26px 0 18px 0;"></div>
    <div style="font-size:13px;line-height:1.6;color:#9A9AAB;">${c.ignore}</div>`;
  const html = shell(inner, c.footer);
  return {
    to,
    subject: c.subject,
    html,
    text: `${c.heading}\n\n${c.lead}\n\n${c.codeLabel}: ${code}\n${fill(c.expiry, { minutes })}\n\n${c.ignore}`,
  };
}

/**
 * 소셜 계정이 비밀번호 찾기를 눌렀을 때.
 *
 * 응답으로는 "계정이 없다/소셜이다" 를 알려주지 않는다 (계정 존재 여부가
 * 새어나간다). 대신 메일 주인에게만 조용히 알려준다 — 메일함을 여는 사람은
 * 어차피 그 계정 주인이다.
 */
export function passwordResetSocialMail(
  to: string,
  lang: MailLang,
  provider: string,
): MailMessage {
  const c = SOCIAL_COPY[lang];
  const label = PROVIDER_LABEL[provider] ?? provider;
  const inner = `
    <div style="font-size:21px;font-weight:800;color:${INK};margin-bottom:10px;">${c.heading}</div>
    <div style="font-size:15px;line-height:1.6;color:${MUTED};">${fill(c.lead, { provider: label })}</div>
    <div style="height:1px;background:#EDEDF3;margin:26px 0 18px 0;"></div>
    <div style="font-size:13px;line-height:1.6;color:#9A9AAB;">${c.ignore}</div>`;
  const html = shell(inner, c.footer);
  return { to, subject: c.subject, html, text: stripTags(inner) };
}
