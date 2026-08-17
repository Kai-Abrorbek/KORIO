import { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "@/utils/haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  cancelAnimation,
  Easing,
  type SharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { useHangulReporter } from "@/hooks/useHangulReporter";
import { jamoToCharacterId } from "@/utils/hangul-jamo";
import { ThemeColors } from "@/constants/theme";
import {
  generateTarget,
  buildReel,
  reelSpeed,
  comboMultiplier,
  REEL_POOLS,
  JamoTarget,
} from "@/mocks/jamo-slot.mock";

const ITEM_H = 66; // 릴 한 칸 높이 (창이 3칸이라 너무 크면 화면을 넘는다)
const REEL_LEN = 8; // 릴에 얹는 낱자 수
const LIVES = 3;
/** 터치가 핸들러까지 오는 지연. 이만큼 되감아서 판정한다. */
const INPUT_LAG_MS = 110;

type Phase = "ready" | "spinning" | "resolved" | "ended";

interface Props {
  onExit: () => void;
  onFinish?: (score: number, best: number) => void;
}

/** 릴 하나 — 무한 스크롤하다가 멈추면 가장 가까운 칸에 스냅 */
function Reel({
  items,
  offset,
  locked,
  wrong,
  theme,
}: {
  items: string[];
  offset: SharedValue<number>;
  locked: boolean;
  wrong: boolean;
  theme: ThemeColors;
}) {
  const s = getStyles(theme);
  // 끊김 없이 도는 것처럼 보이게 세 벌 이어붙임 (위·가운데·아래 칸을 다 채워야 함)
  const strip = useMemo(() => [...items, ...items, ...items], [items]);

  // 가운데 칸이 판정 위치. 위로 한 칸 밀어서 이전 글자가 보이게 한다.
  const stripStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: ITEM_H - (offset.value % items.length) * ITEM_H },
    ],
  }));

  return (
    <View style={[s.reel, locked && s.reelLocked, wrong && s.reelWrong]}>
      <Animated.View style={stripStyle}>
        {strip.map((ch, i) => (
          <View key={i} style={s.reelItem}>
            <Text style={s.reelChar}>{ch}</Text>
          </View>
        ))}
      </Animated.View>

      {/* 판정 창 — 여기 들어온 글자가 잡힌다 */}
      <View style={s.window} pointerEvents="none" />
      {/* 위아래는 흐리게 해서 가운데가 도드라지게 */}
      <View style={s.fadeTop} pointerEvents="none" />
      <View style={s.fadeBottom} pointerEvents="none" />
    </View>
  );
}

