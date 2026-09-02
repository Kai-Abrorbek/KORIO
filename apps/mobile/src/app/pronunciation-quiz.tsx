import { useCallback, useState, useEffect, useMemo, useRef } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AUTO_SPEECH_DELAY_MS, useSpeech } from "@/hooks/useSpeech";
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
  correctNeededFor,
  HARD_UNLOCK_SCORE,
  STAGE_PASS_SCORE,
  type PronLevel,
  type PronOption,
} from "@/constants/pronunciation";
import { UserService } from "@/services/user.service";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";
import { glossOf } from "@/constants/pronunciation-gloss";

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

const BETWEEN_WORDS_DELAY_MS = 60;
const CORRECT_REPLAY_DELAY_MS = 180;

type SaveStatus = "idle" | "saving" | "saved" | "error";

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

const toOpt = (o: PronOption, lang: string): Opt => ({
  word: o.word,
  ipa: o.jamo,
  meaning: glossOf(o.word, lang),
});

/**
 * 대립쌍 → 문제.
 *
 * 좌우 자리를 무작위로 바꾼다. 데이터 순서를 그대로 쓰면 왼쪽은 늘 평음,
 * 오른쪽은 늘 격음이라 두세 문제만에 규칙이 들통난다.
 * 자리를 바꾸면 정답 인덱스도 같이 뒤집어야 한다.
 */
const toQuestion = (
  pair: [PronOption, PronOption],
  answer: 0 | 1,
  lang: string,
): PQ => {
  const swap = Math.random() < 0.5;
  const [l, r] = swap ? [pair[1], pair[0]] : pair;
  return {
    options: [toOpt(l, lang), toOpt(r, lang)],
    answer: (swap ? 1 - answer : answer) as 0 | 1,
  };
};

