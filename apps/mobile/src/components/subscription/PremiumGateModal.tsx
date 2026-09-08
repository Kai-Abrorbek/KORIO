import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  FadeIn,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";
import * as Haptics from "@/utils/haptics";
import { usePremiumGateStore } from "@/store/premium-gate.store";
import { hasTaster, type Feature } from "@/features/subscription/access";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** 기능별로 뭘 팔지 — 아이콘·색·자랑거리 3줄 */
const PITCH: Record<
  string,
  { icon: keyof typeof Ionicons.glyphMap; color: string; perks: string[] }
> = {
  grammar: { icon: "construct", color: "#5C6BC0", perks: ["grammar", "expression", "listening"] },
  expression: { icon: "chatbubble-ellipses", color: "#26A69A", perks: ["expression", "conversation", "grammar"] },
  listening: { icon: "headset", color: "#42A5F5", perks: ["listening", "expression", "topik"] },
  topik: { icon: "ribbon", color: "#AB47BC", perks: ["topik", "grammar", "listening"] },
  tutor: { icon: "mic", color: "#EC407A", perks: ["conversation", "expression", "listening"] },
};

const FALLBACK = PITCH.grammar;

/**
 * 구독 유도 모달.
 *
 * 잠긴 기능을 누르면 여기로 온다. 목적은 하나 — 요금제 화면까지 보내는 것.
 * 그래서 CTA 는 하나만 크게 두고, 나머지는 작게 뺐다.
 */
