import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useSpeech } from "@/hooks/useSpeech";
import MatchPairCard, { PairStatus } from "../MatchPairCard";
import CheckButton from "../CheckButton";

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

// 카드를 조금 낮춰야 짝이 많을 때도 확인 버튼이 화면 안에 들어온다
const CARD_H = 85;

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
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.bottom);
  const pairs = question.pairs ?? [];
  const { speak, stop, prewarm } = useSpeech();

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
  // 짝을 맞춘 순간에 speak() 를 부르면 그때부터 음원을 받아오느라 소리가 한
  // 박자 늦게 난다. 읽을 한국어 단어는 화면 뜰 때 이미 다 아니까 미리 받아 둔다.
  useEffect(() => {
    prewarm(pairs.map((p) => p.korean));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

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
      speak(left[i].text);
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
    stop();
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
    stop();
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
    <Animated.View entering={FadeIn.duration(150)} style={s.container}>
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
              height={CARD_H}
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
              height={CARD_H}
            />
          ))}
        </View>
      </View>

      <View style={{ flex: 1 }} />

      <CheckButton
        onPress={check}
        disabled={!allDone || locked}
        theme={theme}
      />
    </Animated.View>
  );
}

const styles = (theme: ThemeColors, bottomInset = 0) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 12,
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
    // 높이를 고정해두면 짝 수가 달라질 때 남거나 모자란다. 내용에 맞춰 잡는다.
    grid: { flexDirection: "row", gap: 14 },
    col: { flex: 1, gap: 14 },
  });
