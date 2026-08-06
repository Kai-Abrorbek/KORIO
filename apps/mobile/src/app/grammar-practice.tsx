import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { GrammarService, PracticeQuestion } from "@/services/grammar.service";
import WriteBlankCard, {
  WriteQuestion,
} from "@/components/grammar-practice/WriteBlankCard";
import BuildSentenceCard, {
  BuildQuestion,
} from "@/components/grammar-practice/BuildSentenceCard";

export default function GrammarPracticeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);

  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    let alive = true;
    GrammarService.getPractice(12)
      .then((r) => {
        if (alive) {
          setQuestions(r.questions ?? []);
          setLoading(false);
        }
      })
      .catch(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const handleResult = (wasCorrect: boolean) => {
    if (wasCorrect) setCorrect((c) => c + 1);
    setIndex((i) => i + 1);
  };

  if (loading) {
    return (
      <View style={[s.center, { backgroundColor: theme.bg }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  // 아직 문법 데이터가 없어 문제를 못 만든 경우
  if (!questions.length) {
    return (
      <View style={[s.center, { backgroundColor: theme.bg, padding: 32 }]}>
        <Text style={{ fontSize: 46, marginBottom: 12 }}>📘</Text>
        <Text style={s.emptyText}>{t("grammarPractice.empty")}</Text>
        <Pressable style={s.doneBtn} onPress={() => router.back()}>
          <Text style={s.doneBtnText}>{t("grammarPractice.back")}</Text>
        </Pressable>
      </View>
    );
  }

  // 다 풀었으면 결과
  if (index >= questions.length) {
    return (
      <View style={[s.center, { backgroundColor: theme.bg, padding: 32 }]}>
        <Text style={{ fontSize: 58, marginBottom: 10 }}>🎉</Text>
        <Text style={s.resultScore}>
          {correct} / {questions.length}
        </Text>
        <Text style={s.emptyText}>{t("grammarPractice.finished")}</Text>
        <Pressable style={s.doneBtn} onPress={() => router.back()}>
          <Text style={s.doneBtnText}>{t("grammarPractice.back")}</Text>
        </Pressable>
      </View>
    );
  }

  const q = questions[index];
  const pct = ((index + 1) / questions.length) * 100;

  return (
    <View style={{ flex: 1 }}>
      {/* 공통 헤더 — 두 문제 타입이 같은 진행바를 쓴다 */}
      <View style={[s.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={28} color="#5a7a9a" />
        </Pressable>
        <View style={s.track}>
          <View style={[s.trackFill, { width: `${pct}%` }]} />
        </View>
        <Text style={s.count}>
          {index + 1}/{questions.length}
        </Text>
      </View>

      {q.kind === "write" ? (
        <WriteBlankCard
          key={q.id}
          question={q as unknown as WriteQuestion}
          onResult={handleResult}
        />
      ) : (
        <BuildSentenceCard
          key={q.id}
          question={q as unknown as BuildQuestion}
          onResult={handleResult}
        />
      )}
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 16,
      paddingBottom: 10,
      backgroundColor: "#d7ecf8",
    },
    track: {
      flex: 1,
      height: 14,
      borderRadius: 7,
      backgroundColor: "#b9d9ef",
      overflow: "hidden",
    },
    trackFill: { height: "100%", backgroundColor: "#7ec8ef", borderRadius: 7 },
    count: { fontSize: 14, fontWeight: "800", color: "#5a7a9a" },

    emptyText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 24,
    },
    resultScore: {
      fontSize: 48,
      fontWeight: "900",
      color: theme.text,
      marginBottom: 6,
    },
    doneBtn: {
      marginTop: 26,
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 44,
      borderBottomWidth: 4,
      borderColor: "#5448E0",
    },
    doneBtnText: { color: "#fff", fontSize: 16, fontWeight: "900" },
  });
