import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { WORD_MEMORY_LEVELS } from "@/types/word-memory";
import WordMemoryGame from "@/components/hangul/games/WordMemoryGame";
import { useGameWords } from "@/features/games/useGameWords";
import { GameWordsGate } from "@/features/games/GameWordsGate";
import { meaningOfWord } from "@/services/game-words.service";
import { useTranslation as useT } from "react-i18next";

export default function MemoryGameScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const s = styles(theme);

  // 제일 큰 레벨이 15쌍이라 넉넉히 받아둔다. 레벨을 올릴 때마다 다시
  // 부르면 카드가 바뀌어서 "외운 걸 다시 못 찾는" 이상한 판이 된다
  const { words: pool, loading, failed, reload } = useGameWords(40, 4);
  const { i18n } = useT();
  const pairs = (pool ?? []).map((w) => ({
    ko: w.ko,
    uz: meaningOfWord(w, i18n.language),
  }));

  const [level, setLevel] = useState(1);
  const [phase, setPhase] = useState<"playing" | "win" | "lose">("playing");
  const [gameKey, setGameKey] = useState(0);
  const [stars, setStars] = useState(0);

  const restart = (lv: number) => {
    setLevel(lv);
    setPhase("playing");
    setGameKey((k) => k + 1);
  };

  const handleComplete = ({
    cleared,
    moves,
    level,
  }: {
    cleared: boolean;
    moves: number;
    level: number;
  }) => {
    if (cleared) {
      const pairs =
        WORD_MEMORY_LEVELS.find((l) => l.level === level)?.pairs ?? 5;
      // 적은 시도일수록 별 많이 (완벽=쌍수만큼만 시도)
      const st = moves <= pairs + 2 ? 3 : moves <= pairs + 6 ? 2 : 1;
      setStars(st);
    }
    setPhase(cleared ? "win" : "lose");
  };

  const goHome = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  const isLast = level >= WORD_MEMORY_LEVELS.length;

  const maxPairs = WORD_MEMORY_LEVELS[WORD_MEMORY_LEVELS.length - 1].pairs;
  if (loading || failed || pairs.length < maxPairs) {
    return (
      <View style={s.container}>
        <TouchableOpacity onPress={goHome} style={s.close} hitSlop={8}>
          <Ionicons name="close" size={28} color={theme.text} />
        </TouchableOpacity>
        <GameWordsGate loading={loading} failed={failed} onRetry={reload}>
          {null}
        </GameWordsGate>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <TouchableOpacity onPress={goHome} style={s.close} hitSlop={8}>
        <Ionicons name="close" size={28} color={theme.text} />
      </TouchableOpacity>

      {phase === "playing" ? (
        <WordMemoryGame
          key={gameKey}
          level={level}
          words={pairs}
          theme={theme}
          onComplete={handleComplete}
        />
      ) : (
        <View style={s.result}>
          <Text style={s.emoji}>{phase === "win" ? "🎉" : "⏰"}</Text>
          <Text style={s.resultTitle}>
            {phase === "win"
              ? t("hangul.wordMemory.cleared")
              : t("hangul.wordMemory.timeUp")}
          </Text>

          {phase === "win" && (
            <View style={s.stars}>
              {[1, 2, 3].map((i) => (
                <Ionicons
                  key={i}
                  name="star"
                  size={44}
                  color={i <= stars ? "#FFD93D" : theme.border}
                />
              ))}
            </View>
          )}

          {phase === "win" && !isLast ? (
            <TouchableOpacity style={s.btn} onPress={() => restart(level + 1)}>
              <Text style={s.btnText}>{t("hangul.wordMemory.nextLevel")}</Text>
            </TouchableOpacity>
          ) : phase === "win" && isLast ? (
            <Text style={s.allClear}>{t("hangul.wordMemory.allCleared")}</Text>
          ) : null}

          <TouchableOpacity
            style={[s.btn, s.btnOutline]}
            onPress={() => restart(level)}
          >
            <Text style={[s.btnText, { color: theme.primary }]}>
              {t("hangul.wordMemory.retry")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goHome} style={s.exit}>
            <Text style={s.exitText}>{t("hangul.wordMemory.exit")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingTop: 56 },
    close: { paddingHorizontal: 20, marginBottom: 8 },
    result: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      paddingHorizontal: 30,
    },
    emoji: { fontSize: 72 },
    resultTitle: {
      fontSize: 26,
      fontWeight: "900",
      color: theme.text,
      marginBottom: 4,
    },
    stars: { flexDirection: "row", gap: 10, marginBottom: 10 },
    allClear: { fontSize: 18, fontWeight: "700", color: "#58CC02" },
    btn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 40,
      alignItems: "center",
      width: "100%",
    },
    btnOutline: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: theme.primary,
    },
    btnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
    exit: { paddingVertical: 10 },
    exitText: { color: theme.textSecondary, fontSize: 15, fontWeight: "700" },
  });
