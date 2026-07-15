import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";

const C = {
  bg: "#f4f5f9",
  card: "#ffffff",
  ink: "#2b2b3a",
  sub: "#9aa2b1",
  purple: "#8b7ff0",
  purpleDk: "#6f61e6",
  purpleSoft: "#efeafb",
  tabInk: "#8b7ff0",
  tabOff: "#3d3d4d",
  stageBg: "#fbe8d8",
  bubble: "#ffffff",
  gray: "#c9ccd6",
  grayBtn: "#d4d6de",
  track: "#e5e7ee",
  ringGray: "#c7cbd6",
  lockDim: "rgba(90,81,120,0.35)",
};

type Level = "beginner" | "elementary" | "intermediate" | "advanced";
interface Stage {
  step: number;
  a: string;
  b: string;
  pos: "front" | "back";
  leftBubble: string;
  leftWord: string;
  rightBubble: string;
  rightWord: string;
  easyDone: boolean;
  easyScore?: number;
  hardScore?: number;
}
// mock (백엔드 붙일 땐 이 맵만 교체)
const DATA: Record<
  Level,
  { story: string; total: number; done: number; stages: Stage[] }
> = {
  beginner: {
    story: "니니의 첫 해외 여행, 어리버리 맛집 체험!",
    total: 64,
    done: 0,
    stages: [
      {
        step: 1,
        a: "f",
        b: "p",
        pos: "front",
        leftBubble: "포크({0}) 주세요.",
        leftWord: "f",
        rightBubble: "네~ 돼지고기({0}) 나왔습니다.",
        rightWord: "p",
        easyDone: false,
      },
      {
        step: 2,
        a: "f",
        b: "p",
        pos: "back",
        leftBubble: "커피({0}) 주세요.",
        leftWord: "f",
        rightBubble: "네, 컵({0}) 드릴까요?",
        rightWord: "p",
        easyDone: false,
      },
      {
        step: 3,
        a: "b",
        b: "v",
        pos: "front",
        leftBubble: "배({0})를 예약했어요.",
        leftWord: "b",
        rightBubble: "표({0})는 여기 있어요.",
        rightWord: "v",
        easyDone: false,
      },
      {
        step: 4,
        a: "b",
        b: "v",
        pos: "back",
        leftBubble: "갈비({0}) 맛있어요.",
        leftWord: "b",
        rightBubble: "저는 채식({0})해요.",
        rightWord: "v",
        easyDone: false,
      },
    ],
  },
  elementary: {
    story: "니니의 카페 도전기!",
    total: 48,
    done: 0,
    stages: [
      {
        step: 1,
        a: "r",
        b: "l",
        pos: "front",
        leftBubble: "쌀({0}) 주세요.",
        leftWord: "r",
        rightBubble: "이({0})요? 여기요.",
        rightWord: "l",
        easyDone: false,
      },
      {
        step: 2,
        a: "r",
        b: "l",
        pos: "back",
        leftBubble: "여기 불({0}).",
        leftWord: "r",
        rightBubble: "차가운({0}) 거요?",
        rightWord: "l",
        easyDone: false,
      },
    ],
  },
  intermediate: {
    story: "니니의 회사 생활!",
    total: 40,
    done: 0,
    stages: [
      {
        step: 1,
        a: "θ",
        b: "s",
        pos: "front",
        leftBubble: "얇은({0}) 거요.",
        leftWord: "θ",
        rightBubble: "죄({0})송해요?",
        rightWord: "s",
        easyDone: false,
      },
    ],
  },
  advanced: {
    story: "니니의 발표 데뷔!",
    total: 32,
    done: 0,
    stages: [
      {
        step: 1,
        a: "ʃ",
        b: "s",
        pos: "front",
        leftBubble: "배({0}) 탔어요.",
        leftWord: "ʃ",
        rightBubble: "한 모금({0})?",
        rightWord: "s",
        easyDone: false,
      },
    ],
  },
};

const TABS: { key: Level }[] = [
  { key: "beginner" },
  { key: "elementary" },
  { key: "intermediate" },
  { key: "advanced" },
];

