import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 선생님 목소리 미리듣기.
 *
 * ── 왜 Azure 가 아니라 Gemini 인가 ──
 *
 * 예전엔 미리듣기를 `/tutor/tts`(Azure ko-KR)로 냈다. 그런데 실제 통화는
 * Gemini native audio 라, **고를 때 들은 목소리와 수업에서 나오는 목소리가
 * 아예 다른 사람이었다.** 선생님을 고르는 화면에서 그건 치명적이다.
 *
 * (Azure 는 그대로 남는다 — 정확한 한국어 예문·발음 연습·다시 듣기는
 *  ko-KR 전용 목소리가 여전히 더 정확하다. 역할만 갈랐다.)
 *
 * ── 왜 미리 만들어 두나 ──
 *
 * 선생님이 다섯이고 언어가 넷이라 조합이 스무 개뿐이다. 누를 때마다 합성하면
 * 돈과 지연만 든다. `apps/tutor-agent/scripts/generate-voice-previews.ts` 로
 * 한 번 만들어 커밋하고, 여기서는 파일만 흘려보낸다.
 *
 * ⚠️ 목소리 매핑(gemini/voices.ts)을 바꾸면 **에셋도 다시 만들어야 한다.**
 *    안 그러면 미리듣기와 실제 통화가 또 갈라진다. 그 스크립트가
 *    voices.ts 를 직접 읽으므로 다시 돌리기만 하면 맞는다.
 */

/** 미리듣기를 제공하는 언어. 학습자가 고른 설명 언어와 같은 축이다 */
export const PREVIEW_LANGS = ['uz', 'ru', 'en', 'ko'] as const;
export type PreviewLang = (typeof PREVIEW_LANGS)[number];

/**
 * 에셋 위치.
 *
 * 런타임 WORKDIR 은 /repo/apps/api 이고 컴파일 결과는 dist 아래로 들어가므로
 * **dist 기준이 아니라 앱 루트 기준**으로 찾는다 (dist 에는 .js 만 들어간다).
 * Dockerfile 이 assets 를 따로 COPY 한다.
 */
const ROOT = join(__dirname, '..', '..', '..', 'assets', 'tutor-previews');

export function previewLang(raw?: string): PreviewLang {
  return PREVIEW_LANGS.includes(raw as PreviewLang)
    ? (raw as PreviewLang)
    : 'uz';
}

/**
 * 파일 경로.
 *
 * ⚠️ teacherId 를 경로에 그대로 넣지 않는다 — `../../` 로 서버 아무 파일이나
 *    읽히는 자리다. 모양을 먼저 검사한다.
 */
export function previewPath(
  teacherId: string,
  lang: PreviewLang,
): string | null {
  if (!/^[a-z0-9_-]{1,40}$/i.test(teacherId)) return null;
  const file = join(ROOT, `${teacherId}-${lang}.mp3`);
  return existsSync(file) ? file : null;
}

/** 카드에 실어 보낼 상대 주소. 아직 파일이 없으면 null 이다 */
export function previewUrl(
  teacherId: string,
  lang: PreviewLang,
): string | null {
  return previewPath(teacherId, lang)
    ? `/tutor/teachers/${encodeURIComponent(teacherId)}/preview?lang=${lang}`
    : null;
}
