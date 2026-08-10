import { useState, useEffect, useMemo } from "react";
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
  withSpring,
  interpolate,
  FadeIn,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import {
  stageQuestionPlan,
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

// 문제는 연습 화면에서 넘겨준 단계(level/step)의 최소대립쌍에서 만든다
interface Opt {
  word: string;
  ipa: string;
  meaning: string;
}
interface PQ {
  options: [Opt, Opt];
  answer: 0 | 1;
}

const toQuestion = (pair: [PronOption, PronOption], answer: 0 | 1): PQ => ({
  options: [
    { word: pair[0].word, ipa: pair[0].jamo, meaning: "" },
    { word: pair[1].word, ipa: pair[1].jamo, meaning: "" },
  ],
  answer,
});

const speakEn = (w: string) => speakText(w);

const speakWord = (w: string) => {
  Speech.stop();
  speakText(w);
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
  const QUESTIONS = useMemo<PQ[]>(
    () =>
      stageQuestionPlan(
        (params.level ?? "lv1") as PronLevel,
        Number(params.step ?? 1),
      ).map((p) => toQuestion(p.pair, p.answer)),
    [params.level, params.step],
  );

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [results, setResults] = useState<(boolean | null)[]>(
    Array(QUESTIONS.length).fill(null),
  );

  const q = QUESTIONS[index];
  const target = q.options[q.answer];

  const flip = useSharedValue(0);
  const ring = useSharedValue(1);

  useEffect(() => {
    ring.value = 1;
  }, []);

  const speakOptions = () => {
    Speech.stop();
    const [a, b] = q.options;
    speakText(a.word, "ko-KR", {
      onDone: () => {
        setTimeout(() => speakText(b.word), 450);
      },
    });
  };

  useEffect(() => {
    flip.value = 0;
    setSelected(null);
    const t1 = setTimeout(() => speakOptions(), 600);
    return () => {
      clearTimeout(t1);
      Speech.stop();
    };
  }, [index]);

  const pick = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === q.answer;
    setResults((r) => {
      const n = [...r];
      n[index] = correct;
      return n;
    });
    flip.value = withTiming(1, { duration: 480 }); // 고르면 앞면으로 뒤집기
    if (correct) setTimeout(() => speakWord(target.word), 300);
  };

  const next = () => setIndex((i) => (i + 1) % QUESTIONS.length);

  const replay = () => {
    ring.value = withSpring(1.15, { damping: 6 }, () => {
      ring.value = withSpring(1);
    });
    speakOptions(); // 두 단어 순서대로
  };

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ring.value }],
  }));

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
                <Ionicons name="ellipse-outline" size={15} color={C.green} />
              )}
              {r === false && <Ionicons name="close" size={15} color={C.red} />}
            </View>
          ))}
        </View>
      </View>

      {/* 타겟 단어 카드 */}
      <View style={st.targetCard}>
        <Text style={st.targetWord}>{target.word}</Text>
        <Text style={st.targetIpa}>[ {target.ipa} ]</Text>
      </View>

      <Text style={st.question}>{t("pronQuiz.question")}</Text>

      {/* 옵션 카드 2개 */}
      <View style={st.optRow}>
        {q.options.map((opt, i) => (
          <OptionCard
            key={i}
            flip={flip}
            opt={opt}
            result={
              selected === i ? (i === q.answer ? "correct" : "wrong") : null
            }
            disabled={selected !== null}
            onPress={() => pick(i)}
            practiceLabel={t("pronQuiz.practice")}
          />
        ))}
      </View>

      <View style={{ flex: 1 }} />

      {/* 하단: 강의보기 | 리플레이 | 다음문제 */}
      <View style={[st.bottom, { paddingBottom: insets.bottom + 18 }]}>
        <Pressable style={st.sideBtn}>
          <View style={st.lectureIcon}>
            <Ionicons name="play" size={16} color="#fff" />
          </View>
          <Text style={st.sideText} numberOfLines={2}>
            {t("pronQuiz.lecture")}
          </Text>
        </Pressable>

        <Animated.View style={[st.replayWrap, ringStyle]}>
          <Pressable onPress={replay}>
            {({ pressed }) => (
              <LinearGradient
                colors={[C.purple, C.purpleDk]}
                style={[
                  st.replayBtn,
                  pressed && { transform: [{ scale: 0.95 }] },
                ]}
              >
                <Ionicons name="volume-high" size={36} color="#fff" />
              </LinearGradient>
            )}
          </Pressable>
        </Animated.View>

        <Pressable style={st.sideBtn} onPress={next}>
          <Ionicons name="play" size={26} color={C.purple} />
          <Text style={st.sideText} numberOfLines={2}>
            {t("pronQuiz.next")}
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

