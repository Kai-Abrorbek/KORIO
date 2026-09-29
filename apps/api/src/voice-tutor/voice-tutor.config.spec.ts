import { voiceTutorModels } from './voice-tutor.config';

describe('Voice Tutor model configuration', () => {
  const previousModel = process.env.VOICE_TUTOR_TTS_MODEL;

  afterEach(() => {
    if (previousModel === undefined) delete process.env.VOICE_TUTOR_TTS_MODEL;
    else process.env.VOICE_TUTOR_TTS_MODEL = previousModel;
  });

  it('refuses an old v2 model and falls back to the expressive default', () => {
    process.env.VOICE_TUTOR_TTS_MODEL = 'eleven_multilingual_v2';
    expect(voiceTutorModels().tts).toBe('eleven_v4_turbo');
  });

  it('keeps an explicitly chosen expressive model', () => {
    process.env.VOICE_TUTOR_TTS_MODEL = 'eleven_v3';
    expect(voiceTutorModels().tts).toBe('eleven_v3');
  });
});
