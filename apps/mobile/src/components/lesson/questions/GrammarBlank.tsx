import { useState, useRef, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useSpeech } from "@/hooks/useSpeech";
import { isAnswerCorrect } from "@/utils/answer-check";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";

// ── 레퍼런스 팔레트 ──
const C = {
  bgTop: "#d7ecf8",
  bgBot: "#c6e2f4",
  cardTop: "#eef6fb",
  cardBot: "#ffffff",
  cardOkTop: "#e6f6d4",
  cardOkBot: "#f5fbea",
  levelTab: "#d0e6f7",
  levelText: "#5a7a9a",
  badgeRed: "#ff6b7d",
  badgeTeal: "#54c8bf",
  green: "#3cba54",
  greenInk: "#2f9e46",
  pink: "#f7b9c1",
  pinkInk: "#5a4045",
  slot: "#cfe4f8",
  slotOk: "#c9ebd0",
  purple: "#776ee2",
  purpleDk: "#5a51c4",
  heart: "#c3ccd8",
  heartOn: "#ff6b9d",
  source: "#9aa7b3",
  ink: "#2b2b3a",
  track: "#b9d9ef",
  trackFill: "#7ec8ef",
  lav: "#a99ff0",
};

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
  /** 다음 문제로. 이 유형은 아래 피드백 바를 쓰지 않는다 */
  onNext: () => void;
}

