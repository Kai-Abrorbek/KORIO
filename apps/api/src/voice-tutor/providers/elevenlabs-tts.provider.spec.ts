import { ElevenLabsTutorTtsProvider } from './elevenlabs-tts.provider';
import type { TutorReaction } from '../voice-tutor.types';

describe('Voice Tutor ElevenLabs adapter', () => {
  const previousKey = process.env.ELEVENLABS_API_KEY;
  const previousModel = process.env.VOICE_TUTOR_TTS_MODEL;

  afterEach(() => {
    if (previousKey === undefined) delete process.env.ELEVENLABS_API_KEY;
    else process.env.ELEVENLABS_API_KEY = previousKey;
    if (previousModel === undefined) delete process.env.VOICE_TUTOR_TTS_MODEL;
    else process.env.VOICE_TUTOR_TTS_MODEL = previousModel;
    jest.restoreAllMocks();
  });

  it('refuses an old v2 value and sends the laughing reaction to an expressive model', async () => {
    process.env.ELEVENLABS_API_KEY = 'test-key';
    process.env.VOICE_TUTOR_TTS_MODEL = 'eleven_multilingual_v2';
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-length': '3' }),
      arrayBuffer: () => Promise.resolve(Uint8Array.from([1, 2, 3]).buffer),
    } as Response);
    const reaction: TutorReaction = {
      displayText: '배구리? 배고파라고 해.',
      speechText: '배구리? 배고파라고 해.',
      language: 'ko',
      emotion: 'laughing',
      delivery: 'normal',
      intensity: 0.7,
      gesture: 'none',
    };

    const audio = await new ElevenLabsTutorTtsProvider().synthesize(
      reaction.speechText,
      'testvoice123',
      reaction,
    );

    expect(audio).toEqual(Buffer.from([1, 2, 3]));
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toContain('/v1/text-to-speech/testvoice123');
    expect(typeof options?.body).toBe('string');
    const body = JSON.parse(options?.body as string) as Record<string, unknown>;
    expect(body.model_id).toBe('eleven_v4_turbo');
    expect(body.text).toBe('[laughs] 배구리? 배고파라고 해.');
    expect(body.voice_settings).toBeUndefined();
  });
});
