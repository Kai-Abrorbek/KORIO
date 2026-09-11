import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export interface TopicLook {
  /** 주제를 대표하는 한글 한 글자 — 아이콘 대신 이걸 쓴다 */
  mark: string;
  from: string;
  to: string;
}

/**
 * 주제마다 고유한 색과 한글 글자.
 *
 * 처음엔 카페·식당·여행 장면을 SVG 로 그려놓고 팩 코드에 정규식을 물렸는데
 * 실제 표현 팩에는 그런 주제가 하나도 없었다. 그다음엔 Ionicons 로 바꿨지만
 * hand-left 가 "인사" 를 뜻한다고 읽히지 않는다 — 범용 아이콘은 언어 학습
 * 주제를 못 가리킨다.
 *
 * 그래서 그 주제에서 제일 먼저 배우는 한글 글자를 쓴다. 안(안녕), 저(저는),
 * 감(감사), 주(주세요). 한국어 앱에서만 할 수 있는 표현이고, 뜻이 어긋날
 * 일이 없고, 어느 언어 사용자가 봐도 같은 글자다.
 */
const LOOKS: Array<{ match: RegExp; look: TopicLook }> = [
  // 실제 시드에 있는 다섯 주제
  { match: /greet|hello|goodbye|farewell/, look: { mark: "안", from: "#9280F5", to: "#5B44C9" } },
  { match: /self|introduc|profile|myself/, look: { mark: "저", from: "#57BAEC", to: "#2A76CC" } },
  { match: /thank|apolog|sorry|grat|excuse/, look: { mark: "감", from: "#F5829F", to: "#D8436E" } },
  { match: /request|permission|favou?r|please/, look: { mark: "주", from: "#F8B056", to: "#DE7A1E" } },
  { match: /clarif|repeat|understand|confus|again/, look: { mark: "다", from: "#5DCBA9", to: "#1F8C6C" } },
  // 앞으로 붙을 만한 주제들
  { match: /phone|call|message|contact/, look: { mark: "통", from: "#82B6F6", to: "#3E6FD0" } },
  { match: /food|restaurant|order|dining|cafe|coffee/, look: { mark: "밥", from: "#F59477", to: "#D95832" } },
  { match: /travel|transport|direction|airport|hotel|trip/, look: { mark: "길", from: "#72C8DA", to: "#2C8AA6" } },
  { match: /shop|store|market|buy|price/, look: { mark: "사", from: "#C99DF0", to: "#8E4FCE" } },
  { match: /work|office|school|study|class|job/, look: { mark: "일", from: "#92A9CB", to: "#4F6690" } },
  { match: /daily|home|routine|life|family/, look: { mark: "집", from: "#A2D07C", to: "#5C9436" } },
  { match: /health|hospital|doctor|body/, look: { mark: "약", from: "#F58E8E", to: "#C93E3E" } },
  { match: /number|time|date|money/, look: { mark: "시", from: "#7FC7C0", to: "#2E8880" } },
];

/** 표에 없는 코드는 해시로 고른다 — 적어도 옆 카드와 색이 겹치지 않는다 */
const FALLBACKS: TopicLook[] = [
  { mark: "말", from: "#9280F5", to: "#5B44C9" },
  { mark: "말", from: "#5DCBA9", to: "#1F8C6C" },
  { mark: "말", from: "#F8B056", to: "#DE7A1E" },
  { mark: "말", from: "#57BAEC", to: "#2A76CC" },
  { mark: "말", from: "#F5829F", to: "#D8436E" },
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
  /** 타일 한 변의 길이. 바깥 View 는 바닥 그림자 때문에 이보다 7% 높다 */
  size?: number;
}

/** 주제 타일 — 그라데이션 + 한글 한 글자, 바닥 그림자로 살짝 떠 있게 */
export default function TopicIllustration({ code, size = 100 }: Props) {
  const look = useMemo(() => topicLookOf(code), [code]);
  const radius = size * 0.3;

  return (
    <View style={{ width: size, height: size * 1.07 }} pointerEvents="none">
      <View
        style={[styles.drop, { top: size * 0.07, width: size, height: size, borderRadius: radius, backgroundColor: look.to }]}
      />
      <LinearGradient
        colors={[look.from, look.to]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.95, y: 1 }}
        style={[styles.tile, { width: size, height: size, borderRadius: radius }]}
      >
        <View
          style={[styles.gloss, {
            top: -size * 0.36,
            left: -size * 0.18,
            width: size * 1.15,
            height: size * 0.72,
            borderRadius: size * 0.6,
          }]}
        />
        <Text
          allowFontScaling={false}
          style={[styles.mark, { fontSize: size * 0.5, lineHeight: size * 0.62 }]}
        >
          {look.mark}
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  drop: { position: "absolute", left: 0, opacity: 0.34 },
  tile: { alignItems: "center", justifyContent: "center", overflow: "hidden" },
  gloss: { position: "absolute", backgroundColor: "#FFFFFF", opacity: 0.17, transform: [{ rotate: "-14deg" }] },
  mark: { color: "#FFFFFF", fontWeight: "800", letterSpacing: -1, textAlign: "center" },
});
