import {
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import type { ElevenLabsTutorTtsProvider } from '../providers/elevenlabs-tts.provider';
import {
  setElevenLabsVoiceCatalog,
  voicePreviewUrl,
  voiceTutorVoices,
} from '../voice-tutor.config';
import {
  VoiceTutorVoiceCatalogService,
  parseElevenLabsVoices,
} from './voice-tutor-voice-catalog.service';
import {
  VOICE_PREVIEW_LINES,
  VoiceTutorVoicePreviewService,
} from './voice-tutor-voice-preview.service';

const ENV_KEYS = [
  'VOICE_TUTOR_VOICES_JSON',
  'VOICE_TUTOR_VOICES_FROM_ELEVENLABS',
  'ELEVENLABS_DEFAULT_VOICE_ID',
  'ELEVENLABS_API_KEY',
  'PUBLIC_API_URL',
] as const;

/** What GET /v1/voices and /v2/voices return per voice. */
const jessica = {
  voice_id: 'cgSgspJ2msm6clMCkdW9',
  name: 'Jessica - Playful, Bright, Warm',
  category: 'premade',
  description:
    'Young and playful American female. Perfect for trendy content. Lots more text.',
  labels: {
    gender: 'female',
    descriptive: 'playful',
    age: 'young',
    accent: 'american',
  },
  preview_url: 'https://storage.example/jessica.mp3',
};
const clown = {
  voice_id: 'ClownVoice0000000001',
  name: 'Goofy Gary',
  category: 'professional',
  labels: {
    gender: 'male',
    descriptive: 'goofy',
    use_case: 'characters_animation',
  },
  preview_url: 'http://insecure.example/gary.mp3',
};

describe('Voice Tutor voices', () => {
  const saved = Object.fromEntries(
    ENV_KEYS.map((key) => [key, process.env[key]]),
  );
  const originalFetch = global.fetch;

  beforeEach(() => {
    for (const key of ENV_KEYS) delete process.env[key];
    setElevenLabsVoiceCatalog([]);
  });

  afterEach(() => {
    for (const key of ENV_KEYS) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
    setElevenLabsVoiceCatalog([]);
    global.fetch = originalFetch;
  });

  it('reads name, traits and sample from an ElevenLabs voice list', () => {
    expect(
      parseElevenLabsVoices({ voices: [jessica, clown, { name: 'no id' }] }),
    ).toEqual([
      {
        providerVoiceId: 'cgSgspJ2msm6clMCkdW9',
        name: 'Jessica',
        category: 'premade',
        gender: 'female',
        description: 'Young and playful American female.',
        tags: ['playful', 'young', 'american'],
        previewUrl: 'https://storage.example/jessica.mp3',
      },
      {
        providerVoiceId: 'ClownVoice0000000001',
        name: 'Goofy Gary',
        category: 'professional',
        gender: 'male',
        description: undefined,
        tags: ['goofy', 'characters animation'],
        // Only HTTPS samples can be played by the apps.
        previewUrl: undefined,
      },
    ]);
  });

  it('lets the operator list voices by ID alone and fills the rest from ElevenLabs', () => {
    process.env.VOICE_TUTOR_VOICES_JSON = JSON.stringify([
      { providerVoiceId: jessica.voice_id },
      { id: 'gary', providerVoiceId: clown.voice_id, name: 'Gary', fun: false },
    ]);
    setElevenLabsVoiceCatalog(
      parseElevenLabsVoices({ voices: [jessica, clown] }),
    );
    const [first, second] = voiceTutorVoices();
    expect(first).toMatchObject({
      id: jessica.voice_id,
      name: 'Jessica',
      gender: 'female',
      tags: ['playful', 'young', 'american'],
      // "playful" in its labels marks it as a comic voice.
      fun: true,
      elevenLabsPreviewUrl: 'https://storage.example/jessica.mp3',
    });
    // Hand-written values win over ElevenLabs'.
    expect(second).toMatchObject({ id: 'gary', name: 'Gary', fun: false });
  });

  it('still offers configured voices while ElevenLabs is unreachable', () => {
    process.env.ELEVENLABS_DEFAULT_VOICE_ID = jessica.voice_id;
    expect(voiceTutorVoices()).toEqual([
      expect.objectContaining({
        id: 'default',
        name: 'Teacher',
        providerVoiceId: jessica.voice_id,
      }),
    ]);
  });

  it("adds the account's own voices, not the stock ones, when asked to", () => {
    process.env.ELEVENLABS_DEFAULT_VOICE_ID = jessica.voice_id;
    setElevenLabsVoiceCatalog(
      parseElevenLabsVoices({ voices: [jessica, clown] }),
    );
    expect(voiceTutorVoices().map(({ id }) => id)).toEqual(['default']);
    process.env.VOICE_TUTOR_VOICES_FROM_ELEVENLABS = 'true';
    expect(voiceTutorVoices().map(({ id, fun }) => ({ id, fun }))).toEqual([
      { id: 'default', fun: true },
      { id: clown.voice_id, fun: true },
    ]);
  });

  it('previews in the language being learned when the server can synthesize', () => {
    setElevenLabsVoiceCatalog(parseElevenLabsVoices({ voices: [jessica] }));
    process.env.ELEVENLABS_DEFAULT_VOICE_ID = jessica.voice_id;
    const [voice] = voiceTutorVoices();
    expect(voicePreviewUrl(voice, 'ko')).toBe(
      'https://storage.example/jessica.mp3',
    );
    process.env.ELEVENLABS_API_KEY = 'key';
    process.env.PUBLIC_API_URL = 'https://api.korio.online/';
    expect(voicePreviewUrl(voice, 'en')).toBe(
      'https://api.korio.online/voice-tutor/voices/default/preview?target=en',
    );
    expect(
      voicePreviewUrl(
        { ...voice, previewUrl: 'https://cdn.example/x.mp3' },
        'ko',
      ),
    ).toBe('https://cdn.example/x.mp3');
  });

  it('falls back to the legacy list route and describes stock voices it lists', async () => {
    process.env.ELEVENLABS_API_KEY = 'key';
    process.env.VOICE_TUTOR_VOICES_JSON = JSON.stringify([
      { providerVoiceId: jessica.voice_id },
    ]);
    const calls: string[] = [];
    global.fetch = jest.fn((url: string | URL) => {
      const href = String(url);
      calls.push(href);
      if (href.includes('/v2/voices'))
        return Promise.resolve({ ok: false, status: 404 } as Response);
      if (href.endsWith('/v1/voices'))
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ voices: [clown] }),
        } as Response);
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(jessica),
      } as Response);
    }) as typeof fetch;
    await new VoiceTutorVoiceCatalogService().refresh();
    expect(calls).toEqual([
      'https://api.elevenlabs.io/v2/voices?page_size=100',
      'https://api.elevenlabs.io/v1/voices',
      `https://api.elevenlabs.io/v1/voices/${jessica.voice_id}`,
    ]);
    expect(voiceTutorVoices()[0]).toMatchObject({ name: 'Jessica', fun: true });
  });

  it('synthesizes each preview once and never caches a failure', async () => {
    process.env.ELEVENLABS_DEFAULT_VOICE_ID = jessica.voice_id;
    const synthesize = jest
      .fn()
      .mockRejectedValueOnce(new Error('down'))
      .mockResolvedValue(Buffer.from('mp3'));
    const previews = new VoiceTutorVoicePreviewService({
      synthesize,
    } as unknown as ElevenLabsTutorTtsProvider);
    await expect(previews.preview('default', 'ko')).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    );
    await expect(previews.preview('default', 'ko')).resolves.toEqual(
      Buffer.from('mp3'),
    );
    await previews.preview('default', 'ko');
    expect(synthesize).toHaveBeenCalledTimes(2);
    expect(synthesize).toHaveBeenLastCalledWith(
      VOICE_PREVIEW_LINES.ko,
      jessica.voice_id,
    );
    await expect(previews.preview('nobody', 'ko')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('names the missing key permission instead of a bare 401', async () => {
    process.env.ELEVENLABS_API_KEY = 'tts-only-key';
    const warn = jest
      .spyOn(Logger.prototype, 'warn')
      .mockImplementation(() => undefined);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        text: () =>
          Promise.resolve(
            '{"detail":{"message":"The API key you used is missing the permission voices_read to execute this operation."}}',
          ),
      } as Response),
    ) as typeof fetch;
    await new VoiceTutorVoiceCatalogService().refresh();
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('"Voices: Read" permission'),
    );
    warn.mockRestore();
  });
});
