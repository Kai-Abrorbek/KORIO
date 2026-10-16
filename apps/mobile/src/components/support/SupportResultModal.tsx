import { useEffect } from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import { Pressable } from "@/components/ui/Pressables";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import type { SupportCategory } from "@/services/support.service";
import { SUPPORT_CATEGORY_LOOK, SUPPORT_LIMITS } from "./supportLook";

/**
 * 문의 보내기 결과 — 기본 Alert 대신.
 * 접수되면 엄지 든 한글몬 + 무엇을 보냈는지 한 줄, 실패하면 다시 시도, 하루 한도면 내일.
 * 모달은 페이드로만 열고 닫는다 (ErrorModal 과 같은 규칙 — 스프링·팝 금지). 안쪽만 살짝 움직인다.
 */
const MASCOT = require("../../../assets/images/characters/hangulmon_great_float.png");
const SPARKS = [
  { top: 6, left: 18, size: 14, delay: 0 },
  { top: 30, right: 14, size: 11, delay: 500 },
  { bottom: 18, left: 8, size: 10, delay: 1000 },
] as const;

export type SupportResult =
  | { kind: "sent"; category: SupportCategory; subject: string }
  | { kind: "failed" }
  /** 하루 한도(5건) · 너무 자주 보냄 (409 · 429) */
  | { kind: "limit" };

interface Props {
  result: SupportResult | null;
  onClose: () => void;
  onRetry: () => void;
}

export default function SupportResultModal({ result, onClose, onRetry }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);
  const sent = result?.kind === "sent";
  const failed = result?.kind === "failed";
  const kind = result?.kind ?? "sent";

  return (
    <Modal
      visible={!!result}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={s.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={s.card}>
          {sent ? (
            <Mascot />
          ) : (
            <View style={[s.failIcon, kind === "limit" && s.limitIcon]}>
              <Ionicons
                name={kind === "limit" ? "hourglass" : "cloud-offline"}
                size={30}
                color="#fff"
              />
            </View>
          )}

          <Text style={s.title}>{t(`support.${kind}Title`)}</Text>
          <Text style={s.body}>
            {t(`support.${kind}Body`, { n: SUPPORT_LIMITS.perDay })}
          </Text>

          {result?.kind === "sent" && (
            <View style={s.ticket}>
              <View
                style={[
                  s.ticketChip,
                  { backgroundColor: SUPPORT_CATEGORY_LOOK[result.category].color + "24" },
                ]}
              >
                <Ionicons
                  name={SUPPORT_CATEGORY_LOOK[result.category].icon}
                  size={12}
                  color={SUPPORT_CATEGORY_LOOK[result.category].color}
                />
                <Text
                  style={[
                    s.ticketChipText,
                    { color: SUPPORT_CATEGORY_LOOK[result.category].color },
                  ]}
                >
                  {t(`support.category.${result.category}`)}
                </Text>
              </View>
              <Text style={s.ticketSubject} numberOfLines={1}>
                {result.subject}
              </Text>
              <Ionicons name="checkmark-circle" size={17} color="#1DBB7F" />
            </View>
          )}

          <Pressable
            onPress={failed ? onRetry : onClose}
            style={({ pressed }) => [s.primary, pressed && s.primaryPressed]}
          >
            <Text style={s.primaryText}>
              {failed ? t("common.retry") : t("support.ok")}
            </Text>
          </Pressable>
          {failed && (
            <Pressable onPress={onClose} hitSlop={6} style={s.secondary}>
              <Text style={s.secondaryText}>{t("common.close")}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
}

/** 엄지 든 한글몬 — 둥실 + 반짝이 */
function Mascot() {
  const theme = useTheme();
  const s = styles(theme);
  const reduceMotion = useReducedMotion();
  const bob = useSharedValue(0);
  useEffect(() => {
    if (reduceMotion) return;
    bob.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
  }, [bob, reduceMotion]);
  const bobStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -6 * bob.value }],
  }));
  return (
    <View style={s.mascotWrap}>
      <View style={s.mascotGlow} />
      {SPARKS.map((spark, i) => (
        <Spark key={i} {...spark} still={reduceMotion} />
      ))}
      <Animated.View style={bobStyle}>
        <Image source={MASCOT} style={s.mascot} resizeMode="contain" />
      </Animated.View>
    </View>
  );
}

function Spark({
  size,
  delay,
  still,
  ...pos
}: {
  size: number;
  delay: number;
  still: boolean;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}) {
  const v = useSharedValue(still ? 0.7 : 0);
  useEffect(() => {
    if (still) return;
    v.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 700, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 700, easing: Easing.in(Easing.quad) }),
          withTiming(0, { duration: 600 }),
        ),
        -1,
      ),
    );
  }, [v, delay, still]);
  const style = useAnimatedStyle(() => ({
    opacity: v.value,
    transform: [{ scale: 0.6 + v.value * 0.6 }],
  }));
  return (
    <Animated.View style={[{ position: "absolute", zIndex: 2 }, pos, style]}>
      <Ionicons name="sparkles" size={size} color="#FFC83D" />
    </Animated.View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 28,
    },
    card: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.surface,
      borderRadius: 28,
      paddingTop: 22,
      paddingBottom: 20,
      paddingHorizontal: 22,
      alignItems: "center",
    },
    mascotWrap: {
      width: 132,
      height: 132,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
    },
    mascotGlow: {
      position: "absolute",
      width: 112,
      height: 112,
      borderRadius: 56,
      backgroundColor: theme.primary + "1F",
    },
    mascot: { width: 118, height: 118 },
    failIcon: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: "#FF4B4B",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
      marginTop: 6,
    },
    limitIcon: { backgroundColor: "#E2A83A" },
    title: {
      fontSize: 21,
      fontWeight: "900",
      color: theme.text,
      textAlign: "center",
      marginBottom: 8,
    },
    body: {
      fontSize: 14.5,
      lineHeight: 21,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
      marginBottom: 16,
    },
    ticket: {
      alignSelf: "stretch",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: theme.bg,
      marginBottom: 18,
    },
    ticketChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 9,
      paddingVertical: 4,
      borderRadius: 999,
      backgroundColor: theme.primary + "1F",
    },
    ticketChipText: { fontSize: 11.5, fontWeight: "900", color: theme.primary },
    ticketSubject: { flex: 1, fontSize: 14, fontWeight: "800", color: theme.text },
    primary: {
      alignSelf: "stretch",
      alignItems: "center",
      paddingVertical: 15,
      borderRadius: 16,
      backgroundColor: theme.primary,
      borderBottomWidth: 4,
      borderBottomColor: "rgba(0,0,0,0.2)",
    },
    primaryPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
    primaryText: { color: "#fff", fontSize: 16, fontWeight: "900" },
    secondary: { paddingVertical: 12, marginTop: 4 },
    secondaryText: { fontSize: 15, fontWeight: "700", color: theme.textSecondary },
  });
