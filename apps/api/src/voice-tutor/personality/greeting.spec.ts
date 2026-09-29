import { voiceTutorGreeting } from './greeting';
import type { TutorPlan, TutorSettings } from '../voice-tutor.types';

const settings: TutorSettings = {
  voiceId: 'voice',
  speechStyle: 'casual',
  explanationLanguage: 'ko',
  koreanLevel: 'beginner',
  personality: 'friendly',
  characterId: 'female_01',
};
const plan: TutorPlan = {
  lessonGoal: '지난 수업 표현',
  reviewTopics: [],
  newTopics: [],
  targetVocabulary: [],
  grammarFocus: [],
  conversationScenario: '',
  difficulty: 'beginner',
};

describe('Voice Tutor greeting', () => {
  it('greets in the selected teaching language', () => {
    expect(
      voiceTutorGreeting({ ...settings, explanationLanguage: 'en' }, plan),
    ).toContain('Korean');
    expect(
      voiceTutorGreeting({ ...settings, explanationLanguage: 'ru' }, plan),
    ).toContain('корейский');
    expect(
      voiceTutorGreeting(
        { ...settings, explanationLanguage: 'uz', speechStyle: 'polite' },
        plan,
      ),
    ).toContain('Assalomu alaykum');
  });

  it('uses personality and speech style independently', () => {
    expect(voiceTutorGreeting(settings, plan)).toContain('안녕!');
    expect(
      voiceTutorGreeting({ ...settings, personality: 'chaotic_savage' }, plan),
    ).toContain('야아아');
    expect(
      voiceTutorGreeting(
        { ...settings, speechStyle: 'polite', personality: 'chaotic_savage' },
        plan,
      ),
    ).toContain('오셨네요');
  });
});
