/**
 * 클라이언트가 보낸 프로필 사진 주소를 걸러낸다.
 *
 * 🔴 아무 주소나 받으면 공격자가 자기 서버 주소를 사진으로 걸어 둔다.
 *    그 사람이 랭킹·팔로워·검색·푸시 알림에 뜰 때마다 **보는 사람의 폰이 그
 *    서버로 요청을 보내서** IP·접속 시각·기기 정보가 통째로 넘어간다.
 *    (http 주소면 통신사 구간에서 가로채기도 된다.)
 *
 * 그래서 https 이고, 소셜 로그인 제공자들의 이미지 서버일 때만 받는다.
 * 서버가 제공자에게서 직접 받은 주소(구글 토큰의 picture, 카카오·네이버 OAuth,
 * 텔레그램 서명 데이터)는 이걸 거치지 않는다 — 출처가 이미 검증돼 있다.
 */
const ALLOWED_IMAGE_HOSTS = [
  'googleusercontent.com',
  'kakaocdn.net',
  'pstatic.net',
  't.me',
  'telegram.org',
  'telesco.pe',
];

export function isSafeImageUrl(raw: unknown): raw is string {
  if (typeof raw !== 'string' || raw.length > 500) return false;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  if (url.protocol !== 'https:' || url.username || url.password) return false;
  const host = url.hostname.toLowerCase();
  return ALLOWED_IMAGE_HOSTS.some(
    (allowed) => host === allowed || host.endsWith(`.${allowed}`),
  );
}

/** 안전하면 그대로, 아니면 undefined (= 안 바꾼다) */
export function safeImageUrl(raw: unknown): string | undefined {
  return isSafeImageUrl(raw) ? raw : undefined;
}
