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

export interface BuildRow {
  options: string[];
  correct: string;
}

/** 조립 문제 — 서버가 예문을 어절로 쪼개서 만들어 준다 */
export interface BuildQuestion {
  kind: "build";
  id: string;
  code: string;
  pattern: string;
  prompt: string; // 유저 언어 뜻
  rows: BuildRow[];
  full: string; // 완성된 한국어 문장
  hints?: Record<string, string>;
}

interface Props {
  question: BuildQuestion;
  onResult: (correct: boolean) => void;
}

export default function BuildSentenceCard({ question, onResult }: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  // 문장 전체를 어절로 조립하므로 고정 앞뒤 문구는 없다
  const q = { before: "", after: "", hints: {}, ...question };
  const [picks, setPicks] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [phase, setPhase] = useState<"picking" | "correct">("picking");
  const [attemptWrong, setAttemptWrong] = useState(false);
  const [lastPicks, setLastPicks] = useState<string[]>([]);

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
  }, [q.id]);

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
      check.value = 1;
    } else {
      setLastPicks(picks);
      setAttemptWrong(true);
      setPicks([]);
      setCurrentRow(0);
      shake.value = 0;
    }
  };

  // 한 번이라도 틀렸으면 정답 처리하지 않는다
  const next = () => onResult(isOk && !attemptWrong);

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

  // 지금 연습 중인 문법
  const badge = q.pattern;

  // 완성된 한국어 문장 (정답 후 노출)
  const renderTranslation = () => <Text style={st.trans}>{q.full}</Text>;

  return (
    <LinearGradient colors={[C.bgTop, C.bgBot]} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 레벨 탭 */}
        <View style={st.levelTab}>
          <Text style={st.levelText}>{q.prompt}</Text>
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
          <View style={[st.bigRow, { paddingBottom: insets.bottom + 8 }]}>
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
              onPress={() => Speech.speak(q.full, { language: "ko-KR" })}
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

          {/* 정답 확인 (모두 고르면) */}
          {allPicked && (
            <Animated.View
              style={[st.checkWrap, { paddingBottom: insets.bottom + 10 }]}
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
  stack: { flexDirection: "column-reverse", marginBottom: 50 },
  row: { flexDirection: "row", gap: 5, justifyContent: "center" },
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
