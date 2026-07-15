import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";

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

interface SRow {
  options: string[];
  correct: string;
}
interface SQ {
  level: number;
  title: string;
  status: "minAgo" | "reviewDays" | "isNew";
  statusValue?: number;
  before: string;
  after: string;
  rows: SRow[];
  translation: string;
  tHighlight?: string;
  hints: Record<string, string>;
}

// mock (백엔드 붙일 땐 이 배열만 교체)
const QUESTIONS: SQ[] = [
  {
    level: 1,
    title: "잘 지내고 있어.",
    status: "minAgo",
    statusValue: 4,
    before: "",
    after: ". Thanks for asking.",
    rows: [
      { options: ["It's", "You're", "I'm"], correct: "I'm" },
      { options: ["doing", "feeling", "going"], correct: "doing" },
      { options: ["well", "better", "healthy"], correct: "well" },
    ],
    translation: "난 잘 지내고 있어. 물어봐줘서 고마워.",
    tHighlight: "난 잘 지내고 있어",
    hints: {
      going:
        "going은 '가다'라는 동작을 나타내요. 자신의 전반적인 상태를 표현하려면 어떤 동사가 더 적절할까요?",
      "It's": "It's는 사물·상황을 가리켜요. 내 상태는 'I'm'으로 시작해요.",
      better:
        "better는 '더 나은'이라는 비교예요. 여기선 그냥 '잘' 지낸다는 표현이 맞아요.",
    },
  },
  {
    level: 1,
    title: "가져갈게요.",
    status: "reviewDays",
    statusValue: 3,
    before: "Two green tea lattes ",
    after: ", please.",
    rows: [
      { options: ["to", "for", "at"], correct: "to" },
      { options: ["go", "going", "went"], correct: "go" },
    ],
    translation: "녹차라떼 두 잔 포장해 주세요.",
    tHighlight: "포장해",
    hints: {
      going: "going은 진행형이에요. 'to go'가 '포장'이라는 관용 표현이에요.",
      for: "여기선 'to go'가 하나의 표현이에요.",
    },
  },
  {
    level: 2,
    title: "커피 주문",
    status: "isNew",
    before: "",
    after: " a coffee.",
    rows: [
      { options: ["I'd", "You'd", "We'd"], correct: "I'd" },
      { options: ["like", "want", "love"], correct: "like" },
      { options: ["to", "for", "of"], correct: "to" },
      { options: ["order", "buy", "make"], correct: "order" },
    ],
    translation: "커피 한 잔 주문할게요.",
    tHighlight: "주문",
    hints: { want: "'I want'도 되지만 정중한 주문은 'I'd like to'예요." },
  },
];

const speakEn = (w: string) =>
  Speech.speak(w, { language: "en-US", rate: 0.92 });

