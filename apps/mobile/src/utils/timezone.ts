import { UserService } from "@/services/user.service";

/**
 * 기기 시간대를 계정에 맞춰 둔다.
 *
 * 서버는 하루("오늘 XP")와 한 주(리그) 경계를 이 값으로 자른다. 예전에는 서버
 * 로컬(KST) 로 잘라서, 타슈켄트(UTC+5) 유저가 저녁 8시 이후에 공부하면 그 기록이
 * 다음 날로 넘어갔다. 우즈벡 유저가 한국에 사는 경우도 많아 국가로는 못 맞춘다.
 *
 * 서버 값과 같으면 요청을 안 보낸다 — 홈에 들어올 때마다 부르는 자리라서.
 */
let lastSent: string | null = null;

export function deviceTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    return "";
  }
}

export function syncTimezone(serverTimezone?: string | null) {
  const tz = deviceTimezone();
  if (!tz) return;
  if (tz === serverTimezone || tz === lastSent) return;

  lastSent = tz;
  UserService.updateTimezone(tz).catch(() => {
    // 실패해도 학습을 막을 이유는 없다. 다음 진입 때 다시 시도한다.
    lastSent = null;
  });
}
