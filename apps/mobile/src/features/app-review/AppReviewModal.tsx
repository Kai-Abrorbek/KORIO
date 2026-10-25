import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Pressable } from "@/components/ui/Pressables";
import HaneulmonMascot, {
  type HaneulmonMood,
} from "@/components/home/HaneulmonMascot";
import Button3D from "@/features/retention/components/Button3D";
import { useTheme } from "@/hooks/useTheme";
import { useSound } from "@/hooks/useSound";
import type { ThemeColors } from "@/constants/theme";
import { ApiError } from "@/services/api";
import { AppReviewService } from "@/services/app-review.service";
import * as Haptics from "@/utils/haptics";
import HaneulmonBow, { BOW_BOTTOM_AT, BOW_CHEER_AT } from "./HaneulmonBow";

const COMMENT_MAX = 1000;
const STAR_DEPTH = 3;
const GOLD = "#FFD900";
const GOLD_DEPTH = "#E5AE00";

/** 별점에 따라 하늘몬 표정이 바뀐다 — 0 은 아직 안 고름 */
const MOOD_BY_RATING: HaneulmonMood[] = [
  "thinking",
  "wrong",
  "confused",
  "shy",
  "great",
  "celebrating",
];

/** 기뻐하는 모습을 잠깐 보여 주고 상자로 */
const DONE_AT = BOW_CHEER_AT + 700;

export interface AppReviewModalProps {
  visible: boolean;
  reward: number;
  /** "닫기" — 다음 실행에 다시 */
  onClose: () => void;
  /** "하루 동안 보지 않기" */
  onSnooze: () => void;
  /** 이미 이번 주에 평가했다 (다른 기기 등) — 조용히 닫는다 */
  onAlready: () => void;
  /** 감사 연출까지 끝났다 — 부모가 닫고 상자 화면으로 보낸다 */
  onDone: (res: { reward: number; gems: number }) => void;
}

/**
 * 앱 평가 — 가운데 뜨는 대화상자. 하지 않아도 된다 (닫기·하루 동안 보지 않기).
 *
 * 열림/닫힘은 RewardDialog 처럼 Modal 기본 페이드 하나만 쓴다 (2026-10-06 규칙).
 * 카드와 버튼은 열릴 때 움직이지 않는다. 움직이는 건 유저가 누른 별과,
 * 보낸 뒤의 감사 연출(하늘몬이 걸어 나와 고개 숙여 인사 — HaneulmonBow)뿐이다.
 */