export default function PronunciationPractice() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [tab, setTab] = useState<Level>("beginner");
  const [expanded, setExpanded] = useState<number | null>(1);
  const [lockAlert, setLockAlert] = useState(false);

  const data = DATA[tab];
  const pct = data.total ? Math.round((data.done / data.total) * 100) : 0;

  const startEasy = () => router.push("/pronunciation-quiz");
  const startHard = (stage: Stage) => {
    if (!stage.easyDone) {
      setLockAlert(true);
      return;
    }
    router.push("/pronunciation-quiz");
  };

  // 말풍선 {0} → 단어 강조
  const renderBubble = (text: string, word: string) => {
    const parts = text.split("{0}");
    return (
      <Text style={st.bubbleText}>
        {parts[0]}
        <Text style={{ color: C.purpleDk, fontWeight: "800" }}>{word}</Text>
        {parts[1]}
      </Text>
    );
  };

  return (
    <View style={[st.container, { paddingTop: insets.top }]}>
      {/* 헤더 */}
      <View style={st.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={28} color={C.ink} />
        </Pressable>
        <Text style={st.headerTitle}>{t("pronPractice.title")}</Text>
      </View>

      {/* 탭 */}
      <View style={st.tabs}>
        {TABS.map((tb) => {
          const on = tab === tb.key;
          return (
            <Pressable
              key={tb.key}
              style={st.tab}
              onPress={() => {
                setTab(tb.key);
                setExpanded(1);
              }}
            >
              <Text style={[st.tabText, on && st.tabTextOn]}>
                {t(`pronPractice.tabs.${tb.key}`)}
              </Text>
              {on && <View style={st.tabBar} />}
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 스토리 진행 배너 */}
        <View style={st.banner}>
          <View style={{ flex: 1 }}>
            <Text style={st.bannerTitle}>{data.story}</Text>
            <View style={st.bannerTrack}>
              <View style={[st.bannerFill, { width: `${pct}%` }]} />
            </View>
          </View>
          <View style={st.ring}>
            <Text style={st.ringPct}>
              {pct}
              <Text style={st.ringPctSmall}>%</Text>
            </Text>
            <Text style={st.ringFrac}>
              {data.done}/{data.total}
            </Text>
          </View>
        </View>

        {/* 단계 카드들 */}
        {data.stages.map((stage) => {
          const open = expanded === stage.step;
          return (
            <Animated.View
              key={`${tab}-${stage.step}`}
              layout={LinearTransition.springify().damping(18)}
              style={st.stageCard}
            >
              {/* 헤더 (탭하면 열림/닫힘) */}
              <Pressable
                style={st.stageHead}
                onPress={() => setExpanded(open ? null : stage.step)}
              >
                <View style={{ flex: 1 }}>
                  <View style={st.stepBadge}>
                    <Text style={st.stepBadgeText}>
                      {t("pronPractice.step", { n: stage.step })}
                    </Text>
                  </View>
                  <View style={st.pairRow}>
                    <Text style={st.pairLetter}>{stage.a}</Text>
                    <Text style={st.pairVs}>vs</Text>
                    <Text style={st.pairLetter}>{stage.b}</Text>
                    <Text style={st.pairPos}>
                      {stage.pos === "front"
                        ? t("pronPractice.front")
                        : t("pronPractice.back")}
                    </Text>
                  </View>
                </View>
                <View style={st.chevron}>
                  <Ionicons
                    name={open ? "chevron-up" : "chevron-down"}
                    size={22}
                    color={C.sub}
                  />
                </View>
              </Pressable>

              {/* 펼침 내용 */}
              {open && (
                <Animated.View
                  entering={FadeIn.duration(200)}
                  exiting={FadeOut.duration(120)}
                >
                  {/* 캐릭터 식당 씬 */}
                  <View style={st.stage}>
                    <View style={st.stageBubbles}>
                      <View style={[st.bubble, { marginRight: 20 }]}>
                        {renderBubble(stage.leftBubble, stage.leftWord)}
                        <View style={[st.bubbleTail, { left: 30 }]} />
                      </View>
                      <View style={[st.bubble, { marginLeft: 20 }]}>
                        {renderBubble(stage.rightBubble, stage.rightWord)}
                        <View style={[st.bubbleTail, { right: 30 }]} />
                      </View>
                    </View>
                    <View style={st.chars}>
                      <Text style={st.char}>🐡</Text>
                      <Text style={st.charTable}>🍽️</Text>
                      <Text style={st.char}>🦖</Text>
                    </View>
                  </View>

                  {/* EASY / HARD */}
                  <View style={st.modes}>
                    <ModeCol
                      label="EASY"
                      score={stage.easyScore}
                      enabled
                      onStart={startEasy}
                      t={t}
                    />
                    <View style={st.modeDivider} />
                    <ModeCol
                      label="HARD"
                      score={stage.hardScore}
                      enabled={stage.easyDone}
                      onStart={() => startHard(stage)}
                      t={t}
                    />
                  </View>
                </Animated.View>
              )}
            </Animated.View>
          );
        })}
      </ScrollView>

      {/* Easy 먼저 알럿 */}
      <Modal
        transparent
        visible={lockAlert}
        animationType="fade"
        onRequestClose={() => setLockAlert(false)}
      >
        <View style={st.modalBg}>
          <Animated.View entering={FadeIn.duration(150)} style={st.modalCard}>
            <Text style={st.modalText}>{t("pronPractice.easyFirst")}</Text>
            <Pressable onPress={() => setLockAlert(false)}>
              {({ pressed }) => (
                <LinearGradient
                  colors={[C.purple, C.purpleDk]}
                  style={[st.modalBtn, pressed && { opacity: 0.9 }]}
                >
                  <Text style={st.modalBtnText}>
                    {t("pronPractice.confirm")}
                  </Text>
                </LinearGradient>
              )}
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

function ModeCol({ label, score, enabled, onStart, t }: any) {
  return (
    <View style={st.modeCol}>
      <View style={st.modeTop}>
        <Text style={[st.modeLabel, !enabled && { color: C.sub }]}>
          {label}
        </Text>
        <Text style={st.modeScore}>{score != null ? score : "--"}</Text>
      </View>
      <View style={st.modeLine} />
      <Pressable
        onPress={onStart}
        disabled={!enabled}
        style={{ marginTop: 14 }}
      >
        {({ pressed }) =>
          enabled ? (
            <LinearGradient
              colors={[C.purple, C.purpleDk]}
              style={[st.startBtn, pressed && { transform: [{ scale: 0.97 }] }]}
            >
              <Text style={st.startText}>{t("pronPractice.start")}</Text>
            </LinearGradient>
          ) : (
            <View style={[st.startBtn, { backgroundColor: C.grayBtn }]}>
              <Text style={[st.startText, { color: "#f4f4f6" }]}>
                {t("pronPractice.start")}
              </Text>
            </View>
          )
        }
      </Pressable>
    </View>
  );
}

const st = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 22, fontWeight: "800", color: C.ink },

  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e8e9ef",
  },
  tab: { flex: 1, alignItems: "center", paddingVertical: 14 },
  tabText: { fontSize: 17, fontWeight: "700", color: C.tabOff },
  tabTextOn: { color: C.tabInk, fontWeight: "800" },
  tabBar: {
    position: "absolute",
    bottom: -1,
    height: 2.5,
    width: "55%",
    backgroundColor: C.purple,
    borderRadius: 2,
  },

  banner: {
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  bannerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: C.ink,
    marginBottom: 14,
  },
  bannerTrack: { height: 8, backgroundColor: C.track, borderRadius: 4 },
  bannerFill: { height: 8, backgroundColor: C.purple, borderRadius: 4 },
  ring: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 5,
    borderColor: C.ringGray,
    alignItems: "center",
    justifyContent: "center",
  },
  ringPct: { fontSize: 22, fontWeight: "800", color: C.sub },
  ringPctSmall: { fontSize: 11 },
  ringFrac: { fontSize: 11, fontWeight: "600", color: C.sub },

  stageCard: {
    backgroundColor: C.card,
    borderRadius: 18,
    marginBottom: 16,
    overflow: "hidden",
  },
  stageHead: { flexDirection: "row", alignItems: "center", padding: 20 },
  stepBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#3d3d4d",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  stepBadgeText: { color: "#fff", fontSize: 13, fontWeight: "800" },
  pairRow: { flexDirection: "row", alignItems: "baseline", gap: 8 },
  pairLetter: { fontSize: 34, fontWeight: "800", color: C.ink },
  pairVs: { fontSize: 18, fontWeight: "700", color: C.sub },
  pairPos: { fontSize: 18, fontWeight: "700", color: C.ink, marginLeft: 4 },
  chevron: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f1f2f6",
    alignItems: "center",
    justifyContent: "center",
  },

  stage: {
    backgroundColor: C.stageBg,
    paddingTop: 16,
    paddingBottom: 8,
    marginHorizontal: 0,
  },
  stageBubbles: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  bubble: {
    flex: 1,
    backgroundColor: C.bubble,
    borderRadius: 16,
    padding: 12,
    maxWidth: 190,
  },
  bubbleText: {
    fontSize: 15,
    fontWeight: "600",
    color: C.ink,
    lineHeight: 22,
    textAlign: "center",
  },
  bubbleTail: {
    position: "absolute",
    bottom: -7,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 9,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: C.bubble,
  },
  chars: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginTop: 6,
    paddingHorizontal: 20,
  },
  char: { fontSize: 64 },
  charTable: { fontSize: 40, marginBottom: 8 },

  modes: { flexDirection: "row", padding: 20 },
  modeCol: { flex: 1, paddingHorizontal: 8 },
  modeDivider: { width: 1, backgroundColor: "#eceef3" },
  modeTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  modeLabel: { fontSize: 22, fontWeight: "800", color: C.ink },
  modeScore: { fontSize: 18, fontWeight: "700", color: C.sub },
  modeLine: { height: 2, backgroundColor: "#ececf0", marginTop: 8 },
  startBtn: { borderRadius: 26, paddingVertical: 16, alignItems: "center" },
  startText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },

  modalBg: {
    flex: 1,
    backgroundColor: "rgba(40,35,60,0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "700",
    color: C.ink,
    marginBottom: 20,
    textAlign: "center",
  },
  modalBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
  },
  modalBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
});
