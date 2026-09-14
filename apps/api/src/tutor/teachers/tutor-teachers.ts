import type { TutorMode } from '../tutor.const';

/**
 * 선생님 프로필.
 *
 * 튜터의 목소리를 Realtime 자체 음성에서 외부 TTS 로 옮기면서 생긴 개념이다.
 * Realtime 목소리는 영어 우선으로 만들어져서 한국어가 외국인 억양처럼 들린다 —
 * 한국어를 가르치는 앱에서 그건 치명적이다.
 *
 * 그래서 구조를 이렇게 나눴다:
 *   Realtime  = 두뇌 (듣기·이해·문맥·교정·답변 텍스트)
 *   외부 TTS  = 목소리 (선택한 선생님의 원어민 한국어)
 *
 * 선생님은 단순한 voiceId 셀렉터가 아니다. 목소리 + 성격 + 말투 + 속도 +
 * 프롬프트가 한 묶음이고, 그래야 유저가 "AI 랑 얘기한다" 가 아니라 "내가 고른
 * 선생님과 얘기한다" 로 느낀다.
 *
 * ⚠️ if (teacher === 'seoyeon') 같은 분기를 만들지 말 것. 새 선생님은 이
 *    배열에 항목 하나를 더하는 것으로 끝나야 한다.
 */

export type TutorPersonality =
  | 'calm'
  | 'friendly'
  | 'energetic'
  | 'strict'
  | 'pronunciation'
  /**
   * 장난스럽게 놀리는 선생님.
   *
   * ⚠️ 놀리는 말투는 **이 성격일 때만** 나간다. 프롬프트가 personality 로
   *    분기하므로, 다른 선생님에게 새어 나가면 안 된다. 유저가 차분한
   *    선생님을 골랐는데 놀림을 받으면 그건 버그다.
   */
  | 'teasing';

export interface TutorTeacher {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  /** 카드에 쓸 이모지. 실제 일러스트가 생기면 이미지 경로로 바꾼다 */
  avatar: string;
  /** 카드 배경. 네 명이 한 화면에 있어서 색으로 구분된다 */
  color: string;
  personality: TutorPersonality;
  /** 1.0 이 보통. 초급 대상 선생님은 조금 느리게 */
  speechRate: number;
  tts: { provider: string; voiceId: string };
  /**
   * 우즈벡어를 말할 때 쓰는 목소리.
   *
   * 학습자가 "우즈벡어로 설명해줘" 라고 하면 튜터는 우즈벡어로 답한다
   * (프롬프트 §8). 그 문장을 한국어 음성에 넣으면 라틴 문자를 한국어 규칙으로
   * 읽어서 알아들을 수 없는 소리가 난다 — 목소리를 외부 TTS 로 옮긴 이유가
   * "한국어가 외국인 억양처럼 들려서" 였는데, 그 반대를 하는 셈이 된다.
   *
   * 성별은 한국어 목소리와 맞춘다. 같은 선생님인데 언어가 바뀔 때마다 성별이
   * 바뀌면 다른 사람이 말하는 것처럼 들린다.
   */
  ttsUz: { provider: string; voiceId: string };
  /** 이 선생님이 특히 잘 맞는 모드. 카드에 라벨로 뜬다 */
  recommendedModes: TutorMode[];
  /**
   * 프롬프트에 그대로 들어가는 성격 지시문. 영어로 쓴다 — 모델 지시문은
   * 영어일 때 가장 잘 지켜지고, 이건 유저에게 보이지 않는다.
   */
  promptStyle: string;
}

/**
 * 목소리는 Azure ko-KR 신경망 음성이다.
 *
 * 이걸 기본으로 고른 이유는 셋이다: (1) 한국어 전용으로 훈련돼서 발음이
 * 원어민 수준이고, (2) 이미 발음 연습 기능에서 쓰고 있어 키가 추가로 필요
 * 없으며, (3) 우즈벡어 음성까지 같은 곳에서 나온다.
 *
 * 나중에 음질을 비교해서 한국어만 다른 업체로 옮길 수 있다 — provider 문자열만
 * 바꾸면 되고 튜터 로직은 안 건드린다.
 */
