import { TopikAudio } from '../../../topik/schemas/topik-content.schema';
import {
  TOPIK_LISTENING_CLIPS,
  TOPIK_LISTENING_EXAM_AUDIO,
} from './topik-listening-media.generated';

/**
 * 원본 기출 듣기 음원(문항 클립·회차 전체)이 나가는 곳. 파일은 서버의
 * deploy/www/media/topik/ 에 직접 올린다 (git 에 없다 — deploy/README.md "미디어 파일").
 * 다른 곳에 올렸으면 TOPIK_MEDIA_BASE_URL 로 바꾸고, off 면 링크를 넣지 않는다.
 */
export const DEFAULT_TOPIK_MEDIA_BASE_URL = 'https://korio.online/media/topik';

export function topikMediaUrl(base: string, file: string) {
  return `${base.replace(/\/+$/, '')}/${file}`;
}

/** 시드가 링크를 넣기 전에 서버에 파일이 정말 있는지 본다 (없으면 null → TTS 그대로) */
export async function reachableTopikMediaBase(
  configured = process.env.TOPIK_MEDIA_BASE_URL,
): Promise<string | null> {
  const base = configured?.trim() || DEFAULT_TOPIK_MEDIA_BASE_URL;
  if (base === 'off') return null;
  const samples = [
    Object.values(TOPIK_LISTENING_CLIPS)[0],
    Object.values(TOPIK_LISTENING_EXAM_AUDIO)[0],
  ].filter(Boolean);
  try {
    for (const file of samples) {
      const res = await fetch(topikMediaUrl(base, file), { method: 'HEAD' });
      if (!res.ok) {
        console.warn(
          `TOPIK 원본 음원 없음 (${res.status} ${file}) — 듣기는 대본 TTS 로 둔다`,
        );
        return null;
      }
    }
    return base;
  } catch {
    console.warn('TOPIK 원본 음원 서버에 닿지 않음 — 듣기는 대본 TTS 로 둔다');
    return null;
  }
}

function withClip(
  audio: TopikAudio | undefined,
  base: string | null,
): TopikAudio | undefined {
  if (!audio || !base) return audio;
  const file = TOPIK_LISTENING_CLIPS[audio.key];
  return file ? { ...audio, audioUrl: topikMediaUrl(base, file) } : audio;
}

/** 시드 문항·묶음 음성에 원본 클립 주소를 붙인다. 클립이 없는 음성은 그대로(TTS) */
export function withTopikListeningMedia<
  T extends { audio?: TopikAudio; sharedAudio?: TopikAudio },
>(item: T, base: string | null): T {
  return {
    ...item,
    ...('audio' in item ? { audio: withClip(item.audio, base) } : {}),
    ...('sharedAudio' in item
      ? { sharedAudio: withClip(item.sharedAudio, base) }
      : {}),
  };
}

/** 모의고사(실전) 모드에서 처음부터 끝까지 트는 회차 원본 전체 */
export function topikExamAudioUrl(
  examCode: string,
  base: string | null,
): string | null {
  const file = base ? TOPIK_LISTENING_EXAM_AUDIO[examCode] : undefined;
  return file && base ? topikMediaUrl(base, file) : null;
}
