import { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSpeech } from "@/hooks/useSpeech";
import { shuffle } from "@/utils/shuffle";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";

const C = {
  bgTop: "#cfe7fa",
  bgBot: "#cdeaf0",
  cardTop: "#ffffff",
  cardBot: "#ffffff",
  cardOkTop: "#e7f7d6",
  cardOkBot: "#f4fbe9",
  levelTab: "#bcdcf5",
  levelInk: "#5a7a9a",
  badge: "#5aa9e0",
  badgeReview: "#54c8bf",
  ink: "#2b2b3a",
  green: "#3cba54",
  blank: "#cfe4f8",
  blankOk: "#c9ebd0",
  blankInk: "#3a6ea5",
  purple: "#8b7ff0",
  purpleDk: "#6f61e6",
  okBg: "#e3f7d9",
  okBorder: "#8fd66f",
  okText: "#3f9e46",
  noBg: "#fde0e4",
  noBorder: "#f3a7b1",
  noText: "#d0455a",
  hintBg: "#fbc44d",
  hintInk: "#6b4e12",
  hintRed: "#e0453a",
  track: "#b9d9ef",
  trackFill: "#7ec8ef",
};

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
  /** 다음 문제로. 이 유형은 아래 피드백 바를 쓰지 않는다 */
  onNext: () => void;
}

/**
 * 문법 문장 조립 문제 (grammar_build).
 * 채점·피드백·XP 는 레슨 엔진이 하고 여기서는 고른 어절만 넘긴다.
 */