// ── 옵션 카드 (뒤집기) ──
function OptionCard({
  flip,
  opt,
  result,
  disabled,
  onPress,
  practiceLabel,
}: any) {
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
      {/* 뱃지 */}
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
        {/* 뒷면 (패턴) */}
        <Animated.View style={[st.face, st.cardBack, backStyle]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onPress}
            disabled={disabled}
          >
            {["c", "!", "?", "*", "'", ",", "c", "!", "?", "•", "*", "'"].map(
              (s, i) => (
                <Text key={i} style={[st.sym, SYM_POS[i]]}>
                  {s}
                </Text>
              ),
            )}
          </Pressable>
        </Animated.View>

        {/* 앞면 (단어) */}
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
            onPress={() => speakEn(opt.word)}
            hitSlop={8}
          >
            <Ionicons name="volume-medium" size={26} color={C.gray} />
          </Pressable>
          <Pressable style={st.cardInner} onPress={onPress} disabled={disabled}>
            <Text style={st.optWord}>{opt.word}</Text>
            <Text style={st.optIpa}>[ {opt.ipa} ]</Text>
            <Text style={st.optMeaning}>{opt.meaning}</Text>
          </Pressable>
          <View style={st.divider} />
          <Pressable style={st.practiceBtn} hitSlop={6}>
            <Ionicons name="mic" size={20} color={C.purple} />
            <Text style={st.practiceText} numberOfLines={1}>
              {practiceLabel}
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

// 뒷면 심볼 위치
const SYM_POS = [
  { top: "10%", left: "20%" },
  { top: "8%", right: "15%" },
  { top: "28%", left: "12%" },
  { top: "24%", right: "22%" },
  { top: "44%", left: "24%" },
  { top: "40%", right: "12%" },
  { top: "58%", left: "14%" },
  { top: "62%", right: "20%" },
  { top: "76%", left: "26%" },
  { top: "72%", right: "14%" },
  { top: "88%", left: "18%" },
  { top: "50%", left: "48%" },
] as any;

const st = StyleSheet.create({
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
    gap: 5,
    // 문제가 12~16개라 한 줄에 다 못 넣는다. 두 줄까지만 쓰고 크기를 줄임
    flexWrap: "wrap",
    rowGap: 5,
  },
  dot: {
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: "#b6dcf3",
    alignItems: "center",
    justifyContent: "center",
  },
  dotCurrent: {
    backgroundColor: "#a3d3f0",
    borderWidth: 2,
    borderColor: "#5fa8dc",
  },

  targetCard: {
    marginHorizontal: 20,
    marginTop: 14,
    backgroundColor: C.targetCard,
    borderRadius: 22,
    paddingVertical: 22,
    alignItems: "center",
  },
  targetWord: { fontSize: 44, fontWeight: "800", color: C.ink },
  targetIpa: { fontSize: 20, color: "#6b7a88", marginTop: 4 },

  question: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: C.ink,
    marginTop: 18,
  },

  optRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    marginTop: 16,
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
  cardBox: { width: "100%", height: 192 },
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
  sym: {
    position: "absolute",
    color: C.backSym,
    fontSize: 22,
    fontWeight: "800",
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
    gap: 8,
  },
  optWord: { fontSize: 30, fontWeight: "800", color: C.ink },
  optIpa: { fontSize: 18, color: C.gray },
  optMeaning: { fontSize: 17, color: C.gray, fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#eceff3", marginVertical: 8 },
  practiceBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 4,
  },
  practiceText: { fontSize: 14, fontWeight: "800", color: C.purple },

  bottom: {
    flexDirection: "row",
    // flex-end 라 라벨이 큰 버튼 아래로 흘러 내비바에 깔렸다. 가운데 정렬로
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingTop: 8,
  },
  sideBtn: { alignItems: "center", gap: 4, width: 74 },
  lectureIcon: {
    width: 34,
    height: 26,
    borderRadius: 8,
    backgroundColor: C.purple,
    alignItems: "center",
    justifyContent: "center",
  },
  sideText: {
    fontSize: 13,
    fontWeight: "800",
    color: C.purple,
    textAlign: "center",
  },
  replayWrap: {},
  replayBtn: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.purpleDk,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
});
