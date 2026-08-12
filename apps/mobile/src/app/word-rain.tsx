import { useEffect, useRef, useState, useCallback } from "react";
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
  cancelAnimation,
  runOnJS,
  Easing,
  FadeIn,
  ZoomIn,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { ARCADE_WORDS, meaningOf } from "@/mocks/arcade.mock";
import { WordPair } from "@/mocks/match-game.mock";

const MAX_HEARTS = 3;
const START_FALL_MS = 6000;
const MIN_FALL_MS = 2600;
const SPEEDUP_MS = 220;

export default function WordRainScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.top, insets.bottom);

  const [word, setWord] = useState<WordPair | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [caught, setCaught] = useState(0);
  const [over, setOver] = useState(false);
  const [areaH, setAreaH] = useState(0);

  const fallMs = useRef(START_FALL_MS);
  const heartsRef = useRef(MAX_HEARTS);
  const lockRef = useRef(false);

  const fallY = useSharedValue(-70);
  const wordScale = useSharedValue(1);
  const wordOpacity = useSharedValue(1);
  const flashRed = useSharedValue(0);

  const fallStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: fallY.value }, { scale: wordScale.value }],
    opacity: wordOpacity.value,
  }));
  const flashStyle = useAnimatedStyle(() => ({
    opacity: flashRed.value,
  }));

  const pickNext = useCallback(() => {
    const w = ARCADE_WORDS[Math.floor(Math.random() * ARCADE_WORDS.length)];
    const wrongs = ARCADE_WORDS.filter((x) => x.id !== w.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    const opts = [w, ...wrongs]
      .map((x) => meaningOf(x, i18n.language))
      .sort(() => Math.random() - 0.5);
    setWord(w);
    setOptions(opts);
  }, [i18n.language]);

  // 새 단어 낙하 시작
  const drop = useCallback(() => {
    if (heartsRef.current <= 0 || areaH === 0) return;
    lockRef.current = false;
    wordScale.value = 1;
    wordOpacity.value = 1;
    fallY.value = -70;
    pickNext();
    fallY.value = withTiming(
      areaH - 60,
      { duration: fallMs.current, easing: Easing.linear },
      (finished) => {
        if (finished) runOnJS(onLanded)();
      },
    );
  }, [areaH, pickNext]);

  // 바닥 도착 = 미스
  const onLanded = () => {
    if (lockRef.current) return;
    lockRef.current = true;
    loseHeart();
  };

  const loseHeart = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    flashRed.value = withSequence(
      withTiming(0.35, { duration: 80 }),
      withTiming(0, { duration: 300 }),
    );
    setCombo(0);
    heartsRef.current -= 1;
    setHearts(heartsRef.current);
    if (heartsRef.current <= 0) {
      setOver(true);
    } else {
      setTimeout(drop, 600);
    }
  };

  const onPick = (opt: string) => {
    if (!word || lockRef.current || over) return;
    lockRef.current = true;
    cancelAnimation(fallY);

    if (opt === meaningOf(word, i18n.language)) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      // 팡 터지는 연출
      wordScale.value = withSequence(
        withTiming(1.35, { duration: 120 }),
        withTiming(0, { duration: 160 }),
      );
      wordOpacity.value = withTiming(0, { duration: 260 });
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setBestCombo((b) => Math.max(b, nextCombo));
      setCaught((c) => c + 1);
      setScore((sc) => sc + 10 + Math.min(nextCombo, 10) * 2);
      fallMs.current = Math.max(MIN_FALL_MS, fallMs.current - SPEEDUP_MS);
      setTimeout(drop, 420);
    } else {
      loseHeart();
    }
  };

  // 시작
  useEffect(() => {
    if (areaH > 0 && !over) drop();
    return () => cancelAnimation(fallY);
  }, [areaH]);

  const restart = () => {
    fallMs.current = START_FALL_MS;
    heartsRef.current = MAX_HEARTS;
    setHearts(MAX_HEARTS);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setCaught(0);
    setOver(false);
    setTimeout(drop, 300);
  };

  const exit = () => {
    cancelAnimation(fallY);
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  return (
    <View style={s.container}>
      {/* 오답 붉은 플래시 */}
      <Animated.View pointerEvents="none" style={[s.redFlash, flashStyle]} />

      {/* 헤더 */}
      <View style={s.header}>
        <TouchableOpacity onPress={exit} hitSlop={10}>
          <Ionicons name="close" size={26} color={theme.textSecondary} />
        </TouchableOpacity>
        <View style={s.scorePill}>
          <Text style={s.scoreText}>{score}</Text>
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

      {combo >= 2 ? (
        <Animated.Text entering={ZoomIn.duration(200)} style={s.comboText}>
          🔥 x{combo}
        </Animated.Text>
      ) : null}

      {/* 낙하 영역 */}
      <View
        style={s.playArea}
        onLayout={(e) => setAreaH(e.nativeEvent.layout.height)}
      >
        {word && !over ? (
          <Animated.View style={[s.fallingWord, fallStyle]}>
            <Text style={s.fallingText}>{word.ko}</Text>
          </Animated.View>
        ) : null}
        {/* 바닥 라인 */}
        <View style={s.floor} />
      </View>

      {/* 뜻 버튼 */}
      <View style={s.options}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={s.optBtn}
            activeOpacity={0.85}
            onPress={() => onPick(opt)}
            disabled={over}
          >
            <Text style={s.optText} numberOfLines={1}>
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 종료 오버레이 */}
      {over ? (
        <Animated.View entering={FadeIn.duration(250)} style={s.overlay}>
          <Animated.View entering={ZoomIn.duration(300)} style={s.endCard}>
            <Text style={s.endEmoji}>🌧️</Text>
            <Text style={s.endTitle}>{t("arcade.gameOver")}</Text>
            <View style={s.endStats}>
              <View style={s.endStat}>
                <Text style={s.endStatNum}>{score}</Text>
                <Text style={s.endStatLabel}>{t("arcade.score")}</Text>
              </View>
              <View style={s.endStat}>
                <Text style={s.endStatNum}>{caught}</Text>
                <Text style={s.endStatLabel}>{t("arcade.caught")}</Text>
              </View>
              <View style={s.endStat}>
                <Text style={s.endStatNum}>x{bestCombo}</Text>
                <Text style={s.endStatLabel}>{t("arcade.bestCombo")}</Text>
              </View>
            </View>
            {/* TODO: XP 보상은 서버 권위 엔드포인트 붙인 뒤 지급 */}
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
    redFlash: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#FF4B4B",
      zIndex: 5,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },
    scorePill: {
      backgroundColor: theme.primary,
      borderRadius: 14,
      paddingHorizontal: 18,
      paddingVertical: 6,
      borderBottomWidth: 3,
      borderBottomColor: "#5B52C7",
    },
    scoreText: { color: "#fff", fontSize: 18, fontWeight: "800" },
    heartsRow: { flexDirection: "row", gap: 3 },
    comboText: {
      textAlign: "center",
      fontSize: 16,
      fontWeight: "800",
      color: "#FF9600",
      marginTop: 6,
    },
    playArea: { flex: 1, marginTop: 4 },
    fallingWord: {
      position: "absolute",
      alignSelf: "center",
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.primary,
      borderBottomWidth: 5,
      borderRadius: 18,
      paddingHorizontal: 22,
      paddingVertical: 12,
      shadowColor: "#776ee2",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    fallingText: { fontSize: 26, fontWeight: "800", color: theme.text },
    floor: {
      position: "absolute",
      bottom: 0,
      left: 20,
      right: 20,
      height: 3,
      borderRadius: 2,
      backgroundColor: theme.border,
    },
    options: {
      paddingHorizontal: 20,
      paddingBottom: bottom + 16,
      paddingTop: 14,
      gap: 10,
    },
    optBtn: {
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 16,
      paddingVertical: 15,
      alignItems: "center",
    },
    optText: { fontSize: 17, fontWeight: "700", color: theme.text },
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