export default function AppReviewModal({
  visible,
  reward,
  onClose,
  onSnooze,
  onAlready,
  onDone,
}: AppReviewModalProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const { play } = useSound();
  const reducedMotion = useReducedMotion();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thanks, setThanks] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // 다시 열리면 처음부터 (같은 실행에서 다시 열릴 일은 드물지만)
  useEffect(() => {
    if (!visible) return;
    setRating(0);
    setComment("");
    setError(null);
    setThanks(false);
  }, [visible]);

  // ── 감사 연출 값 (하늘몬 움직임은 HaneulmonBow 가 맡는다) ──
  const formFade = useSharedValue(1);
  const words = useSharedValue(0); // "감사합니다" 팝

  const formStyle = useAnimatedStyle(() => ({ opacity: formFade.value }));
  const wordsStyle = useAnimatedStyle(() => ({
    opacity: words.value,
    transform: [{ scale: 0.7 + words.value * 0.3 }],
  }));

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const playThanks = (res: { reward: number; gems: number }) => {
    setThanks(true);
    formFade.value = withTiming(0, { duration: 200 });

    if (reducedMotion) {
      words.value = 1;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
      later(() => onDone(res), 1600);
      return;
    }

    // 다 숙였을 때 "감사합니다" — 일어나서 기뻐할 때 딩
    later(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }, BOW_BOTTOM_AT);
    words.value = withDelay(BOW_BOTTOM_AT - 120, withSpring(1, { damping: 9 }));
    later(() => {
      play("correct");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
    }, BOW_CHEER_AT);
    later(() => onDone(res), DONE_AT);
  };

  const submit = async () => {
    if (!rating || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await AppReviewService.submit({
        rating,
        comment: comment.trim() || undefined,
      });
      playThanks(res);
    } catch (e) {
      if (e instanceof ApiError && e.code === "APP_REVIEW_ALREADY") {
        setError(t("appReview.already"));
        later(onAlready, 1400);
      } else {
        setError(t("appReview.error"));
      }
    } finally {
      setSending(false);
    }
  };

  const busy = sending || thanks;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => !busy && onClose()}
    >
      <GestureHandlerRootView style={s.root}>
        <View style={[StyleSheet.absoluteFill, s.backdrop]} />
        <View pointerEvents="none" style={s.glow} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={s.center}
        >
          <View style={s.card}>
            <Animated.View
              style={formStyle}
              pointerEvents={thanks ? "none" : "auto"}
            >
              <View style={s.peek}>
                <View style={s.halo} />
                <HaneulmonMascot size={108} mood={MOOD_BY_RATING[rating]} />
              </View>

              <View style={s.gift}>
                <Ionicons name="diamond" size={14} color="#5CD0F0" />
                <Text style={s.giftText}>
                  {t("appReview.reward", { n: reward })}
                </Text>
              </View>

              <Text style={s.title}>{t("appReview.title")}</Text>
              <Text style={s.body}>{t("appReview.body")}</Text>

              <View style={s.stars} accessibilityRole="adjustable">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    n={n}
                    on={n <= rating}
                    picked={n === rating}
                    theme={theme}
                    label={t(`appReview.rating${n}`)}
                    onPress={() => {
                      setRating(n);
                      setError(null);
                    }}
                  />
                ))}
              </View>
              <Text style={[s.rateLabel, !rating && s.rateHint]}>
                {rating
                  ? t(`appReview.rating${rating}`)
                  : t("appReview.rateHint")}
              </Text>

              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder={t(
                  rating && rating <= 3
                    ? "appReview.placeholderLow"
                    : "appReview.placeholderHigh",
                )}
                placeholderTextColor={theme.textSecondary + "B3"}
                multiline
                maxLength={COMMENT_MAX}
                textAlignVertical="top"
                editable={!busy}
                style={s.input}
              />
              {comment.length > COMMENT_MAX - 100 ? (
                <Text style={s.counter}>
                  {comment.length}/{COMMENT_MAX}
                </Text>
              ) : null}

              {error ? <Text style={s.error}>{error}</Text> : null}

              <Button3D
                label={t("appReview.submit", { n: reward })}
                onPress={submit}
                disabled={!rating || thanks}
                loading={sending}
                style={s.submit}
              />

              <View style={s.footer}>
                <Pressable
                  onPress={onSnooze}
                  disabled={busy}
                  hitSlop={10}
                  style={s.footBtn}
                >
                  <Text style={s.footText} numberOfLines={2}>
                    {t("appReview.later")}
                  </Text>
                </Pressable>
                <View style={s.footDivider} />
                <Pressable
                  onPress={onClose}
                  disabled={busy}
                  hitSlop={10}
                  style={s.footBtn}
                >
                  <Text style={s.footText} numberOfLines={2}>
                    {t("appReview.close")}
                  </Text>
                </Pressable>
              </View>
            </Animated.View>

            {thanks ? (
              <View style={s.stage} pointerEvents="none">
                <HaneulmonBow size={160} reducedMotion={reducedMotion} />
                <Animated.View style={[s.words, wordsStyle]}>
                  <Text style={s.hangul}>감사합니다</Text>
                  <Text style={s.thanksSub}>{t("appReview.thanks")}</Text>
                </Animated.View>
              </View>
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </Modal>
  );
}

