import { TopikAudio } from '../../../topik/schemas/topik-content.schema';
import {
  TOPIK_LISTENING_CLIPS,
  TOPIK_LISTENING_EXAM_AUDIO,
} from './topik-listening-media.generated';
import {
  reachableTopikMediaBase,
  topikExamAudioUrl,
  withTopikListeningMedia,
} from './topik-listening-media';

const BASE = 'https://media.example/topik';
const audio = (key: string): TopikAudio => ({
  key,
  audioUrl: '',
  transcript: [{ speaker: '여자', text: '안녕하세요.' }],
  mockPlaybackLimit: 1,
  guidedPlaybackLimit: 3,
  guidedAutoRepeatCount: 2,
  speechFallback: true,
});

describe('TOPIK 원본 듣기 음원 링크', () => {
  const [clipKey, clipFile] = Object.entries(TOPIK_LISTENING_CLIPS)[0];
  const [examCode, examFile] = Object.entries(TOPIK_LISTENING_EXAM_AUDIO)[0];

  afterEach(() => jest.restoreAllMocks());

  it('클립이 있는 음성에만 주소를 붙이고 TTS 대비 값은 그대로 둔다', () => {
    const question = withTopikListeningMedia(
      { audio: { ...audio(clipKey), speechRate: 0.7 } },
      BASE,
    );
    expect(question.audio?.audioUrl).toBe(`${BASE}/${clipFile}`);
    expect(question.audio?.speechRate).toBe(0.7);
    expect(question.audio?.speechFallback).toBe(true);

    const mock = withTopikListeningMedia(
      { audio: audio('listening-01') },
      BASE,
    );
    expect(mock.audio?.audioUrl).toBe('');

    const group = withTopikListeningMedia(
      { sharedAudio: audio(clipKey) },
      BASE,
    );
    expect(group.sharedAudio?.audioUrl).toBe(`${BASE}/${clipFile}`);
  });

  it('서버에 파일이 없으면(base 없음) 아무 링크도 넣지 않는다', () => {
    expect(
      withTopikListeningMedia({ audio: audio(clipKey) }, null).audio?.audioUrl,
    ).toBe('');
    expect(topikExamAudioUrl(examCode, null)).toBeNull();
  });

  it('회차 원본 전체는 시험 코드로 찾는다', () => {
    expect(topikExamAudioUrl(examCode, `${BASE}/`)).toBe(`${BASE}/${examFile}`);
    expect(topikExamAudioUrl('topik-ii-reading-102-2025', BASE)).toBeNull();
  });

  it('파일이 실제로 나갈 때만 링크한다 (HEAD 확인)', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(null, { status: 200 }));
    await expect(reachableTopikMediaBase(BASE)).resolves.toBe(BASE);
    expect(fetchMock).toHaveBeenCalledWith(`${BASE}/${clipFile}`, {
      method: 'HEAD',
    });

    fetchMock.mockResolvedValue(new Response(null, { status: 404 }));
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    await expect(reachableTopikMediaBase(BASE)).resolves.toBeNull();

    fetchMock.mockRejectedValue(new Error('offline'));
    await expect(reachableTopikMediaBase(BASE)).resolves.toBeNull();
    await expect(reachableTopikMediaBase('off')).resolves.toBeNull();
  });
});
