/**
 * 발음 구분 연습 데이터.
 *
 * 외국인이 한국어에서 실제로 가장 많이 틀리는 대립쌍만 골랐다.
 *   Lv.1 평음 vs 격음  (ㅂ/ㅍ, ㄷ/ㅌ, ㄱ/ㅋ, ㅈ/ㅊ) — 숨을 세게 내뱉느냐
 *   Lv.2 평음 vs 경음  (ㅅ/ㅆ, ㅂ/ㅃ, ㄱ/ㄲ, ㄷ/ㄸ) — 목을 조이느냐
 *   Lv.3 헷갈리는 모음 (ㅓ/ㅗ, ㅡ/ㅜ, ㅐ/ㅔ, ㅗ/ㅜ) — 우즈벡어·러시아어에 없는 구분
 *   Lv.4 받침         (ㄴ/ㅇ, ㅁ/ㄴ, ㄹ/ㄴ, ㅂ/ㅁ) — 마지막 관문
 *
 * 규칙:
 *  - 두 보기는 목표 소리 하나만 다른 최소대립쌍이어야 한다. 안 그러면
 *    소리가 아니라 다른 단서로 맞힐 수 있다.
 *  - 사전에 없는 단어는 쓰지 않는다. 학습자가 가짜 단어를 외우면 안 된다.
 *  - 뜻은 일부러 넣지 않았다. 이 화면은 "소리 구분"만 훈련하고,
 *    화면에는 대신 어느 자모가 다른지 보여준다 (언어 중립).
 *
 * 문장은 학습 콘텐츠라 한국어 그대로. 화면 문구(제목·라벨)만 i18n.
 */

export type PronLevel = "lv1" | "lv2" | "lv3" | "lv4";

export interface PronOption {
  /** 보기 단어 (표기) */
  word: string;
  /** 이 단어가 가진 대립 자모 — 카드에 뱃지로 보여준다 */
  jamo: string;
}

export interface PronStage {
  step: number;
  /** 대립하는 두 자모 */
  a: string;
  b: string;
  /** 초성 자리냐 받침 자리냐 */
  pos: "front" | "back";
  /** 말풍선 — {0} 자리에 word 가 강조되어 들어간다 */
  leftBubble: string;
  leftWord: string;
  rightBubble: string;
  rightWord: string;
  /** 이 단계의 최소대립쌍들 */
  pairs: [PronOption, PronOption][];
}

export interface PronLevelData {
  /** 스토리 제목 i18n 키 */
  storyKey: string;
  stages: PronStage[];
}

const P = (word: string, jamo: string): PronOption => ({ word, jamo });

