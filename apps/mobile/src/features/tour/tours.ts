import type { Ionicons } from "@expo/vector-icons";

export interface TourStep {
  /** TourTarget 의 tourId */
  target: string;
  /** i18n 키 (tour.home.<key>.title / .desc) */
  key: string;
  icon: keyof typeof Ionicons.glyphMap;
  /** 구멍 모양 — 동그란 버튼이면 circle */
  shape?: "rect" | "circle";
}

/** 홈 화면 투어 id (seen 저장 키이기도 하다 — 바꾸면 다들 다시 본다) */
export const HOME_TOUR = "home.v1";

/**
 * 홈 투어 순서.
 *
 * 위에서 아래로 훑는 게 아니라 **처음 온 사람이 궁금해할 순서**로 짰다.
 * 1) 뭘 눌러야 공부가 시작되나  2) 분야는 어디서 고르나
 * 3) 내가 얼마나 했는지 어디서 보나  4) 틀린 건 어디서 다시 푸나
 * 5) 말이 안 통할 때 물어볼 데가 있나
 *
 * 5개를 넘기면 끝까지 보는 사람이 급격히 준다. 나머지는 앱을 쓰다가
 * 자연히 발견되는 것들이라 뺐다.
 */
export const HOME_STEPS: TourStep[] = [
  { target: "home.continue", key: "continue", icon: "book" },
  { target: "home.categories", key: "categories", icon: "swap-horizontal", shape: "circle" },
  { target: "home.chart", key: "chart", icon: "stats-chart" },
  { target: "home.review", key: "review", icon: "refresh" },
  { target: "home.ai", key: "ai", icon: "sparkles", shape: "circle" },
];

/**
 * 투어 등록소.
 *
 * 오버레이는 루트 레이아웃에 딱 하나만 떠 있고, 지금 활성인 투어 id 로
 * 여기서 단계를 찾는다. 화면이 오버레이를 직접 들고 있으면 안 되는
 * 이유는 안드로이드 좌표 때문이다 — 아래 TourOverlay 주석 참고.
 */
export const TOURS: Record<string, { steps: TourStep[]; ns: string }> = {
  [HOME_TOUR]: { steps: HOME_STEPS, ns: "tour.home" },
};
