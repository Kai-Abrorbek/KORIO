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
          [P("벌", "ㅂ"), P("펄", "ㅍ")],
          [P("바다", "ㅂ"), P("파다", "ㅍ")],
          [P("반", "ㅂ"), P("판", "ㅍ")],
          [P("병", "ㅂ"), P("평", "ㅍ")],
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
          [P("도끼", "ㄷ"), P("토끼", "ㅌ")],
          [P("단", "ㄷ"), P("탄", "ㅌ")],
          [P("둘", "ㄷ"), P("툴", "ㅌ")],
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
          [P("그림", "ㄱ"), P("크림", "ㅋ")],
          [P("가드", "ㄱ"), P("카드", "ㅋ")],
          [P("간", "ㄱ"), P("칸", "ㅋ")],
          [P("겁", "ㄱ"), P("컵", "ㅋ")],
          [P("궁", "ㄱ"), P("쿵", "ㅋ")],
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
          [P("잔", "ㅈ"), P("찬", "ㅊ")],
          [P("지다", "ㅈ"), P("치다", "ㅊ")],
          [P("조", "ㅈ"), P("초", "ㅊ")],
          [P("절", "ㅈ"), P("철", "ㅊ")],
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
          [P("사다", "ㅅ"), P("싸다", "ㅆ")],
          [P("살", "ㅅ"), P("쌀", "ㅆ")],
          [P("상", "ㅅ"), P("쌍", "ㅆ")],
          [P("산", "ㅅ"), P("싼", "ㅆ")],
          [P("시", "ㅅ"), P("씨", "ㅆ")],
          [P("소다", "ㅅ"), P("쏘다", "ㅆ")],
          [P("수다", "ㅅ"), P("쑤다", "ㅆ")],
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
          [P("배다", "ㅂ"), P("빼다", "ㅃ")],
          [P("부리", "ㅂ"), P("뿌리", "ㅃ")],
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
          [P("곱다", "ㄱ"), P("꼽다", "ㄲ")],
          [P("갈다", "ㄱ"), P("깔다", "ㄲ")],
          [P("구기다", "ㄱ"), P("꾸기다", "ㄲ")],
          [P("개다", "ㄱ"), P("깨다", "ㄲ")],
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
          [P("대다", "ㄷ"), P("때다", "ㄸ")],
          [P("둑", "ㄷ"), P("뚝", "ㄸ")],
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
          [P("서리", "ㅓ"), P("소리", "ㅗ")],
          [P("넣다", "ㅓ"), P("놓다", "ㅗ")],
          [P("정", "ㅓ"), P("종", "ㅗ")],
          [P("덜", "ㅓ"), P("돌", "ㅗ")],
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
          [P("흐리다", "ㅡ"), P("후리다", "ㅜ")],
          [P("쓰다", "ㅡ"), P("쑤다", "ㅜ")],
          [P("그리다", "ㅡ"), P("구리다", "ㅜ")],
          [P("느리다", "ㅡ"), P("누리다", "ㅜ")],
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
          [P("매다", "ㅐ"), P("메다", "ㅔ")],
          [P("배다", "ㅐ"), P("베다", "ㅔ")],
          [P("재", "ㅐ"), P("제", "ㅔ")],
          [P("채", "ㅐ"), P("체", "ㅔ")],
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
          [P("소", "ㅗ"), P("수", "ㅜ")],
          [P("골", "ㅗ"), P("굴", "ㅜ")],
          [P("종", "ㅗ"), P("중", "ㅜ")],
          [P("봄", "ㅗ"), P("붐", "ㅜ")],
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
          [P("간", "ㄴ"), P("강", "ㅇ")],
          [P("편", "ㄴ"), P("평", "ㅇ")],
          [P("전", "ㄴ"), P("정", "ㅇ")],
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
          [P("삼", "ㅁ"), P("산", "ㄴ")],
          [P("담", "ㅁ"), P("단", "ㄴ")],
          [P("참", "ㅁ"), P("찬", "ㄴ")],
          [P("잠", "ㅁ"), P("잔", "ㄴ")],
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
          [P("살", "ㄹ"), P("산", "ㄴ")],
          [P("발", "ㄹ"), P("반", "ㄴ")],
          [P("알", "ㄹ"), P("안", "ㄴ")],
          [P("돌", "ㄹ"), P("돈", "ㄴ")],
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
          [P("삽", "ㅂ"), P("삼", "ㅁ")],
          [P("갑", "ㅂ"), P("감", "ㅁ")],
          [P("십", "ㅂ"), P("심", "ㅁ")],
          [P("입", "ㅂ"), P("임", "ㅁ")],
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

/**
 * 한 단계에서 낼 문제 목록.
 *
 * 대립쌍 하나로 문제를 두 개 만든다 — 정답이 왼쪽 단어일 때, 오른쪽 단어일 때.
 * 들리는 소리도 정답도 다르니 서로 다른 문제고, 이렇게 해야 6~8쌍으로
 * 한 판 12~16문제가 나온다. (진짜 최소대립쌍은 자모마다 개수가 한정돼 있어서
 * 쌍 자체를 10개씩 채우려면 없는 단어를 지어내야 한다.)
 */
export function stageQuestionPlan(
  lv: PronLevel,
  step: number,
): { pair: [PronOption, PronOption]; answer: 0 | 1 }[] {
  const stage = findStage(lv, step);
  if (!stage) return [];

  const plan = stage.pairs.flatMap(
    (pair) =>
      [
        { pair, answer: 0 as const },
        { pair, answer: 1 as const },
      ] as { pair: [PronOption, PronOption]; answer: 0 | 1 }[],
  );

  // 같은 쌍이 연달아 나오면 두 번째는 소거법으로 찍힌다 → 섞는다
  for (let i = plan.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [plan[i], plan[j]] = [plan[j], plan[i]];
  }
  return plan;
}

/** HARD 해금 기준 — EASY 를 이 점수 이상으로 통과해야 열린다 */
export const HARD_UNLOCK_SCORE = 80;

/** 단계 완료 인정 기준 (진행률 분자에 들어가는 점수) */
export const STAGE_PASS_SCORE = 60;
