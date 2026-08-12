import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useSpeech } from "@/hooks/useSpeech";
import { ARCADE_WORDS } from "@/mocks/arcade.mock";
import { WordPair } from "@/mocks/match-game.mock";

const GRID = 9;
const MAX_HEARTS = 3;
const GAP_MS = 950;
type Phase = "listen" | "input" | "between";

export default function EchoChainScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.top, insets.bottom);
  const { speak, stop } = useSpeech();

  const gridWords = useMemo<WordPair[]>(
    () => [...ARCADE_WORDS].sort(() => Math.random() - 0.5).slice(0, GRID),
    [],
  );

  const [round, setRound] = useState(1);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<Phase>("between");
  const [seq, setSeq] = useState<number[]>([]);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const [tapFlash, setTapFlash] = useState<{ i: number; ok: boolean } | null>(
    null,
  );
  const [over, setOver] = useState(false);

  const inputPos = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const playSequence = useCallback(
    (sequence: number[]) => {
      setPhase("listen");
      setPlayingIdx(null);
      sequence.forEach((gi, i) => {
        timers.current.push(
          setTimeout(
            () => {
              setPlayingIdx(gi);
              speak(gridWords[gi].ko);
            },
            400 + i * GAP_MS,
          ),
        );
      });
      timers.current.push(
        setTimeout(
          () => {
            setPlayingIdx(null);
            inputPos.current = 0;
            setPhase("input");
          },
          400 + sequence.length * GAP_MS,
        ),
      );
    },
    [gridWords, speak],
  );

  const startRound = useCallback(
    (r: number) => {
      const len = r + 1; // 라운드1 = 2단어
      const sequence = Array.from({ length: len }, () =>
        Math.floor(Math.random() * GRID),
      );
      setSeq(sequence);
      playSequence(sequence);
    },
    [playSequence],
  );

  useEffect(() => {
    const id = setTimeout(() => startRound(1), 500);
    return () => {
      clearTimeout(id);
      clearTimers();
      stop();
    };
  }, []);

  const tapCard = (gi: number) => {
    if (phase !== "input" || over) return;
    const expect = seq[inputPos.current];

    if (gi === expect) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      speak(gridWords[gi].ko);
      setTapFlash({ i: gi, ok: true });
      setTimeout(() => setTapFlash(null), 250);
      inputPos.current += 1;

      if (inputPos.current >= seq.length) {
        // 라운드 클리어
        setPhase("between");
        setScore((sc) => sc + round * 20);
        const nextRound = round + 1;
        setRound(nextRound);
        timers.current.push(setTimeout(() => startRound(nextRound), 1100));
      }
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setTapFlash({ i: gi, ok: false });
      setTimeout(() => setTapFlash(null), 400);
      setPhase("between");
      setHearts((h) => {
        const next = h - 1;
        if (next <= 0) {
          setOver(true);
        } else {
          // 같은 길이로 새 시퀀스 재도전
          timers.current.push(setTimeout(() => startRound(round), 900));
        }
        return next;
      });
    }
  };

  const restart = () => {
    clearTimers();
    stop();
    setRound(1);
    setHearts(MAX_HEARTS);
    setScore(0);
    setOver(false);
    setPhase("between");
    inputPos.current = 0;
    setTimeout(() => startRound(1), 400);
  };

  const exit = () => {
    clearTimers();
    stop();
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  return (
    <View style={s.container}>
      {/* 헤더 */}
      <View style={s.header}>
        <TouchableOpacity onPress={exit} hitSlop={10}>
          <Ionicons name="close" size={26} color={theme.textSecondary} />
        </TouchableOpacity>
        <View style={s.roundPill}>
          <Text style={s.roundText}>
            {t("arcade.round")} {round}
          </Text>
        </View>
        <View style={s.heartsRow}>
          {Array.from({ length: MAX_HEARTS }).map((_, i) => (
            <Ionicons
              key={i}
              name={i < hearts ? "heart" : "heart-outline"}
              size={20}
              color="#FF4B6B"
            />
          ))}
        </View>
      </View>

      {/* 상태 안내 */}
      <View style={s.statusBox}>
        {phase === "listen" ? (
          <>
            <Ionicons name="volume-high" size={22} color={theme.primary} />
            <Text style={s.statusText}>{t("arcade.listenCarefully")}</Text>
          </>
        ) : phase === "input" ? (
          <>
            <Ionicons name="hand-left" size={22} color="#1CB454" />
            <Text style={[s.statusText, { color: "#1CB454" }]}>
              {t("arcade.yourTurn")} ({inputPos.current + 1}/{seq.length})
            </Text>
          </>
        ) : (
          <Text style={s.statusText}> </Text>
        )}
      </View>

      <Text style={s.scoreBig}>{score}</Text>

      {/* 3x3 그리드 */}
      <View style={s.grid}>
        {gridWords.map((w, gi) => {
          const playing = playingIdx === gi;
          const flash = tapFlash?.i === gi ? tapFlash : null;
          return (
            <TouchableOpacity
              key={w.id}
              activeOpacity={0.8}
              onPress={() => tapCard(gi)}
              disabled={phase !== "input" || over}
              style={[
                s.cell,
                playing && s.cellPlaying,
                flash?.ok === true && s.cellOk,
                flash?.ok === false && s.cellNo,
                phase === "listen" && !playing && s.cellDim,
              ]}
            >
              <Text
                style={[
                  s.cellText,
                  playing && { color: "#fff" },
                  flash?.ok === true && { color: "#fff" },
                  flash?.ok === false && { color: "#fff" },
                ]}
              >
                {w.ko}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 종료 */}
      {over ? (
        <Animated.View entering={FadeIn.duration(250)} style={s.overlay}>
          <Animated.View entering={ZoomIn.duration(300)} style={s.endCard}>
            <Text style={s.endEmoji}>🔊</Text>
            <Text style={s.endTitle}>{t("arcade.gameOver")}</Text>
            <View style={s.endStats}>
              <View style={s.endStat}>
                <Text style={s.endStatNum}>{score}</Text>
                <Text style={s.endStatLabel}>{t("arcade.score")}</Text>
              </View>
              <View style={s.endStat}>
                <Text style={s.endStatNum}>{round}</Text>
                <Text style={s.endStatLabel}>{t("arcade.maxRound")}</Text>
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
    },
    roundPill: {
      backgroundColor: theme.primary,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderBottomWidth: 3,
      borderBottomColor: "#5B52C7",
    },
    roundText: { color: "#fff", fontSize: 15, fontWeight: "800" },
    heartsRow: { flexDirection: "row", gap: 3 },
    statusBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginTop: 18,
      height: 26,
    },
    statusText: { fontSize: 16, fontWeight: "800", color: theme.primary },
    scoreBig: {
      textAlign: "center",
      fontSize: 34,
      fontWeight: "800",
      color: theme.text,
      marginTop: 4,
      marginBottom: 10,
    },
    grid: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      paddingHorizontal: 16,
      paddingBottom: bottom + 16,
      gap: 10,
      alignContent: "center",
      justifyContent: "center",
    },
    cell: {
      width: "30%",
      aspectRatio: 1,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    cellPlaying: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
      borderBottomColor: "#5B52C7",
      transform: [{ scale: 1.05 }],
    },
    cellOk: { backgroundColor: "#1CB454", borderColor: "#1CB454" },
    cellNo: { backgroundColor: "#FF4B4B", borderColor: "#FF4B4B" },
    cellDim: { opacity: 0.55 },
    cellText: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
      textAlign: "center",
    },
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
