import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  runOnJS,
  FadeIn,
  ZoomIn,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { ARCADE_WORDS, meaningOf } from "@/mocks/arcade.mock";

const GAME_SECONDS = 60;
const SWIPE_TH = 110;
const FEVER_AT = 5;

interface JudgeCard {
  ko: string;
  shown: string;
  isTrue: boolean;
}

function makeDeck(lang: string): JudgeCard[] {
  const shuffled = [...ARCADE_WORDS].sort(() => Math.random() - 0.5);
  return shuffled.map((w) => {
    const isTrue = Math.random() < 0.5;
    let shown = meaningOf(w, lang);
    if (!isTrue) {
      const other = ARCADE_WORDS.filter((x) => x.id !== w.id)[
        Math.floor(Math.random() * (ARCADE_WORDS.length - 1))
      ];
      shown = meaningOf(other, lang);
    }
    return { ko: w.ko, shown, isTrue };
  });
}

export default function SwipeJudgeScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [deck, setDeck] = useState<JudgeCard[]>(() => makeDeck(i18n.language));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [over, setOver] = useState(false);

  const fever = combo >= FEVER_AT;
  const s = styles(theme, insets.top, insets.bottom, fever);

  const tx = useSharedValue(0);
  const lockRef = useRef(false);

  // 타이머
  useEffect(() => {
    if (over) return;
    const id = setInterval(() => {
      setTimeLeft((tl) => {
        if (tl <= 1) {
          clearInterval(id);
          setOver(true);
          return 0;
        }
        return tl - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [over]);

  const advance = useCallback(() => {
    setIdx((i) => {
      const next = i + 1;
      if (next >= deck.length) {
        setDeck(makeDeck(i18n.language));
        return 0;
      }
      return next;
    });
    tx.value = 0;
    lockRef.current = false;
  }, [deck.length, i18n.language]);

  const judge = useCallback(
    (saidTrue: boolean) => {
      const card = deck[idx];
      if (!card) return;
      const ok = saidTrue === card.isTrue;
      setTotal((n) => n + 1);
      if (ok) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setCorrect((n) => n + 1);
        setCombo((c) => c + 1);
        setScore((sc) => sc + (combo + 1 >= FEVER_AT ? 20 : 10));
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setCombo(0);
      }
      setTimeout(advance, 160);
    },
    [deck, idx, combo, advance],
  );

  const flingOut = useCallback(
    (dir: 1 | -1) => {
      "worklet";
      tx.value = withTiming(dir * 520, { duration: 200 });
      runOnJS(judge)(dir === 1);
    },
    [judge],
  );

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (lockRef.current) return;
      tx.value = e.translationX;
    })
    .onEnd(() => {
      if (Math.abs(tx.value) > SWIPE_TH) {
        lockRef.current = true;
        flingOut(tx.value > 0 ? 1 : -1);
      } else {
        tx.value = withSpring(0, { damping: 15 });
      }
    })
    .enabled(!over);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { rotate: `${interpolate(tx.value, [-250, 250], [-14, 14])}deg` },
    ],
  }));
  const trueStamp = useAnimatedStyle(() => ({
    opacity: interpolate(tx.value, [30, SWIPE_TH], [0, 1]),
  }));
  const falseStamp = useAnimatedStyle(() => ({
    opacity: interpolate(tx.value, [-30, -SWIPE_TH], [0, 1]),
  }));
  const nextStyle = useAnimatedStyle(() => {
    const p = Math.min(Math.abs(tx.value) / SWIPE_TH, 1);
    return { transform: [{ scale: 0.94 + p * 0.06 }], opacity: 0.6 + p * 0.4 };
  });

  const restart = () => {
    setDeck(makeDeck(i18n.language));
    setIdx(0);
    setScore(0);
    setCombo(0);
    setCorrect(0);
    setTotal(0);
    setTimeLeft(GAME_SECONDS);
    setOver(false);
    tx.value = 0;
    lockRef.current = false;
  };

  const exit = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  const card = deck[idx];
  const nextCard = deck[(idx + 1) % deck.length];
  const acc = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <View style={s.container}>
      {/* 헤더 */}
      <View style={s.header}>
        <TouchableOpacity onPress={exit} hitSlop={10}>
          <Ionicons name="close" size={26} color={theme.textSecondary} />
        </TouchableOpacity>
        <View style={s.timerPill}>
          <Ionicons name="time" size={16} color="#fff" />
          <Text style={s.timerText}>{timeLeft}s</Text>
        </View>
        <Text style={s.scoreText}>{score}</Text>
      </View>

      {fever ? (
        <Animated.Text entering={ZoomIn.duration(200)} style={s.feverText}>
          ⚡ {t("arcade.fever")} x2
        </Animated.Text>
      ) : combo >= 2 ? (
        <Text style={s.comboText}>🔥 x{combo}</Text>
      ) : (
        <Text style={s.comboText}> </Text>
      )}

      {/* 카드 스택 */}
      <View style={s.deckArea}>
        {nextCard ? (
          <Animated.View style={[s.card, s.cardBehind, nextStyle]}>
            <Text style={s.cardKo}>{nextCard.ko}</Text>
          </Animated.View>
        ) : null}

        {card && !over ? (
          <GestureDetector gesture={pan}>
            <Animated.View style={[s.card, cardStyle]}>
              <Animated.View style={[s.stamp, s.stampTrue, trueStamp]}>
                <Text style={s.stampText}>O</Text>
              </Animated.View>
              <Animated.View style={[s.stamp, s.stampFalse, falseStamp]}>
                <Text style={[s.stampText, { color: "#FF4B4B" }]}>X</Text>
              </Animated.View>

              <Text style={s.cardKo}>{card.ko}</Text>
              <View style={s.eqLine} />
              <Text style={s.cardMeaning}>{card.shown}</Text>
            </Animated.View>
          </GestureDetector>
        ) : null}
      </View>

      {/* 방향 힌트 */}
      <View style={s.hintRow}>
        <View style={s.hintItem}>
          <Ionicons name="arrow-back" size={18} color="#FF4B4B" />
          <Text style={[s.hintText, { color: "#FF4B4B" }]}>
            {t("arcade.swipeWrong")}
          </Text>
        </View>
        <View style={s.hintItem}>
          <Text style={[s.hintText, { color: "#1CB454" }]}>
            {t("arcade.swipeRight")}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#1CB454" />
        </View>
      </View>

      {/* 종료 */}
      {over ? (
        <Animated.View entering={FadeIn.duration(250)} style={s.overlay}>
          <Animated.View entering={ZoomIn.duration(300)} style={s.endCard}>
            <Text style={s.endEmoji}>🃏</Text>
            <Text style={s.endTitle}>{t("arcade.gameOver")}</Text>
            <View style={s.endStats}>
              <View style={s.endStat}>
                <Text style={s.endStatNum}>{score}</Text>
                <Text style={s.endStatLabel}>{t("arcade.score")}</Text>
              </View>
              <View style={s.endStat}>
                <Text style={s.endStatNum}>{acc}%</Text>
                <Text style={s.endStatLabel}>{t("arcade.accuracy")}</Text>
              </View>
              <View style={s.endStat}>
                <Text style={s.endStatNum}>{correct}</Text>
                <Text style={s.endStatLabel}>{t("arcade.correctCount")}</Text>
              </View>
            </View>
            <TouchableOpacity style={s.againBtn} onPress={restart}>
              <Text style={s.againText}>{t("arcade.playAgain")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.exitBtn} onPress={exit}>
              <Text style={s.exitText}>{t("arcade.exit")}</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = (theme: ThemeColors, top = 0, bottom = 0, fever = false) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: fever ? "#2A2440" : theme.bg,
      paddingTop: top + 8,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },
    timerPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: theme.primary,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderBottomWidth: 3,
      borderBottomColor: "#5B52C7",
    },
    timerText: { color: "#fff", fontSize: 16, fontWeight: "800" },
    scoreText: {
      fontSize: 20,
      fontWeight: "800",
      color: fever ? "#FFD700" : theme.text,
      minWidth: 40,
      textAlign: "right",
    },
    feverText: {
      textAlign: "center",
      fontSize: 17,
      fontWeight: "800",
      color: "#FFD700",
      marginTop: 8,
    },
    comboText: {
      textAlign: "center",
      fontSize: 15,
      fontWeight: "800",
      color: "#FF9600",
      marginTop: 8,
    },
    deckArea: { flex: 1, alignItems: "center", justifyContent: "center" },
    card: {
      position: "absolute",
      width: "80%",
      aspectRatio: 0.82,
      backgroundColor: theme.surface,
      borderRadius: 26,
      borderWidth: 2,
      borderColor: fever ? "#FFD700" : theme.border,
      borderBottomWidth: 6,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    cardBehind: { borderBottomWidth: 2 },
    cardKo: { fontSize: 40, fontWeight: "800", color: theme.text },
    eqLine: {
      width: 46,
      height: 3,
      borderRadius: 2,
      backgroundColor: theme.primary,
      marginVertical: 18,
    },
    cardMeaning: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.textSecondary,
      textAlign: "center",
    },
    stamp: {
      position: "absolute",
      top: 22,
      borderWidth: 4,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 4,
    },
    stampTrue: {
      left: 20,
      borderColor: "#1CB454",
      transform: [{ rotate: "-14deg" }],
    },
    stampFalse: {
      right: 20,
      borderColor: "#FF4B4B",
      transform: [{ rotate: "14deg" }],
    },
    stampText: { fontSize: 30, fontWeight: "900", color: "#1CB454" },
    hintRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 28,
      paddingBottom: bottom + 20,
    },
    hintItem: { flexDirection: "row", alignItems: "center", gap: 6 },
    hintText: { fontSize: 14, fontWeight: "800" },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#00000088",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
    },
    endCard: {
      width: "84%",
      backgroundColor: theme.surface,
      borderRadius: 24,
      padding: 24,
      alignItems: "center",
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 5,
    },
    endEmoji: { fontSize: 44, marginBottom: 6 },
    endTitle: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 18,
    },
    endStats: { flexDirection: "row", gap: 24, marginBottom: 22 },
    endStat: { alignItems: "center" },
    endStatNum: { fontSize: 22, fontWeight: "800", color: theme.primary },
    endStatLabel: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.textSecondary,
      marginTop: 2,
    },
    againBtn: {
      alignSelf: "stretch",
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 15,
      alignItems: "center",
      borderBottomWidth: 4,
      borderBottomColor: "#5B52C7",
    },
    againText: { color: "#fff", fontSize: 16, fontWeight: "800" },
    exitBtn: { paddingVertical: 14 },
    exitText: {
      color: theme.textSecondary,
      fontSize: 15,
      fontWeight: "700",
    },
  });