export const PRON_DATA: Record<PronLevel, PronLevelData> = {
  // ── Lv.1 평음 vs 격음 ──────────────────────────────
  lv1: {
    storyKey: "pronPractice.stories.lv1",
    stages: [
      {
        step: 1,
        a: "ㅂ",
        b: "ㅍ",
        pos: "front",
        leftBubble: "{0}이 뜨거워요.",
        leftWord: "불",
        rightBubble: "{0}이 파랗네요.",
        rightWord: "풀",
        pairs: [
          [P("불", "ㅂ"), P("풀", "ㅍ")],
          [P("발", "ㅂ"), P("팔", "ㅍ")],
          [P("비", "ㅂ"), P("피", "ㅍ")],
          [P("배", "ㅂ"), P("패", "ㅍ")],
        ],
      },
      {
        step: 2,
        a: "ㄷ",
        b: "ㅌ",
        pos: "front",
        leftBubble: "{0}이 밝아요.",
        leftWord: "달",
        rightBubble: "{0}을 썼어요.",
        rightWord: "탈",
        pairs: [
          [P("달", "ㄷ"), P("탈", "ㅌ")],
          [P("돈", "ㄷ"), P("톤", "ㅌ")],
          [P("동", "ㄷ"), P("통", "ㅌ")],
          [P("덕", "ㄷ"), P("턱", "ㅌ")],
        ],
      },
      {
        step: 3,
        a: "ㄱ",
        b: "ㅋ",
        pos: "front",
        leftBubble: "{0}을 던졌어요.",
        leftWord: "공",
        rightBubble: "{0}을 삶았어요.",
        rightWord: "콩",
        pairs: [
          [P("공", "ㄱ"), P("콩", "ㅋ")],
          [P("기", "ㄱ"), P("키", "ㅋ")],
          [P("골", "ㄱ"), P("콜", "ㅋ")],
        ],
      },
      {
        step: 4,
        a: "ㅈ",
        b: "ㅊ",
        pos: "front",
        leftBubble: "잠을 {0}요.",
        leftWord: "자",
        rightBubble: "물이 {0}요.",
        rightWord: "차",
        pairs: [
          [P("자다", "ㅈ"), P("차다", "ㅊ")],
          [P("장", "ㅈ"), P("창", "ㅊ")],
          [P("종", "ㅈ"), P("총", "ㅊ")],
          [P("주다", "ㅈ"), P("추다", "ㅊ")],
        ],
      },
    ],
  },

  // ── Lv.2 평음 vs 경음(된소리) ──────────────────────
  lv2: {
    storyKey: "pronPractice.stories.lv2",
    stages: [
      {
        step: 1,
        a: "ㅅ",
        b: "ㅆ",
        pos: "front",
        leftBubble: "이거 제가 {0}요.",
        leftWord: "사",
        rightBubble: "이거 정말 {0}요.",
        rightWord: "싸",
        pairs: [
          [P("사요", "ㅅ"), P("싸요", "ㅆ")],
          [P("살", "ㅅ"), P("쌀", "ㅆ")],
          [P("상", "ㅅ"), P("쌍", "ㅆ")],
          [P("산", "ㅅ"), P("싼", "ㅆ")],
        ],
      },
      {
        step: 2,
        a: "ㅂ",
        b: "ㅃ",
        pos: "front",
        leftBubble: "{0}이 넓어요.",
        leftWord: "방",
        rightBubble: "{0}이 맛있어요.",
        rightWord: "빵",
        pairs: [
          [P("방", "ㅂ"), P("빵", "ㅃ")],
          [P("불", "ㅂ"), P("뿔", "ㅃ")],
          [P("바르다", "ㅂ"), P("빠르다", "ㅃ")],
          [P("비다", "ㅂ"), P("삐다", "ㅃ")],
        ],
      },
      {
        step: 3,
        a: "ㄱ",
        b: "ㄲ",
        pos: "front",
        leftBubble: "{0}가 짖어요.",
        leftWord: "개",
        rightBubble: "{0}를 뿌려요.",
        rightWord: "깨",
        pairs: [
          [P("개", "ㄱ"), P("깨", "ㄲ")],
          [P("굴", "ㄱ"), P("꿀", "ㄲ")],
          [P("가치", "ㄱ"), P("까치", "ㄲ")],
          [P("기다", "ㄱ"), P("끼다", "ㄲ")],
        ],
      },
      {
        step: 4,
        a: "ㄷ",
        b: "ㄸ",
        pos: "front",
        leftBubble: "{0}이 떴어요.",
        leftWord: "달",
        rightBubble: "{0}이 왔어요.",
        rightWord: "딸",
        pairs: [
          [P("달", "ㄷ"), P("딸", "ㄸ")],
          [P("다르다", "ㄷ"), P("따르다", "ㄸ")],
          [P("덕", "ㄷ"), P("떡", "ㄸ")],
          [P("담", "ㄷ"), P("땀", "ㄸ")],
        ],
      },
    ],
  },

  // ── Lv.3 헷갈리는 모음 ─────────────────────────────
  lv3: {
    storyKey: "pronPractice.stories.lv3",
    stages: [
      {
        step: 1,
        a: "ㅓ",
        b: "ㅗ",
        pos: "front",
        leftBubble: "{0}가 복잡해요.",
        leftWord: "거리",
        rightBubble: "{0}를 걸었어요.",
        rightWord: "고리",
        pairs: [
          [P("거리", "ㅓ"), P("고리", "ㅗ")],
          [P("설", "ㅓ"), P("솔", "ㅗ")],
          [P("벌", "ㅓ"), P("볼", "ㅗ")],
          [P("검", "ㅓ"), P("곰", "ㅗ")],
        ],
      },
      {
        step: 2,
        a: "ㅡ",
        b: "ㅜ",
        pos: "front",
        leftBubble: "{0}을 써요.",
        leftWord: "글",
        rightBubble: "{0}을 먹어요.",
        rightWord: "굴",
        pairs: [
          [P("글", "ㅡ"), P("굴", "ㅜ")],
          [P("들", "ㅡ"), P("둘", "ㅜ")],
          [P("은", "ㅡ"), P("운", "ㅜ")],
          [P("그", "ㅡ"), P("구", "ㅜ")],
        ],
      },
      {
        step: 3,
        a: "ㅐ",
        b: "ㅔ",
        pos: "front",
        leftBubble: "{0}가 뛰어가요.",
        leftWord: "개",
        rightBubble: "{0}가 기어가요.",
        rightWord: "게",
        pairs: [
          [P("개", "ㅐ"), P("게", "ㅔ")],
          [P("내", "ㅐ"), P("네", "ㅔ")],
          [P("새", "ㅐ"), P("세", "ㅔ")],
          [P("대다", "ㅐ"), P("데다", "ㅔ")],
        ],
      },
      {
        step: 4,
        a: "ㅗ",
        b: "ㅜ",
        pos: "front",
        leftBubble: "{0}가 헤엄쳐요.",
        leftWord: "오리",
        rightBubble: "{0}가 같이 가요.",
        rightWord: "우리",
        pairs: [
          [P("오리", "ㅗ"), P("우리", "ㅜ")],
          [P("손", "ㅗ"), P("순", "ㅜ")],
          [P("보리", "ㅗ"), P("부리", "ㅜ")],
          [P("목", "ㅗ"), P("묵", "ㅜ")],
        ],
      },
    ],
  },

  // ── Lv.4 받침 ─────────────────────────────────────
  lv4: {
    storyKey: "pronPractice.stories.lv4",
    stages: [
      {
        step: 1,
        a: "ㄴ",
        b: "ㅇ",
        pos: "back",
        leftBubble: "{0}에 올라가요.",
        leftWord: "산",
        rightBubble: "{0}을 받았어요.",
        rightWord: "상",
        pairs: [
          [P("산", "ㄴ"), P("상", "ㅇ")],
          [P("반", "ㄴ"), P("방", "ㅇ")],
          [P("돈", "ㄴ"), P("동", "ㅇ")],
          [P("만", "ㄴ"), P("망", "ㅇ")],
        ],
      },
      {
        step: 2,
        a: "ㅁ",
        b: "ㄴ",
        pos: "back",
        leftBubble: "{0}이 깊었어요.",
        leftWord: "밤",
        rightBubble: "{0}만 먹었어요.",
        rightWord: "반",
        pairs: [
          [P("밤", "ㅁ"), P("반", "ㄴ")],
          [P("감", "ㅁ"), P("간", "ㄴ")],
          [P("심", "ㅁ"), P("신", "ㄴ")],
          [P("남", "ㅁ"), P("난", "ㄴ")],
        ],
      },
      {
        step: 3,
        a: "ㄹ",
        b: "ㄴ",
        pos: "back",
        leftBubble: "{0}이 달려요.",
        leftWord: "말",
        rightBubble: "이것 {0} 주세요.",
        rightWord: "만",
        pairs: [
          [P("말", "ㄹ"), P("만", "ㄴ")],
          [P("물", "ㄹ"), P("문", "ㄴ")],
          [P("설", "ㄹ"), P("선", "ㄴ")],
          [P("길", "ㄹ"), P("긴", "ㄴ")],
        ],
      },
      {
        step: 4,
        a: "ㅂ",
        b: "ㅁ",
        pos: "back",
        leftBubble: "{0}을 먹었어요.",
        leftWord: "밥",
        rightBubble: "{0}이 되었어요.",
        rightWord: "밤",
        pairs: [
          [P("밥", "ㅂ"), P("밤", "ㅁ")],
          [P("집", "ㅂ"), P("짐", "ㅁ")],
          [P("답", "ㅂ"), P("담", "ㅁ")],
          [P("곱", "ㅂ"), P("곰", "ㅁ")],
        ],
      },
    ],
  },
};

export const PRON_LEVELS: PronLevel[] = ["lv1", "lv2", "lv3", "lv4"];

/** 한 레벨의 총 문제 수 (진행률 분모) — 단계당 EASY + HARD */
export const levelTotal = (lv: PronLevel) => PRON_DATA[lv].stages.length * 2;

export const findStage = (lv: PronLevel, step: number) =>
  PRON_DATA[lv].stages.find((s) => s.step === step);

/** HARD 해금 기준 — EASY 를 이 점수 이상으로 통과해야 열린다 */
export const HARD_UNLOCK_SCORE = 80;

/** 단계 완료 인정 기준 (진행률 분자에 들어가는 점수) */
export const STAGE_PASS_SCORE = 60;
