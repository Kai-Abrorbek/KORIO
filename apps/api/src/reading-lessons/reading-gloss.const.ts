/**
 * 문법 태그.
 *
 * 왜 문장이 아니라 태그인가: "과거 + 합니다체" 같은 설명을 단어마다 4개
 * 언어로 만들면 저작량이 단어 수 × 4 로 불어나고, 같은 문법인데 단어마다
 * 표현이 달라진다. 태그로 받아서 **앱이 i18n 으로 옮긴다.** 생성 모델도
 * 자유 서술보다 고정 목록에서 고르는 쪽이 훨씬 안정적이다.
 *
 * 여기 없는 걸 표현해야 하면 gloss.note(자유 서술)를 쓴다.
 */
export const GRAMMAR_TAGS = [
  // 조사
  'particleTopic', // 은/는
  'particleSubject', // 이/가
  'particleObject', // 을/를
  'particlePlace', // 에/에서
  'particleTarget', // 에게/한테/께
  'particleWith', // 하고/와/과/랑
  'particleFrom', // 부터/에서
  'particleTo', // 까지
  'particleOnly', // 만
  'particleAlso', // 도
  'particlePossessive', // 의
  // 시제
  'past',
  'present',
  'future',
  'progressive',
  // 말투
  'formalPolite', // 합니다체
  'polite', // 해요체
  'plain', // 한다체/해체
  'honorific', // 높임
  // 연결·활용
  'connectiveAnd', // -고
  'connectiveBecause', // -아서/어서
  'connectiveBut', // -지만/는데
  'connectiveIf', // -면
  'modifier', // 관형형 -(으)ㄴ/-는/-(으)ㄹ
  'negation', // 안/못/-지 않다
  'ability', // -(으)ㄹ 수 있다
  'desire', // -고 싶다
  'question', // 의문형
  'counter', // 단위 명사
  'plural', // -들
] as const;
export type GrammarTag = (typeof GRAMMAR_TAGS)[number];

/** 품사. 이것도 자유 서술을 막으려고 고정한다 */
export const WORD_POS = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'pronoun',
  'number',
  'particle',
  'determiner',
  'interjection',
  'ending',
  'other',
] as const;
export type WordPos = (typeof WORD_POS)[number];

/** 뜻보기 생성에 쓰는 모델. 통화가 아니라 텍스트라 아주 싸다 */
export const GLOSS_MODEL =
  process.env.OPENAI_GLOSS_MODEL?.trim() || 'gpt-4o-mini';

/** 런타임 보충 호출 상한. 시드가 채워져 있으면 여기까지 올 일이 거의 없다 */
export const GLOSS_RATE_LIMIT = { windowMs: 60 * 1000, max: 20 };
export const GLOSS_TIMEOUT_MS = 12000;
