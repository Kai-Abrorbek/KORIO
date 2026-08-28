/**
 * 음절 쓰기 게임의 난이도 계단.
 *
 * 두 축으로 어려워진다.
 *  1) 글자 구조 — 세로모음 → 가로모음 → 받침 → 복합모음·쌍자음
 *  2) 가이드 — 획을 하나씩 깔아줌 → 실루엣만 → 빈 칸
 *
 * 구조만 어렵게 하면 5단계쯤에서 "그리기"가 아니라 "따라 그리기"로 끝나고,
 * 가이드만 걷으면 첫 판부터 막힌다. 둘을 같이 올린다.
 */

/** stroke: 이번 획을 옅게 깔아준다 · silhouette: 글자 전체만 옅게 · blank: 빈 칸 */
export type GuideMode = "stroke" | "silhouette" | "blank";

export interface SyllableLevel {
  id: number;
  /** i18n 키 뒤에 붙는 이름 — syllableDraw.levels.<key>.title / .desc */
  key: string;
  guide: GuideMode;
  /** 완성된 음절을 문제에 같이 보여줄지. false 면 자모 칩만 주고 유추하게 한다. */
  showAnswer: boolean;
  syllables: string[];
}

export const SYLLABLE_LEVELS: SyllableLevel[] = [
  {
    id: 1,
    key: "basic",
    guide: "stroke",
    showAnswer: true,
    // 자음 + 세로모음. 초성은 왼쪽, 모음은 오른쪽 — 제일 단순한 틀
    syllables: ["가", "나", "너", "다", "시", "자"],
  },
  {
    id: 2,
    key: "wide",
    guide: "stroke",
    showAnswer: true,
    // 가로모음. 초성이 위로 올라가면서 자리 감각이 한 번 바뀐다
    syllables: ["고", "구", "도", "무", "소", "주"],
  },
  {
    id: 3,
    key: "tail",
    guide: "silhouette",
    showAnswer: true,
    // 교재의 "모음 + 받침" 칸. 초성은 ㅇ 으로 고정이라 받침에만 집중된다
    syllables: ["용", "옥", "움", "윤", "읍", "안"],
  },
  {
    id: 4,
    key: "tallTail",
    guide: "silhouette",
    showAnswer: false,
    // 여기서부터 완성 음절을 안 보여준다. 자모만 보고 글자를 떠올려야 한다
    syllables: ["산", "밥", "김", "말", "신", "별"],
  },
  {
    id: 5,
    key: "wideTail",
    guide: "blank",
    showAnswer: false,
    // 교재의 "자음 + 모음 + 받침" 칸. 가이드 없이 빈 칸에 통째로 쓴다
    syllables: ["곰", "물", "국", "눈", "본", "즙"],
  },
  {
    id: 6,
    key: "complex",
    guide: "blank",
    showAnswer: false,
    // 복합모음과 쌍자음. 획이 가장 많고 자리도 가장 빡빡하다
    syllables: ["과", "왕", "꿈", "꽃", "의", "원"],
  },
];

/**
 * 채점 엄격도.
 *
 * 한글 그리기에서는 글자 하나가 캔버스의 60% 정도를 차지하고 허용 오차를
 * 캔버스 전체로 재고 있었다. 그 비율(≈1.65)을 그대로 옮겨야 음절 게임의
 * 작은 자모도 같은 체감으로 채점된다. 자모 상자에 이 값을 곱해 넘긴다.
 */
export const STROKE_TOLERANCE_RATIO = 1.65;
