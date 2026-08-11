import { Image, ImageStyle, StyleProp } from "react-native";

/**
 * 보리쌤.
 *
 * 예전엔 SVG 로 그렸는데 이제 표정별 일러스트를 쓴다.
 * 화면 상황에 맞는 mood 를 주면 된다 — 안 주면 기본 표정.
 *
 * require 는 정적 경로만 되므로 맵을 직접 나열한다 (동적 조합 불가).
 * 이미지는 배경을 지우고 768px 로 줄여둔 상태다 (원본 1254px, 흰 배경).
 */
export type BoriMood =
  | "default" // 기본 — 아바타 자리, 목록, 작은 표시
  | "cheering" // 환영, 시작
  | "celebrating" // 레슨/과정 완료
  | "great" // 잘했을 때 보상
  | "proud" // 성취, 숙련도
  | "level_up" // 레벨·스코어 상승
  | "streak" // 연속 학습
  | "confident" // 도전 권유
  | "determined" // 시험·도전 직전
  | "focused" // 집중 학습 중
  | "thinking" // 질문·설문
  | "waiting" // 대기, 빈 상태
  | "review" // 복습 안내
  | "correct" // 정답
  | "wrong" // 오답
  | "confused" // 이해 못 함
  | "shy" // 소소한 안내
  | "sleepy" // 오래 안 들어옴
  | "exhausted" // 에너지 없음
  | "overwhelmed"; // 너무 어려움

const MOODS: Record<BoriMood, number> = {
  default: require("../../../assets/images/characters/hangulmon_default.png"),
  cheering: require("../../../assets/images/characters/hangulmon_cheering.png"),
  celebrating: require("../../../assets/images/characters/hangulmon_celebrating.png"),
  great: require("../../../assets/images/characters/hangulmon_great.png"),
  proud: require("../../../assets/images/characters/hangulmon_proud.png"),
  level_up: require("../../../assets/images/characters/hangulmon_level_up.png"),
  streak: require("../../../assets/images/characters/hangulmon_streak.png"),
  confident: require("../../../assets/images/characters/hangulmon_confident.png"),
  determined: require("../../../assets/images/characters/hangulmon_determined.png"),
  focused: require("../../../assets/images/characters/hangulmon_focused.png"),
  thinking: require("../../../assets/images/characters/hangulmon_thinking.png"),
  waiting: require("../../../assets/images/characters/hangulmon_waiting.png"),
  review: require("../../../assets/images/characters/hangulmon_review.png"),
  correct: require("../../../assets/images/characters/hangulmon_correct.png"),
  wrong: require("../../../assets/images/characters/hangulmon_wrong.png"),
  confused: require("../../../assets/images/characters/hangulmon_confused.png"),
  shy: require("../../../assets/images/characters/hangulmon_shy.png"),
  sleepy: require("../../../assets/images/characters/hangulmon_sleepy.png"),
  exhausted: require("../../../assets/images/characters/hangulmon_exhausted.png"),
  overwhelmed: require("../../../assets/images/characters/hangulmon_overwhelmed.png"),
};

interface BoriMascotProps {
  size?: number;
  mood?: BoriMood;
  style?: StyleProp<ImageStyle>;
}

export default function BoriMascot({
  size = 200,
  mood = "default",
  style,
}: BoriMascotProps) {
  return (
    <Image
      source={MOODS[mood] ?? MOODS.default}
      style={[{ width: size, height: size }, style]}
      resizeMode="contain"
      // 캐릭터가 화면마다 여러 개 뜨는 곳이 있어서 캐시를 살려둔다
      fadeDuration={0}
    />
  );
}
