import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  FadeIn,
  ZoomIn,
  FadeInDown,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { PARTICLE_QUESTIONS, ParticleQ } from "@/mocks/arcade.mock";

const START_TIME = 45;
const MAX_TIME = 60;
const BONUS = 2;
const PENALTY = 4;

export default function ParticleRushScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.top, insets.bottom);

  const pool = useMemo(
    () => [...PARTICLE_QUESTIONS].sort(() => Math.random() - 0.5),
    [],
  );
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [solved, setSolved] = useState(0);
  const [timeLeft, setTimeLeft] = useState(START_TIME);
  const [over, setOver] = useState(false);
  const [flash, setFlash] = useState<"ok" | "no" | null>(null);
  const lockRef = useRef(false);

  const q: ParticleQ = pool[qIdx % pool.length];
  const lang = (i18n.language ?? "uz").slice(0, 2);
  const hint = lang === "ru" ? q.ru : lang === "en" ? q.en : q.uz;
  const [before, after] = q.sentence.split("___");

  const timeSv = useSharedValue(START_TIME / MAX_TIME);
  const shakeX = useSharedValue(0);
  const barStyle = useAnimatedStyle(() => ({
    width: `${timeSv.value * 100}%`,
    backgroundColor:
      timeSv.value < 0.2
        ? "#FF4B4B"
        : timeSv.value < 0.45
          ? "#FF9600"
          : "#1CB454",
  }));
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  // 1초 타이머
  useEffect(() => {
    if (over) return;
    const id = setInterval(() => {
      setTimeLeft((tl) => {
        const next = tl - 1;
        timeSv.value = withTiming(Math.max(next, 0) / MAX_TIME, {
          duration: 900,
        });
        if (next <= 0) {
          clearInterval(id);
          setOver(true);
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [over]);

  const nextQ = useCallback(() => {
    setFlash(null);
    setQIdx((i) => i + 1);
    lockRef.current = false;
  }, []);

  const pick = (opt: string) => {
    if (lockRef.current || over) return;
    lockRef.current = true;

    if (opt === q.answer) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setFlash("ok");
      const nc = combo + 1;
      setCombo(nc);
      setSolved((n) => n + 1);
      setScore((sc) => sc + 100 + Math.min(nc, 10) * 10);
      setTimeLeft((tl) => {
        const next = Math.min(tl + BONUS, MAX_TIME);
        timeSv.value = withTiming(next / MAX_TIME, { duration: 250 });
        return next;
      });
      setTimeout(nextQ, 300);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setFlash("no");
      setCombo(0);
      shakeX.value = withSequence(
        withTiming(-7, { duration: 45 }),
        withTiming(7, { duration: 45 }),
        withTiming(-5, { duration: 45 }),
        withTiming(0, { duration: 45 }),
      );
      setTimeLeft((tl) => {
        const next = Math.max(tl - PENALTY, 0);
        timeSv.value = withTiming(next / MAX_TIME, { duration: 250 });
        if (next <= 0) setOver(true);
        return next;
      });
      setTimeout(nextQ, 550);
    }
  };

  const restart = () => {
    setQIdx(0);
    setScore(0);
    setCombo(0);
    setSolved(0);
    setTimeLeft(START_TIME);
    timeSv.value = START_TIME / MAX_TIME;
    setOver(false);
    setFlash(null);
    lockRef.current = false;
  };

  const exit = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  return (
    <View style={s.container}>
      {/* 헤더 + 타임바 */}
      <View style={s.header}>
        <TouchableOpacity onPress={exit} hitSlop={10}>
          <Ionicons name="close" size={26} color={theme.textSecondary} />
        </TouchableOpacity>
        <Text style={s.scoreText}>{score}</Text>
        <View style={s.timeNum}>
          <Ionicons name="flash" size={16} color="#FF9600" />
          <Text style={s.timeNumText}>{timeLeft}s</Text>
        </View>
      </View>
      <View style={s.barTrack}>
        <Animated.View style={[s.barFill, barStyle]} />
      </View>

      {combo >= 2 ? (
        <Text style={s.comboText}>🔥 x{combo}</Text>
      ) : (
        <Text style={s.comboText}> </Text>
      )}

      {/* 문제 카드 */}
      <View style={s.body}>
        <Animated.View
          key={qIdx}
          entering={FadeInDown.duration(220)}
          style={[
            s.qCard,
            flash === "ok" && s.qCardOk,
            flash === "no" && s.qCardNo,
            shakeStyle,
          ]}
        >
          <View style={s.sentenceRow}>
            <Text style={s.sentence}>{before}</Text>
            <View
              style={[
                s.blank,
                flash === "ok" && { borderColor: "#1CB454" },
                flash === "no" && { borderColor: "#FF4B4B" },
              ]}
            >
              <Text style={s.blankText}>{flash === "ok" ? q.answer : "?"}</Text>
            </View>
            <Text style={s.sentence}>{after}</Text>
          </View>
          <Text style={s.hint}>{hint}</Text>
        </Animated.View>

        {/* 조사 버튼 — 엄지 존 */}
        <View style={s.options}>
          {q.options.map((opt) => (
            <TouchableOpacity
              key={`${qIdx}-${opt}`}
              style={s.optBtn}
              activeOpacity={0.85}
              onPress={() => pick(opt)}
              disabled={over}
            >
              <Text style={s.optText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 종료 */}
      {over ? (
        <Animated.View entering={FadeIn.duration(250)} style={s.overlay}>
          <Animated.View entering={ZoomIn.duration(300)} style={s.endCard}>
            <Text style={s.endEmoji}>⚡</Text>
            <Text style={s.endTitle}>{t("arcade.gameOver")}</Text>
            <View style={s.endStats}>
              <View style={s.endStat}>
                <Text style={s.endStatNum}>{score}</Text>
                <Text style={s.endStatLabel}>{t("arcade.score")}</Text>
              </View>
              <View style={s.endStat}>
                <Text style={s.endStatNum}>{solved}</Text>
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

const styles = (theme: ThemeColors, top = 0, bottom = 0) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingTop: top + 8 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    scoreText: { fontSize: 20, fontWeight: "800", color: theme.text },
    timeNum: { flexDirection: "row", alignItems: "center", gap: 4 },
    timeNumText: { fontSize: 16, fontWeight: "800", color: theme.text },
    barTrack: {
      height: 12,
      borderRadius: 6,
      backgroundColor: theme.border,
      marginHorizontal: 20,
      overflow: "hidden",
    },
    barFill: { height: "100%", borderRadius: 6 },
    comboText: {
      textAlign: "center",
      fontSize: 15,
      fontWeight: "800",
      color: "#FF9600",
      marginTop: 10,
    },
    body: { flex: 1, paddingHorizontal: 20, justifyContent: "center" },
    qCard: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 5,
      borderRadius: 22,
      padding: 24,
      alignItems: "center",
      marginBottom: 28,
    },
    qCardOk: { borderColor: "#1CB454" },
    qCardNo: { borderColor: "#FF4B4B" },
    sentenceRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    },
    sentence: { fontSize: 24, fontWeight: "800", color: theme.text },
    blank: {
      minWidth: 52,
      borderBottomWidth: 3,
      borderColor: theme.primary,
      alignItems: "center",
      marginHorizontal: 6,
      paddingBottom: 2,
    },
    blankText: { fontSize: 24, fontWeight: "800", color: theme.primary },
    hint: {
      marginTop: 14,
      fontSize: 15,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
    },
    options: {
      flexDirection: "row",
      gap: 12,
      justifyContent: "center",
      paddingBottom: bottom + 8,
    },
    optBtn: {
      flex: 1,
      maxWidth: 110,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 5,
      borderRadius: 18,
      paddingVertical: 20,
      alignItems: "center",
    },
    optText: { fontSize: 24, fontWeight: "800", color: theme.primary },
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
    endStats: { flexDirection: "row", gap: 28, marginBottom: 22 },
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
