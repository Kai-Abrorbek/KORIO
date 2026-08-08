import { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { speakText } from "@/hooks/useSpeech";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  FadeIn,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import * as Haptics from "@/utils/haptics";
import { UserService } from "@/services/user.service";
import {
  findStage,
  type PronLevel,
  type PronOption,
} from "@/constants/pronunciation";

const C = {
  bgTop: "#cfe9f8",
  bgBot: "#bcdff4",
  targetCard: "#c3e2f6",
  optCard: "#ffffff",
  ink: "#2b2b3a",
  gray: "#9aa7b3",
  green: "#4fc44f",
  greenBadge: "#3cba54",
  red: "#ff5a6a",
  redBadge: "#ff6b47",
  purple: "#8b7ff0",
  purpleDk: "#6f61e6",
  back: "#7ec8ef",
  backSym: "#a9dbf5",
};

interface Q {
  options: [PronOption, PronOption];
  answer: 0 | 1;
}

/** 시드 없는 셔플 — 매 판 순서가 달라야 외워서 못 푼다 */
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function PronunciationQuiz() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{
    level?: string;
    step?: string;
    mode?: string;
  }>();

  const level = (params.level ?? "lv1") as PronLevel;
  const step = Number(params.step ?? 1);
  const isHard = params.mode === "hard";
  const stage = findStage(level, step);

  // 각 대립쌍을 한 번씩. 정답은 좌·우 무작위라 위치로 못 찍는다.
  const questions = useMemo<Q[]>(() => {
    if (!stage) return [];
    return shuffle(
      stage.pairs.map((pair) => {
        const answer: 0 | 1 = Math.random() < 0.5 ? 0 : 1;
        return { options: pair, answer };
      }),
    );
  }, [stage]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [results, setResults] = useState<(boolean | null)[]>([]);
  const [finished, setFinished] = useState(false);
  const saved = useRef(false);

  useEffect(() => {
    setResults(Array(questions.length).fill(null));
  }, [questions.length]);

  const q = questions[index];
  const target = q?.options[q.answer];

  const flip = useSharedValue(0);

  const speakTarget = () => {
    if (!target) return;
    Speech.stop();
    speakText(target.word);
  };

  useEffect(() => {
    flip.value = 0;
    setSelected(null);
    const id = setTimeout(speakTarget, 550);
    return () => {
      clearTimeout(id);
      Speech.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, questions]);

  const correctCount = results.filter((r) => r === true).length;
  const score = questions.length
    ? Math.round((correctCount / questions.length) * 100)
    : 0;

  const finish = (finalResults: (boolean | null)[]) => {
    const ok = finalResults.filter((r) => r === true).length;
    const s = questions.length ? Math.round((ok / questions.length) * 100) : 0;
    setFinished(true);
    if (saved.current) return;
    saved.current = true;
    UserService.savePronunciation({
      level,
      step,
      mode: isHard ? "hard" : "easy",
      score: s,
    }).catch(() => {
      // 저장 실패해도 결과는 보여준다. 다음에 다시 풀면 갱신됨.
    });
  };

  const pick = (i: number) => {
    if (selected !== null || !q) return;
    setSelected(i);
    const correct = i === q.answer;
    Haptics.notificationAsync(
      correct
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Error,
    );
    const next = [...results];
    next[index] = correct;
    setResults(next);
    flip.value = withTiming(1, { duration: 420 });
    if (correct) setTimeout(speakTarget, 260);

    // 마지막 문제면 잠깐 보여주고 결과로
    if (index === questions.length - 1) {
      setTimeout(() => finish(next), 900);
    }
  };

  const next = () => {
    if (index < questions.length - 1) setIndex((i) => i + 1);
  };

  if (!stage || questions.length === 0) {
    return (
      <LinearGradient colors={[C.bgTop, C.bgBot]} style={st.center}>
        <Text style={st.emptyText}>{t("pronQuiz.noData")}</Text>
        <Pressable onPress={() => router.back()} style={st.emptyBtn}>
          <Text style={st.emptyBtnText}>{t("pronPractice.confirm")}</Text>
        </Pressable>
      </LinearGradient>
    );
  }

  // ── 결과 ──
  if (finished) {
    const passed = score >= 60;
    return (
      <LinearGradient colors={[C.bgTop, C.bgBot]} style={st.center}>
        <Animated.View entering={FadeIn.duration(220)} style={st.resultCard}>
          <View
            style={[
              st.resultIcon,
              { backgroundColor: passed ? "#e3f7d9" : "#fde0e4" },
            ]}
          >
            <Ionicons
              name={passed ? "checkmark" : "refresh"}
              size={40}
              color={passed ? C.greenBadge : C.redBadge}
            />
          </View>
          <Text style={st.resultScore}>{score}</Text>
          <Text style={st.resultSub}>
            {t("pronQuiz.resultCount", {
              correct: correctCount,
              total: questions.length,
            })}
          </Text>
          <Pressable style={{ width: "100%" }} onPress={() => router.back()}>
            {({ pressed }) => (
              <LinearGradient
                colors={[C.purple, C.purpleDk]}
                style={[st.resultBtn, pressed && { opacity: 0.9 }]}
              >
                <Text style={st.resultBtnText}>{t("pronQuiz.done")}</Text>
              </LinearGradient>
            )}
          </Pressable>
        </Animated.View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={[C.bgTop, C.bgBot]} style={{ flex: 1 }}>
      {/* 헤더 */}
      <View style={[st.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={30} color="#5f7f9f" />
        </Pressable>
        <View style={st.dots}>
          {results.map((r, i) => (
            <View
              key={i}
              style={[st.dot, r === null && i === index && st.dotCurrent]}
            >
              {r === true && (
                <Ionicons name="ellipse-outline" size={22} color={C.green} />
              )}
              {r === false && <Ionicons name="close" size={22} color={C.red} />}
            </View>
          ))}
        </View>
        <View style={[st.modeChip, isHard && { backgroundColor: "#ff8a5b" }]}>
          <Text style={st.modeChipText}>{isHard ? "HARD" : "EASY"}</Text>
        </View>
      </View>

      {/* 목표 카드 — HARD 는 글자를 감춰서 귀로만 풀게 한다 */}
      <View style={st.targetCard}>
        {isHard ? (
          <>
            <Ionicons name="volume-high" size={54} color="#6b8ba4" />
            <Text style={st.targetHidden}>{t("pronQuiz.listenOnly")}</Text>
          </>
        ) : (
          <>
            <Text style={st.targetWord}>{target.word}</Text>
            <Text style={st.targetIpa}>
              {stage.a} vs {stage.b}
            </Text>
          </>
        )}
      </View>

      <Text style={st.question}>{t("pronQuiz.question")}</Text>

      <View style={st.optRow}>
        {q.options.map((opt, i) => (
          <OptionCard
            key={`${index}-${i}`}
            flip={flip}
            opt={opt}
            showJamo={!isHard}
            result={
              selected === i ? (i === q.answer ? "correct" : "wrong") : null
            }
            disabled={selected !== null}
            onPress={() => pick(i)}
          />
        ))}
      </View>

      <View style={{ flex: 1 }} />

      {/* 하단: 다시 듣기 + 다음 */}
      <View style={[st.bottom, { paddingBottom: insets.bottom + 18 }]}>
        <View style={st.sideBtn} />

        <Pressable onPress={speakTarget}>
          {({ pressed }) => (
            <LinearGradient
              colors={[C.purple, C.purpleDk]}
              style={[st.replayBtn, pressed && { opacity: 0.88 }]}
            >
              <Ionicons name="volume-high" size={44} color="#fff" />
            </LinearGradient>
          )}
        </Pressable>

        <Pressable
          style={st.sideBtn}
          onPress={next}
          disabled={selected === null || index === questions.length - 1}
        >
          <Ionicons
            name="play"
            size={26}
            color={selected === null ? "#b9c6d4" : C.purple}
          />
          <Text
            style={[st.sideText, selected === null && { color: "#b9c6d4" }]}
          >
            {t("pronQuiz.next")}
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

// ── 옵션 카드 (뒤집기) ──
function OptionCard({ flip, opt, result, disabled, onPress, showJamo }: any) {
  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 900 },
      { rotateY: `${interpolate(flip.value, [0, 1], [180, 360])}deg` },
    ],
    backfaceVisibility: "hidden",
  }));
  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 900 },
      { rotateY: `${interpolate(flip.value, [0, 1], [0, 180])}deg` },
    ],
    backfaceVisibility: "hidden",
  }));

  const borderColor =
    result === "correct" ? C.green : result === "wrong" ? C.red : "transparent";

  return (
    <View style={st.cardOuter}>
      {result && (
        <Animated.View
          entering={FadeIn.duration(200)}
          style={[
            st.badge,
            {
              backgroundColor: result === "correct" ? C.greenBadge : C.redBadge,
            },
          ]}
        >
          <Ionicons
            name={result === "correct" ? "ellipse-outline" : "close"}
            size={26}
            color="#fff"
          />
        </Animated.View>
      )}

      <View style={st.cardBox}>
        {/* 뒷면 — 고르기 전 */}
        <Animated.View style={[st.face, st.cardBack, backStyle]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onPress}
            disabled={disabled}
          >
            <View style={st.backInner}>
              <Text style={st.backWord}>{opt.word}</Text>
              {showJamo && <Text style={st.backJamo}>{opt.jamo}</Text>}
            </View>
          </Pressable>
        </Animated.View>

        {/* 앞면 — 고른 뒤 */}
        <Animated.View
          style={[
            st.face,
            st.cardFront,
            { borderColor, borderWidth: result ? 3.5 : 0 },
            frontStyle,
          ]}
        >
          <Pressable
            style={st.cardSpeaker}
            onPress={() => speakText(opt.word)}
            hitSlop={8}
          >
            <Ionicons name="volume-medium" size={26} color={C.gray} />
          </Pressable>
          <View style={st.cardInner}>
            <Text style={st.optWord}>{opt.word}</Text>
            <View style={st.jamoPill}>
              <Text style={st.jamoPillText}>{opt.jamo}</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: "700",
    color: C.ink,
    marginBottom: 18,
  },
  emptyBtn: {
    backgroundColor: C.purple,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 34,
  },
  emptyBtnText: { color: "#fff", fontWeight: "800", fontSize: 16 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
    paddingBottom: 8,
  },
  dots: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  dot: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#b6dcf3",
    alignItems: "center",
    justifyContent: "center",
  },
  dotCurrent: {
    backgroundColor: "#a3d3f0",
    borderWidth: 2,
    borderColor: "#7fbde8",
  },
  modeChip: {
    backgroundColor: "#7fbde8",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9,
  },
  modeChipText: { color: "#fff", fontSize: 12, fontWeight: "900" },

  targetCard: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: C.targetCard,
    borderRadius: 22,
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 150,
  },
  targetWord: { fontSize: 48, fontWeight: "800", color: C.ink },
  targetIpa: {
    fontSize: 20,
    color: "#6b7a88",
    marginTop: 6,
    fontWeight: "700",
  },
  targetHidden: {
    fontSize: 16,
    color: "#5f7f9f",
    marginTop: 10,
    fontWeight: "700",
  },

  question: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: C.ink,
    marginTop: 28,
  },

  optRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  cardOuter: { flex: 1, maxWidth: 200, alignItems: "center" },
  badge: {
    position: "absolute",
    top: -18,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  cardBox: { width: "100%", height: 200 },
  face: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 18,
    backgroundColor: C.optCard,
  },

  cardBack: {
    backgroundColor: C.back,
    borderWidth: 5,
    borderColor: "#fff",
    overflow: "hidden",
  },
  backInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  backWord: { fontSize: 34, fontWeight: "800", color: "#ffffff" },
  backJamo: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
    opacity: 0.75,
  },

  cardFront: {
    backgroundColor: C.optCard,
    paddingTop: 16,
    paddingHorizontal: 14,
    paddingBottom: 12,
    shadowColor: "#7a90a8",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardSpeaker: { position: "absolute", top: 12, right: 12, zIndex: 2 },
  cardInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  optWord: { fontSize: 30, fontWeight: "800", color: C.ink },
  jamoPill: {
    backgroundColor: "#efeafb",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
  jamoPillText: { fontSize: 17, fontWeight: "800", color: C.purpleDk },

  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  sideBtn: { alignItems: "center", gap: 4, width: 80 },
  sideText: { fontSize: 15, fontWeight: "800", color: C.purple },
  replayBtn: {
    width: 108,
    height: 108,
    borderRadius: 54,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.purpleDk,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },

  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 28,
    width: "100%",
    alignItems: "center",
  },
  resultIcon: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  resultScore: { fontSize: 52, fontWeight: "900", color: C.ink },
  resultSub: {
    fontSize: 16,
    fontWeight: "600",
    color: C.gray,
    marginTop: 4,
    marginBottom: 24,
  },
  resultBtn: { borderRadius: 16, paddingVertical: 16, alignItems: "center" },
  resultBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
});
