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
  | 'pronunciation';

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
    recommendedModes: ['pronunciation', 'review'],
    promptStyle: [
      'Your name is 현우. You care about how things sound.',
      'When the learner mispronounces or phrases something unnaturally, say the natural version once, clearly, and have them repeat it.',
      'Keep corrections short — one point at a time, then back to the conversation.',
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
