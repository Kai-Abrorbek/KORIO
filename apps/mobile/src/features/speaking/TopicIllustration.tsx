import { useMemo } from "react";
import type { ComponentProps } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

export interface TopicLook {
  icon: IoniconName;
  from: string;
  to: string;
  /** 카드 배경 (라이트) */
  soft: string;
  /** 카드 배경 (다크) */
  softDark: string;
}

/**
 * 주제마다 고유한 색과 글리프.
 *
 * 이전 버전은 카페·식당·여행 장면을 SVG 로 그려놓고 팩 코드에 정규식을
 * 물렸는데, 실제 표현 팩에는 그런 주제가 하나도 없다. 5개 중 3개가 기본
 * 그림으로 떨어지고 인사와 자기소개가 같은 그림을 쓰고 있었다.
 *
 * 팩은 앞으로도 늘어난다. 못 맞히면 티가 나는 장면 대신 색 + 글리프로
 * 정체성을 주면, 모르는 코드가 들어와도 해시로 팔레트를 골라 최소한
 * 서로 달라 보인다. 아는 주제는 아래 표에서 의미까지 맞는 글리프를 쓴다.
 */
const LOOKS: Array<{ match: RegExp; look: TopicLook }> = [
  // 실제 시드에 있는 다섯 주제
  { match: /greet|hello|goodbye|farewell/, look: { icon: "hand-left", from: "#9280F5", to: "#5B44C9", soft: "#EDE7FD", softDark: "#332B49" } },
  { match: /self|introduc|profile|myself/, look: { icon: "person", from: "#57BAEC", to: "#2A76CC", soft: "#E3F1FB", softDark: "#22364A" } },
  { match: /thank|apolog|sorry|grat|excuse/, look: { icon: "heart", from: "#F5829F", to: "#D8436E", soft: "#FCE7EE", softDark: "#432934" } },
  { match: /request|permission|favou?r|please/, look: { icon: "hand-right", from: "#F8B056", to: "#DE7A1E", soft: "#FDEEDA", softDark: "#453320" } },
  { match: /clarif|repeat|understand|confus|again/, look: { icon: "help-buoy", from: "#5DCBA9", to: "#1F8C6C", soft: "#E2F5EE", softDark: "#203D34" } },
  // 앞으로 붙을 만한 주제들
  { match: /phone|call|message|contact/, look: { icon: "call", from: "#82B6F6", to: "#3E6FD0", soft: "#E7F0FD", softDark: "#243349" } },
  { match: /food|restaurant|order|dining|cafe|coffee/, look: { icon: "restaurant", from: "#F59477", to: "#D95832", soft: "#FCEAE3", softDark: "#452C24" } },
  { match: /travel|transport|direction|airport|hotel|trip/, look: { icon: "airplane", from: "#72C8DA", to: "#2C8AA6", soft: "#E2F3F7", softDark: "#1F3A43" } },
  { match: /shop|store|market|buy|price/, look: { icon: "bag-handle", from: "#C99DF0", to: "#8E4FCE", soft: "#F3E9FC", softDark: "#382A48" } },
  { match: /work|office|school|study|class|job/, look: { icon: "briefcase", from: "#92A9CB", to: "#4F6690", soft: "#EAEFF7", softDark: "#2A3242" } },
  { match: /daily|home|routine|life|family/, look: { icon: "home", from: "#A2D07C", to: "#5C9436", soft: "#EDF6E4", softDark: "#2C3A25" } },
  { match: /health|hospital|doctor|body/, look: { icon: "medkit", from: "#F58E8E", to: "#C93E3E", soft: "#FCE8E8", softDark: "#432A2A" } },
  { match: /number|time|date|money/, look: { icon: "time", from: "#7FC7C0", to: "#2E8880", soft: "#E4F4F2", softDark: "#213B39" } },
];

/** 표에 없는 코드는 해시로 고른다 — 적어도 옆 카드와 색이 겹치지 않는다 */
const FALLBACKS: TopicLook[] = [
  { icon: "chatbubbles", from: "#9280F5", to: "#5B44C9", soft: "#EDE7FD", softDark: "#332B49" },
  { icon: "chatbubbles", from: "#5DCBA9", to: "#1F8C6C", soft: "#E2F5EE", softDark: "#203D34" },
  { icon: "chatbubbles", from: "#F8B056", to: "#DE7A1E", soft: "#FDEEDA", softDark: "#453320" },
  { icon: "chatbubbles", from: "#57BAEC", to: "#2A76CC", soft: "#E3F1FB", softDark: "#22364A" },
  { icon: "chatbubbles", from: "#F5829F", to: "#D8436E", soft: "#FCE7EE", softDark: "#432934" },
];

export function topicLookOf(code: string): TopicLook {
  const topic = (code || "").toLowerCase();
  const hit = LOOKS.find((entry) => entry.match.test(topic));
  if (hit) return hit.look;
  let hash = 0;
  for (let index = 0; index < topic.length; index += 1) {
    hash = (hash * 31 + topic.charCodeAt(index)) >>> 0;
  }
  return FALLBACKS[hash % FALLBACKS.length];
}

interface Props {
  code: string;
  /** 배지 한 변의 길이. 바깥 View 는 아래 그림자 때문에 이보다 7% 높다 */
  size?: number;
}

/** 주제 배지 — 그라데이션 타일 + 바닥 그림자로 살짝 떠 있게 */
export default function TopicIllustration({ code, size = 100 }: Props) {
  const look = useMemo(() => topicLookOf(code), [code]);
  const radius = size * 0.3;

  return (
    <View style={{ width: size, height: size * 1.07 }} pointerEvents="none">
      <View
        style={{
          position: "absolute",
          left: 0,
          top: size * 0.07,
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor: look.to,
          opacity: 0.34,
        }}
      />
      <LinearGradient
        colors={[look.from, look.to]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.95, y: 1 }}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* 위쪽 광택 */}
        <View
          style={{
            position: "absolute",
            top: -size * 0.36,
            left: -size * 0.18,
            width: size * 1.15,
            height: size * 0.72,
            borderRadius: size * 0.6,
            backgroundColor: "#FFFFFF",
            opacity: 0.17,
            transform: [{ rotate: "-14deg" }],
          }}
        />
        {/* 말풍선 방울 — 말하기라는 걸 색과 함께 알려준다 */}
        <View
          style={{
            position: "absolute",
            right: size * 0.11,
            bottom: size * 0.13,
            width: size * 0.15,
            height: size * 0.15,
            borderRadius: size * 0.075,
            backgroundColor: "#FFFFFF",
            opacity: 0.2,
          }}
        />
        <View
          style={{
            position: "absolute",
            right: size * 0.27,
            bottom: size * 0.05,
            width: size * 0.085,
            height: size * 0.085,
            borderRadius: size * 0.043,
            backgroundColor: "#FFFFFF",
            opacity: 0.26,
          }}
        />
        <Ionicons name={look.icon} size={size * 0.44} color="#FFFFFF" />
      </LinearGradient>
    </View>
  );
}
