import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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
import {
  CenteredModal,
  DialogButton,
  DialogIcon,
  useDialogTheme,
} from "@/components/common/CenteredModal";
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

export default function SupportResultModal({
  result,
  onClose,
  onRetry,
}: Props) {
  const { t } = useTranslation();
  const theme = useDialogTheme();
  const s = styles(theme);
  const sent = result?.kind === "sent";
  const failed = result?.kind === "failed";
  const kind = result?.kind ?? "sent";

  return (
    <CenteredModal visible={!!result} onClose={onClose}>
      {sent ? (
        <Mascot />
      ) : (
        <DialogIcon
          name={kind === "limit" ? "hourglass" : "cloud-offline"}
          tone={kind === "limit" ? "warning" : "danger"}
        />
      )}

      <Text style={s.title}>{t(`support.${kind}Title`)}</Text>
      <Text style={s.body}>
        {t(`support.${kind}Body`, { n: SUPPORT_LIMITS.perDay })}
      </Text>

      {result?.kind === "sent" && (
        <View style={s.ticket}>
          <View style={[s.ticketChip, { backgroundColor: theme.wash }]}>
            <Ionicons
              name={SUPPORT_CATEGORY_LOOK[result.category].icon}
              size={12}
              color={theme.primary}
            />
            <Text style={[s.ticketChipText, { color: theme.primary }]}>
              {t(`support.category.${result.category}`)}
            </Text>
          </View>
          <Text style={s.ticketSubject} numberOfLines={1}>
            {result.subject}
          </Text>
          <Ionicons name="checkmark-circle" size={17} color={theme.success} />
        </View>
      )}

      <DialogButton
        onPress={failed ? onRetry : onClose}
        label={failed ? t("common.retry") : t("support.ok")}
      />
      {failed && (
        <DialogButton
          onPress={onClose}
          label={t("common.close")}
          variant="secondary"
          style={s.secondary}
        />
      )}
    </CenteredModal>
  );
}

/** 엄지 든 한글몬 — 둥실 + 반짝이 */
function Mascot() {
  const theme = useDialogTheme();
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
    title: {
      fontSize: 24,
      fontWeight: "800",
      lineHeight: 30,
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
    ticketSubject: {
      flex: 1,
      fontSize: 14,
      fontWeight: "800",
      color: theme.text,
    },
    secondary: { marginTop: 6 },
  });
