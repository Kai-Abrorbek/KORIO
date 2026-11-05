import { TopikAudio } from '../../../topik/schemas/topik-content.schema';
import {
  TOPIK_LISTENING_RATE_BY_KEY,
  TOPIK_LISTENING_RATE_BY_NUMBER,
} from './topik-listening-rates.generated';

/**
 * 듣기 대본을 TTS 로 읽을 속도. 원본 기출 음원에서 잰 이 음성(회차·문항)의 값이
 * 있으면 그것, 없으면(모의고사·원본이 없는 회차) 같은 급수·같은 문항 번호의 대표값.
 */
export function topikListeningSpeechRate(
  audioKey: string,
  examType: string,
  fallbackNumber?: number,
): number | undefined {
  const exact = TOPIK_LISTENING_RATE_BY_KEY[audioKey];
  if (exact !== undefined) return exact;
  const number =
    Number(/-(\d+)(?:-\d+)?$/.exec(audioKey)?.[1]) || fallbackNumber;
  if (!number) return undefined;
  return TOPIK_LISTENING_RATE_BY_NUMBER[examType]?.[number];
}

function withRate(
  audio: TopikAudio | undefined,
  examType: string,
  fallbackNumber?: number,
): TopikAudio | undefined {
  if (!audio) return audio;
  const speechRate = topikListeningSpeechRate(
    audio.key,
    examType,
    fallbackNumber,
  );
  return speechRate === undefined ? audio : { ...audio, speechRate };
}

/** 시드 문항·묶음의 음성에 TTS 속도를 붙인다 (audio, sharedAudio) */
export function withTopikListeningRates<
  T extends {
    audio?: TopikAudio;
    sharedAudio?: TopikAudio;
    number?: number;
    startNumber?: number;
  },
>(item: T, examType: string): T {
  const number = item.number ?? item.startNumber;
  return {
    ...item,
    ...('audio' in item
      ? { audio: withRate(item.audio, examType, number) }
      : {}),
    ...('sharedAudio' in item
      ? { sharedAudio: withRate(item.sharedAudio, examType, number) }
      : {}),
  };
}
