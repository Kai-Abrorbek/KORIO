import { useState, useEffect, useRef, useMemo } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  FadeIn,
} from "react-native-reanimated";
import { ThemeColors } from "@/constants/theme";
import { WORD_MEMORY_LEVELS, WordPair } from "@/types/word-memory";
import { WORD_MEMORY_POOL } from "@/mocks/word-memory.mock";
import WordMemoryCard, { WCard } from "./WordMemoryCard";

interface Props {
  level: number;
  theme: ThemeColors;
  onComplete: (r: {
    cleared: boolean;
    timeLeft: number;
    moves: number;
    level: number;
  }) => void;
}

const shuffle = <T,>(a: T[]) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

export default function WordMemoryGame({ level, theme, onComplete }: Props) {
  const { t } = useTranslation();
  const s = styles(theme);
  const { width } = useWindowDimensions();

  const cfg =
    WORD_MEMORY_LEVELS.find((l) => l.level === level) ?? WORD_MEMORY_LEVELS[0];

  // 카드 덱 생성
  const initialCards = useMemo<WCard[]>(() => {
    const pairs: WordPair[] = shuffle(WORD_MEMORY_POOL).slice(0, cfg.pairs);
    const cards: WCard[] = [];
    pairs.forEach((p, i) => {
      cards.push({
        id: `ko-${i}`,
        pairId: i,
        type: "ko",
        display: p.ko,
        isFlipped: false,
        isMatched: false,
      });
      cards.push({
        id: `uz-${i}`,
        pairId: i,
        type: "uz",
        display: p.uz,
        isFlipped: false,
        isMatched: false,
      });
    });
    return shuffle(cards);
  }, [level]);

  const [cards, setCards] = useState<WCard[]>(initialCards);
  const [firstId, setFirstId] = useState<string | null>(null);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(cfg.timeSec);
  const [processing, setProcessing] = useState(false);
  const [preview, setPreview] = useState(true); // 시작 미리보기
  const [started, setStarted] = useState(false);
  const [matchedTrigger, setMatchedTrigger] = useState(0);
  const finished = useRef(false);

  const cols = cfg.columns;
  const cardSize = Math.floor((width - 32 - cols * 12) / cols);
  const fontSize = Math.max(13, Math.min(24, cardSize * 0.28));
  const lastPair = matches === cfg.pairs - 1; // 마지막 한 쌍 남음

  // 시작 미리보기: 전부 보여줬다가 닫고 시작
  useEffect(() => {
    setPreview(true);
    setStarted(false);
    setCards(initialCards.map((c) => ({ ...c, isFlipped: true })));
    const t1 = setTimeout(() => {
      setCards((prev) => prev.map((c) => ({ ...c, isFlipped: false })));
      setPreview(false);
      setTimeout(() => setStarted(true), 500); // flip 닫힌 뒤 시작
    }, cfg.previewMs);
    return () => clearTimeout(t1);
  }, [initialCards]);

  // 타이머
  useEffect(() => {
    if (!started || finished.current) return;
    if (timeLeft <= 0) {
      finished.current = true;
      onComplete({ cleared: false, timeLeft: 0, moves, level });
      return;
    }
    const id = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, started]);

  // 클리어
  useEffect(() => {
    if (matches === cfg.pairs && started && !finished.current) {
      finished.current = true;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
      setTimeout(
        () => onComplete({ cleared: true, timeLeft, moves, level }),
        600,
      );
    }
  }, [matches]);

  const handlePress = (id: string) => {
    if (!started || processing) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    // 첫 장
    if (!firstId) {
      setFirstId(id);
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c)),
      );
      return;
    }
    if (id === firstId) return;

    // 둘째 장
    const first = cards.find((c) => c.id === firstId)!;
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c)),
    );
    setMoves((m) => m + 1);
    setProcessing(true);

    const isMatch = first.pairId === card.pairId && first.type !== card.type;

    if (isMatch) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.pairId === card.pairId ? { ...c, isMatched: true } : c,
          ),
        );
        setMatches((m) => m + 1);
        setCombo((c) => c + 1);
        setMatchedTrigger((x) => x + 1);
        setFirstId(null);
        setProcessing(false);
      }, 350);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(
        () => {},
      );
      setCombo(0);
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === id || c.id === firstId ? { ...c, isFlipped: false } : c,
          ),
        );
        setFirstId(null);
        setProcessing(false);
      }, 900);
    }
  };

  const mm = Math.floor(timeLeft / 60);
  const ss = String(timeLeft % 60).padStart(2, "0");
  const lowTime = timeLeft <= 10;

  return (
    <View style={[s.container, lastPair && s.tense]}>
      {/* HUD */}
      <View style={s.hud}>
        <View style={s.hudItem}>
          <Ionicons name="checkmark-circle" size={20} color="#58CC02" />
          <Text style={s.hudText}>
            {matches}/{cfg.pairs}
          </Text>
        </View>
        <View style={s.levelBadge}>
          <Text style={s.levelText}>
            {t("hangul.wordMemory.level", { level })}
          </Text>
        </View>
        <View style={s.hudItem}>
          <Ionicons
            name="time"
            size={20}
            color={lowTime ? "#FF4B4B" : theme.textSecondary}
          />
          <Text style={[s.hudText, lowTime && { color: "#FF4B4B" }]}>
            {mm}:{ss}
          </Text>
        </View>
      </View>

      {/* 콤보 */}
      {combo >= 2 && (
        <Animated.View
          key={combo}
          entering={FadeIn.duration(200)}
          style={s.combo}
        >
          <Text style={s.comboText}>
            🔥 {t("hangul.wordMemory.combo", { n: combo })}
          </Text>
        </Animated.View>
      )}

      {preview && (
        <Text style={s.previewHint}>{t("hangul.wordMemory.memorize")}</Text>
      )}
      {lastPair && started && (
        <Text style={s.lastHint}>{t("hangul.wordMemory.lastPair")}</Text>
      )}

      {/* 그리드 */}
      <View style={s.grid}>
        {cards.map((card) => (
          <WordMemoryCard
            key={card.id}
            card={card}
            size={cardSize}
            fontSize={fontSize}
            matchedTrigger={matchedTrigger}
            onPress={() => handlePress(card.id)}
            theme={theme}
          />
        ))}
      </View>
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
    tense: { backgroundColor: theme.primary + "08" }, // 마지막 한 쌍: 배경 살짝
    hud: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    hudItem: { flexDirection: "row", alignItems: "center", gap: 6 },
    hudText: { fontSize: 18, fontWeight: "800", color: theme.text },
    levelBadge: {
      backgroundColor: theme.primary + "22",
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 20,
    },
    levelText: { fontSize: 14, fontWeight: "800", color: theme.primary },
    combo: { alignSelf: "center", marginBottom: 6 },
    comboText: { fontSize: 18, fontWeight: "900", color: "#FF7A00" },
    previewHint: {
      textAlign: "center",
      fontSize: 15,
      fontWeight: "800",
      color: theme.primary,
      marginBottom: 10,
    },
    lastHint: {
      textAlign: "center",
      fontSize: 15,
      fontWeight: "800",
      color: "#FF4B4B",
      marginBottom: 10,
    },
    grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  });