export const TUTOR_TEACHERS: TutorTeacher[] = [
  {
    id: 'seoyeon',
    name: {
      ko: '서연 선생님',
      uz: 'Seoyeon ustoz',
      en: 'Teacher Seoyeon',
      ru: 'Учитель Соён',
    },
    description: {
      ko: '차분하고 친절해요. 천천히 또박또박 이야기해요.',
      uz: 'Xotirjam va mehribon. Sekin va aniq gapiradi.',
      en: 'Calm and kind. Speaks slowly and clearly.',
      ru: 'Спокойная и добрая. Говорит медленно и чётко.',
    },
    avatar: '👩‍🏫',
    color: '#8B82EE',
    personality: 'calm',
    speechRate: 0.95,
    tts: { provider: 'azure', voiceId: 'ko-KR-SunHiNeural' },
    ttsUz: { provider: 'azure', voiceId: 'uz-UZ-MadinaNeural' },
    recommendedModes: ['lesson', 'rolePlay'],
    promptStyle: [
      'Your name is 서연. You are calm, warm and patient.',
      'React gently and never rush the learner.',
      'Give the learner a moment before you fill the silence.',
      'Use relaxed everyday Korean, not textbook Korean.',
    ].join(' '),
  },
  {
    id: 'jiwoo',
    name: {
      ko: '지우 선생님',
      uz: 'Jiwoo ustoz',
      en: 'Teacher Jiwoo',
      ru: 'Учитель Чиу',
    },
    description: {
      ko: '밝고 친근해요. 친구처럼 편하게 대화해요.',
      uz: 'Quvnoq va samimiy. Do‘stday erkin suhbatlashadi.',
      en: 'Bright and friendly. Talks like a friend.',
      ru: 'Весёлая и дружелюбная. Общается как подруга.',
    },
    avatar: '👩',
    color: '#FF8FA3',
    personality: 'friendly',
    speechRate: 1.05,
    tts: { provider: 'azure', voiceId: 'ko-KR-JiMinNeural' },
    ttsUz: { provider: 'azure', voiceId: 'uz-UZ-MadinaNeural' },
    recommendedModes: ['freeTalk'],
    promptStyle: [
      'Your name is 지우. You are bright, curious and easy to talk to.',
      'Talk like a close friend, not a teacher at the front of a class.',
      'Ask follow-up questions about what the learner actually said.',
      'Keep the energy up, but never overpraise.',
    ].join(' '),
  },
  {
    id: 'minjun',
    name: {
      ko: '민준 선생님',
      uz: 'Minjun ustoz',
      en: 'Teacher Minjun',
      ru: 'Учитель Минджун',
    },
    description: {
      ko: '편안한 남자 선생님. 실생활 대화를 중심으로 이야기해요.',
      uz: 'Xotirjam erkak ustoz. Kundalik suhbatlarga urg‘u beradi.',
      en: 'Easy-going male teacher. Focuses on real-life conversation.',
      ru: 'Спокойный преподаватель. Делает упор на живую речь.',
    },
    avatar: '👨‍🏫',
    color: '#4A90D9',
    personality: 'friendly',
    speechRate: 1,
    tts: { provider: 'azure', voiceId: 'ko-KR-InJoonNeural' },
    ttsUz: { provider: 'azure', voiceId: 'uz-UZ-SardorNeural' },
    recommendedModes: ['rolePlay', 'freeTalk'],
    promptStyle: [
      'Your name is 민준. You are relaxed and down to earth.',
      'Do not make it feel like a lesson — make it feel like a real conversation.',
      'Prefer the words people actually use in daily life over formal ones.',
    ].join(' '),
  },
  {
    id: 'hyunwoo',
    name: {
      ko: '현우 선생님',
      uz: 'Hyunwoo ustoz',
      en: 'Teacher Hyunwoo',
      ru: 'Учитель Хёну',
    },
    description: {
      ko: '발음과 표현을 꼼꼼하게 봐줘요.',
      uz: 'Talaffuz va iboralarni sinchkovlik bilan tekshiradi.',
      en: 'Pays close attention to pronunciation and phrasing.',
      ru: 'Внимательно следит за произношением и выражениями.',
    },
    avatar: '🧑‍🏫',
    color: '#1DBB7F',
    personality: 'pronunciation',
    speechRate: 0.95,
    tts: { provider: 'azure', voiceId: 'ko-KR-BongJinNeural' },
    ttsUz: { provider: 'azure', voiceId: 'uz-UZ-SardorNeural' },
    recommendedModes: ['pronunciation', 'review'],
    promptStyle: [
      'Your name is 현우. You care about how things sound.',
      'When the learner mispronounces or phrases something unnaturally, say the natural version once, clearly, and have them repeat it.',
      'Keep corrections short — one point at a time, then back to the conversation.',
    ].join(' '),
  },
  {
    id: 'yuna',
    name: {
      ko: '유나 선생님',
      uz: 'Yuna ustoz',
      en: 'Teacher Yuna',
      ru: 'Учитель Юна',
    },
    description: {
      ko: '장난꾸러기예요. 틀리면 놀리지만 확실하게 고쳐줘요.',
      uz: 'Sho‘x ustoz. Xato qilsangiz ustingizdan kuladi, lekin aniq tuzatadi.',
      en: 'Playful and cheeky. Teases your mistakes, then fixes them properly.',
      ru: 'Озорная. Подшучивает над ошибками, но исправляет их как следует.',
    },
    avatar: '😼',
    color: '#F2A03D',
    personality: 'teasing',
    speechRate: 1.08,
    tts: { provider: 'azure', voiceId: 'ko-KR-YuJinNeural' },
    ttsUz: { provider: 'azure', voiceId: 'uz-UZ-MadinaNeural' },
    recommendedModes: ['freeTalk', 'pronunciation'],
    /**
     * ⚠️ 놀림의 대상은 **언제나 그 문장**이다. 사람이 아니다.
     *    사람을 겨냥하는 순간 재미가 아니라 모욕이 된다 — 프롬프트의
     *    TEASING 절이 금지선을 따로 못 박는다.
     */
    promptStyle: [
      'Your name is 유나. You are playful, cheeky and a little dramatic.',
      'You tease the learner about their mistakes the way a close friend would — then fix them immediately.',
      'The joke is always about the SENTENCE, never about the person.',
      'Keep the joke to a few words. The correction is still the point.',
      'When they finally get something right, act mock-astonished.',
    ].join(' '),
  },
];

export const TEACHER_BY_ID = new Map(TUTOR_TEACHERS.map((t) => [t.id, t]));

export const DEFAULT_TEACHER_ID = 'seoyeon';

/** 모르는 id 가 와도 세션이 실패하지 않게 기본 선생님으로 떨어뜨린다 */
export function resolveTeacher(id?: string | null): TutorTeacher {
  return (
    (id ? TEACHER_BY_ID.get(id) : undefined) ??
    TEACHER_BY_ID.get(DEFAULT_TEACHER_ID)!
  );
}

/** 화면에 뿌릴 카드 한 장. 앱 언어로 이름·설명을 골라 내려준다 */
export function toTeacherCard(t: TutorTeacher, lang = 'uz') {
  const pick = (m: Record<string, string>) => m[lang] ?? m.en ?? m.ko;
  return {
    id: t.id,
    name: pick(t.name),
    description: pick(t.description),
    avatar: t.avatar,
    color: t.color,
    personality: t.personality,
    recommendedModes: t.recommendedModes,
  };
}
