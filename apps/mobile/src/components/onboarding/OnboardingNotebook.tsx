import { useEffect, useState, type ComponentProps } from "react";
import { StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";

export interface NotebookEntry {
  /** 어느 질문의 답인지 — 같은 key 의 글이 바뀌면 그 줄만 다시 쓴다 */
  key: string;
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  color: string;
}

/** 공책에 보이는 줄 수. 넘치면 오래된 줄이 위로 밀려난다 */
const LINES = 3;
const LINE_H = 24;
const INK = "#5B4DD4";

/**
 * 온보딩 설문 위 — 하늘몬이 연필로 공책에 유저가 고른 답을 한 줄씩 적는다.
 *
 * 하늘몬 그림(default)은 원래 한 손에 연필, 한 손에 공책을 들고 있다. 줄이 새로 써질 때
 * 하늘몬이 끄적이듯 들썩이고, 공책 위에서는 연필이 글자를 따라가며 글이 왼쪽부터 드러난다.
 */
export default function OnboardingNotebook({
  title,
  entries,
}: {
  title: string;
  entries: NotebookEntry[];
}) {
  const theme = useTheme();
  const s = getStyles(theme);
  const reducedMotion = useReducedMotion();
  const visible = entries.slice(-LINES);
  // 마지막 줄(지금 고른 답)이 바뀔 때마다 하늘몬이 끄적인다
  const writingKey = visible.length
    ? `${visible[visible.length - 1].key}:${visible[visible.length - 1].label}`
    : "";

  const bob = useSharedValue(0);
  const scribble = useSharedValue(0);
  useEffect(() => {
    if (reducedMotion) return;
    bob.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 1300, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1300, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
    );
  }, [bob, reducedMotion]);
  useEffect(() => {
    if (!writingKey || reducedMotion) return;
    scribble.value = withSequence(
      withRepeat(
        withSequence(
          withTiming(1, { duration: 70 }),
          withTiming(-1, { duration: 70 }),
        ),
        4,
        true,
      ),
      withTiming(0, { duration: 90 }),
    );
  }, [writingKey, scribble, reducedMotion]);

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: bob.value + Math.abs(scribble.value) * -1.5 },
      { rotate: `${scribble.value * 3}deg` },
    ],
  }));

  return (
    <View style={s.row}>
      <Animated.View style={[s.mascot, mascotStyle]}>
        <HaneulmonMascot size={88} mood="default" />
      </Animated.View>

      <View style={s.notebook}>
        {/* 스프링 공책 구멍 */}
        <View style={s.rings} pointerEvents="none">
          {Array.from({ length: 6 }, (_, i) => (
            <View key={i} style={s.ring} />
          ))}
        </View>
        <Text style={s.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={s.page}>
          {Array.from({ length: LINES }, (_, i) => (
            <View key={i} style={[s.rule, { top: (i + 1) * LINE_H - 1 }]} />
          ))}
          <View style={s.margin} />
          {visible.map((entry) => (
            <NotebookLine
              key={`${entry.key}:${entry.label}`}
              entry={entry}
              theme={theme}
              animate={!reducedMotion}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

/** 한 줄 — 처음 붙을 때 연필이 지나가며 글이 왼쪽부터 드러난다 */
function NotebookLine({
  entry,
  theme,
  animate,
}: {
  entry: NotebookEntry;
  theme: ThemeColors;
  animate: boolean;
}) {
  const s = getStyles(theme);
  const [width, setWidth] = useState(0);
  const reveal = useSharedValue(animate ? 0 : 1);
  useEffect(() => {
    if (!animate || !width) return;
    // 글자 수에 맞춰 — 짧은 답은 빨리, 긴 답도 1초를 넘지 않게
    const duration = Math.min(900, Math.max(380, entry.label.length * 34));
    reveal.value = withTiming(1, { duration, easing: Easing.out(Easing.quad) });
  }, [animate, width, entry.label, reveal]);

  const coverStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: reveal.value * width }],
  }));
  const pencilStyle = useAnimatedStyle(() => ({
    opacity: reveal.value > 0.98 ? 0 : 1,
    transform: [
      { translateX: reveal.value * width - 2 },
      { translateY: Math.sin(reveal.value * Math.PI * 10) * 1.5 },
      { rotate: "-35deg" },
    ],
  }));

  return (
    <View style={s.line}>
      <View
        style={s.lineInner}
        onLayout={(e: LayoutChangeEvent) =>
          setWidth(e.nativeEvent.layout.width)
        }
      >
        <Ionicons name={entry.icon} size={13} color={entry.color} />
        <Text style={s.lineText} numberOfLines={1}>
          {entry.label}
        </Text>
        {animate ? (
          <>
            <Animated.View style={[s.cover, coverStyle]} pointerEvents="none" />
            <Animated.View style={[s.pencil, pencilStyle]} pointerEvents="none">
              <Ionicons name="pencil" size={15} color={INK} />
            </Animated.View>
          </>
        ) : null}
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) => {
  const dark = theme.bg !== "#ffffff";
  const paper = dark ? theme.surface : "#FFFDF7";
  return StyleSheet.create({
    row: { flexDirection: "row", alignItems: "flex-end", gap: 6 },
    mascot: { marginBottom: -4 },
    notebook: {
      flex: 1,
      height: 122,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: paper,
      paddingTop: 18,
      paddingLeft: 14,
      paddingRight: 12,
      overflow: "hidden",
    },
    rings: {
      position: "absolute",
      top: 5,
      left: 18,
      right: 18,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    // 스프링 구멍 — 종이에 뚫린 작은 구멍 줄
    ring: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: dark ? theme.bg : "#E4E0F7",
    },
    title: {
      fontSize: 10.5,
      fontWeight: "900",
      letterSpacing: 0.4,
      color: theme.primary,
      marginBottom: 2,
    },
    page: { height: LINE_H * LINES, paddingLeft: 12 },
    rule: {
      position: "absolute",
      left: 0,
      right: 0,
      height: 1,
      backgroundColor: theme.border,
    },
    margin: {
      position: "absolute",
      left: 4,
      top: 0,
      bottom: 0,
      width: 1,
      backgroundColor: dark ? theme.border : "#D9D4F5",
    },
    line: { height: LINE_H, justifyContent: "center" },
    lineInner: {
      alignSelf: "flex-start",
      maxWidth: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingRight: 4,
    },
    lineText: {
      flexShrink: 1,
      fontSize: 13.5,
      fontWeight: "800",
      color: dark ? "#C4BEF0" : INK,
    },
    // 아직 안 쓴 부분을 종이색으로 덮어 두고, 오른쪽으로 걷어 낸다
    cover: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: -2,
      backgroundColor: paper,
    },
    pencil: { position: "absolute", left: 0, top: -2 },
  });
};
