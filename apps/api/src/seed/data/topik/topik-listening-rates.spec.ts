import { TopikAudio } from '../../../topik/schemas/topik-content.schema';
import {
  TOPIK_LISTENING_RATE_BY_KEY,
  TOPIK_LISTENING_RATE_BY_NUMBER,
} from './topik-listening-rates.generated';
import {
  topikListeningSpeechRate,
  withTopikListeningRates,
} from './topik-listening-rates';

const audio = (key: string): TopikAudio => ({
  key,
  audioUrl: '',
  transcript: [{ speaker: '여자', text: '안녕하세요.' }],
  mockPlaybackLimit: 1,
  guidedPlaybackLimit: 3,
  guidedAutoRepeatCount: 1,
  speechFallback: true,
});

describe('TOPIK 듣기 TTS 속도', () => {
  it('모든 값이 스키마 범위(0.5~1.6) 안이다', () => {
    const values = [
      ...Object.values(TOPIK_LISTENING_RATE_BY_KEY),
      ...Object.values(TOPIK_LISTENING_RATE_BY_NUMBER).flatMap((table) =>
        Object.values(table),
      ),
    ];
    expect(values.length).toBeGreaterThan(0);
    for (const value of values) {
      expect(value).toBeGreaterThanOrEqual(0.5);
      expect(value).toBeLessThanOrEqual(1.6);
    }
  });

  it('번호별 대표값이 TOPIK I 1~30, TOPIK II 1~50 을 다 덮는다', () => {
    for (let n = 1; n <= 30; n++) {
      expect(TOPIK_LISTENING_RATE_BY_NUMBER.topik_i[n]).toBeDefined();
    }
    for (let n = 1; n <= 50; n++) {
      expect(TOPIK_LISTENING_RATE_BY_NUMBER.topik_ii[n]).toBeDefined();
    }
  });

  it('원본에서 잰 음성은 그 값을 쓴다', () => {
    const [key, rate] = Object.entries(TOPIK_LISTENING_RATE_BY_KEY)[0];
    expect(topikListeningSpeechRate(key, 'topik_i')).toBe(rate);
  });

  it('못 잰 음성은 급수·번호 대표값 (짝 문항은 앞 번호)', () => {
    expect(topikListeningSpeechRate('listening-01', 'topik_ii')).toBe(
      TOPIK_LISTENING_RATE_BY_NUMBER.topik_ii[1],
    );
    expect(
      topikListeningSpeechRate('topik-ii-999-listening-21-22', 'topik_ii'),
    ).toBe(TOPIK_LISTENING_RATE_BY_NUMBER.topik_ii[21]);
    expect(topikListeningSpeechRate('no-number', 'topik_i', 7)).toBe(
      TOPIK_LISTENING_RATE_BY_NUMBER.topik_i[7],
    );
    expect(topikListeningSpeechRate('no-number', 'topik_i')).toBeUndefined();
  });

  it('시드 문항·묶음 음성에 speechRate 를 붙이고 음성 없는 건 그대로 둔다', () => {
    const question = withTopikListeningRates(
      { number: 3, audio: audio('listening-03') },
      'topik_ii',
    );
    expect(question.audio?.speechRate).toBe(
      TOPIK_LISTENING_RATE_BY_NUMBER.topik_ii[3],
    );

    const group = withTopikListeningRates(
      { startNumber: 25, sharedAudio: audio('x-listening-25-26') },
      'topik_i',
    );
    expect(group.sharedAudio?.speechRate).toBe(
      TOPIK_LISTENING_RATE_BY_NUMBER.topik_i[25],
    );

    const reading = withTopikListeningRates({ number: 1 }, 'topik_i');
    expect(reading).toEqual({ number: 1 });
  });
});