export default function PronunciationQuiz() {
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { speak, stop, prewarm } = useSpeech();
  const secondSpeechTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const correctSpeechTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const saveRequestRef = useRef(0);

  const params = useLocalSearchParams<{
    level?: string;
    step?: string;
    mode?: string;
  }>();
  const level = (params.level ?? "lv1") as PronLevel;
  const step = Number(params.step ?? 1);
  const isHard = params.mode === "hard";

  const QUESTIONS = useMemo<PQ[]>(
    () =>
      stageQuestionPlan(level, step).map((p) =>
        toQuestion(p.pair, p.answer, i18n.language),
      ),
    [level, step, i18n.language],
  );

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [results, setResults] = useState<(boolean | null)[]>(
    Array(QUESTIONS.length).fill(null),
  );
  // 마지막 문제를 풀면 결과로. 전엔 첫 문제로 되감겨서 끝이 없었다
  const [finished, setFinished] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const q = QUESTIONS[index];
  const target = q.options[q.answer];

  // HARD 는 보기를 처음부터 앞면(글자)으로 둔다. 소리를 글자에 맞춰야 해서 더 어렵다
  const flip = useSharedValue(isHard ? 1 : 0);
  const ring = useSharedValue(1);

  useEffect(() => {
    ring.value = 1;
  }, []);

  const speakOptions = useCallback(() => {
    if (secondSpeechTimerRef.current) {
      clearTimeout(secondSpeechTimerRef.current);
      secondSpeechTimerRef.current = null;
    }
    if (correctSpeechTimerRef.current) {
      clearTimeout(correctSpeechTimerRef.current);
      correctSpeechTimerRef.current = null;
    }
    stop();
    // HARD 는 정답 하나만. 두 개를 순서대로 들려주면 순서만 기억해도 풀린다
    if (isHard) {
      speak(target.word);
      return;
    }
    const [a, b] = q.options;
    speak(a.word, "ko-KR", {
      onDone: () => {
        secondSpeechTimerRef.current = setTimeout(() => {
          secondSpeechTimerRef.current = null;
          speak(b.word);
        }, BETWEEN_WORDS_DELAY_MS);
      },
    });
  }, [isHard, q.options, speak, stop, target.word]);

  useEffect(() => {
    flip.value = isHard ? 1 : 0;
    setSelected(null);

    // 현재 두 단어는 병렬로 준비한다. 첫 단어가 끝난 다음 두 번째 단어의
    // Azure 음원을 요청하면 한 음절짜리 문제에서도 침묵이 길어지기 때문이다.
    prewarm([q.options[0].word], "ko-KR");
    prewarm([q.options[1].word], "ko-KR");

    // 현재 문제를 듣는 동안 다음 두 문제도 순서대로 준비해 카드 전환 지연을 없앤다.
    const upcomingWords = QUESTIONS.slice(index + 1, index + 3)
      .flatMap((question) => question.options.map((option) => option.word))
      .filter(
        (word, wordIndex, words) => words.indexOf(word) === wordIndex,
      );
    if (upcomingWords.length > 0) prewarm(upcomingWords, "ko-KR");

    const t1 = setTimeout(() => speakOptions(), AUTO_SPEECH_DELAY_MS);
    return () => {
      clearTimeout(t1);
      if (secondSpeechTimerRef.current) {
        clearTimeout(secondSpeechTimerRef.current);
        secondSpeechTimerRef.current = null;
      }
      if (correctSpeechTimerRef.current) {
        clearTimeout(correctSpeechTimerRef.current);
        correctSpeechTimerRef.current = null;
      }
      stop();
    };
  }, [
    QUESTIONS,
    flip,
    index,
    isHard,
    prewarm,
    q.options,
    speakOptions,
    stop,
  ]);

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
    if (correct) {
      correctSpeechTimerRef.current = setTimeout(() => {
        correctSpeechTimerRef.current = null;
        speak(target.word);
      }, CORRECT_REPLAY_DELAY_MS);
    }
  };

  const next = () => {
    if (secondSpeechTimerRef.current) {
      clearTimeout(secondSpeechTimerRef.current);
      secondSpeechTimerRef.current = null;
    }
    if (correctSpeechTimerRef.current) {
      clearTimeout(correctSpeechTimerRef.current);
      correctSpeechTimerRef.current = null;
    }
    stop();
    if (index >= QUESTIONS.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
  };

  const replay = () => {
    ring.value = withSpring(1.15, { damping: 6 }, () => {
      ring.value = withSpring(1);
    });
    speakOptions(); // 두 단어 순서대로
  };

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ring.value }],
  }));

  const correctCount = results.filter((r) => r === true).length;
  const score = QUESTIONS.length
    ? Math.round((correctCount / QUESTIONS.length) * 100)
    : 0;

  const saveResult = useCallback(() => {
    const requestId = ++saveRequestRef.current;
    setSaveStatus("saving");
    UserService.savePronunciation({
      level,
      step,
      mode: isHard ? "hard" : "easy",
      score,
    })
      .then(() => {
        if (saveRequestRef.current === requestId) setSaveStatus("saved");
      })
      .catch(() => {
        if (saveRequestRef.current === requestId) setSaveStatus("error");
      });
  }, [isHard, level, score, step]);

  // 결과 화면에서 저장 완료 여부를 직접 보여주고, 실패하면 같은 결과를 재전송한다
  useEffect(() => {
    if (finished) saveResult();
  }, [finished, saveResult]);

  useEffect(
    () => () => {
      saveRequestRef.current += 1;
    },
    [],
  );

  if (finished) {
    const passed = score >= STAGE_PASS_SCORE;
    const { need } = correctNeededFor(level, step, HARD_UNLOCK_SCORE);
    const hardOpen = score >= HARD_UNLOCK_SCORE;
    return (
      <LinearGradient colors={[C.bgTop, C.bgBot]} style={st.resultWrap}>
        <Animated.View entering={FadeIn.duration(220)} style={st.resultCard}>
          <HaneulmonMascot
            size={112}
            mood={hardOpen ? "celebrating" : passed ? "great" : "confused"}
          />
          <Text style={st.resultScore}>{score}</Text>
          <Text style={st.resultSub}>
            {t("pronQuiz.resultCount", {
              correct: correctCount,
              total: QUESTIONS.length,
            })}
          </Text>

          {/* 점수가 어떻게 나온 건지 숨기지 않는다 */}
          <Text style={st.resultRule}>
            {t("pronQuiz.perQuestion", {
              pts: (100 / QUESTIONS.length).toFixed(1),
            })}
          </Text>

          <View
            style={[
              st.resultBanner,
              { backgroundColor: hardOpen ? "#e3f7d9" : "#eef2f6" },
            ]}
          >
            <Ionicons
              name={hardOpen ? "lock-open" : "lock-closed"}
              size={16}
              color={hardOpen ? C.greenBadge : "#7b8b99"}
            />
            <Text
              style={[
                st.resultBannerText,
                { color: hardOpen ? C.greenBadge : "#5f7383" },
              ]}
            >
              {isHard
                ? t("pronQuiz.hardDone")
                : hardOpen
                  ? t("pronQuiz.hardUnlocked")
                  : t("pronQuiz.hardNeed", { need })}
            </Text>
          </View>

          <View style={st.saveStatusRow}>
            {saveStatus === "saving" && (
              <>
                <ActivityIndicator size="small" color={C.purpleDk} />
                <Text style={st.saveStatusText}>{t("pronQuiz.saving")}</Text>
              </>
            )}
            {saveStatus === "saved" && (
              <>
                <Ionicons name="checkmark-circle" size={20} color={C.green} />
                <Text style={st.saveStatusText}>{t("pronQuiz.saved")}</Text>
              </>
            )}
            {saveStatus === "error" && (
              <>
                <Ionicons name="alert-circle" size={20} color={C.red} />
                <Text style={st.saveErrorText}>
                  {t("pronQuiz.saveFailed")}
                </Text>
                <Pressable onPress={saveResult} hitSlop={8}>
                  <Text style={st.saveRetryText}>
                    {t("pronQuiz.retrySave")}
                  </Text>
                </Pressable>
              </>
            )}
          </View>

          <Pressable
            style={{ width: "100%" }}
            onPress={() => router.back()}
            disabled={saveStatus !== "saved"}
          >
            {({ pressed }) => (
              <LinearGradient
                colors={[C.purple, C.purpleDk]}
                style={[
                  st.resultBtn,
                  saveStatus !== "saved" && st.resultBtnDisabled,
                  pressed && saveStatus === "saved" && { opacity: 0.9 },
                ]}
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
                <Ionicons name="ellipse-outline" size={15} color={C.green} />
              )}
              {r === false && <Ionicons name="close" size={15} color={C.red} />}
            </View>
          ))}
        </View>
        <View style={[st.modeChip, isHard && st.modeChipHard]}>
          <Text style={st.modeChipText}>{isHard ? "HARD" : "EASY"}</Text>
        </View>
      </View>

      {/* 타겟 카드 — EASY 는 글자를 보여주고, HARD 는 귀로만 풀게 한다 */}
      <View style={st.targetCard}>
        {isHard ? (
          <>
            <Ionicons name="volume-high" size={52} color="#6b8ba4" />
            <Text style={st.targetHidden}>{t("pronQuiz.listenOnly")}</Text>
          </>
        ) : (
          <>
            <Text style={st.targetWord}>{target.word}</Text>
            <Text style={st.targetIpa}>[ {target.ipa} ]</Text>
          </>
        )}
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
            onSpeak={() => speak(opt.word)}
            practiceLabel={t("pronQuiz.practice")}
            hideJamo={isHard}
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

        {/* 답을 고르기 전엔 못 넘어간다. 그냥 눌러서 건너뛰면 점수가 무의미해진다 */}
        <Pressable
          style={st.sideBtn}
          onPress={next}
          disabled={selected === null}
        >
          <Ionicons
            name="play"
            size={26}
            color={selected === null ? "#aebecb" : C.purple}
          />
          <Text
            style={[st.sideText, selected === null && { color: "#aebecb" }]}
            numberOfLines={2}
          >
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
  onSpeak,
  practiceLabel,
  hideJamo,
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

      <Pressable
        style={st.cardBox}
        onPress={disabled ? undefined : onPress}
        accessibilityRole="button"
      >
        {/* 뒷면 (패턴) */}
        <Animated.View
          pointerEvents="none"
          style={[st.face, st.cardBack, backStyle]}
        >
          {["c", "!", "?", "*", "'", ",", "c", "!", "?", "•", "*", "'"].map(
            (s, i) => (
              <Text key={i} style={[st.sym, SYM_POS[i]]}>
                {s}
              </Text>
            ),
          )}
        </Animated.View>

        {/* 앞면 (단어) */}
        <Animated.View
          pointerEvents="none"
          style={[
            st.face,
            st.cardFront,
            { borderColor, borderWidth: result ? 3.5 : 0 },
            frontStyle,
          ]}
        >
          <View style={st.cardInner}>
            <Text style={st.optWord}>{opt.word}</Text>
            {!hideJamo && <Text style={st.optIpa}>[ {opt.ipa} ]</Text>}
            <Text style={st.optMeaning}>{opt.meaning}</Text>
          </View>
          <View style={st.divider} />
          <View style={st.practiceBtn}>
            <Ionicons name="mic" size={20} color={C.purple} />
            <Text style={st.practiceText} numberOfLines={1}>
              {practiceLabel}
            </Text>
          </View>
        </Animated.View>

        {(hideJamo || disabled) && (
          <Pressable
            style={st.cardSpeaker}
            onPress={(event) => {
              event.stopPropagation();
              onSpeak();
            }}
            hitSlop={8}
          >
            <Ionicons name="volume-medium" size={26} color={C.gray} />
          </Pressable>
        )}
      </Pressable>
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
  targetHidden: {
    fontSize: 15,
    color: "#5f7f9f",
    marginTop: 8,
    fontWeight: "700",
  },
  modeChip: {
    backgroundColor: "#7fbde8",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9,
  },
  modeChipHard: { backgroundColor: "#ff8a5b" },
  modeChipText: { color: "#fff", fontSize: 12, fontWeight: "900" },
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
  resultWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 26,
    padding: 26,
    width: "100%",
    alignItems: "center",
  },
  resultScore: { fontSize: 54, fontWeight: "900", color: C.ink, marginTop: 4 },
  resultSub: { fontSize: 16, fontWeight: "700", color: C.gray, marginTop: 2 },
  resultRule: { fontSize: 12, fontWeight: "600", color: C.gray, marginTop: 6 },
  resultBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 18,
    marginBottom: 12,
  },
  resultBannerText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  saveStatusRow: {
    minHeight: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginBottom: 12,
  },
  saveStatusText: { fontSize: 13, fontWeight: "700", color: "#657786" },
  saveErrorText: { fontSize: 13, fontWeight: "700", color: C.red },
  saveRetryText: {
    fontSize: 13,
    fontWeight: "900",
    color: C.purpleDk,
    textDecorationLine: "underline",
  },
  resultBtn: { borderRadius: 16, paddingVertical: 16, alignItems: "center" },
  resultBtnDisabled: { opacity: 0.45 },
  resultBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
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
