import { useEffect, useMemo } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "@/utils/haptics";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useTourStore } from "./tour.store";
import { PAD, placeBubble, spotlightPath } from "./tour-geometry";
import type { TourStep } from "./tours";

interface Props {
  tourId: string;
  steps: TourStep[];
  /** i18n 네임스페이스 (tour.home 등) */
  ns: string;
  /**
   * 이 단계 대상이 화면 밖이면 스크롤시켜 달라는 요청.
   * ScrollView 를 들고 있는 건 화면이라 여기서 직접 못 한다.
   */
  onFocusStep?: (step: TourStep, index: number) => void;
}

/**
 * 기능 안내 오버레이.
 *
 * 화면을 어둡게 덮고 지금 설명하는 버튼만 구멍으로 남긴다. 구멍은 SVG
 * evenodd path 다 — View 4장으로 둘러싸는 방법은 모서리를 둥글릴 수 없고
 * 화면 회전/스크롤 때 어긋난다.
 *
 * 구멍은 뚫려 보이지만 **누를 수는 없다.** 안내 도중에 실제로 이동해
 * 버리면 투어가 그 자리에서 끊긴다. 다음으로 가는 길은 버튼 하나뿐이다.
 */
export default function TourOverlay({ tourId, steps, ns, onFocusStep }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const activeTour = useTourStore((st) => st.activeTour);
  const step = useTourStore((st) => st.step);
  const rects = useTourStore((st) => st.rects);
  const next = useTourStore((st) => st.next);
  const finish = useTourStore((st) => st.finish);
  const remeasure = useTourStore((st) => st.remeasure);

  const on = activeTour === tourId;
  const current = steps[step];
  const rect = current ? rects[current.target] : undefined;

  // 단계가 바뀌면 (1) 다시 재고 (2) 화면 안으로 스크롤을 요청한다.
  // 스크롤은 이 오버레이가 못 한다 — ScrollView 를 들고 있는 건 화면이다.
  useEffect(() => {
    if (!on || !current) return;
    remeasure();
    onFocusStep?.(current, step);
  }, [on, step, current?.target]);

  // 구멍 테두리가 천천히 숨 쉰다 — 어디를 보라는 건지 눈이 바로 간다
  const pulse = useSharedValue(0);
  useEffect(() => {
    if (!on) return;
    pulse.value = 0;
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 900, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 900, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [on, step]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.35 + pulse.value * 0.5,
    transform: [{ scale: 1 + pulse.value * 0.04 }],
  }));

  const holeRadius = current?.shape === "circle" ? 999 : 18;

  // 말풍선 자리 계산은 tour-geometry 로 뺐다 (테스트 가능해야 해서)
  const bubble = useMemo(
    () =>
      rect
        ? placeBubble(rect, { width, height }, { top: insets.top, bottom: insets.bottom })
        : null,
    [rect?.x, rect?.y, rect?.width, rect?.height, width, height, insets.top, insets.bottom],
  );

  if (!on || !current) return null;

  const isLast = step === steps.length - 1;
  const goNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    next(steps.length);
  };
  const skip = () => {
    Haptics.selectionAsync();
    finish();
  };

  return (
    <Modal visible transparent animationType="fade" onRequestClose={skip}>
      <View style={StyleSheet.absoluteFill}>
        {/* 어두운 막 + 구멍. 아직 대상을 못 쟀으면 구멍 없이 덮는다 */}
        <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
          <Path
            d={
              rect
                ? spotlightPath(width, height, rect, holeRadius)
                : `M0 0 H${width} V${height} H0 Z`
            }
            fill="rgba(10,8,26,0.82)"
            fillRule="evenodd"
          />
        </Svg>

        {/* 막을 눌러도 넘어가지 않는다 — 실수로 건너뛰는 사고를 막는다 */}
        <Pressable style={StyleSheet.absoluteFill} onPress={() => {}} />

        {/* 구멍 테두리 */}
        {rect && (
          <Animated.View
            pointerEvents="none"
            style={[
              s.ring,
              ringStyle,
              {
                left: rect.x - PAD,
                top: rect.y - PAD,
                width: rect.width + PAD * 2,
                height: rect.height + PAD * 2,
                borderRadius: holeRadius,
              },
            ]}
          />
        )}

        {/* 말풍선 */}
        {bubble && (
          <Animated.View
            key={step}
            entering={FadeIn.duration(220)}
            style={[
              s.bubble,
              { width: bubble.width, top: bubble.top, left: bubble.left },
            ]}
          >
            <View style={s.bubbleHead}>
              <View style={s.iconWrap}>
                <Ionicons name={current.icon} size={17} color="#fff" />
              </View>
              <Text style={s.stepCount}>
                {step + 1} / {steps.length}
              </Text>
            </View>

            <Text style={s.title}>{t(`${ns}.${current.key}.title`)}</Text>
            <Text style={s.desc}>{t(`${ns}.${current.key}.desc`)}</Text>

            {/* 진행 점 */}
            <View style={s.dots}>
              {steps.map((_s, i) => (
                <View key={i} style={[s.dot, i === step && s.dotOn]} />
              ))}
            </View>

            <View style={s.actions}>
              <Pressable onPress={skip} hitSlop={8} style={s.skip}>
                <Text style={s.skipText}>{t("tour.skip")}</Text>
              </Pressable>

              <Pressable onPress={goNext} style={s.nextWrap}>
                <LinearGradient
                  colors={["#8E85F0", "#776ee2", "#5F4FD8"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={s.next}
                >
                  <Text style={s.nextText}>
                    {isLast ? t("tour.done") : t("tour.next")}
                  </Text>
                  <Ionicons
                    name={isLast ? "checkmark" : "arrow-forward"}
                    size={15}
                    color="#fff"
                  />
                </LinearGradient>
                <View style={s.nextShadow} />
              </Pressable>
            </View>
          </Animated.View>
        )}
      </View>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    ring: {
      position: "absolute",
      borderWidth: 2.5,
      borderColor: "#A99CFF",
    },
    bubble: {
      position: "absolute",
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: 18,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.28,
      shadowRadius: 20,
      elevation: 12,
    },
    bubbleHead: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    iconWrap: {
      width: 32,
      height: 32,
      borderRadius: 11,
      backgroundColor: "#776ee2",
      alignItems: "center",
      justifyContent: "center",
    },
    stepCount: {
      fontSize: 11.5,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    title: { fontSize: 16.5, fontWeight: "800", color: theme.text },
    desc: {
      fontSize: 13,
      lineHeight: 19,
      color: theme.textSecondary,
      marginTop: 6,
    },
    dots: { flexDirection: "row", gap: 5, marginTop: 14 },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.border,
    },
    dotOn: { width: 16, backgroundColor: "#776ee2" },
    actions: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 16,
    },
    skip: { paddingVertical: 8, paddingRight: 12 },
    skipText: { fontSize: 13, fontWeight: "700", color: theme.textSecondary },
    nextWrap: {},
    next: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      paddingHorizontal: 20,
      height: 42,
      borderRadius: 13,
    },
    nextShadow: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: -3,
      height: 14,
      borderRadius: 13,
      backgroundColor: "#4A3CC0",
      zIndex: -1,
    },
    nextText: { color: "#fff", fontSize: 14.5, fontWeight: "800" },
  });
