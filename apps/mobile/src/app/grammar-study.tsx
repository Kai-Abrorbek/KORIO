import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextStyle,
} from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "@/utils/haptics";
import { Ionicons } from "@expo/vector-icons";
import { useSpeech } from "@/hooks/useSpeech";
import { MOCK_GRAMMAR } from "@/mocks/grammar.mock";
import {
  Grammar,
  GrammarExample,
  GrammarDialogueTurn,
  GrammarQuizItem,
} from "@/types/grammar";
import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { GrammarService } from "@/services/grammar.service";
import { StudyPathService } from "@/services/study-path.service";

const C = {
  cream: "#FBF1DC",
  ink: "#17120C",
  paper: "#FFFDF6",
  yellow: "#FBD24E",
  pink: "#F7C0D4",
  blue: "#A7D8F0",
  coral: "#FF5A2E",
  mint: "#BFE8C6",
  sub: "#8a7f6d",
  green: "#3FB56A",
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/* 하드 오프셋 그림자 카드 */
function NB({ children, bg = C.paper, style }: any) {
  return (
    <View style={st.nbOuter}>
      <View style={st.nbShadow} />
      <View style={[st.nbCard, { backgroundColor: bg }, style]}>
        {children}
      </View>
    </View>
  );
}

/* 눌리는 카드/버튼 */
function NBPress({ children, onPress, bg = "#fff", radius = 14, style }: any) {
  const p = useSharedValue(0);
  const card = useAnimatedStyle(() => ({
    transform: [{ translateX: p.value * 4 }, { translateY: p.value * 5 }],
  }));
  const sh = useAnimatedStyle(() => ({ opacity: 1 - p.value }));
  return (
    <View style={{ position: "relative" }}>
      <Animated.View style={[st.nbShadow, { borderRadius: radius }, sh]} />
      <AnimatedPressable
        onPressIn={() => (p.value = withTiming(1, { duration: 70 }))}
        onPressOut={() => (p.value = withTiming(0, { duration: 110 }))}
        onPress={onPress}
        style={[
          st.nbCardBase,
          { backgroundColor: bg, borderRadius: radius },
          style,
          card,
        ]}
      >
        {children}
      </AnimatedPressable>
    </View>
  );
}

/* 문장 내 문법 하이라이트 */
function HL({
  text,
  highlight,
  style,
}: {
  text: string;
  highlight?: string;
  style?: TextStyle;
}) {
  if (!highlight || !text.includes(highlight))
    return <Text style={style}>{text}</Text>;
  const parts = text.split(highlight);
  return (
    <Text style={style}>
      {parts.map((p, i) => (
        <Text key={i}>
          {p}
          {i < parts.length - 1 && <Text style={st.hl}>{highlight}</Text>}
        </Text>
      ))}
    </Text>
  );
}

function Kicker({ children }: any) {
  return <Text style={st.kicker}>{children}</Text>;
}

function ExampleRow({ ex }: { ex: GrammarExample }) {
  const { speak } = useSpeech();
  return (
    <View style={st.ex}>
      <View style={{ flex: 1 }}>
        <HL text={ex.ko} highlight={ex.highlight} style={st.exKo} />
        {!!ex.gloss && <Text style={st.exEn}>{ex.gloss}</Text>}
      </View>
      <Pressable onPress={() => speak(ex.ko)} hitSlop={8} style={st.spk}>
        <Ionicons name="volume-high" size={18} color={C.ink} />
      </Pressable>
    </View>
  );
}

function DialogueRow({ turn }: { turn: GrammarDialogueTurn }) {
  const right = turn.side === "right";
  return (
    <View style={[st.dRow, right && { flexDirection: "row-reverse" }]}>
      <View style={[st.av, { backgroundColor: right ? C.blue : C.pink }]}>
        <Text style={st.avT}>{turn.speaker}</Text>
      </View>
      <View style={[st.bub, right ? st.bubR : st.bubL]}>
        <HL text={turn.ko} highlight={turn.highlight} style={st.bubTxt} />
        {!!turn.gloss && <Text style={st.bubEn}>{turn.gloss}</Text>}
      </View>
    </View>
  );
}

function Quiz({
  items,
  onComplete,
}: {
  items: GrammarQuizItem[];
  onComplete?: () => void;
}) {
  const { t } = useTranslation();
  const [idx, setIdx] = useState(0);
  const [solved, setSolved] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState<number | null>(null);

  // 퀴즈를 끝까지 통과하면 완료 저장
  useEffect(() => {
    if (items.length > 0 && idx >= items.length) onComplete?.();
  }, [idx, items.length, onComplete]);

  if (idx >= items.length) {
    return (
      <View style={{ alignItems: "center", paddingVertical: 12 }}>
        <Text style={st.doneBig}>{t("grammarStudy.doneTitle")}</Text>
        <Text style={st.doneSub}>{t("grammarStudy.doneSub")}</Text>
        <Pressable
          onPress={() => {
            setIdx(0);
            setSolved(0);
            setPicked(null);
            setWrong(null);
          }}
        >
          <Text style={st.retry}>{t("grammarStudy.retry")}</Text>
        </Pressable>
      </View>
    );
  }

  const item = items[idx];
  const choose = (i: number, correct: boolean) => {
    if (picked !== null) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (correct) {
      setPicked(i);
      const nextSolved = solved + 1;
      setSolved(nextSolved);
      setTimeout(() => {
        setPicked(null);
        setWrong(null);
        setIdx(idx + 1);
      }, 750);
    } else {
      setWrong(i);
      setTimeout(() => setWrong(null), 350);
    }
  };

  return (
    <View>
      <View style={st.qHead}>
        <Kicker>{t("grammarStudy.practice")}</Kicker>
        <Text style={st.qProg}>
          {idx + 1} / {items.length}
        </Text>
      </View>
      <View style={st.pbar}>
        <View
          style={[st.pbarFill, { width: `${(solved / items.length) * 100}%` }]}
        />
      </View>
      <Text style={st.qText}>{item.question}</Text>
      <View style={{ gap: 11 }}>
        {item.options.map((o, i) => (
          <NBPress
            key={i}
            onPress={() => choose(i, o.correct)}
            bg={picked === i ? C.mint : wrong === i ? "#ffc4b3" : "#fff"}
            radius={14}
            style={{ opacity: picked !== null && picked !== i ? 0.5 : 1 }}
          >
            <Text style={st.optTxt}>{o.text}</Text>
          </NBPress>
        ))}
      </View>
      {picked !== null && (
        <Text style={[st.qMsg, { color: C.green }]}>
          {t("grammarStudy.correct")}
        </Text>
      )}
      {wrong !== null && (
        <Text style={[st.qMsg, { color: C.coral }]}>
          {t("grammarStudy.tryAgain")}
        </Text>
      )}
    </View>
  );
}

export default function GrammarStudy() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { speak } = useSpeech();
  const { id, scoped, from, section, unit } = useLocalSearchParams<{
    id?: string;
    /** "1" 이면 다음 문법을 그 유닛 안에서만 찾는다 (학습 로드 모드) */
    scoped?: string;
    /** "studyPath" 면 그날 문법을 다 보고 로드맵으로 돌아간다 */
    from?: string;
    section?: string;
    unit?: string;
  }>();
  const [g, setG] = useState<Grammar | null>(null);
  const isScoped = scoped === "1";

  useEffect(() => {
    GrammarService.getGrammar(id ?? "prog-goitda", isScoped)
      .then(setG)
      .catch(() => setG(MOCK_GRAMMAR)); // 백엔드 없으면 목업 폴백
  }, [id, isScoped]);
  if (!g) return null; // 필요하면 로딩 뷰

  const Section = ({ children, delay = 0 }: any) => (
    <Animated.View entering={FadeInDown.delay(delay).duration(380)}>
      {children}
    </Animated.View>
  );

  return (
    <View style={[st.container, { paddingTop: insets.top + 6 }]}>
      <View style={st.topbar}>
        <NBPress
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
          bg="#fff"
          radius={12}
          style={st.back}
        >
          <Text style={st.backT}>‹</Text>
        </NBPress>
        <Text style={st.crumb}>{t("grammarStudy.crumb")}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingBottom: insets.bottom + 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}
        <Section>
          <NB>
            <Kicker>{t("grammarStudy.learning")}</Kicker>
            <View style={st.patRow}>
              <View style={st.patHl}>
                <Text style={st.pat}>{g.pattern}</Text>
              </View>
              <Pressable
                onPress={() => speak(g.pattern)}
                hitSlop={8}
                style={st.spk}
              >
                <Ionicons name="volume-high" size={20} color={C.ink} />
              </Pressable>
            </View>
            <Text style={st.sum}>{g.summary}</Text>
            {g.tags.length > 0 && (
              <View style={st.tags}>
                {g.tags.map((tag, i) => (
                  <View
                    key={i}
                    style={[
                      st.tag,
                      { backgroundColor: [C.blue, C.mint, C.yellow][i % 3] },
                    ]}
                  >
                    <Text style={st.tagT}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </NB>
        </Section>

        {/* 자세한 설명 */}
        {!!g.explanation && (
          <Section delay={40}>
            <NB>
              <Kicker>{t("grammarStudy.explanation")}</Kicker>
              <Text style={st.prose}>{g.explanation}</Text>
            </NB>
          </Section>
        )}

        {/* 활용 규칙 */}
        {g.conjugations.length > 0 && (
          <Section delay={80}>
            <NB>
              <Kicker>{t("grammarStudy.conjugation")}</Kicker>
              {!!g.conjugationRule && (
                <Text style={st.rule}>{g.conjugationRule}</Text>
              )}
              <View style={{ gap: 9, marginTop: 4 }}>
                {g.conjugations.map((c, i) => (
                  <View key={i} style={st.conjRow}>
                    <Text style={st.conjBase}>{c.base}</Text>
                    <Text style={st.arw}>→</Text>
                    <Text style={st.hl}>{c.result}</Text>
                  </View>
                ))}
              </View>
            </NB>
          </Section>
        )}

        {/* 예문 */}
        {g.examples.length > 0 && (
          <Section delay={120}>
            <NB>
              <Kicker>{t("grammarStudy.examples")}</Kicker>
              {g.examples.map((ex, i) => (
                <ExampleRow key={i} ex={ex} />
              ))}
            </NB>
          </Section>
        )}

        {/* 대화 */}
        {g.dialogue.length > 0 && (
          <Section delay={160}>
            <NB>
              <Kicker>{t("grammarStudy.dialogue")}</Kicker>
              <View style={{ gap: 12 }}>
                {g.dialogue.map((turn, i) => (
                  <DialogueRow key={i} turn={turn} />
                ))}
              </View>
            </NB>
          </Section>
        )}

        {/* 비슷한 문법 */}
        {g.similar && (
          <Section delay={200}>
            <NB bg={C.blue}>
              <Kicker>{t("grammarStudy.similar")}</Kicker>
              <Text style={st.simEq}>
                {g.pattern} ≈ {g.similar.pattern}
              </Text>
              <Text style={st.simNote}>{g.similar.note}</Text>
            </NB>
          </Section>
        )}

        {/* 흔한 실수 */}
        {g.cautions.length > 0 && (
          <Section delay={240}>
            <NB bg={C.pink}>
              <Kicker>{t("grammarStudy.cautions")}</Kicker>
              <View style={{ gap: 9 }}>
                {g.cautions.map((c, i) => (
                  <View key={i} style={st.warnRow}>
                    <Text style={st.warnDot}>•</Text>
                    <Text style={st.warnTxt}>{c}</Text>
                  </View>
                ))}
              </View>
            </NB>
          </Section>
        )}

        {/* 연습 */}
        {g.quiz.length > 0 && (
          <Section delay={280}>
            <NB>
              <Quiz
                items={g.quiz}
                onComplete={() =>
                  GrammarService.completeGrammar(g.id).catch(() => {})
                }
              />
            </NB>
          </Section>
        )}

        {/* 다음 문법 — 없으면 그날 문법을 다 본 것이다 */}
        {g.nextPattern && g.nextId ? (
          <NBPress
            onPress={() => {
              // push 로 쌓으면 뒤로가기가 앞선 문법들을 거꾸로 훑는다.
              // 순서대로 나아가는 화면이라 replace 가 맞다.
              router.replace({
                pathname: "/grammar-study",
                params: {
                  id: g.nextId as string,
                  scoped: isScoped ? "1" : "",
                  from: from ?? "",
                },
              });
            }}
            bg={C.yellow}
            radius={16}
            style={st.cta}
          >
            <Text style={st.ctaT}>
              {t("grammarStudy.next")} · {g.nextPattern} →
            </Text>
          </NBPress>
        ) : isScoped ? (
          <NBPress
            onPress={() => {
              // 그날 문법을 끝까지 봤다는 사실을 남긴다. 퀴즈를 다 풀었는지로만
              // 판정하면 끝까지 보고 나온 사람도 다음 노드가 안 열린다.
              const s = Number(section);
              const u = Number(unit);
              if (s > 0 && u > 0) {
                StudyPathService.completeNode(s, u, "grammar", 1, 1).catch(
                  () => {},
                );
              }
              if (from === "studyPath") {
                router.replace("/study-path");
                return;
              }
              router.canGoBack() ? router.back() : router.replace("/");
            }}
            bg={C.yellow}
            radius={16}
            style={st.cta}
          >
            <Text style={st.ctaT}>{t("grammarStudy.finishDay")}</Text>
          </NBPress>
        ) : null}
      </ScrollView>
    </View>
  );
}

const st = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.cream },
  nbOuter: { marginBottom: 16, position: "relative" },
  nbShadow: {
    position: "absolute",
    left: 4,
    top: 5,
    right: -4,
    bottom: -5,
    backgroundColor: C.ink,
    borderRadius: 20,
  },
  nbCard: { borderWidth: 3, borderColor: C.ink, borderRadius: 20, padding: 18 },
  nbCardBase: { borderWidth: 3, borderColor: C.ink, padding: 14 },
  hl: { backgroundColor: C.yellow, fontWeight: "800", color: C.ink },
  kicker: {
    fontFamily: "System",
    fontSize: 11.5,
    letterSpacing: 1,
    color: C.sub,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 10,
  },

  topbar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  back: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  backT: { fontSize: 24, fontWeight: "800", color: C.ink, marginTop: -4 },
  crumb: { fontSize: 13, color: C.sub, fontWeight: "600" },

  patRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 12,
  },
  patHl: {
    backgroundColor: C.yellow,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  pat: { fontSize: 40, fontWeight: "800", color: C.ink },
  spk: {
    marginLeft: 12,
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: C.ink,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sum: { fontSize: 16.5, fontWeight: "600", color: C.ink, lineHeight: 24 },
  tags: { flexDirection: "row", gap: 8, marginTop: 14 },
  tag: {
    borderWidth: 2,
    borderColor: C.ink,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagT: { fontSize: 12, fontWeight: "700", color: C.ink },

  prose: { fontSize: 14.5, lineHeight: 24, color: "#3a3223" },
  rule: { fontSize: 15, fontWeight: "600", color: C.ink, marginBottom: 12 },
  conjRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  conjBase: { fontSize: 15, fontWeight: "600", color: C.ink },
  arw: { color: C.coral, fontWeight: "800", fontSize: 15 },

  ex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderColor: "#e3d6b6",
    borderStyle: "dashed",
  },
  exKo: { fontSize: 16, fontWeight: "600", color: C.ink },
  exEn: { fontSize: 12.5, color: C.sub, marginTop: 4 },

  dRow: { flexDirection: "row", gap: 8, alignItems: "flex-end" },
  av: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 3,
    borderColor: C.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  avT: { fontWeight: "800", fontSize: 14, color: C.ink },
  bub: {
    maxWidth: "78%",
    borderWidth: 3,
    borderColor: C.ink,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 13,
  },
  bubL: { backgroundColor: "#fff", borderBottomLeftRadius: 5 },
  bubR: { backgroundColor: C.yellow, borderBottomRightRadius: 5 },
  bubTxt: { fontSize: 15, fontWeight: "500", color: C.ink },
  bubEn: { fontSize: 11, color: C.sub, marginTop: 4 },

  simEq: {
    fontSize: 21,
    fontWeight: "800",
    color: C.ink,
    textAlign: "center",
    marginVertical: 6,
  },
  simNote: { fontSize: 14, lineHeight: 22, fontWeight: "500", color: C.ink },

  warnRow: { flexDirection: "row", gap: 8 },
  warnDot: { color: C.coral, fontWeight: "800", fontSize: 18, marginTop: -2 },
  warnTxt: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: C.ink,
    lineHeight: 20,
  },

  qHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qProg: { fontSize: 12, fontWeight: "700", color: C.ink },
  pbar: {
    height: 10,
    borderWidth: 2,
    borderColor: C.ink,
    borderRadius: 99,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 16,
  },
  pbarFill: { height: "100%", backgroundColor: C.green },
  qText: {
    fontSize: 18,
    fontWeight: "700",
    color: C.ink,
    lineHeight: 26,
    marginBottom: 16,
  },
  optTxt: { fontSize: 16, fontWeight: "700", color: C.ink },
  qMsg: { fontSize: 13, fontWeight: "700", textAlign: "center", marginTop: 14 },
  doneBig: { fontSize: 30, fontWeight: "800", color: C.ink },
  doneSub: { fontSize: 14, fontWeight: "600", color: C.ink, marginTop: 6 },
  retry: {
    fontSize: 12,
    color: C.sub,
    textDecorationLine: "underline",
    marginTop: 10,
  },

  cta: { alignItems: "center", justifyContent: "center", paddingVertical: 17 },
  ctaT: { fontSize: 18, fontWeight: "800", color: C.ink },
});
