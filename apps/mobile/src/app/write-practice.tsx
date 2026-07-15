import { useState, useRef, useEffect } from "react";
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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  FadeIn,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useSpeech } from "@/hooks/useSpeech";

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

// ── mock 문제 (백엔드 붙일 땐 이 배열만 교체) ──
type Status = "new" | "retry" | "reviewDays" | "reviewYears";
interface WQ {
  prompt: string;
  highlight?: string;
  prefix: string;
  answer: string;
  suffix: string;
  wrongHint?: string;
  note?: string;
  image?: string;
  source: string;
  level: number;
  status: Status;
  reviewValue?: number;
}
const QUESTIONS: WQ[] = [
  {
    prompt: "초콜릿 좀 사자.",
    highlight: "사",
    prefix: "Let's ",
    answer: "buy",
    suffix: " some chocolate.",
    wrongHint: "물건을 돈 주고 얻는다는 뜻의 단어예요.",
    source: "중학교 영어1 지학사",
    level: 2,
    status: "retry",
  },
  {
    prompt: "저것은 뭔가요?",
    highlight: "저것",
    prefix: "What is ",
    answer: "that",
    suffix: "?",
    wrongHint: "멀리 있는 것을 가리키는 단어예요.",
    source: "Dexter",
    level: 1,
    status: "reviewDays",
    reviewValue: 5,
  },
  {
    prompt: "저건 내 사과야.",
    highlight: "사과",
    prefix: "That's my ",
    answer: "apple",
    suffix: ".",
    image: "🍎",
    wrongHint: "빨갛고 아삭한 과일이에요.",
    source: "중학교 영어1 천재교과서",
    level: 1,
    status: "new",
  },
  {
    prompt: "저것은 제 자동차입니다.",
    highlight: "저것",
    prefix: "",
    answer: "That's",
    suffix: " my car.",
    note: "that is의 줄임말",
    source: "Dead To Me",
    level: 1,
    status: "reviewYears",
    reviewValue: 6,
  },
];