/** 별 하나 — 누르면 슬랩만큼 내려앉고, 고른 별은 한 번 톡 튄다 */
function Star({
  n,
  on,
  picked,
  theme,
  label,
  onPress,
}: {
  n: number;
  on: boolean;
  picked: boolean;
  theme: ThemeColors;
  label: string;
  onPress: () => void;
}) {
  const pop = useSharedValue(1);
  useEffect(() => {
    if (!picked) return;
    pop.value = withSequence(
      withTiming(1.22, { duration: 90, easing: Easing.out(Easing.quad) }),
      withSpring(1, { damping: 8, stiffness: 260 }),
    );
  }, [picked, pop]);
  const popStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pop.value }],
  }));

  const dark = theme.bg !== "#ffffff";
  const face = on ? GOLD : theme.border;
  const depth = on ? GOLD_DEPTH : dark ? "#2E2E37" : "#D6D2EC";

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        onPress();
      }}
      hitSlop={4}
      accessibilityRole="button"
      accessibilityLabel={`${n} — ${label}`}
      accessibilityState={{ selected: on }}
    >
      {({ pressed }) => (
        <Animated.View style={[starStyles.box, popStyle]}>
          <Ionicons
            name="star"
            size={40}
            color={depth}
            style={[starStyles.layer, { top: STAR_DEPTH }]}
          />
          <Ionicons
            name="star"
            size={40}
            color={face}
            style={[starStyles.layer, { top: pressed ? STAR_DEPTH : 0 }]}
          />
        </Animated.View>
      )}
    </Pressable>
  );
}

const starStyles = StyleSheet.create({
  box: { width: 44, height: 40 + STAR_DEPTH, alignItems: "center" },
  layer: { position: "absolute" },
});

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    root: { flex: 1 },
    // 흐린 배경 대신 보라빛이 도는 짙은 막 — 홈이 은은하게 비친다
    backdrop: { backgroundColor: "rgba(16, 11, 44, 0.74)" },
    glow: {
      position: "absolute",
      alignSelf: "center",
      top: "18%",
      width: 360,
      height: 360,
      borderRadius: 180,
      backgroundColor: "#9D8DFF",
      opacity: 0.16,
    },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    card: {
      width: "88%",
      maxWidth: 380,
      backgroundColor: theme.surface,
      borderRadius: 28,
      paddingTop: 62,
      paddingHorizontal: 20,
      paddingBottom: 14,
      borderWidth: 1,
      borderColor: theme.border,
    },
    peek: {
      position: "absolute",
      top: -122,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    halo: {
      position: "absolute",
      width: 148,
      height: 148,
      borderRadius: 74,
      backgroundColor: "#9D8DFF",
      opacity: 0.35,
    },
    gift: {
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingVertical: 5,
      paddingHorizontal: 12,
      borderRadius: 999,
      backgroundColor: "#FFF1C7",
      borderWidth: 1,
      borderColor: "#FFE38A",
    },
    giftText: { fontSize: 12.5, fontWeight: "900", color: "#9A6A00" },
    title: {
      marginTop: 12,
      fontSize: 22,
      fontWeight: "900",
      color: theme.text,
      textAlign: "center",
      lineHeight: 28,
      letterSpacing: -0.3,
    },
    body: {
      marginTop: 6,
      fontSize: 14,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 20,
    },
    stars: {
      marginTop: 18,
      flexDirection: "row",
      justifyContent: "center",
      gap: 6,
    },
    rateLabel: {
      marginTop: 8,
      minHeight: 18,
      fontSize: 13.5,
      fontWeight: "900",
      color: theme.primary,
      textAlign: "center",
    },
    rateHint: { color: theme.textSecondary, fontWeight: "700" },
    input: {
      marginTop: 14,
      minHeight: 84,
      maxHeight: 140,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: theme.bg,
      paddingHorizontal: 14,
      paddingTop: 12,
      paddingBottom: 12,
      fontSize: 14.5,
      fontWeight: "700",
      color: theme.text,
      lineHeight: 20,
    },
    counter: {
      marginTop: 4,
      alignSelf: "flex-end",
      fontSize: 11,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    error: {
      marginTop: 10,
      fontSize: 13,
      fontWeight: "800",
      color: "#FF4B4B",
      textAlign: "center",
    },
    submit: { marginTop: 14 },
    footer: {
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    footBtn: { flex: 1, paddingVertical: 8, alignItems: "center" },
    footText: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.textSecondary,
      textAlign: "center",
    },
    footDivider: { width: 1, height: 14, backgroundColor: theme.border },
    stage: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 40,
    },
    words: { marginTop: 12, alignItems: "center", paddingHorizontal: 12 },
    hangul: {
      fontSize: 40,
      fontWeight: "900",
      color: theme.primary,
      letterSpacing: -0.5,
    },
    thanksSub: {
      marginTop: 6,
      fontSize: 15,
      fontWeight: "800",
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 21,
    },
  });
