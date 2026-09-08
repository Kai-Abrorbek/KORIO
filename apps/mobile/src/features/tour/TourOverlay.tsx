import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  type LayoutChangeEvent,
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
import { TOURS } from "./tours";

/**
 * 기능 안내 오버레이. 루트 레이아웃에 딱 하나 뜬다.
 *
 * ⚠️ **Modal 을 쓰면 안 된다.**
 * 안드로이드에서 Modal 은 별개의 window 다. 그 window 는 상태바까지 덮는데,
 * 대상 버튼을 잰 measureInWindow 는 **앱 window 기준** 좌표를 준다.
 * 앱 window 는 상태바 아래에서 시작하므로, 잰 y 를 그대로 Modal 안에서
 * 쓰면 구멍이 상태바 높이만큼 위로 밀린다 (기기마다 24~48dp).
 * 같은 window 안에서 그리면 이 어긋남 자체가 생기지 않는다.
 *
 * 그래서 화면이 아니라 루트에 둔다 — 화면 안에 두면 탭바를 못 덮는다.
 *
 * 화면을 어둡게 덮고 지금 설명하는 버튼만 구멍으로 남긴다. 구멍은 SVG
 * evenodd path 다. View 4장으로 둘러싸는 방법은 모서리를 못 둥글린다.
 *
 * 구멍은 뚫려 보이지만 **누를 수는 없다.** 안내 도중에 실제로 이동해
 * 버리면 투어가 그 자리에서 끊긴다. 다음으로 가는 길은 버튼 하나뿐이다.
 */
export default function TourOverlay() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const insets = useSafeAreaInsets();
  /**
   * 자기 크기를 스스로 잰다.
   *
   * Dimensions.get('window') 는 안드로이드에서 시스템 바를 포함하는지가
   * 설정마다 달라서, 어두운 막이 화면 아래를 몇십 px 못 덮는 일이 생긴다.
   * 대상 좌표와 같은 좌표계를 쓰려면 이 뷰의 실제 크기가 맞다.
   */
  const [size, setSize] = useState({ width: 0, height: 0 });
  const onLayout = (e: LayoutChangeEvent) => {
    const { width: w, height: h } = e.nativeEvent.layout;
    setSize((prev) =>
      Math.abs(prev.width - w) < 1 && Math.abs(prev.height - h) < 1
        ? prev
        : { width: w, height: h },
    );
  };
  const { width, height } = size;

  const activeTour = useTourStore((st) => st.activeTour);
  const step = useTourStore((st) => st.step);
  const rects = useTourStore((st) => st.rects);
  const next = useTourStore((st) => st.next);
  const finish = useTourStore((st) => st.finish);
  const remeasure = useTourStore((st) => st.remeasure);

  const tour = activeTour ? TOURS[activeTour] : undefined;
  const steps = tour?.steps;
  const current = steps?.[step];
  const rect = current ? rects[current.target] : undefined;

  // 단계가 바뀌면 다시 잰다. 스크롤은 레이아웃을 안 바꿔서 onLayout 이 안 뜬다.
  // (스크롤 자체는 화면이 useTourScroll 로 한다)
  useEffect(() => {
    if (!current) return;
    remeasure();
  }, [activeTour, step, current?.target]);

  // 구멍 테두리가 천천히 숨 쉰다 — 어디를 보라는 건지 눈이 바로 간다
  const pulse = useSharedValue(0);
  useEffect(() => {
    if (!current) return;
    pulse.value = 0;
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 900, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 900, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [activeTour, step]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.35 + pulse.value * 0.5,
    transform: [{ scale: 1 + pulse.value * 0.04 }],
  }));

  const bubble = useMemo(
    () =>
      rect && width > 0 && height > 0
        ? placeBubble(
            rect,
            { width, height },
            { top: insets.top, bottom: insets.bottom },
          )
        : null,
    [
      rect?.x,
      rect?.y,
      rect?.width,
      rect?.height,
      width,
      height,
      insets.top,
      insets.bottom,
    ],
  );

  // 크기를 아직 못 쟀으면 막만 깔고 한 프레임 기다린다 —
  // 0 크기로 구멍을 계산하면 엉뚱한 자리가 뚫린다
  if (!tour || !steps || !current) return null;

  const holeRadius = current.shape === "circle" ? 999 : 18;
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
    <View style={s.root} onLayout={onLayout} pointerEvents="box-none">
      {/* 어두운 막 + 구멍. 아직 대상을 못 쟀으면 구멍 없이 덮는다 */}
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <Path
          d={
            rect && width > 0 && height > 0
              ? spotlightPath(width, height, rect, holeRadius)
              : `M0 0 H${width} V${height} H0 Z`
          }
          fill="rgba(10,8,26,0.82)"
          fillRule="evenodd"
        />
      </Svg>

      {/* 막을 눌러도 넘어가지 않는다 — 실수로 건너뛰는 사고를 막는다.
          구멍 위도 이걸로 같이 막힌다 (뚫려 보이지만 못 누른다) */}
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

          <Text style={s.title}>{t(`${tour.ns}.${current.key}.title`)}</Text>
          <Text style={s.desc}>{t(`${tour.ns}.${current.key}.desc`)}</Text>

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
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    // 탭바(zIndex 없음)와 플로팅 버튼(zIndex 40) 위로 올라와야 한다
    root: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      elevation: 1000,
    },
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
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.border },
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