export default function WritePractice() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { speak } = useSpeech();

  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [state, setState] = useState<"idle" | "wrong" | "correct">("idle");
  const [hintLevel, setHintLevel] = useState(0); // 0/1/2
  const [fav, setFav] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const q = QUESTIONS[index];
  const total = 20;

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
    caret.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 500 }),
      ),
      -1,
    );
  }, []);

  // 문제 바뀌면 리셋 + 키보드 다시
  const focusInput = () => setTimeout(() => inputRef.current?.focus(), 60);
  useEffect(() => {
    focusInput();
  }, [index]);

  const revealed = () => {
    if (hintLevel === 0) return "";
    return hintLevel === 1 ? q.answer.slice(0, 1) : q.answer;
  };

  const handleCheck = () => {
    if (state === "correct" || !input.trim()) return;
    const ok = input.trim().toLowerCase() === q.answer.toLowerCase();
    if (ok) {
      setState("correct");
      Keyboard.dismiss();
      check.value = withSpring(1, { damping: 9 });
    } else {
      setState("wrong");
      shake.value = withSequence(
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 50 }),
        withTiming(-6, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      );
    }
  };

  const nextQuestion = () => {
    check.value = 0;
    setInput("");
    setHintLevel(0);
    setState("idle");
    setIndex((i) => (i + 1) % QUESTIONS.length);
  };

  const pressHint = () => {
    setHintLevel((h) => Math.min(2, h + 1));
    if (state === "wrong") setState("idle");
    focusInput();
  };

  const handleChange = (v: string) => {
    if (state === "correct") return;
    setInput(v);
    if (state === "wrong") setState("idle");
  };

  const isOk = state === "correct";

  // 뱃지
  const badge = (() => {
    switch (q.status) {
      case "retry":
        return { text: t("writePractice.retry"), bg: C.badgeRed };
      case "new":
        return { text: t("writePractice.isNew"), bg: C.badgeRed };
      case "reviewDays":
        return {
          text: t("writePractice.reviewInDays", { count: q.reviewValue }),
          bg: C.badgeTeal,
        };
      case "reviewYears":
        return {
          text: t("writePractice.reviewInYears", { count: q.reviewValue }),
          bg: C.badgeTeal,
        };
    }
  })();

  // 프롬프트 하이라이트 (초록)
  const renderPrompt = () => {
    if (!q.highlight || !q.prompt.includes(q.highlight))
      return <Text style={st.prompt}>{q.prompt}</Text>;
    const [a, b] = q.prompt.split(q.highlight);
    return (
      <Text style={st.prompt}>
        {a}
        <Text style={{ color: C.green }}>{q.highlight}</Text>
        {b}
      </Text>
    );
  };

  return (
    <LinearGradient colors={[C.bgTop, C.bgBot]} style={{ flex: 1 }}>
      {/* 헤더: 진행바 */}
      <View style={[st.header, { paddingTop: insets.top + 38 }]}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={30} color="#7fa8cf" />
        </Pressable>
        <View style={st.progressWrap}>
          <View style={st.progressIcon}>
            <Ionicons name="flame" size={20} color="#fff" />
          </View>
          <View style={st.track}>
            <View
              style={[
                st.trackFill,
                { width: `${((index + 1) / total) * 100}%` },
              ]}
            />
            <View
              style={[st.star, { left: `${((index + 1) / total) * 100}%` }]}
            >
              <Ionicons name="star" size={20} color="#bfe4fb" />
            </View>
          </View>
          <Text style={st.count}>
            {index + 1}/{total}
          </Text>
        </View>
        <Pressable hitSlop={10}>
          <Ionicons name="settings-sharp" size={26} color="#9fc3e2" />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={st.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* 레벨 탭 */}
          <View style={st.levelTab}>
            <Text style={st.levelText}>
              {t("writePractice.level", { n: q.level })}
            </Text>
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
                <Animated.Text entering={FadeIn} style={st.note}>
                  ※ {q.note}
                </Animated.Text>
              )}

              {/* 오답 힌트 버블 */}
              {state === "wrong" && (
                <Animated.View
                  entering={FadeIn.duration(250)}
                  style={st.wrongBubble}
                >
                  <Text style={st.wrongText}>
                    {q.wrongHint ?? t("writePractice.wrongDefault")}
                  </Text>
                </Animated.View>
              )}

              {/* 정답 문장 + 인라인 입력칸 */}
              <View style={st.answerRow}>
                {!!q.prefix && <Text style={st.answerFix}>{q.prefix}</Text>}
                <Pressable
                  onPress={focusInput}
                  style={[
                    st.slot,
                    { backgroundColor: isOk ? C.slotOk : C.slot },
                  ]}
                >
                  {/* 배경 힌트 (흐리게) — 입력 없을 때만 */}
                  {input.length === 0 && hintLevel > 0 && (
                    <Text style={[st.slotText, st.hintGhost]}>
                      {revealed()}
                    </Text>
                  )}

                  {/* 실제 입력 (힌트 위에 덮임) */}
                  {input.length > 0 && (
                    <Text style={[st.slotText, isOk && { color: C.greenInk }]}>
                      {input}
                    </Text>
                  )}

                  {/* 커서 */}
                  {!isOk && <Animated.View style={[st.caret, caretStyle]} />}
                </Pressable>

                {!!q.suffix && <Text style={st.answerFix}>{q.suffix}</Text>}
              </View>

              {/* 출처 */}
              <Text style={st.source}>
                {t("writePractice.source", { name: q.source })}
              </Text>
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
          editable={state !== "correct"}
          style={st.hiddenInput} // ✅ 정답 후엔 입력 막기
        />

        {/* 키보드 위 툴바 */}
        {isOk ? (
          <View>
            {/* 액션 아이콘 줄 */}
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

            {/* 큰 버튼 3개 */}
            <View style={[st.bigRow, { paddingBottom: insets.bottom + 12 }]}>
              <BigBtn
                colors={["#a07af0", "#7f5fe8"]}
                onPress={() => {}}
                icon={
                  <MaterialCommunityIcons
                    name="rabbit"
                    size={30}
                    color="#fff"
                  />
                }
                label={t("writePractice.realSpeed")}
              />
              <BigBtn
                colors={["#8f7ff0", "#7161e6"]}
                onPress={() => speak(q.prefix + q.answer + q.suffix)}
                icon={<Ionicons name="volume-high" size={30} color="#fff" />}
                label={t("writePractice.listenAgain")}
              />
              <BigBtn
                colors={["#7b6ef0", "#6a5ee0"]}
                onPress={nextQuestion}
                icon={<Ionicons name="play" size={30} color="#fff" />}
                label={t("writePractice.nextQuestion")}
              />
            </View>
          </View>
        ) : (
          <View style={[st.inputBar, { paddingBottom: 6 }]}>
            <Pressable style={st.barSide} onPress={pressHint}>
              <Ionicons name="help-circle" size={26} color={C.purple} />
              <Text style={st.barSideText}>{t("writePractice.hint")}</Text>
            </Pressable>

            <View style={st.wordBubble}>
              <Text style={st.wordBubbleText}>{input || " "}</Text>
              <View style={st.wordBubbleTail} />
            </View>

            <Pressable style={st.barSide}>
              <Ionicons name="mic" size={26} color={C.purple} />
              <Text style={st.barSideText}>{t("writePractice.voiceMode")}</Text>
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
  scroll: { paddingHorizontal: 18, paddingTop: 30 },

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

  card: { borderRadius: 22, padding: 22, minHeight: 300, overflow: "hidden" },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    minHeight: 40,
  },
  image: { fontSize: 40 },
  cardTopRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  heartBtn: {},
  badge: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 16 },
  badgeText: { color: "#fff", fontSize: 14, fontWeight: "800" },

  checkMark: { position: "absolute", top: 6, left: 14, zIndex: 5 },

  prompt: {
    fontSize: 27,
    fontWeight: "800",
    color: C.ink,
    lineHeight: 38,
    marginTop: 20,
  },
  note: {
    alignSelf: "flex-end",
    color: C.greenInk,
    fontSize: 15,
    fontWeight: "600",
    marginTop: 12,
  },

  wrongBubble: {
    backgroundColor: C.pink,
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  wrongText: {
    fontSize: 16,
    color: C.pinkInk,
    fontWeight: "600",
    lineHeight: 24,
  },

  answerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 40,
  },
  answerFix: { fontSize: 28, fontWeight: "700", color: C.ink },
  slot: {
    minWidth: 70,
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  slotText: { fontSize: 27, fontWeight: "800", color: C.ink },
  caret: { width: 2.5, height: 30, backgroundColor: C.purple, marginLeft: 2 },
  source: {
    alignSelf: "flex-end",
    color: C.source,
    fontSize: 13,
    fontWeight: "500",
    marginTop: 26,
  },
  hintGhost: {
    position: "absolute",
    color: C.ink,
    opacity: 0.25, // 흐리게 배경처럼
  },
  hiddenInput: {
    position: "absolute",
    width: 200,
    height: 44,
    opacity: 0,
    top: -1000, // 화면 밖으로
    left: 0,
  },

  // 입력 툴바
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 14,
    backgroundColor: "transparent",
  },
  barSide: { alignItems: "center", gap: 3, width: 90 },
  barSideText: { fontSize: 13, fontWeight: "700", color: C.purple },
  wordBubble: {
    backgroundColor: C.purple,
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 14,
    minWidth: 70,
    alignItems: "center",
  },
  wordBubbleText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    textDecorationLine: "underline",
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
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  bigBtn: {
    borderRadius: 22,
    paddingVertical: 22,
    alignItems: "center",
    gap: 8,
  },
  bigBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