export default function SentenceBuild() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [phase, setPhase] = useState<"picking" | "correct">("picking");
  const [attemptWrong, setAttemptWrong] = useState(false);
  const [lastPicks, setLastPicks] = useState<string[]>([]);

  const q = QUESTIONS[index];
  const total = 10;
  const allPicked = currentRow >= q.rows.length;
  const isOk = phase === "correct";

  const shake = useSharedValue(0);
  const check = useSharedValue(0);
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));
  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: check.value }],
    opacity: check.value,
  }));

  const resetForQuestion = () => {
    setPicks([]);
    setCurrentRow(0);
    setPhase("picking");
    setAttemptWrong(false);
    setLastPicks([]);
    check.value = 0;
  };
  useEffect(() => {
    resetForQuestion();
  }, [index]);

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

  const checkAnswer = () => {
    const ok = picks.every((w, i) => w === q.rows[i].correct);
    if (ok) {
      setPhase("correct");
      check.value = withSpring(1, { damping: 9 });
    } else {
      setLastPicks(picks);
      setAttemptWrong(true);
      setPicks([]);
      setCurrentRow(0);
      shake.value = withSequence(
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 50 }),
        withTiming(-6, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      );
    }
  };

  const next = () => setIndex((i) => (i + 1) % QUESTIONS.length);

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
  const showExplain = attemptWrong && !allPicked && wrongIdx >= 0;
  const wrongWord = wrongIdx >= 0 ? lastPicks[wrongIdx] : "";

  const badge = (() => {
    if (q.status === "minAgo")
      return t("sentenceBuild.minAgo", { count: q.statusValue });
    if (q.status === "reviewDays")
      return t("sentenceBuild.reviewInDays", { count: q.statusValue });
    return t("sentenceBuild.isNew");
  })();

  const renderTranslation = () => {
    if (!q.tHighlight || !q.translation.includes(q.tHighlight))
      return <Text style={st.trans}>{q.translation}</Text>;
    const [a, b] = q.translation.split(q.tHighlight);
    return (
      <Text style={st.trans}>
        {a}
        <Text style={{ color: C.green, fontWeight: "700" }}>
          {q.tHighlight}
        </Text>
        {b}
      </Text>
    );
  };

  return (
    <LinearGradient colors={[C.bgTop, C.bgBot]} style={{ flex: 1 }}>
      {/* 헤더 */}
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

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 레벨 탭 */}
        <View style={st.levelTab}>
          <Text style={st.levelText}>
            {t("sentenceBuild.level", { n: q.level })} · {q.title}
          </Text>
          {!isOk && (
            <View style={st.badge}>
              <Text style={st.badgeText}>{badge}</Text>
            </View>
          )}
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
                      isOk && { backgroundColor: C.blankOk },
                    ]}
                  >
                    <Text style={[st.filledText, isOk && { color: C.okText }]}>
                      {w}
                    </Text>
                  </View>
                ))
              ) : (
                <View style={st.blankBox}>
                  <Text style={st.blankText}>{picks.join(" ")}</Text>
                </View>
              )}
              <Text style={st.sentText}>{q.after}</Text>
            </View>

            {renderTranslation()}

            {/* 오답 설명 버블 */}
            {showExplain && (
              <Animated.View
                entering={FadeIn.duration(250)}
                style={st.hintBubble}
              >
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
                  {q.hints[wrongWord] ?? t("sentenceBuild.wrongDefault")}
                </Text>
              </Animated.View>
            )}

            {/* 카드 하단 미니 버튼 (picking 시) */}
            {!isOk && (
              <View style={st.miniRow}>
                <Pressable style={st.miniBtn}>
                  <Ionicons name="checkmark" size={20} color={C.purple} />
                </Pressable>
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
          <View style={[st.bigRow, { paddingBottom: insets.bottom + 12 }]}>
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
              onPress={() =>
                speakEn(
                  q.before + q.rows.map((r) => r.correct).join(" ") + q.after,
                )
              }
            />
            <BigBtn
              colors={["#7b6ef0", "#5f52e0"]}
              icon={<Ionicons name="play" size={28} color="#fff" />}
              label={t("sentenceBuild.nextQuestion")}
              onPress={next}
            />
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
                  key={`${index}-${i}`}
                  layout={LinearTransition.springify().damping(16)}
                  exiting={FadeOut.duration(160)}
                  style={[
                    st.row,
                    {
                      zIndex: 50 - depth,
                      // 뒤 카드일수록 위로 올리고(-마진) + 살짝 작게 + 흐리게
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

          {/* 정답 확인 (모두 고르면) */}
          {allPicked && (
            <Animated.View
              entering={FadeIn.duration(200)}
              style={[st.checkWrap, { paddingBottom: insets.bottom + 14 }]}
            >
              <Pressable style={st.checkBtn} onPress={checkAnswer}>
                {({ pressed }) => (
                  <View
                    style={[
                      st.checkBtnInner,
                      pressed && { transform: [{ scale: 0.98 }] },
                    ]}
                  >
                    <Ionicons name="search-circle" size={26} color={C.purple} />
                    <Text style={st.checkBtnText}>
                      {t("sentenceBuild.checkAnswer")}
                    </Text>
                  </View>
                )}
              </Pressable>
            </Animated.View>
          )}
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
    padding: 22,
    minHeight: 240,
    overflow: "hidden",
  },
  checkMark: { position: "absolute", top: 4, left: 16, zIndex: 5 },
  sentence: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 10,
  },
  sentText: { fontSize: 30, fontWeight: "700", color: C.ink, lineHeight: 46 },
  blankBox: {
    minWidth: 120,
    height: 40,
    borderRadius: 8,
    backgroundColor: C.blank,
    marginHorizontal: 2,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  blankText: { fontSize: 28, fontWeight: "800", color: C.blankInk },
  filledWord: {
    backgroundColor: C.blank,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginHorizontal: 3,
    marginVertical: 2,
  },
  filledText: { fontSize: 28, fontWeight: "800", color: C.blankInk },
  trans: {
    fontSize: 19,
    fontWeight: "600",
    color: "#4a5a68",
    marginTop: 22,
    lineHeight: 28,
  },

  hintBubble: {
    backgroundColor: C.hintBg,
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  hintHead: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  hintAttempt: { flex: 1, fontSize: 20, fontWeight: "700", color: C.hintInk },
  hintText: {
    fontSize: 16,
    color: C.hintInk,
    lineHeight: 24,
    marginTop: 8,
    fontWeight: "500",
  },

  miniRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },
  miniBtn: {
    width: 54,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f3f2fb",
    alignItems: "center",
    justifyContent: "center",
  },

  pickArea: { paddingHorizontal: 16 },
  stack: { flexDirection: "column-reverse", paddingTop: 40 },
  row: { flexDirection: "row", gap: 12, justifyContent: "center" },
  card2: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 18,
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
  card2Text: { fontSize: 19, fontWeight: "600", color: "#5a6674" },
  card2TextActive: { fontSize: 22, fontWeight: "800", color: C.ink },

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