/** 한글은 글자폭 ≈ 글자크기, 로마자·숫자·공백은 그 절반쯤 */
function textWidth(text: string, size: number) {
  let w = 0;
  for (const ch of text) w += /[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(ch) ? size : size * 0.55;
  return w;
}

/**
 * 문법 빈칸 문제 (grammar_blank).
 * 채점·피드백·XP 는 레슨 엔진이 하고 여기서는 입력만 받아 onAnswer 로 넘긴다.
 */
export default function GrammarBlank({
  question,
  answerState,
  onAnswer,
  onNext,
}: Props) {
  const { t } = useTranslation();
  const { speak } = useSpeech();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // 엔진 문제 형태를 카드가 쓰던 이름으로 매핑
  const q = {
    id: question.id,
    prefix: question.sentencePrefix ?? "",
    answer: question.answer,
    suffix: question.sentenceSuffix ?? "",
    prompt: question.answerTranslation ?? "",
    full:
      (question.sentencePrefix ?? "") +
      question.answer +
      (question.sentenceSuffix ?? ""),
    pattern: question.tags?.[0] ?? "",
    highlight: undefined as string | undefined,
    wrongHint: question.hint,
    note: question.explanation,
    image: undefined as string | undefined,
  };

  const state = answerState; // "idle" | "correct" | "wrong"
  const [input, setInput] = useState("");
  /** 채점을 엔진에 넘긴 적이 있는지. 오답도 첫 시도 한 번만 기록한다 */
  const [reported, setReported] = useState(false);
  /** 두 번째 시도 이후에 맞힌 경우. 엔진은 이미 오답으로 기록했다 */
  const [solvedLate, setSolvedLate] = useState(false);
  const [hintLevel, setHintLevel] = useState(0); // 0/1/2
  const [fav, setFav] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // 애니메이션
  const shake = useSharedValue(0);
  const check = useSharedValue(0);
  const caret = useSharedValue(1);
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));
  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: check.value }],
    opacity: check.value,
  }));
  const caretStyle = useAnimatedStyle(() => ({ opacity: caret.value }));

  useEffect(() => {
    caret.value = 1; // 깜빡임 없이 고정
  }, []);

  const isOk = state === "correct" || solvedLate;

  /**
   * 키보드가 올라오면 네비바는 키보드에 덮인다. 그때까지 SafeArea 여백을 두면
   * 키보드 위에 빈 띠가 생긴다. 키보드가 없을 때만 네비바를 피한다.
   */
  const [kbUp, setKbUp] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setKbUp(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKbUp(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  const barBottom = kbUp ? 8 : insets.bottom + 8;

  // 문제 바뀌면 리셋 + 키보드 다시
  // 뒤로가기로 키보드만 닫히면 RN 은 여전히 포커스를 쥐고 있다고 보고
  // focus() 를 무시한다. blur 로 한 번 놓아준 뒤 다시 잡아야 키보드가 올라온다.
  const focusInput = () => {
    inputRef.current?.blur();
    setTimeout(() => inputRef.current?.focus(), 50);
  };
  // 문제가 바뀌면 입력·힌트 초기화하고 키보드 다시 올린다
  useEffect(() => {
    setInput("");
    setHintLevel(0);
    setReported(false);
    setSolvedLate(false);
    check.value = 0;
    focusInput();
  }, [q.id]);

  // 채점 결과는 엔진이 알려준다
  useEffect(() => {
    if (isOk) Keyboard.dismiss();
    if (answerState === "correct") check.value = 1;
  }, [answerState, solvedLate]);

  /**
   * 문장이 길어지면 글자를 줄인다.
   * 카드 안쪽 폭을 재서 두 줄 안에 들어가는 가장 큰 단계를 고른다.
   */
  const fit = useMemo(() => {
    const inner = width - 36 - 36; // 스크롤 여백 18*2 + 카드 안쪽 18*2
    const pick = (text: string, ladder: number[], extra = 0) =>
      ladder.find(
        (size) => textWidth(text, size) + extra <= inner * 2 * 0.92,
      ) ?? ladder[ladder.length - 1];
    return {
      sent: pick(q.full, [28, 25, 22, 20, 18, 16], 46),
      prompt: pick(q.prompt, [27, 24, 21, 19, 17, 15]),
    };
  }, [q.full, q.prompt, width]);

  const revealed = () => {
    if (hintLevel === 0) return "";
    return hintLevel === 1 ? q.answer.slice(0, 1) : q.answer;
  };

  /**
   * 맞을 때까지 다시 입력하게 한다.
   *
   * 엔진에는 첫 시도 결과만 넘긴다(오답 기록은 한 번이면 된다). 그 뒤로는
   * 여기서 직접 보고, 틀리면 정답을 알려주지 않고 다시 입력받는다.
   */
  const handleCheck = () => {
    const typed = input.trim();
    if (isOk || !typed) return;

    const right = isAnswerCorrect(typed, q.answer, question.acceptedAnswers);

    if (!reported) {
      setReported(true);
      onAnswer(typed); // 첫 시도 — 맞든 틀리든 엔진이 기록한다
      if (right) return;
    } else if (right) {
      setSolvedLate(true);
      check.value = 1;
      return;
    }

    shake.value = withSequence(
      withTiming(-8, { duration: 55 }),
      withTiming(8, { duration: 55 }),
      withTiming(-5, { duration: 55 }),
      withTiming(0, { duration: 55 }),
    );
    setInput("");
    setHintLevel((h) => Math.min(2, h + 1)); // 틀릴수록 힌트를 더 열어준다
    focusInput();
  };

  const pressHint = () => {
    setHintLevel((h) => Math.min(2, h + 1));
    focusInput();
  };

  const handleChange = (v: string) => {
    if (isOk) return;
    setInput(v);
  };

  // 어떤 문법을 연습 중인지 보여준다
  const badge = { text: q.pattern, bg: C.badgeTeal };

  // 프롬프트 하이라이트 (초록)
  const renderPrompt = () => {
    const size = {
      fontSize: fit.prompt,
      lineHeight: Math.round(fit.prompt * 1.4),
    };
    if (!q.highlight || !q.prompt.includes(q.highlight))
      return <Text style={[st.prompt, size]}>{q.prompt}</Text>;
    const [a, b] = q.prompt.split(q.highlight);
    return (
      <Text style={[st.prompt, size]}>
        {a}
        <Text style={{ color: C.green }}>{q.highlight}</Text>
        {b}
      </Text>
    );
  };

  const sentSize = {
    fontSize: fit.sent,
    lineHeight: Math.round(fit.sent * 1.35),
  };

  return (
    <LinearGradient colors={[C.bgTop, C.bgBot]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[
            st.scroll,
            // 하단 바가 스크롤 밖에 따로 있어서 여기서 네비바를 또 피할 필요는 없다
            { paddingBottom: 12 },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {/* 지금 연습 중인 문법 */}
          <View style={st.levelTab}>
            <Text style={st.levelText}>{q.pattern}</Text>
            <Ionicons name="help-circle" size={16} color={C.levelText} />
          </View>

          {/* 카드 */}
          <Animated.View style={cardStyle}>
            <LinearGradient
              colors={
                isOk ? [C.cardOkTop, C.cardOkBot] : [C.cardTop, C.cardBot]
              }
              style={st.card}
            >
              {/* 상단: 하트 + 뱃지 */}
              <View style={st.cardTopRow}>
                {q.image ? <Text style={st.image}>{q.image}</Text> : <View />}
                <View style={st.cardTopRight}>
                  <Pressable
                    onPress={() => setFav((f) => !f)}
                    hitSlop={8}
                    style={st.heartBtn}
                  >
                    <Ionicons
                      name={fav ? "heart" : "heart"}
                      size={20}
                      color={fav ? C.heartOn : C.heart}
                    />
                  </Pressable>
                  <View style={[st.badge, { backgroundColor: badge.bg }]}>
                    <Text style={st.badgeText}>{badge.text}</Text>
                  </View>
                </View>
              </View>

              {/* 정답 체크마크 (정답 시) */}
              {isOk && (
                <Animated.View style={[st.checkMark, checkStyle]}>
                  <Ionicons name="checkmark-sharp" size={70} color={C.green} />
                </Animated.View>
              )}

              {/* 프롬프트 */}
              {renderPrompt()}

              {/* note (줄임말 등) */}
              {isOk && q.note && (
                <Animated.Text style={st.note}>※ {q.note}</Animated.Text>
              )}

              {/* 오답 — 정답을 알려주지 않고 힌트만 주고 다시 입력받는다 */}
              {state === "wrong" && !isOk && (
                <Animated.View style={st.wrongBubble}>
                  <Text style={st.wrongText}>
                    {t("writePractice.retryHint")}
                  </Text>
                  {!!(q.wrongHint || q.note) && (
                    <Text style={st.wrongSub}>{q.wrongHint || q.note}</Text>
                  )}
                </Animated.View>
              )}

              {/* 정답 문장 + 인라인 입력칸 */}
              <View style={st.answerRow}>
                {!!q.prefix && (
                  <Text style={[st.answerFix, sentSize]}>{q.prefix}</Text>
                )}
                <Pressable
                  onPress={focusInput}
                  style={[
                    st.slot,
                    { backgroundColor: isOk ? C.slotOk : C.slot },
                    { minHeight: fit.sent + 16 },
                  ]}
                >
                  {/* 배경 힌트 (흐리게) — 입력 없을 때만 */}
                  {input.length === 0 && hintLevel > 0 && (
                    <Text style={[st.slotText, sentSize, st.hintGhost]}>
                      {revealed()}
                    </Text>
                  )}

                  {/* 실제 입력 (힌트 위에 덮임) */}
                  {input.length > 0 && (
                    <Text
                      style={[
                        st.slotText,
                        sentSize,
                        isOk && { color: C.greenInk },
                      ]}
                    >
                      {input}
                    </Text>
                  )}

                  {/* 커서 */}
                  {!isOk && (
                    <Animated.View
                      style={[st.caret, { height: fit.sent + 3 }, caretStyle]}
                    />
                  )}
                </Pressable>

                {!!q.suffix && (
                  <Text style={[st.answerFix, sentSize]}>{q.suffix}</Text>
                )}
              </View>

              {/* 정답일 때 완성 문장을 보여준다 */}
              {isOk && <Text style={st.source}>{q.full}</Text>}
            </LinearGradient>
          </Animated.View>
        </ScrollView>

        {/* 숨은 입력 (키보드 유지용) */}
        <TextInput
          ref={inputRef}
          value={input}
          onChangeText={handleChange}
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit={false}
          returnKeyType="done"
          onSubmitEditing={handleCheck}
          editable={!isOk}
          style={st.hiddenInput} // ✅ 정답 후엔 입력 막기
        />

        {/* 키보드 위 툴바 */}
        {isOk ? (
          <View>
            {/* 액션 아이콘 줄 — 아직 기능이 없어서 숨김. 만들면 주석 해제
            <View style={st.actionRow}>
              {[
                { icon: "chatbubbles", label: t("writePractice.otherExample") },
                {
                  icon: "reader",
                  label: t("writePractice.wrongNote"),
                  badge: 2,
                },
                { icon: "sparkles", label: t("writePractice.aiQa") },
                { icon: "book", label: t("writePractice.wordInfo") },
                { icon: "mic-circle", label: t("writePractice.pronunciation") },
              ].map((a, i) => (
                <Pressable key={i} style={st.actionItem}>
                  <View style={st.actionIcon}>
                    <Ionicons name={a.icon as any} size={22} color={C.lav} />
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

            {/* 큰 버튼 3개 */}
            <View style={st.bigRow}>
              <BigBtn
                colors={["#a07af0", "#7f5fe8"]}
                onPress={() => {}}
                icon={
                  <MaterialCommunityIcons
                    name="rabbit"
                    size={26}
                    color="#fff"
                  />
                }
                label={t("writePractice.realSpeed")}
              />
              <BigBtn
                colors={["#8f7ff0", "#7161e6"]}
                onPress={() => speak(q.prefix + q.answer + q.suffix)}
                icon={<Ionicons name="volume-high" size={26} color="#fff" />}
                label={t("writePractice.listenAgain")}
              />
            </View>

            <View style={[st.nextRow, { paddingBottom: barBottom }]}>
              <Pressable style={[st.nextBtn, st.nextOk]} onPress={onNext}>
                <Text style={st.nextText}>{t("lesson.continue")}</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={[st.inputBar, { paddingBottom: barBottom }]}>
            <Pressable style={st.barSide} onPress={pressHint}>
              <Ionicons name="help-circle" size={23} color={C.purple} />
              <Text style={st.barSideText} numberOfLines={1}>
                {t("writePractice.hint")}
              </Text>
            </Pressable>

            {/* 원본은 키보드 완료 키로만 제출해서, 키보드가 닫히면 답을 낼 방법이
                없었다. 입력 미리보기 자리를 실제 확인 버튼으로 바꾼다. */}
            <Pressable
              style={[st.wordBubble, !input.trim() && st.wordBubbleOff]}
              onPress={handleCheck}
              disabled={!input.trim()}
            >
              <Text style={st.wordBubbleText} numberOfLines={1}>
                {t("lesson.check")}
              </Text>
            </Pressable>

            <Pressable style={st.barSide}>
              <Ionicons name="mic" size={23} color={C.purple} />
              <Text style={st.barSideText} numberOfLines={1}>
                {t("writePractice.voiceMode")}
              </Text>
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
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
    right: 0,
    top: -22,
    fontSize: 15,
    fontWeight: "800",
    color: "#5a7fa0",
  },
  scroll: { paddingHorizontal: 18, paddingTop: 20 },

  levelTab: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: C.levelTab,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginLeft: 6,
    marginBottom: -2,
  },
  levelText: { fontSize: 14, fontWeight: "800", color: C.levelText },

  card: { borderRadius: 22, padding: 18, minHeight: 236, overflow: "hidden" },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
    minHeight: 34,
  },
  image: { fontSize: 34 },
  cardTopRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  heartBtn: {},
  badge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 14 },
  badgeText: { color: "#fff", fontSize: 13, fontWeight: "800" },

  checkMark: { position: "absolute", top: 6, left: 14, zIndex: 5 },

  prompt: { fontWeight: "800", color: C.ink, marginTop: 8 },
  note: {
    alignSelf: "flex-end",
    color: C.greenInk,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },

  wrongBubble: {
    backgroundColor: C.pink,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 14,
    gap: 4,
  },
  wrongText: {
    fontSize: 15,
    color: C.pinkInk,
    fontWeight: "700",
    lineHeight: 21,
  },
  wrongSub: {
    fontSize: 14,
    color: C.pinkInk,
    fontWeight: "600",
    lineHeight: 20,
    opacity: 0.85,
  },
  nextRow: { paddingHorizontal: 14, paddingTop: 8 },
  nextBtn: {
    minHeight: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 4,
  },
  nextOk: { backgroundColor: C.green, borderColor: C.greenInk },
  nextWrong: { backgroundColor: "#ff5d6e", borderColor: "#cf4353" },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "900" },

  answerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 22,
    rowGap: 4,
  },
  answerFix: { fontWeight: "700", color: C.ink },
  slot: {
    minWidth: 64,
    borderRadius: 10,
    paddingHorizontal: 9,
    marginHorizontal: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  slotText: { fontWeight: "800", color: C.ink },
  caret: { width: 2.5, backgroundColor: C.purple, marginLeft: 2 },
  source: {
    alignSelf: "flex-end",
    color: C.source,
    fontSize: 13,
    fontWeight: "500",
    marginTop: 26,
  },
  // absolute 로 두면 부모 너비 계산에서 빠져 입력칸이 안 늘어난다.
  // 입력이 있을 땐 아예 렌더되지 않으므로 겹칠 일도 없다.
  hintGhost: {
    color: C.ink,
    opacity: 0.25, // 흐리게 배경처럼
  },
  // 화면 밖(top:-1000)에 두면 안드로이드에서 focus() 로 키보드가 다시 안 올라온다.
  // 보이지 않게만 하고 레이아웃 안에 남겨둔다.
  hiddenInput: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    opacity: 0,
    padding: 0,
  },

  // 입력 툴바
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingTop: 8,
    gap: 8,
    backgroundColor: "transparent",
  },
  barSide: { alignItems: "center", gap: 2, width: 78 },
  barSideText: { fontSize: 11.5, fontWeight: "700", color: C.purple },
  wordBubble: {
    flex: 1,
    backgroundColor: C.purple,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 14,
    alignItems: "center",
    borderBottomWidth: 4,
    borderColor: C.purpleDk,
  },
  wordBubbleOff: { backgroundColor: "#b9c4d4", borderColor: "#a0abbb" },
  wordBubbleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },
  wordBubbleTail: {
    position: "absolute",
    bottom: -7,
    alignSelf: "center",
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: C.purple,
  },

  // 정답 액션
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 6,
    borderTopWidth: 1,
    borderTopColor: "#dbe8f2",
  },
  actionItem: { alignItems: "center", gap: 4, width: 68 },
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
    gap: 10,
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  bigBtn: {
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    gap: 5,
  },
  bigBtnText: { color: "#fff", fontSize: 14, fontWeight: "800" },
});
