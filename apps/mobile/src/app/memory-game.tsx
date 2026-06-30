import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { WORD_MEMORY_LEVELS } from "@/types/word-memory";
import WordMemoryGame from "@/components/hangul/games/WordMemoryGame";

export default function MemoryGameScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const s = styles(theme);

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

  return (
    <View style={s.container}>
      <TouchableOpacity onPress={goHome} style={s.close} hitSlop={8}>
        <Ionicons name="close" size={28} color={theme.text} />
      </TouchableOpacity>

      {phase === "playing" ? (
        <WordMemoryGame
          key={gameKey}
          level={level}
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