export default function GrammarBuild({
  question,
  answerState,
  onAnswer,
  onNext,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { speak } = useSpeech();

  // 시드는 정답을 항상 첫 칸에 둔다. 그대로 쓰면 왼쪽만 누르면 다 맞는다.
  // 문제가 바뀔 때 한 번만 섞는다 — 오답 카드 색이 자리를 옮기면 안 되니까.
  const rawRows = question.buildRows;
  const rows = useMemo(
    () =>
      (rawRows ?? []).map((row) => ({ ...row, options: shuffle(row.options) })),
    [rawRows],
  );

  // 문장 전체를 어절로 조립하므로 고정 앞뒤 문구는 없다
  const q = {
    id: question.id,
    rows,
    full: question.answer,
    prompt: question.answerTranslation ?? "",
    pattern: question.tags?.[0] ?? "",
    before: "",
    after: "",
    // 선택지별 힌트. 시드가 채워주면 쓰고, 없으면 아래에서 문구를 만든다
    hints: (question.buildRows ?? []).reduce<Record<string, string>>(
      (acc, row: any) => ({ ...acc, ...(row.hints ?? {}) }),
      {},
    ),
  };

  /**
   * 문장이 길어지면 글자를 줄인다.
   *
   * 조각을 단어 단위로 쪼갠 뒤로 한 문장이 6조각까지 나온다. 28px 고정이면
   * 세 줄로 넘어가면서 카드가 터진다. 조각 수와 글자 수로 단계를 잡는다.
   */
  const fit = useMemo(() => {
    // 카드 안쪽 폭 = 화면 - 카드 바깥 여백 18*2 - 카드 안쪽 여백 18*2
    const inner = width - 72;
    const chars = rows.reduce((n, r) => n + r.correct.length, 0);
    const n = rows.length || 1;
    const LADDER = [
      { size: 26, line: 34, padH: 9, gap: 6 },
      { size: 23, line: 31, padH: 8, gap: 6 },
      { size: 21, line: 29, padH: 8, gap: 5 },
      { size: 19, line: 26, padH: 7, gap: 5 },
      { size: 17, line: 24, padH: 7, gap: 4 },
      { size: 15, line: 22, padH: 6, gap: 4 },
    ];
    // 한글은 글자폭 ≈ 글자크기. 두 줄 안에 들어가는 가장 큰 단계를 고른다.
    const budget = inner * 2 * 0.92;
    return (
      LADDER.find((f) => chars * f.size + n * (f.padH * 2 + f.gap) <= budget) ??
      LADDER[LADDER.length - 1]
    );
  }, [rows, width]);

  /** 고른 조각을 문장으로 잇는다. glue 조각("이에요")은 앞말에 붙여 쓴다 */
  const joinPicks = (words: string[]) =>
    words.reduce(
      (acc, w, i) => (i === 0 || q.rows[i]?.glue ? acc + w : acc + " " + w),
      "",
    );

  const [picks, setPicks] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [attemptWrong, setAttemptWrong] = useState(false);
  const [lastPicks, setLastPicks] = useState<string[]>([]);
  /** 채점을 엔진에 넘긴 적이 있는지. 오답도 첫 시도 한 번만 기록한다 */
  const [reported, setReported] = useState(false);
  /** 두 번째 시도 이후에 맞힌 경우. 엔진은 이미 오답으로 기록했다 */
  const [solvedLate, setSolvedLate] = useState(false);

  const allPicked = currentRow >= q.rows.length;
  const isOk = answerState === "correct" || solvedLate;

  const shake = useSharedValue(0);
  const check = useSharedValue(0);
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));
  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: check.value }],
    opacity: check.value,
  }));

  useEffect(() => {
    setPicks([]);
    setCurrentRow(0);
    setAttemptWrong(false);
    setLastPicks([]);
    setReported(false);
    setSolvedLate(false);
    check.value = 0;
  }, [q.id]);

  // 채점 결과는 엔진이 알려준다
  useEffect(() => {
    if (answerState === "correct") check.value = 1;
  }, [answerState]);

  const pickWord = (rowIndex: number, w: string) => {
    if (rowIndex !== currentRow || isOk) return;
    setPicks((p) => [...p, w]);
    setCurrentRow((r) => r + 1);
  };

  const undo = () => {
    if (picks.length === 0 || isOk) return;
    setPicks((p) => p.slice(0, -1));
    setCurrentRow((r) => r - 1);
  };

  /**
   * 정답이 될 때까지 다시 풀게 한다.
   *
   * 엔진에는 첫 시도 결과만 넘긴다(오답 기록은 한 번이면 된다). 그 뒤로는
   * 컴포넌트가 직접 맞는지 보고, 틀리면 힌트를 띄운 뒤 틀린 자리부터 다시
   * 고르게 한다 — 정답을 알려주고 넘겨버리면 조립 문제의 뜻이 없다.
   */
  const runCheck = (chosen: string[]) => {
    if (chosen.length < q.rows.length || isOk) return;

    const right = q.rows.every((row, i) => chosen[i] === row.correct);

    if (!reported) {
      setReported(true);
      onAnswer(joinPicks(chosen)); // 첫 시도 — 맞든 틀리든 엔진이 기록한다
      if (right) return;
    } else if (right) {
      setSolvedLate(true);
      check.value = 1;
      return;
    }

    // 틀렸다: 어디가 틀렸는지 남기고 그 자리부터 다시
    const wrongAt = chosen.findIndex((w, i) => w !== q.rows[i]?.correct);
    setLastPicks(chosen);
    setAttemptWrong(true);
    shake.value = withSequence(
      withTiming(-8, { duration: 55 }),
      withTiming(8, { duration: 55 }),
      withTiming(-5, { duration: 55 }),
      withTiming(0, { duration: 55 }),
    );
    if (wrongAt >= 0) {
      setPicks(chosen.slice(0, wrongAt));
      setCurrentRow(wrongAt);
    }
  };

  /**
   * 마지막 조각을 고르면 버튼 없이 바로 채점한다.
   *
   * 핸들러 안에서 타이머를 돌리면 그 순간의 picks/reported 에 갇힌다.
   * effect 로 빼면 항상 마지막 렌더의 상태로 채점한다.
   * 카드에 채워지는 걸 잠깐 보여준 뒤 판정한다.
   */
  useEffect(() => {
    if (isOk || picks.length < q.rows.length) return;
    const t = setTimeout(() => runCheck(picks), 260);
    return () => clearTimeout(t);
  }, [picks, isOk]);

  // 카드 색 (오답 후 힌트)
  const cardColor = (i: number, w: string) => {
    if (!attemptWrong || lastPicks[i] !== w) return null;
    return lastPicks[i] === q.rows[i].correct
      ? { bg: C.okBg, border: C.okBorder, text: C.okText }
      : { bg: C.noBg, border: C.noBorder, text: C.noText };
  };

  // 오답 설명
  const wrongIdx = attemptWrong
    ? lastPicks.findIndex((w, i) => w !== q.rows[i]?.correct)
    : -1;
  const showExplain = attemptWrong && !isOk && wrongIdx >= 0;
  const wrongWord = wrongIdx >= 0 ? lastPicks[wrongIdx] : "";

  // 지금 연습 중인 문법
  const badge = q.pattern;

  // 무엇을 만드는지 알려주는 모국어 뜻. q.full(정답)은 맞힌 뒤에만.
  const renderTranslation = () =>
    q.prompt ? <Text style={st.trans}>{q.prompt}</Text> : null;

  return (
    <LinearGradient colors={[C.bgTop, C.bgBot]} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 레벨 탭 */}
        <View style={st.levelTab}>
          <Text style={st.levelText} numberOfLines={1}>
            {badge || t("sentenceBuild.title")}
          </Text>
        </View>

        {/* 카드 */}
        <Animated.View style={cardStyle}>
          <LinearGradient
            colors={isOk ? [C.cardOkTop, C.cardOkBot] : [C.cardTop, C.cardBot]}
            style={st.card}
          >
            {isOk && (
              <Animated.View style={[st.checkMark, checkStyle]}>
                <Ionicons name="checkmark-sharp" size={64} color={C.green} />
              </Animated.View>
            )}

            {/* 정답 문장 + 블랭크 */}
            <View style={st.sentence}>
              {!!q.before && <Text style={st.sentText}>{q.before}</Text>}
              {allPicked || isOk ? (
                picks.map((w, i) => (
                  <View
                    key={i}
                    style={[
                      st.filledWord,
                      {
                        paddingHorizontal: fit.padH,
                        // 앞말에 붙는 조각은 띄우지 않아야 한 단어로 읽힌다
                        marginLeft: i === 0 || q.rows[i]?.glue ? 0 : fit.gap,
                      },
                      isOk && { backgroundColor: C.blankOk },
                    ]}
                  >
                    <Text
                      style={[
                        st.filledText,
                        { fontSize: fit.size, lineHeight: fit.line },
                        isOk && { color: C.okText },
                      ]}
                    >
                      {w}
                    </Text>
                  </View>
                ))
              ) : (
                <View style={[st.blankBox, { paddingHorizontal: fit.padH }]}>
                  <Text
                    style={[
                      st.blankText,
                      { fontSize: fit.size, lineHeight: fit.line },
                    ]}
                  >
                    {joinPicks(picks)}
                  </Text>
                </View>
              )}
              <Text style={st.sentText}>{q.after}</Text>
            </View>

            {/* 무슨 뜻을 만드는지는 처음부터 보여준다. 조립할 문장이
                한국어라 뜻을 감추면 문제를 풀 단서가 없다 */}
            {renderTranslation()}

            {/* 맞힌 뒤에만 완성된 한국어 문장 */}
            {isOk && <Text style={st.answerLine}>{q.full}</Text>}

            {/* 오답 설명 버블 */}
            {showExplain && (
              <Animated.View style={st.hintBubble}>
                <View style={st.hintHead}>
                  <Ionicons name="bulb" size={20} color="#e8a417" />
                  <Text style={st.hintAttempt}>
                    {q.before}
                    {lastPicks.map((w, i) => (
                      <Text
                        key={i}
                        style={
                          w === wrongWord
                            ? { color: C.hintRed, fontWeight: "800" }
                            : undefined
                        }
                      >
                        {w}{" "}
                      </Text>
                    ))}
                  </Text>
                </View>
                <Text style={st.hintText}>
                  {q.hints[wrongWord] ||
                    t("sentenceBuild.wrongHere", { word: wrongWord })}
                </Text>
              </Animated.View>
            )}

            {/* 카드 하단 미니 버튼 (picking 시) */}
            {!isOk && (
              <View style={[st.miniRow, { justifyContent: "flex-end" }]}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Pressable style={st.miniBtn} onPress={undo}>
                    <Ionicons
                      name="arrow-undo"
                      size={20}
                      color={picks.length ? C.purple : "#c9d3de"}
                    />
                  </Pressable>
                  <Pressable style={st.miniBtn}>
                    <Ionicons name="mic" size={20} color={C.purple} />
                  </Pressable>
                </View>
              </View>
            )}
          </LinearGradient>
        </Animated.View>
      </ScrollView>

      {/* ===== 하단 영역 ===== */}
      {isOk ? (
        <View>
          {/* 액션 아이콘 줄 — 아직 기능이 없어서 숨김. 만들면 주석 해제
          <View style={st.actionRow}>
            {[
              { icon: "chatbubbles", label: t("sentenceBuild.otherExample") },
              { icon: "reader", label: t("sentenceBuild.wrongNote"), badge: 8 },
              { icon: "mic-circle", label: t("sentenceBuild.speak") },
              { icon: "search", label: t("sentenceBuild.dictSearch") },
              {
                icon: "chatbox-ellipses",
                label: t("sentenceBuild.sentenceDiagnosis"),
              },
            ].map((a, i) => (
              <Pressable key={i} style={st.actionItem}>
                <View style={st.actionIcon}>
                  <Ionicons name={a.icon as any} size={22} color="#a99ff0" />
                  {a.badge && (
                    <View style={st.actionBadge}>
                      <Text style={st.actionBadgeText}>{a.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={st.actionLabel} numberOfLines={1}>
                  {a.label}
                </Text>
              </Pressable>
            ))}
          </View>
          */}
          <View style={st.bigRow}>
            <BigBtn
              colors={["#a07af0", "#8b6ae8"]}
              icon={<Ionicons name="book" size={28} color="#fff" />}
              label={t("sentenceBuild.exprDict")}
              onPress={() => {}}
            />
            <BigBtn
              colors={["#8f7ff0", "#7161e6"]}
              icon={<Ionicons name="volume-high" size={28} color="#fff" />}
              label={t("sentenceBuild.listenAgain")}
              onPress={() => speak(q.full)}
            />
          </View>

          <View style={[st.nextRow, { paddingBottom: insets.bottom + 8 }]}>
            <Pressable style={[st.nextBtn, st.nextOk]} onPress={onNext}>
              <Text style={st.nextText}>{t("lesson.continue")}</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={st.pickArea}>
          {/* 단어 스택 (뒤=위, 앞=아래) */}
          <View style={st.stack}>
            {q.rows.map((row, i) => {
              if (i < currentRow) return null;
              const depth = i - currentRow;
              const active = depth === 0;
              return (
                <Animated.View
                  key={`${q.id}-${i}`}
                  style={[
                    st.row,
                    {
                      zIndex: 50 - depth,
                      marginBottom: depth === 0 ? 0 : -15, // 앞 카드가 뒤 카드를 덮음
                      transform: [{ scale: 1 - Math.min(depth, 3) * 0.05 }],
                      opacity: depth === 0 ? 1 : 1 - Math.min(depth, 3) * 0.2,
                    },
                  ]}
                >
                  {row.options.map((w) => {
                    const col = cardColor(i, w);
                    return (
                      <Pressable
                        key={w}
                        disabled={!active}
                        onPress={() => pickWord(i, w)}
                        style={({ pressed }) => [
                          st.card2,
                          active && st.card2Active,
                          col && {
                            backgroundColor: col.bg,
                            borderColor: col.border,
                            borderWidth: 2,
                          },
                          pressed && active && { transform: [{ scale: 0.96 }] },
                        ]}
                      >
                        <Text
                          style={[
                            st.card2Text,
                            active && st.card2TextActive,
                            col && { color: col.text },
                          ]}
                        >
                          {w}
                        </Text>
                        {active && (
                          <Ionicons
                            name="chevron-up"
                            size={16}
                            color={C.purple}
                            style={{ marginTop: 4 }}
                          />
                        )}
                      </Pressable>
                    );
                  })}
                </Animated.View>
              );
            })}
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

function BigBtn({ colors, icon, label, onPress }: any) {
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress}>
      {({ pressed }) => (
        <LinearGradient
          colors={colors}
          style={[st.bigBtn, pressed && { transform: [{ scale: 0.96 }] }]}
        >
          {icon}
          <Text style={st.bigBtnText}>{label}</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}

const st = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
    paddingBottom: 10,
  },
  progressWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  progressIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#5aa9e0",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  track: {
    flex: 1,
    height: 26,
    backgroundColor: C.track,
    borderRadius: 13,
    marginLeft: -12,
    paddingLeft: 16,
    justifyContent: "center",
  },
  trackFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: C.trackFill,
    borderRadius: 13,
  },
  star: { position: "absolute", marginLeft: -10 },
  count: {
    position: "absolute",
    left: 52,
    top: -20,
    fontSize: 15,
    fontWeight: "800",
    color: "#5a7fa0",
  },

  levelTab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: C.levelTab,
    marginHorizontal: 18,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  levelText: { fontSize: 14, fontWeight: "800", color: C.levelInk, flex: 1 },
  badge: {
    backgroundColor: C.badgeReview,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgeText: { color: "#fff", fontSize: 13, fontWeight: "800" },

  card: {
    marginHorizontal: 18,
    borderRadius: 20,
    borderTopLeftRadius: 4,
    padding: 18,
    minHeight: 186,
    overflow: "hidden",
  },
  checkMark: { position: "absolute", top: 4, left: 16, zIndex: 5 },
  sentence: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 4,
    rowGap: 3,
  },
  sentText: { fontSize: 24, fontWeight: "700", color: C.ink, lineHeight: 34 },
  blankBox: {
    minWidth: 110,
    minHeight: 36,
    borderRadius: 8,
    backgroundColor: C.blank,
    justifyContent: "center",
    paddingVertical: 3,
  },
  blankText: { fontWeight: "800", color: C.blankInk },
  filledWord: {
    backgroundColor: C.blank,
    borderRadius: 8,
    paddingVertical: 3,
  },
  filledText: { fontWeight: "800", color: C.blankInk },
  answerLine: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "800",
    color: C.okText,
  },
  trans: {
    fontSize: 17,
    fontWeight: "600",
    color: "#4a5a68",
    marginTop: 14,
    lineHeight: 24,
  },

  wrongBubble: {
    backgroundColor: C.noBg,
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    gap: 3,
  },
  wrongLabel: {
    fontSize: 12,
    color: C.noText,
    fontWeight: "800",
    opacity: 0.8,
    letterSpacing: 0.3,
  },
  wrongAnswer: { fontSize: 21, color: C.noText, fontWeight: "900" },
  wrongPrompt: {
    fontSize: 14.5,
    color: C.noText,
    fontWeight: "700",
    opacity: 0.85,
  },
  nextRow: { paddingHorizontal: 16, paddingTop: 10 },
  nextBtn: {
    minHeight: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 4,
  },
  nextOk: { backgroundColor: C.green, borderColor: "#2f9e46" },
  nextWrong: { backgroundColor: "#ff5d6e", borderColor: "#cf4353" },
  nextText: { color: "#fff", fontSize: 17, fontWeight: "900" },
  hintBubble: {
    backgroundColor: C.hintBg,
    borderRadius: 14,
    padding: 13,
    marginTop: 14,
  },
  hintHead: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  hintAttempt: { flex: 1, fontSize: 17, fontWeight: "700", color: C.hintInk },
  hintText: {
    fontSize: 15,
    color: C.hintInk,
    lineHeight: 22,
    marginTop: 6,
    fontWeight: "500",
  },

  miniRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  miniBtnOff: { opacity: 0.55 },
  miniBtn: {
    width: 54,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f3f2fb",
    alignItems: "center",
    justifyContent: "center",
  },

  pickArea: { paddingHorizontal: 16 },
  stack: { flexDirection: "column-reverse", marginBottom: 32 },
  row: { flexDirection: "row", gap: 5, justifyContent: "center" },
  card2: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: "#7a90a8",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  card2Active: { shadowOpacity: 0.28, shadowRadius: 10, elevation: 5 },
  card2Text: { fontSize: 14, fontWeight: "600", color: "#5a6674" },
  card2TextActive: { fontSize: 16, fontWeight: "800", color: C.ink },

  checkWrap: { paddingTop: 16 },
  checkBtn: {},
  checkBtnInner: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#7a90a8",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  checkBtnText: { fontSize: 18, fontWeight: "800", color: C.purple },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 6,
    paddingTop: 10,
    paddingBottom: 6,
    borderTopWidth: 1,
    borderTopColor: "#dbe8f2",
  },
  actionItem: { alignItems: "center", gap: 4, width: 66 },
  actionIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#efeafb",
    alignItems: "center",
    justifyContent: "center",
  },
  actionBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#ff6b4a",
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  actionBadgeText: { color: "#fff", fontSize: 11, fontWeight: "800" },
  actionLabel: { fontSize: 11, fontWeight: "600", color: "#8a94a3" },
  bigRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  bigBtn: {
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: "center",
    gap: 8,
  },
  bigBtnText: { color: "#fff", fontSize: 15, fontWeight: "800" },
});
