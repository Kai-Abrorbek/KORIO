import {
  TopikI18nText,
  TopikQuestionType,
  TopikSection,
} from '../../../topik/schemas/topik-content.schema';

/** ko/uz/en/ru 를 한 번에 적는다 */
export function t4(
  ko: string,
  uz: string,
  en: string,
  ru: string,
): TopikI18nText {
  return { ko, uz, en, ru };
}

export interface RecipeSeedChoice {
  text: string;
  /** 정답이면 true */
  correct?: boolean;
}

export interface RecipeSeedQuestion {
  /** 문항 코드 (전역 유일) */
  code: string;
  /** 문항 번호 */
  number: number;
  type: TopikQuestionType;
  /**
   * 지문. 빈칸 자리는 `___` 로 적는다.
   * 예: '휴대 전화를 ___ 내려야 할 역을 지나쳤다.'
   */
  prompt: string;
  choices: RecipeSeedChoice[];
  /** 출처 표기 (예: TOPIK II 60회 읽기 1번) */
  source?: string;
  difficulty?: number;
  solution?: {
    /** 문장 흐름. ko 는 책 원문 그대로 */
    strategy?: TopikI18nText;
    /** 해설 본문 */
    explanation?: TopikI18nText;
    /** 선택지별 메모 (선택지 순서대로, 비우려면 생략) */
    choiceNotes?: TopikI18nText[];
  };
}

export interface RecipeSeedGrammarEntry {
  rank: number;
  /** '-다가' 같은 표제어 (한국어 원문) */
  form: string;
  /** 의미와 기능 */
  meanings: TopikI18nText[];
  /** 예문 (한국어 원문). meanings 와 개수를 맞춘다 */
  examples: string[];
  /** 예문에서 문법이 쓰인 부분 */
  highlights: string[];
}

export interface RecipeSeedGrammarSection {
  key: string;
  title: TopikI18nText;
  entries: RecipeSeedGrammarEntry[];
  tips: TopikI18nText[];
}

export interface RecipeSeed {
  /** TOPIK_READING_BLUEPRINT 의 groupCode */
  groupCode: string;
  section: TopikSection;
  label: TopikI18nText;
  title: TopikI18nText;
  intro: TopikI18nText;
  targetLevel: number;
  order: number;
  goldenRecipe: TopikI18nText[];
  grammarSections: RecipeSeedGrammarSection[];
  /** 기출문제 — 해설과 함께 노출 */
  examples: RecipeSeedQuestion[];
  /** 예상문제 — 별도 페이지에서 풀이 */
  practice: RecipeSeedQuestion[];
  /**
   * 기존 TOPIK 모의고사 1·2회에서 같은 번호 범위의 문항을 복제한다.
   * 책은 풀이 전략과 Ranking의 근거로, 모의고사 시드는 실제 렌더링 가능한
   * 지문·음원·쓰기 설정의 원천으로 사용한다.
   */
  questionSource?: {
    from: number;
    to: number;
  };
  /** 합격 레시피 PDF에서 이 유형을 설명하는 페이지 범위 */
  sourceReference?: string;
}
