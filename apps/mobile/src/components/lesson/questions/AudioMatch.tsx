import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useSpeech } from "@/hooks/useSpeech";
import MatchPairCard, { PairStatus } from "../MatchPairCard";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  onSkip?: () => void;
  theme: ThemeColors;
}

interface AItem {
  id: string;
  pairId: number;
  audio: string;
  status: PairStatus;
}
interface TItem {
  id: string;
  pairId: number;
  text: string;
  status: PairStatus;
}

const GREEN_BG = "#E3F8EC";
const GREEN_BORDER = "#1CB454";
const RED_BG = "#FFE5EC";
const RED_BORDER = "#FF4B4B";
const AUDIO_BLUE = "#1CB0F6";

const shuffle = <T,>(a: T[]) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

function Bar({ index, active }: { index: number; active: boolean }) {
  const base = [10, 16, 24, 14, 28, 13, 22, 16, 10][index % 9];
  const sv = useSharedValue(1);
  useEffect(() => {
    sv.value = active
      ? withDelay(
          index * 55,
          withRepeat(
            withSequence(
              withTiming(1.7, { duration: 280 }),
              withTiming(0.6, { duration: 280 }),
            ),
            -1,
            true,
          ),
        )
      : withTiming(1);
  }, [active]);
  const st = useAnimatedStyle(() => ({ transform: [{ scaleY: sv.value }] }));
  return (
    <Animated.View
      style={[
        {
          width: 3.5,
          height: base,
          borderRadius: 2,
          backgroundColor: AUDIO_BLUE,
          marginHorizontal: 1.5,
        },
        st,
      ]}
    />
  );
}

function Waveform({ active }: { active: boolean }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", height: 32 }}>
      {Array.from({ length: 9 }).map((_, i) => (
        <Bar key={i} index={i} active={active} />
      ))}
    </View>
  );
}

export default function AudioMatch({
  question,
  answerState,
  onAnswer,
  onSkip,
  theme,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme);
  const { speak } = useSpeech();
  const pairs = question.pairs ?? [];
  const [left, setLeft] = useState<AItem[]>(() =>
    shuffle(
      pairs.map((p, i) => ({
        id: `a-${i}`,
        pairId: i,
        audio: p.korean,
        status: "idle" as PairStatus,
      })),
    ),
  );
  const [right, setRight] = useState<TItem[]>(() =>
    shuffle(
      pairs.map((p, i) => ({
        id: `t-${i}`,
        pairId: i,
        text: p.native,
        status: "idle" as PairStatus,
      })),
    ),
  );
  const [selA, setSelA] = useState<number | null>(null);
  const [selT, setSelT] = useState<number | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [matchedCount, setMatchedCount] = useState(0);
  const locked = answerState !== "idle";
  const allMatched = pairs.length > 0 && matchedCount === pairs.length;

  const setLS = (i: number, st: PairStatus) =>
    setLeft((p) => p.map((x, idx) => (idx === i ? { ...x, status: st } : x)));
  const setRS = (j: number, st: PairStatus) =>
    setRight((p) => p.map((x, idx) => (idx === j ? { ...x, status: st } : x)));

  const playAudio = (item: AItem) => {
    speak(item.audio);
    setPlaying(item.id);
    setTimeout(() => setPlaying((p) => (p === item.id ? null : p)), 1300);
  };

  const evaluate = (i: number, j: number) => {
    const correct = left[i].pairId === right[j].pairId;
    setSelA(null);
    setSelT(null);
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

  const tapAudio = (i: number) => {
    if (locked) return;
    const it = left[i];
    if (
      it.status === "correct" ||
      it.status === "ghost" ||
      it.status === "wrong"
    )
      return;
    playAudio(it);
    if (selA === i) {
      setLS(i, "idle");
      setSelA(null);
      return;
    }
    if (selA !== null) setLS(selA, "idle");
    setLS(i, "selected");
    setSelA(i);
    if (selT !== null) evaluate(i, selT);
  };

  const tapText = (j: number) => {
    if (locked) return;
    const it = right[j];
    if (
      it.status === "correct" ||
      it.status === "ghost" ||
      it.status === "wrong"
    )
      return;
    if (selT === j) {
      setRS(j, "idle");
      setSelT(null);
      return;
    }
    if (selT !== null) setRS(selT, "idle");
    setRS(j, "selected");
    setSelT(j);
    if (selA !== null) evaluate(selA, j);
  };

  const check = () => {
    if (!allMatched || locked) return;
    onAnswer("all_correct");
  };

  return (
    <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
      <Text style={s.title}>{question.question || t("lesson.matchPairs")}</Text>

      <View style={s.board}>
        <View style={s.col}>
          {left.map((item, i) => (
            <MatchPairCard
              key={item.id}
              status={item.status}
              onPress={() => tapAudio(i)}
              theme={theme}
            >
              <View style={s.audioInner}>
                <Ionicons name="volume-high" size={26} color={AUDIO_BLUE} />
                <Waveform active={playing === item.id} />
              </View>
            </MatchPairCard>
          ))}
        </View>

        <View style={s.col}>
          {right.map((item, j) => (
            <MatchPairCard
              key={item.id}
              text={item.text}
              status={item.status}
              onPress={() => tapText(j)}
              theme={theme}
            />
          ))}
        </View>
      </View>

      {onSkip && (
        <TouchableOpacity onPress={onSkip} style={s.skip} disabled={locked}>
          <Text style={s.skipText}>{t("lesson.skipListening")}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[s.checkBtn, (!allMatched || locked) && s.checkBtnDisabled]}
        onPress={check}
        disabled={!allMatched || locked}
      >
        <Text style={s.checkBtnText}>{t("lesson.check")}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20, paddingTop: 8 },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 28,
      lineHeight: 30,
    },
    board: { flexDirection: "row", gap: 14 },
    col: { flex: 1, gap: 14 },
    audioCard: {
      borderRadius: 16,
      borderWidth: 2,
      borderBottomWidth: 4,
      paddingVertical: 18,
      paddingHorizontal: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    audioInner: { flexDirection: "row", alignItems: "center", gap: 10 },
    textCard: {
      borderRadius: 16,
      borderWidth: 2,
      borderBottomWidth: 4,
      paddingVertical: 22,
      paddingHorizontal: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    textCardText: { fontSize: 19, fontWeight: "800" },
    skip: { alignItems: "center", paddingVertical: 18, marginTop: 8 },
    skipText: { color: theme.textSecondary, fontSize: 16, fontWeight: "700" },
    checkBtn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
      marginTop: "auto",
    },
    checkBtnDisabled: { backgroundColor: theme.border },
    checkBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  });
