import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import MatchPairCard, { PairStatus } from "../MatchPairCard";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
}
interface Item {
  id: string;
  pairId: number;
  text: string;
  status: PairStatus;
}

const shuffle = <T,>(a: T[]) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

export default function WordMatching({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme);
  const pairs = question.pairs ?? [];

  const [left, setLeft] = useState<Item[]>(() =>
    shuffle(
      pairs.map((p, i) => ({
        id: `k-${i}`,
        pairId: i,
        text: p.korean,
        status: "idle" as PairStatus,
      })),
    ),
  );
  const [right, setRight] = useState<Item[]>(() =>
    shuffle(
      pairs.map((p, i) => ({
        id: `n-${i}`,
        pairId: i,
        text: p.native,
        status: "idle" as PairStatus,
      })),
    ),
  );
  const [selL, setSelL] = useState<number | null>(null);
  const [selR, setSelR] = useState<number | null>(null);
  const [matchedCount, setMatchedCount] = useState(0);

  const locked = answerState !== "idle";
  const allDone = pairs.length > 0 && matchedCount === pairs.length;

  const setLS = (i: number, st: PairStatus) =>
    setLeft((p) => p.map((x, idx) => (idx === i ? { ...x, status: st } : x)));
  const setRS = (j: number, st: PairStatus) =>
    setRight((p) => p.map((x, idx) => (idx === j ? { ...x, status: st } : x)));

  const evaluate = (i: number, j: number) => {
    const correct = left[i].pairId === right[j].pairId;
    setSelL(null);
    setSelR(null);
    if (correct) {
      setLS(i, "correct");
      setRS(j, "correct");
      setMatchedCount((c) => c + 1);
      setTimeout(() => {
        setLS(i, "ghost");
        setRS(j, "ghost");
      }, 700);
    } else {
      setLS(i, "wrong");
      setRS(j, "wrong");
      setTimeout(() => {
        setLS(i, "idle");
        setRS(j, "idle");
      }, 520);
    }
  };

  const tapL = (i: number) => {
    if (locked) return;
    const it = left[i];
    if (
      it.status === "correct" ||
      it.status === "ghost" ||
      it.status === "wrong"
    )
      return;
    if (selL === i) {
      setLS(i, "idle");
      setSelL(null);
      return;
    }
    if (selL !== null) setLS(selL, "idle");
    setLS(i, "selected");
    setSelL(i);
    if (selR !== null) evaluate(i, selR);
  };

  const tapR = (j: number) => {
    if (locked) return;
    const it = right[j];
    if (
      it.status === "correct" ||
      it.status === "ghost" ||
      it.status === "wrong"
    )
      return;
    if (selR === j) {
      setRS(j, "idle");
      setSelR(null);
      return;
    }
    if (selR !== null) setRS(selR, "idle");
    setRS(j, "selected");
    setSelR(j);
    if (selL !== null) evaluate(selL, j);
  };

  const check = () => {
    if (!allDone || locked) return;
    onAnswer("all_correct");
  };

  return (
    <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
      {/* 헤더 유지 */}
      <Text style={s.title}>{question.question}</Text>
      <Text style={s.sub}>{t("lesson.matchPairs")}</Text>

      <View style={s.grid}>
        <View style={s.col}>
          {left.map((item, i) => (
            <MatchPairCard
              key={item.id}
              text={item.text}
              status={item.status}
              onPress={() => tapL(i)}
              theme={theme}
            />
          ))}
        </View>
        <View style={s.col}>
          {right.map((item, j) => (
            <MatchPairCard
              key={item.id}
              text={item.text}
              status={item.status}
              onPress={() => tapR(j)}
              theme={theme}
            />
          ))}
        </View>
      </View>

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={[s.checkBtn, (!allDone || locked) && s.checkBtnDisabled]}
        onPress={check}
        disabled={!allDone || locked}
      >
        <Text style={s.checkBtnText}>{t("lesson.check")}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      marginBottom: 40,
    },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 4,
    },
    sub: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 28,
      fontWeight: "500",
    },
    grid: { flexDirection: "row", gap: 14, height: 600 },
    col: { flex: 1, gap: 14, height: "100%" },
    checkBtn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
    },
    checkBtnDisabled: { backgroundColor: theme.border },
    checkBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  });
