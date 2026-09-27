import { voiceTutorModels } from './voice-tutor.config';

describe('Voice Tutor model configuration', () => {
  const previousModel = process.env.VOICE_TUTOR_TTS_MODEL;

  afterEach(() => {
    if (previousModel === undefined) delete process.env.VOICE_TUTOR_TTS_MODEL;
    else process.env.VOICE_TUTOR_TTS_MODEL = previousModel;
  });

  it('uses Eleven v3 even if an old deployment variable requests v2', () => {
    process.env.VOICE_TUTOR_TTS_MODEL = 'eleven_multilingual_v2';
    expect(voiceTutorModels().tts).toBe('eleven_v3');
  });
});
