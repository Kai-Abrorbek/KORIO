import { useEffect, useRef, useState, type ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { Pressable } from "@/components/ui/Pressables";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";
import Confetti from "@/components/lesson-complete/Confetti";
import Crown from "@/components/super-welcome/Crown";
import HaneulmonBow, {
  BOW_BOTTOM_AT,
  BOW_CHEER_AT,
} from "@/features/app-review/HaneulmonBow";
import Button3D from "@/features/retention/components/Button3D";
import { useSound } from "@/hooks/useSound";
import { useAuthStore } from "@/store/auth.store";
import * as Haptics from "@/utils/haptics";

type IconName = ComponentProps<typeof Ionicons>["name"];

/** 등급마다 보여 줄 혜택 넷 (premium.features.* 문구) */
const PERKS: Record<"super" | "max", { icon: IconName; key: string }[]> = {
  super: [
    { icon: "infinite", key: "unlimitedEnergy" },
    { icon: "close-circle", key: "noAds" },
    { icon: "refresh", key: "unlimitedReview" },
    { icon: "diamond", key: "monthlyGems" },
  ],
  max: [
    { icon: "mic", key: "aiTutor" },
    { icon: "chatbubbles", key: "tutorTopics" },
    { icon: "infinite", key: "unlimitedEnergy" },
    { icon: "diamond", key: "monthlyGems" },
  ],
};

/**
 * 타임라인 (ms) — 3막:
 *  1) 감동: 하늘몬이 걸어 나와 고개 숙여 "감사합니다" + 손편지 한 줄 (함께한 일수)
 *  2) 재미: 하늘몬이 일어나 기뻐할 때 왕관이 떨어져 머리에 '통' — 빛 고리 + 콘페티
 *  3) 보상: 열린 혜택이 도장처럼 하나씩 → 시작 버튼
 */
const LETTER_AT = BOW_BOTTOM_AT + 160;
const LETTER_MS = 900;
const CROWN_AT = BOW_CHEER_AT + 90;
const CROWN_FALL_MS = 420;
const CROWN_LAND_AT = CROWN_AT + CROWN_FALL_MS;
const TITLE_AT = CROWN_LAND_AT + 150;
const PERKS_AT = CROWN_LAND_AT + 800;
const PERK_GAP = 260;
const CTA_AT = PERKS_AT + PERK_GAP * 4 + 350;

const STAGE = 170;
const DAY_MS = 86_400_000;

/**
 * 구독 결제가 끝나고 돌아오자마자 — 감사 연출 (결제 한 번에 한 번, premium 화면이 띄운다).
 * 화면을 탭하면 끝 장면으로 건너뛴다. 동작 줄이기면 끝 장면만.
 */
export default function SuperWelcomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const { play } = useSound();
  const params = useLocalSearchParams<{ tier?: string }>();
  const tier: "super" | "max" = params.tier === "max" ? "max" : "super";
  const tierName = tier === "max" ? "MAX" : "SUPER";
  const user = useAuthStore((s) => s.user) as {
    nickname?: string;
    createdAt?: string;
    streak?: number;
  } | null;

  const name = user?.nickname?.trim() || "KORIO";
  const days = user?.createdAt
    ? Math.max(
        1,
        Math.floor((Date.now() - new Date(user.createdAt).getTime()) / DAY_MS) +
          1,
      )
    : Math.max(0, user?.streak ?? 0);
  const letter =
    days > 1
      ? t("superWelcome.letter", { name, days })
      : t("superWelcome.letterFirst", { name });

  const [skipped, setSkipped] = useState(reducedMotion);
  const [landed, setLanded] = useState(reducedMotion);
  const [ctaReady, setCtaReady] = useState(reducedMotion);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const words = useSharedValue(reducedMotion ? 1 : 0);
  const letterReveal = useSharedValue(reducedMotion ? 1 : 0);
  const crownY = useSharedValue(reducedMotion ? 0 : -360);
  const crownSquash = useSharedValue(1);
  const bodySquash = useSharedValue(1);
  const ring = useSharedValue(0);
  const title = useSharedValue(reducedMotion ? 1 : 0);
  const perks = [
    useSharedValue(reducedMotion ? 1 : 0),
    useSharedValue(reducedMotion ? 1 : 0),
    useSharedValue(reducedMotion ? 1 : 0),
    useSharedValue(reducedMotion ? 1 : 0),
  ];
  const cta = useSharedValue(reducedMotion ? 1 : 0);

  useEffect(() => {
    if (reducedMotion) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
      return;
    }
    const pop = { damping: 9, stiffness: 180 };
    words.value = withDelay(BOW_BOTTOM_AT - 120, withSpring(1, pop));
    letterReveal.value = withDelay(
      LETTER_AT,
      withTiming(1, { duration: LETTER_MS, easing: Easing.out(Easing.quad) }),
    );
    later(
      () =>
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {}),
      BOW_BOTTOM_AT,
    );

    // 왕관 — 떨어져서(가속) 머리에 닿는 순간 둘 다 눌렸다 튄다
    crownY.value = withDelay(
      CROWN_AT,
      withTiming(0, {
        duration: CROWN_FALL_MS,
        easing: Easing.in(Easing.quad),
      }),
    );
    crownSquash.value = withDelay(
      CROWN_LAND_AT,
      withSequence(
        withTiming(0.78, { duration: 70 }),
        withSpring(1, { damping: 7, stiffness: 260 }),
      ),
    );
    bodySquash.value = withDelay(
      CROWN_LAND_AT,
      withSequence(
        withTiming(0.9, { duration: 80 }),
        withSpring(1, { damping: 6, stiffness: 220 }),
      ),
    );
    ring.value = withDelay(
      CROWN_LAND_AT,
      withTiming(1, { duration: 650, easing: Easing.out(Easing.cubic) }),
    );
    later(() => {
      setLanded(true);
      play("levelUp");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
    }, CROWN_LAND_AT);
    title.value = withDelay(TITLE_AT, withSpring(1, pop));

    perks.forEach((perk, i) => {
      const at = PERKS_AT + i * PERK_GAP;
      perk.value = withDelay(
        at,
        withSequence(
          withTiming(1.08, { duration: 140, easing: Easing.out(Easing.quad) }),
          withSpring(1, { damping: 10, stiffness: 260 }),
        ),
      );
      later(
        () =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
            () => {},
          ),
        at,
      );
    });
    cta.value = withDelay(CTA_AT, withTiming(1, { duration: 260 }));
    later(() => setCtaReady(true), CTA_AT);

    const list = timers.current;
    return () => list.forEach(clearTimeout);
    // 한 번만 — 화면이 열릴 때의 타임라인
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 탭 — 끝 장면으로 */
  const skip = () => {
    if (skipped && ctaReady) return;
    timers.current.forEach(clearTimeout);
    setSkipped(true);
    setLanded(true);
    setCtaReady(true);
    words.value = 1;
    letterReveal.value = 1;
    crownY.value = 0;
    crownSquash.value = 1;
    bodySquash.value = 1;
    ring.value = 1;
    title.value = 1;
    perks.forEach((p) => (p.value = 1));
    cta.value = 1;
  };

  const finish = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)");
  };

  const wordsStyle = useAnimatedStyle(() => ({
    opacity: Math.min(1, words.value),
    transform: [{ scale: 0.7 + words.value * 0.3 }],
  }));
  const letterStyle = useAnimatedStyle(() => ({
    width: `${letterReveal.value * 100}%`,
  }));
  const crownStyle = useAnimatedStyle(() => ({
    opacity: crownY.value < -340 ? 0 : 1,
    transform: [
      { translateY: crownY.value },
      { scaleY: crownSquash.value },
      { scaleX: 2 - crownSquash.value },
    ],
  }));
  const bodyStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: bodySquash.value }, { scaleX: 2 - bodySquash.value }],
  }));
  const ringStyle = useAnimatedStyle(() => ({
    opacity: ring.value > 0 && ring.value < 1 ? 1 - ring.value : 0,
    transform: [{ scale: 0.4 + ring.value * 1.8 }],
  }));
  const titleStyle = useAnimatedStyle(() => ({
    opacity: Math.min(1, title.value),
    transform: [{ translateY: (1 - title.value) * 12 }],
  }));
  const ctaStyle = useAnimatedStyle(() => ({ opacity: cta.value }));

  return (
    <Pressable style={s.root} onPress={skip} sound={false}>
      <LinearGradient
        colors={["#7B5CFF", "#4A33C7", "#1F1460"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[s.body, { paddingTop: insets.top + 36 }]}>
        {/* 무대 — 하늘몬 + 왕관 */}
        <View style={s.stage}>
          <Animated.View pointerEvents="none" style={[s.ring, ringStyle]} />
          <Animated.View style={[s.stageInner, bodyStyle]}>
            {skipped ? (
              <HaneulmonMascot size={STAGE * 1.12} mood="celebrating" />
            ) : (
              <HaneulmonBow size={STAGE} reducedMotion={false} />
            )}
          </Animated.View>
          <Animated.View pointerEvents="none" style={[s.crown, crownStyle]}>
            <Crown width={STAGE * 0.3} />
          </Animated.View>
        </View>

        <Animated.View style={[s.words, wordsStyle]}>
          <Text style={s.hangul}>감사합니다</Text>
        </Animated.View>
        {/* 손편지 한 줄 — 왼쪽부터 써진다 */}
        <View style={s.letterWrap}>
          <Animated.View style={[s.letterMask, letterStyle]}>
            <Text style={s.letter} numberOfLines={2}>
              {letter}
            </Text>
          </Animated.View>
          {/* 자리 잡기용 (안 보임) — 줄 높이를 미리 잡아 둔다 */}
          <Text style={[s.letter, s.ghost]} numberOfLines={2}>
            {letter}
          </Text>
        </View>

        <Animated.View style={[s.titleRow, titleStyle]}>
          <LinearGradient
            colors={
              tier === "max" ? ["#FFE066", "#FFB800"] : ["#FF8AD8", "#B86CFF"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.tag}
          >
            <Ionicons
              name="star"
              size={12}
              color={tier === "max" ? "#5B3A00" : "#FFFFFF"}
            />
            <Text style={[s.tagText, tier === "max" && { color: "#5B3A00" }]}>
              {tierName}
            </Text>
          </LinearGradient>
          <Text style={s.title}>
            {t("superWelcome.title", { tier: tierName })}
          </Text>
        </Animated.View>

        <View style={s.perks}>
          {PERKS[tier].map((perk, i) => (
            <PerkStamp
              key={perk.key}
              value={perks[i]}
              icon={perk.icon}
              label={t(`premium.features.${perk.key}`)}
            />
          ))}
        </View>
      </View>

      <View style={[s.footer, { paddingBottom: insets.bottom + 16 }]}>
        {ctaReady ? (
          <Animated.View style={ctaStyle}>
            <Button3D
              label={t("superWelcome.cta", { tier: tierName })}
              onPress={finish}
              color="#FFD900"
              depthColor="#E5AE00"
              textColor="#3B2A00"
            />
          </Animated.View>
        ) : (
          <Text style={s.skip}>{t("superWelcome.skip")}</Text>
        )}
      </View>

      {landed && !reducedMotion ? <Confetti /> : null}
    </Pressable>
  );
}

/** 혜택 한 줄 — 도장처럼 크게 기울어져 내려와 '쾅' 하고 자리 잡는다 */
function PerkStamp({
  value,
  icon,
  label,
}: {
  value: SharedValue<number>;
  icon: IconName;
  label: string;
}) {
  const style = useAnimatedStyle(() => ({
    opacity: Math.min(1, value.value * 1.4),
    transform: [
      { scale: value.value === 0 ? 1.5 : value.value },
      { rotate: `${(1 - Math.min(1, value.value)) * -8}deg` },
    ],
  }));
  return (
    <Animated.View style={[s.perk, style]}>
      <View style={s.perkIcon}>
        <Ionicons name={icon} size={18} color="#3B2A00" />
      </View>
      <Text style={s.perkText} numberOfLines={2}>
        {label}
      </Text>
      <Ionicons name="checkmark-circle" size={20} color="#FFD900" />
    </Animated.View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#1F1460" },
  body: { flex: 1, alignItems: "center", paddingHorizontal: 20 },
  stage: {
    width: STAGE,
    height: STAGE,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  stageInner: {
    width: STAGE,
    height: STAGE,
    alignItems: "center",
    justifyContent: "center",
    transformOrigin: "bottom",
  },
  // 왕관 — 기뻐하는 그림(1.12배)의 머리 꼭대기에 앉는 자리 (원본 768px 기준 머리 위 ≈ 0.25)
  crown: {
    position: "absolute",
    top: STAGE * 0.005,
    left: STAGE * (0.494 - 0.15),
    transformOrigin: "bottom",
  },
  ring: {
    position: "absolute",
    width: STAGE,
    height: STAGE,
    borderRadius: STAGE / 2,
    borderWidth: 6,
    borderColor: "#FFD900",
  },
  words: { marginTop: 18 },
  hangul: {
    fontSize: 44,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  letterWrap: { marginTop: 6, maxWidth: 320, alignSelf: "center" },
  letterMask: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    overflow: "hidden",
  },
  letter: {
    width: 320,
    fontSize: 15.5,
    fontWeight: "800",
    lineHeight: 22,
    color: "rgba(255,255,255,0.88)",
    textAlign: "center",
  },
  ghost: { opacity: 0 },
  titleRow: { marginTop: 22, alignItems: "center", gap: 8 },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 26,
  },
  perks: { marginTop: 18, alignSelf: "stretch", gap: 8 },
  perk: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  perkIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFD900",
  },
  perkText: { flex: 1, color: "#FFFFFF", fontSize: 14.5, fontWeight: "800" },
  footer: { paddingHorizontal: 20 },
  skip: {
    textAlign: "center",
    color: "rgba(255,255,255,0.55)",
    fontSize: 12.5,
    fontWeight: "700",
    paddingVertical: 18,
  },
});
