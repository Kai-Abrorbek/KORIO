/**
 * 로컬(서버 TZ = Asia/Seoul, KST) 기준 YYYY-MM-DD 키를 반환한다.
 * UTC 기반 toISOString()은 KST 자정이 전날로 밀리므로 날짜 비교/그룹핑에 쓰면 안 된다.
 */
export function localKey(dt: Date): string {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const day = String(dt.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
