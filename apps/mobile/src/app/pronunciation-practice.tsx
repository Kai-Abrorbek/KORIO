import { useCallback, useState } from "react";
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
import { useFocusEffect, useRouter } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import * as Haptics from "@/utils/haptics";
import { UserService } from "@/services/user.service";
import {
  PRON_DATA,
  PRON_LEVELS,
  HARD_UNLOCK_SCORE,
  STAGE_PASS_SCORE,
  levelTotal,
  correctNeededFor,
  type PronLevel,
  type PronStage,
} from "@/constants/pronunciation";

const C = {
  bg: "#f4f5f9",
  card: "#ffffff",
  ink: "#2b2b3a",
  sub: "#9aa2b1",
  purple: "#8b7ff0",
  purpleDk: "#6f61e6",
  tabInk: "#8b7ff0",
  tabOff: "#3d3d4d",
  stageBg: "#fbe8d8",
  bubble: "#ffffff",
  grayBtn: "#d4d6de",
  track: "#e5e7ee",
  ringGray: "#c7cbd6",
  green: "#3cba54",
};

/** 점수 맵 키 — 백엔드와 같은 규칙 */
const key = (lv: PronLevel, step: number, mode: "easy" | "hard") =>
  `${lv}:${step}:${mode}`;

export default function PronunciationPractice() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [tab, setTab] = useState<PronLevel>("lv1");
  const [expanded, setExpanded] = useState<number | null>(1);
  // 어느 단계에서 잠금을 눌렀는지 알아야 "몇 개 맞혀야 하는지"를 말해줄 수 있다
  const [lockAlert, setLockAlert] = useState<PronStage | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});

  // 퀴즈를 풀고 돌아올 때마다 새로 받아야 점수가 바로 반영된다
  useFocusEffect(
    useCallback(() => {
      UserService.getPronunciation()
        .then((r) => setScores(r.scores ?? {}))
        .catch(() => {});
    }, []),
  );

  const data = PRON_DATA[tab];
  const total = levelTotal(tab);
  const done = data.stages.reduce((n, s) => {
    const e = scores[key(tab, s.step, "easy")] ?? 0;
    const h = scores[key(tab, s.step, "hard")] ?? 0;
    return (
      n + (e >= STAGE_PASS_SCORE ? 1 : 0) + (h >= STAGE_PASS_SCORE ? 1 : 0)
    );
  }, 0);
  const pct = total ? Math.round((done / total) * 100) : 0;

  const open = (stage: PronStage, mode: "easy" | "hard") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/pronunciation-quiz",
      params: { level: tab, step: String(stage.step), mode },
    });
  };

  const startHard = (stage: PronStage) => {
    const easy = scores[key(tab, stage.step, "easy")] ?? 0;
    if (easy < HARD_UNLOCK_SCORE) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setLockAlert(stage);
      return;
    }
    open(stage, "hard");
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
      <View style={st.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={28} color={C.ink} />
        </Pressable>
        <Text style={st.headerTitle}>{t("pronPractice.title")}</Text>
      </View>

      {/* 탭 — 라벨은 짧게 고정. 무슨 레벨인지는 아래 배너가 설명한다 */}
      <View style={st.tabs}>
        {PRON_LEVELS.map((lv) => {
          const on = tab === lv;
          return (
            <Pressable
              key={lv}
              style={st.tab}
              onPress={() => {
                Haptics.selectionAsync();
                setTab(lv);
                setExpanded(1);
              }}
            >
              <Text
                style={[st.tabText, on && st.tabTextOn]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
              >
                {t(`pronPractice.tabs.${lv}`)}
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
        {/* 진행 배너 — 실제 저장된 점수로 계산 */}
        <View style={st.banner}>
          <View style={{ flex: 1 }}>
            <Text style={st.bannerTitle}>{t(data.storyKey)}</Text>
            <Text style={st.bannerSub}>{t(`pronPractice.focus.${tab}`)}</Text>
            <View style={st.bannerTrack}>
              <View style={[st.bannerFill, { width: `${pct}%` }]} />
            </View>
          </View>
          <View style={[st.ring, pct > 0 && { borderColor: C.purple }]}>
            <Text style={[st.ringPct, pct > 0 && { color: C.purpleDk }]}>
              {pct}
              <Text style={st.ringPctSmall}>%</Text>
            </Text>
            <Text style={st.ringFrac}>
              {done}/{total}
            </Text>
          </View>
        </View>

        {/* 단계 카드들 */}
        {data.stages.map((stage) => {
          const isOpen = expanded === stage.step;
          const easy = scores[key(tab, stage.step, "easy")];
          const hard = scores[key(tab, stage.step, "hard")];
          const hardOpen = (easy ?? 0) >= HARD_UNLOCK_SCORE;
          const cleared =
            (easy ?? 0) >= STAGE_PASS_SCORE && (hard ?? 0) >= STAGE_PASS_SCORE;

          return (
            <View key={`${tab}-${stage.step}`} style={st.stageCard}>
              <Pressable
                style={st.stageHead}
                onPress={() => setExpanded(isOpen ? null : stage.step)}
              >
                <View style={{ flex: 1 }}>
                  <View style={st.badgeRow}>
                    <View style={st.stepBadge}>
                      <Text style={st.stepBadgeText}>
                        {t("pronPractice.step", { n: stage.step })}
                      </Text>
                    </View>
                    {cleared && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={C.green}
                      />
                    )}
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
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={22}
                    color={C.sub}
                  />
                </View>
              </Pressable>

              {/* 펼침 내용 — 레이아웃 애니메이션 없음(카드가 튀어서 뺐다) */}
              {isOpen && (
                <View>
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

                  <View style={st.modes}>
                    <ModeCol
                      label="EASY"
                      score={easy}
                      enabled
                      onStart={() => open(stage, "easy")}
                      t={t}
                    />
                    <View style={st.modeDivider} />
                    <ModeCol
                      label="HARD"
                      score={hard}
                      enabled={hardOpen}
                      onStart={() => startHard(stage)}
                      t={t}
                    />
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* HARD 잠김 안내 */}
      <Modal
        transparent
        visible={!!lockAlert}
        animationType="fade"
        onRequestClose={() => setLockAlert(null)}
      >
        <View style={st.modalBg}>
          <Animated.View entering={FadeIn.duration(150)} style={st.modalCard}>
            <View style={st.modalIcon}>
              <Ionicons name="lock-closed" size={26} color={C.purpleDk} />
            </View>
            <Text style={st.modalText}>
              {t("pronPractice.hardLocked", {
                score: HARD_UNLOCK_SCORE,
                ...(lockAlert
                  ? correctNeededFor(tab, lockAlert.step, HARD_UNLOCK_SCORE)
                  : { need: 0, total: 0 }),
              })}
            </Text>
            <Pressable
              onPress={() => setLockAlert(null)}
              style={{ width: "100%" }}
            >
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
        <Text
          style={[
            st.modeScore,
            score != null && { color: C.purpleDk, fontWeight: "800" },
          ]}
        >
          {score != null ? score : "--"}
        </Text>
      </View>
      <View style={st.modeLine} />
      <Pressable onPress={onStart} style={{ marginTop: 14 }}>
        {({ pressed }) =>
          enabled ? (
            <LinearGradient
              colors={[C.purple, C.purpleDk]}
              style={[st.startBtn, pressed && { opacity: 0.88 }]}
            >
              <Text style={st.startText}>{t("pronPractice.start")}</Text>
            </LinearGradient>
          ) : (
            // 잠겨도 누를 수는 있어야 이유를 알려줄 수 있다
            <View style={[st.startBtn, { backgroundColor: C.grayBtn }]}>
              <Ionicons name="lock-closed" size={18} color="#f4f4f6" />
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
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  tabText: { fontSize: 16, fontWeight: "700", color: C.tabOff },
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
  bannerTitle: { fontSize: 17, fontWeight: "800", color: C.ink },
  bannerSub: {
    fontSize: 13,
    fontWeight: "600",
    color: C.sub,
    marginTop: 4,
    marginBottom: 12,
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
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  stepBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#3d3d4d",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stepBadgeText: { color: "#fff", fontSize: 13, fontWeight: "800" },
  pairRow: { flexDirection: "row", alignItems: "baseline", gap: 8 },
  pairLetter: { fontSize: 34, fontWeight: "800", color: C.ink },
  pairVs: { fontSize: 18, fontWeight: "700", color: C.sub },
  pairPos: { fontSize: 16, fontWeight: "700", color: C.ink, marginLeft: 4 },
  chevron: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f1f2f6",
    alignItems: "center",
    justifyContent: "center",
  },

  stage: { backgroundColor: C.stageBg, paddingTop: 16, paddingBottom: 8 },
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
  startBtn: {
    borderRadius: 26,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
  },
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
  modalIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#efeafb",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  modalText: {
    fontSize: 17,
    fontWeight: "700",
    color: C.ink,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 24,
  },
  modalBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
  },
  modalBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
});