export default function JamoSlotGame({ onExit, onFinish }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);

  const [round, setRound] = useState(1);
  const [target, setTarget] = useState<JamoTarget>(() => generateTarget(1));
  const [reelItems, setReelItems] = useState<string[][]>([]);
  const [activeReel, setActiveReel] = useState(0);
  const [locked, setLocked] = useState<boolean[]>([]);
  const [wrongReel, setWrongReel] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [gained, setGained] = useState(0);
  const { record, flush } = useHangulReporter("jamo-slot");

  // 릴 3개분 오프셋 (칸 단위)
  const o0 = useSharedValue(0);
  const o1 = useSharedValue(0);
  const o2 = useSharedValue(0);
  const offsets = [o0, o1, o2];

  const shake = useSharedValue(0);
  const targetPop = useSharedValue(1);
  const gainY = useSharedValue(0);
  const gainOpacity = useSharedValue(0);
  const comboScale = useSharedValue(1);

  const answers = useMemo(
    () =>
      target.reels === 3
        ? [target.cho, target.jung, target.jong]
        : [target.cho, target.jung],
    [target],
  );

  // ── 라운드 세팅 ──
  const setupRound = useCallback(
    (r: number) => {
      const tg = generateTarget(r);
      const ans =
        tg.reels === 3 ? [tg.cho, tg.jung, tg.jong] : [tg.cho, tg.jung];
      const pools = [REEL_POOLS.cho, REEL_POOLS.jung, REEL_POOLS.jong];

      const items = ans.map((a, i) => buildReel(a, pools[i], REEL_LEN));
      setTarget(tg);
      setReelItems(items);
      setLocked(new Array(ans.length).fill(false));
      setActiveReel(0);
      setWrongReel(null);
      setPhase("spinning");

      targetPop.value = withSequence(
        withTiming(1.12, { duration: 140 }),
        withTiming(1, { duration: 160 }),
      );

      // 각 릴을 서로 다른 속도로 돌린다 (같은 박자면 심심함)
      // 릴마다 낱자 수가 다르므로(받침 풀이 더 작다) 자기 길이로 돌려야
      // 한 바퀴가 딱 맞아떨어진다.
      const base = reelSpeed(r);
      offsets.forEach((o, i) => {
        cancelAnimation(o);
        o.value = 0;
        const len = items[i]?.length;
        if (!len) return;
        o.value = withRepeat(
          withTiming(len, {
            duration: base * len + i * 260,
            easing: Easing.linear,
          }),
          -1,
          false,
        );
      });
    },
    [offsets, targetPop],
  );

  useEffect(() => {
    setupRound(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showGain = (amount: number) => {
    setGained(amount);
    gainOpacity.value = 1;
    gainY.value = 0;
    gainY.value = withTiming(-54, {
      duration: 700,
      easing: Easing.out(Easing.quad),
    });
    gainOpacity.value = withDelay(320, withTiming(0, { duration: 380 }));
  };

  const finish = useCallback(
    (finalScore: number) => {
      setPhase("ended");
      offsets.forEach((o) => cancelAnimation(o));
      void flush();
      onFinish?.(finalScore, Math.max(finalScore, 0));
    },
    [offsets, onFinish, flush],
  );

  // ── STOP ──
  const handleStop = () => {
    if (phase !== "spinning") return;

    const idx = activeReel;
    const items = reelItems[idx];
    if (!items) return;

    const o = offsets[idx];
    cancelAnimation(o);

    // 누른 시점엔 릴이 이미 조금 더 지나가 있다(터치 → 핸들러 지연).
    // 유저가 실제로 "본" 위치로 되돌려서 판정해야 억울하지 않다.
    const len = items.length;
    const msPerItem = reelSpeed(round) + (idx * 260) / len;
    const lag = INPUT_LAG_MS / msPerItem;

    // 스냅은 절대값으로. 모듈로 값으로 되돌리면 릴이 거꾸로 감긴다.
    const snapTo = Math.round(o.value - lag);
    const landedIdx = ((snapTo % len) + len) % len;
    const landed = items[landedIdx];

    o.value = withTiming(snapTo, {
      duration: 220,
      easing: Easing.out(Easing.back(1.4)),
    });

    const isCorrect = landed === answers[idx];

    // 릴 하나 = 자모 하나 판정이라 그대로 진행도로 보낸다
    const targetJamoId = jamoToCharacterId(answers[idx]);
    if (targetJamoId) record(targetJamoId, isCorrect);

    if (isCorrect) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const next = [...locked];
      next[idx] = true;
      setLocked(next);

      const isLast = idx === answers.length - 1;
      if (isLast) {
        // 글자 완성
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        const newCombo = combo + 1;
        const mult = comboMultiplier(newCombo);
        const points = Math.round((100 + round * 10) * mult);
        const newScore = score + points;

        setCombo(newCombo);
        setMaxCombo((m) => Math.max(m, newCombo));
        setScore(newScore);
        showGain(points);
        comboScale.value = withSequence(
          withTiming(1.25, { duration: 130 }),
          withTiming(1, { duration: 160 }),
        );
        setPhase("resolved");

        offsets.forEach((oo) => cancelAnimation(oo));
        setTimeout(() => {
          setRound((r) => {
            const nr = r + 1;
            setupRound(nr);
            return nr;
          });
        }, 850);
      } else {
        setActiveReel(idx + 1);
      }
    } else {
      // 빗나감
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setWrongReel(idx);
      setCombo(0);
      shake.value = withSequence(
        withTiming(-9, { duration: 55 }),
        withTiming(9, { duration: 55 }),
        withTiming(-5, { duration: 55 }),
        withTiming(0, { duration: 55 }),
      );

      const remaining = lives - 1;
      setLives(remaining);

      setTimeout(() => {
        setWrongReel(null);
        if (remaining <= 0) {
          finish(score);
        } else {
          // 같은 글자 다시 — 릴만 새로 돌린다
          setPhase("spinning");
          const base = reelSpeed(round);
          offsets.forEach((oo, i) => {
            if (locked[i]) return;
            const len = reelItems[i]?.length;
            if (!len) return;
            cancelAnimation(oo);
            // 현재 위치에서 한 바퀴. 모듈로 표시라 되감기는 안 보인다.
            oo.value = withRepeat(
              withTiming(oo.value + len, {
                duration: base * len + i * 260,
                easing: Easing.linear,
              }),
              -1,
              false,
            );
          });
        }
      }, 620);
    }
  };

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));
  const targetStyle = useAnimatedStyle(() => ({
    transform: [{ scale: targetPop.value }],
  }));
  const gainStyle = useAnimatedStyle(() => ({
    opacity: gainOpacity.value,
    transform: [{ translateY: gainY.value }],
  }));
  const comboStyle = useAnimatedStyle(() => ({
    transform: [{ scale: comboScale.value }],
  }));

  // ── 결과 ──
  if (phase === "ended") {
    return (
      <View style={[s.container, { paddingTop: insets.top + 20 }]}>
        <View style={s.endWrap}>
          <Text style={s.endEmoji}>🎰</Text>
          <Text style={s.endTitle}>{t("hangul.slot.gameOver")}</Text>
          <Text style={s.endScore}>{score}</Text>
          <View style={s.endStats}>
            <View style={s.endStat}>
              <Text style={s.endStatNum}>{round - 1}</Text>
              <Text style={s.endStatLabel}>{t("hangul.slot.made")}</Text>
            </View>
            <View style={s.endStat}>
              <Text style={s.endStatNum}>{maxCombo}</Text>
              <Text style={s.endStatLabel}>{t("hangul.slot.maxCombo")}</Text>
            </View>
          </View>
        </View>
        <View style={[s.footer, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity
            style={s.retryBtn}
            activeOpacity={0.9}
            onPress={() => {
              setScore(0);
              setCombo(0);
              setMaxCombo(0);
              setLives(LIVES);
              setRound(1);
              setupRound(1);
            }}
          >
            <Text style={s.retryText}>{t("hangul.slot.retry")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.exitBtn} onPress={onExit}>
            <Text style={s.exitText}>{t("hangul.slot.exit")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[s.container, { paddingTop: insets.top + 8 }]}>
      {/* 헤더 */}
      <View style={s.header}>
        <TouchableOpacity onPress={onExit} hitSlop={12}>
          <Ionicons name="close" size={28} color={theme.text} />
        </TouchableOpacity>

        <View style={s.lives}>
          {Array.from({ length: LIVES }).map((_, i) => (
            <Ionicons
              key={i}
              name={i < lives ? "heart" : "heart-outline"}
              size={22}
              color={i < lives ? "#FF5C5C" : theme.border}
            />
          ))}
        </View>

        <View style={s.scoreBox}>
          <Text style={s.scoreNum}>{score}</Text>
        </View>
      </View>

      {/* 목표 글자 */}
      <View style={s.targetArea}>
        <Text style={s.targetLabel}>{t("hangul.slot.makeThis")}</Text>
        <Animated.View style={[s.targetBubble, targetStyle]}>
          <Text style={s.targetChar}>{target.syllable}</Text>
        </Animated.View>
        <Text style={s.targetRoman}>{target.roman}</Text>

        <Animated.Text style={[s.gain, gainStyle]}>+{gained}</Animated.Text>
      </View>

      {/* 콤보 */}
      {combo > 1 && (
        <Animated.View style={[s.comboWrap, comboStyle]}>
          <Text style={s.comboText}>
            {t("hangul.slot.combo", { count: combo })} ×{comboMultiplier(combo)}
          </Text>
        </Animated.View>
      )}

      {/* 릴 */}
      <Animated.View style={[s.reelRow, shakeStyle]}>
        {reelItems.map((items, i) => (
          <View key={i} style={s.reelSlot}>
            <Reel
              items={items}
              offset={offsets[i]}
              locked={locked[i]}
              wrong={wrongReel === i}
              theme={theme}
            />
            {/* 지금 세울 릴 표시 */}
            {activeReel === i && !locked[i] && phase === "spinning" && (
              <View style={s.activeMark}>
                <Ionicons name="caret-up" size={20} color={theme.primary} />
              </View>
            )}
          </View>
        ))}
      </Animated.View>

      {/* STOP */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={[s.stopBtn, phase !== "spinning" && s.stopBtnOff]}
          activeOpacity={0.9}
          onPress={handleStop}
          disabled={phase !== "spinning"}
        >
          <Text style={s.stopText}>{t("hangul.slot.stop")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 18,
      paddingBottom: 8,
    },
    lives: { flexDirection: "row", gap: 4 },
    scoreBox: { minWidth: 60, alignItems: "flex-end" },
    scoreNum: { fontSize: 22, fontWeight: "900", color: theme.text },

    targetArea: { alignItems: "center", marginTop: 8, marginBottom: 10 },
    targetLabel: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.textSecondary,
      letterSpacing: 1,
      marginBottom: 8,
    },
    targetBubble: {
      width: 108,
      height: 108,
      borderRadius: 26,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4,
      shadowRadius: 14,
      elevation: 8,
    },
    targetChar: {
      fontSize: 62,
      lineHeight: 76,
      fontWeight: "900",
      color: "#fff",
    },
    targetRoman: {
      fontSize: 16,
      fontWeight: "800",
      color: theme.primary,
      marginTop: 8,
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    gain: {
      position: "absolute",
      top: 40,
      right: 42,
      fontSize: 24,
      fontWeight: "900",
      color: "#1DBB7F",
    },

    comboWrap: {
      alignSelf: "center",
      backgroundColor: "#FF7A00",
      paddingHorizontal: 14,
      paddingVertical: 5,
      borderRadius: 999,
      marginBottom: 6,
    },
    comboText: { color: "#fff", fontSize: 13, fontWeight: "900" },

    reelRow: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      paddingHorizontal: 18,
    },
    reelSlot: { alignItems: "center" },
    reel: {
      width: 92,
      height: ITEM_H * 3, // 위·판정·아래 — 다음 글자가 보여야 타이밍을 잡는다
      borderRadius: 18,
      backgroundColor: theme.surface,
      borderWidth: 3,
      borderColor: theme.border,
      overflow: "hidden",
    },
    window: {
      position: "absolute",
      top: ITEM_H,
      left: 0,
      right: 0,
      height: ITEM_H,
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderColor: theme.primary,
      backgroundColor: "rgba(119,110,226,0.10)",
    },
    fadeTop: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: ITEM_H,
      backgroundColor: theme.bg,
      opacity: 0.55,
    },
    fadeBottom: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: ITEM_H,
      backgroundColor: theme.bg,
      opacity: 0.55,
    },
    reelLocked: {
      borderColor: "#1DBB7F",
      backgroundColor: "rgba(29,187,127,0.12)",
    },
    reelWrong: {
      borderColor: "#FF5C5C",
      backgroundColor: "rgba(255,92,92,0.12)",
    },
    reelItem: {
      height: ITEM_H,
      alignItems: "center",
      justifyContent: "center",
    },
    reelChar: {
      fontSize: 38,
      lineHeight: 46,
      fontWeight: "900",
      color: theme.text,
    },
    activeMark: { marginTop: 4 },

    footer: {
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    stopBtn: {
      backgroundColor: theme.primary,
      borderRadius: 18,
      paddingVertical: 20,
      alignItems: "center",
      borderBottomWidth: 5,
      borderColor: "#5448E0",
    },
    stopBtnOff: { opacity: 0.45 },
    stopText: {
      color: "#fff",
      fontSize: 22,
      fontWeight: "900",
      letterSpacing: 3,
    },

    endWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
    endEmoji: { fontSize: 64, marginBottom: 8 },
    endTitle: {
      fontSize: 22,
      fontWeight: "900",
      color: theme.textSecondary,
      marginBottom: 6,
    },
    endScore: { fontSize: 66, fontWeight: "900", color: theme.text },
    endStats: { flexDirection: "row", gap: 40, marginTop: 24 },
    endStat: { alignItems: "center" },
    endStatNum: { fontSize: 28, fontWeight: "900", color: theme.primary },
    endStatLabel: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
      marginTop: 2,
    },
    retryBtn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: "center",
      borderBottomWidth: 4,
      borderColor: "#5448E0",
    },
    retryText: { color: "#fff", fontSize: 17, fontWeight: "900" },
    exitBtn: { alignItems: "center", paddingVertical: 14 },
    exitText: { color: theme.textSecondary, fontSize: 15, fontWeight: "800" },
  });