export default function PremiumGateModal() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const visible = usePremiumGateStore((st) => st.visible);
  const feature = usePremiumGateStore((st) => st.feature);
  const tasterAction = usePremiumGateStore((st) => st.tasterAction);
  const close = usePremiumGateStore((st) => st.close);

  const pitch = (feature && PITCH[feature]) || FALLBACK;

  // 자물쇠가 한 번 흔들렸다가 멈춘다 (계속 흔들면 시끄럽다)
  const shake = useSharedValue(0);
  const lockStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${shake.value}deg` }],
  }));

  // 버튼 광택
  const sheen = useSharedValue(-1);
  const sheenStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sheen.value * 260 }, { rotate: "18deg" }],
  }));

  const onShow = () => {
    shake.value = 0;
    shake.value = withSequence(
      withTiming(-9, { duration: 70 }),
      withTiming(7, { duration: 70 }),
      withTiming(-4, { duration: 70 }),
      withTiming(0, { duration: 70 }),
    );
    sheen.value = -1;
    sheen.value = withRepeat(
      withSequence(
        withTiming(1.4, { duration: 900, easing: Easing.out(Easing.quad) }),
        withTiming(-1, { duration: 0 }),
      ),
      -1,
      false,
    );
  };

  const goPremium = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    close();
    router.push("/premium");
  };

  const goTaster = () => {
    const run = tasterAction;
    close();
    run?.();
  };

  const scale = useSharedValue(0);
  const ctaStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scale.value * 3 }],
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onShow={onShow}
      onRequestClose={close}
    >
      <Animated.View entering={FadeIn.duration(180)} style={s.backdrop}>
        <Pressable style={{ flex: 1 }} onPress={close} />

        <Animated.View
          entering={SlideInDown.springify().damping(18)}
          style={[s.sheet, { paddingBottom: insets.bottom + 20 }]}
        >
          {/* 손잡이 */}
          <View style={s.grabber} />

          <View style={s.hero}>
            <LinearGradient
              colors={[pitch.color, pitch.color + "00"]}
              style={s.heroGlow}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
            <HaneulmonMascot size={82} mood="confident" />
            <Animated.View style={[s.lockBadge, lockStyle]}>
              <Ionicons name="lock-closed" size={16} color="#fff" />
            </Animated.View>
          </View>

          <Text style={s.title}>
            {t(`premiumGate.title.${feature ?? "default"}`, {
              defaultValue: t("premiumGate.title.default"),
            })}
          </Text>
          <Text style={s.sub}>{t("premiumGate.sub")}</Text>

          {/* 혜택 3줄 */}
          <View style={s.perks}>
            {pitch.perks.map((p) => (
              <View key={p} style={s.perkRow}>
                <View style={[s.perkDot, { backgroundColor: pitch.color + "22" }]}>
                  <Ionicons name="checkmark" size={13} color={pitch.color} />
                </View>
                <Text style={s.perkText}>{t(`premiumGate.perk.${p}`)}</Text>
              </View>
            ))}
            <View style={s.perkRow}>
              <View style={[s.perkDot, { backgroundColor: "#FFD86622" }]}>
                <Ionicons name="infinite" size={13} color="#E2A83A" />
              </View>
              <Text style={s.perkText}>{t("premiumGate.perk.energy")}</Text>
            </View>
          </View>

          {/* CTA — 시트 하단 고정 */}
          <AnimatedPressable
            onPressIn={() => (scale.value = withTiming(1, { duration: 70 }))}
            onPressOut={() => (scale.value = withTiming(0, { duration: 110 }))}
            onPress={goPremium}
            style={[s.ctaWrap, ctaStyle]}
          >
            <LinearGradient
              colors={["#8E85F0", "#776ee2", "#5F4FD8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={s.cta}
            >
              <Animated.View style={[s.sheen, sheenStyle]} />
              <Ionicons name="sparkles" size={17} color="#fff" />
              <Text style={s.ctaText}>{t("premiumGate.cta")}</Text>
            </LinearGradient>
            <View style={s.ctaShadow} />
          </AnimatedPressable>

          {feature && hasTaster(feature) && tasterAction ? (
            <Pressable onPress={goTaster} style={s.taster} hitSlop={8}>
              <Text style={s.tasterText}>{t("premiumGate.taster")}</Text>
            </Pressable>
          ) : (
            <Pressable onPress={close} style={s.taster} hitSlop={8}>
              <Text style={s.laterText}>{t("premiumGate.later")}</Text>
            </Pressable>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: "rgba(12,10,30,0.55)" },
    sheet: {
      backgroundColor: theme.surface,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingHorizontal: 22,
      paddingTop: 10,
    },
    grabber: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.border,
      alignSelf: "center",
      marginBottom: 12,
    },
    hero: { alignItems: "center", marginBottom: 10 },
    heroGlow: {
      position: "absolute",
      top: -10,
      width: 190,
      height: 100,
      borderRadius: 95,
      opacity: 0.16,
    },
    lockBadge: {
      position: "absolute",
      right: "31%",
      bottom: 2,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "#5F4FD8",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
      borderColor: theme.surface,
    },
    title: {
      fontSize: 20,
      fontWeight: "800",
      color: theme.text,
      textAlign: "center",
      marginTop: 4,
    },
    sub: {
      fontSize: 13,
      color: theme.textSecondary,
      textAlign: "center",
      marginTop: 6,
      lineHeight: 19,
    },
    perks: {
      backgroundColor: theme.bg,
      borderRadius: 16,
      padding: 14,
      gap: 10,
      marginTop: 18,
      marginBottom: 18,
    },
    perkRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    perkDot: {
      width: 22,
      height: 22,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
    },
    perkText: { flex: 1, fontSize: 13.5, color: theme.text, fontWeight: "600" },
    ctaWrap: { marginTop: 2 },
    cta: {
      height: 54,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      overflow: "hidden",
    },
    // 눌림 입체감 (바텀보더)
    ctaShadow: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: -4,
      height: 16,
      borderRadius: 16,
      backgroundColor: "#4A3CC0",
      zIndex: -1,
    },
    sheen: {
      position: "absolute",
      width: 44,
      height: 140,
      backgroundColor: "rgba(255,255,255,0.22)",
    },
    ctaText: { color: "#fff", fontSize: 16, fontWeight: "800" },
    taster: { alignSelf: "center", paddingVertical: 14, paddingHorizontal: 16 },
    tasterText: {
      fontSize: 13.5,
      fontWeight: "700",
      color: theme.primary,
      textDecorationLine: "underline",
    },
    laterText: { fontSize: 13.5, fontWeight: "600", color: theme.textSecondary },
  });
