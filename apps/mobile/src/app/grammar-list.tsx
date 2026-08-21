import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Modal,
} from "react-native";
import Animated, {
  FadeInDown,
  SlideInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "@/utils/haptics";
import { Ionicons } from "@expo/vector-icons";
import { GrammarService } from "@/services/grammar.service";
import { GrammarListItem } from "@/types/grammar";

/* grammar-study 와 동일한 뉴브루탈 팔레트 */
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
  gold: "#E2A83A",
  goldBg: "#FCEFC7",
};

const SECTION_COUNT = 12;
const SECTION_COLORS = [C.blue, C.mint, C.yellow, C.pink];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/* 눌리는 하드섀도우 카드 (grammar-study NBPress 톤) */
function NBPress({ children, onPress, bg = "#fff", radius = 14, style }: any) {
  const p = useSharedValue(0);
  const card = useAnimatedStyle(() => ({
    transform: [{ translateX: p.value * 3 }, { translateY: p.value * 4 }],
  }));
  const sh = useAnimatedStyle(() => ({ opacity: 1 - p.value }));
  return (
    <View style={{ position: "relative" }}>
      <Animated.View style={[st.shadow, { borderRadius: radius }, sh]} />
      <AnimatedPressable
        onPressIn={() => (p.value = withTiming(1, { duration: 70 }))}
        onPressOut={() => (p.value = withTiming(0, { duration: 110 }))}
        onPress={onPress}
        style={[
          st.cardBase,
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

/* 문법 한 개 카드 */
function GrammarCard({ item }: { item: GrammarListItem }) {
  // 같은 화면의 파라미터를 그대로 읽는다. 학습 로드 모드로 들어왔으면
  // 그 사실을 문법 상세까지 들고 가야 "다음 문법" 이 유닛 안에서 멈춘다.
  const params = useLocalSearchParams<{ from?: string; section?: string }>();
  const scoped = !!Number(params.section);

  return (
    <NBPress
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push({
          pathname: "/grammar-study",
          params: {
            id: item.id,
            scoped: scoped ? "1" : "",
            from: params.from ?? "",
          },
        });
      }}
      bg={C.paper}
      radius={14}
      style={st.gCard}
    >
      <View style={st.patBox}>
        <Text style={st.pat}>{item.pattern}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={st.gSum} numberOfLines={2}>
          {item.summary}
        </Text>
        {item.tags.length > 0 && (
          <View style={st.tags}>
            {item.tags.slice(0, 3).map((tag, i) => (
              <View key={i} style={st.tag}>
                <Text style={st.tagT}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      {item.completed ? (
        <Ionicons name="checkmark-circle" size={24} color={C.green} />
      ) : (
        <Ionicons name="chevron-forward" size={20} color={C.ink} />
      )}
    </NBPress>
  );
}

/* 섹션 아코디언 블록 (순차 잠금 + 프리미엄 잠금) */
function SectionBlock({
  section,
  items,
  color,
  expanded,
  locked,
  premiumLocked,
  onToggle,
  onPremium,
  badge,
  title,
  t,
}: {
  section: number;
  items: GrammarListItem[];
  color: string;
  expanded: boolean;
  locked: boolean; // 순차 잠금 (이전 섹션 미완료)
  premiumLocked: boolean; // 프리미엄 필요
  onToggle: () => void;
  onPremium: () => void;
  /** 원 안에 보일 값. 기본은 섹션 번호 */
  badge?: string;
  /** 헤더 제목. 기본은 "섹션 N" */
  title?: string;
  t: (k: string, o?: any) => string;
}) {
  const empty = items.length === 0;
  const allDone = items.length > 0 && items.every((g) => g.completed);
  const open = expanded && !locked && !premiumLocked;
  const rot = useSharedValue(open ? 1 : 0);
  useEffect(() => {
    rot.value = withTiming(open ? 1 : 0, { duration: 200 });
  }, [open, rot]);
  const chevStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rot.value * 90}deg` }],
  }));

  const headBg = premiumLocked ? C.goldBg : locked ? "#EFE7D2" : color;

  const onHeadPress = () => {
    if (premiumLocked) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onPremium();
      return;
    }
    if (locked) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle();
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={{ position: "relative" }}>
        <View style={[st.shadow, { borderRadius: 18 }]} />
        <Pressable
          onPress={onHeadPress}
          style={[
            st.secHead,
            { backgroundColor: headBg, opacity: locked ? 0.65 : 1 },
          ]}
        >
          <View style={[st.secNum, premiumLocked && { borderColor: C.gold }]}>
            {premiumLocked ? (
              <Ionicons name="star" size={22} color={C.gold} />
            ) : (
              <Text style={st.secNumT}>{badge ?? section}</Text>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={st.secTitle}>
              {title ?? t("grammarList.section", { n: section })}
            </Text>
            <Text
              style={[
                st.secSub,
                premiumLocked && { color: C.gold, opacity: 1 },
              ]}
            >
              {premiumLocked
                ? t("grammarList.superOnly")
                : locked
                  ? empty
                    ? t("grammarList.comingSoon")
                    : t("grammarList.locked")
                  : allDone
                    ? t("grammarList.sectionDone")
                    : t("grammarList.count", { count: items.length })}
            </Text>
          </View>
          {premiumLocked ? (
            <Ionicons name="lock-closed" size={20} color={C.gold} />
          ) : locked ? (
            <Ionicons name="lock-closed" size={20} color={C.ink} />
          ) : (
            <Animated.View style={chevStyle}>
              <Ionicons name="chevron-forward" size={22} color={C.ink} />
            </Animated.View>
          )}
        </Pressable>
      </View>

      {open && (
        <View style={{ marginTop: 12, gap: 12 }}>
          {items.map((item, i) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(i * 50).duration(300)}
            >
              <GrammarCard item={item} />
            </Animated.View>
          ))}
        </View>
      )}
    </View>
  );
}

/* 하단 구독 유도 시트 */
function PremiumSheet({
  visible,
  onClose,
  bottomInset,
  t,
}: {
  visible: boolean;
  onClose: () => void;
  bottomInset: number;
  t: (k: string, o?: any) => string;
}) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={st.overlay} onPress={onClose} />
      <Animated.View
        entering={SlideInDown.springify().damping(18)}
        style={[st.sheet, { paddingBottom: bottomInset + 24 }]}
      >
        <View style={st.handle} />
        <View style={st.crownWrap}>
          <Ionicons name="star" size={40} color={C.gold} />
        </View>
        <Text style={st.sheetTitle}>{t("grammarList.premiumTitle")}</Text>
        <Text style={st.sheetDesc}>{t("grammarList.premiumDesc")}</Text>
        <NBPress
          onPress={() => {
            onClose();
            router.push("/premium");
          }}
          bg={C.yellow}
          radius={16}
          style={st.subBtn}
        >
          <Text style={st.subBtnT}>{t("grammarList.premiumCta")}</Text>
        </NBPress>
        <Pressable onPress={onClose} style={{ paddingVertical: 10 }}>
          <Text style={st.later}>{t("grammarList.premiumLater")}</Text>
        </Pressable>
      </Animated.View>
    </Modal>
  );
}

export default function GrammarList() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  // 학습 로드 모드에서 "그날의 문법" 노드로 들어오면 그 유닛만 보여준다.
  // 파라미터가 없으면 지금처럼 섹션 전체 목록.
  const params = useLocalSearchParams<{ section?: string; unit?: string }>();
  const scopeSection = Number(params.section);
  const scopeUnit = Number(params.unit);
  const scoped =
    Number.isInteger(scopeSection) &&
    scopeSection > 0 &&
    Number.isInteger(scopeUnit) &&
    scopeUnit > 0;
  const [items, setItems] = useState<GrammarListItem[]>([]);
  const [unlocked, setUnlocked] = useState(0);
  const [isSuper, setIsSuper] = useState(false);
  const [freeSections, setFreeSections] = useState(2);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [premiumVisible, setPremiumVisible] = useState(false);

  useEffect(() => {
    GrammarService.listGrammar(
      scoped ? { section: scopeSection, unit: scopeUnit } : undefined,
    )
      .then((res) => {
        setItems(res.grammars);
        setUnlocked(res.unlockedThrough);
        setIsSuper(res.isSuper);
        setFreeSections(res.freeSections);
        setExpanded(res.unlockedThrough || 1); // 진행 중 섹션 자동 펼침
      })
      .catch((e) => console.error("문법 목록 로드 실패:", e))
      .finally(() => setLoading(false));
  }, [scoped, scopeSection, scopeUnit]);

  // 섹션별 그룹핑
  const bySection = new Map<number, GrammarListItem[]>();
  items.forEach((it) => {
    const arr = bySection.get(it.section) ?? [];
    arr.push(it);
    bySection.set(it.section, arr);
  });

  return (
    <View style={[st.container, { paddingTop: insets.top + 6 }]}>
      <View style={st.topbar}>
        <NBPress
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/courses")
          }
          bg="#fff"
          radius={12}
          style={st.back}
        >
          <Text style={st.backT}>‹</Text>
        </NBPress>
        <Text style={st.crumb}>{t("grammarList.title")}</Text>
      </View>

      {loading ? (
        <ActivityIndicator color={C.ink} style={{ marginTop: 48 }} />
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 18,
            paddingBottom: insets.bottom + 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={st.hero}>
            {scoped
              ? t("grammarList.dayHero", { n: scopeUnit })
              : t("grammarList.hero")}
          </Text>

          {/* 학습 로드 모드: 그날 문법 4개만. 잠금 없이 바로 펼쳐 둔다 */}
          {scoped ? (
            <SectionBlock
              section={scopeSection}
              items={items}
              color={SECTION_COLORS[(scopeUnit - 1) % SECTION_COLORS.length]!}
              expanded
              locked={false}
              premiumLocked={false}
              onToggle={() => {}}
              onPremium={() => {}}
              badge={String(scopeUnit)}
              title={t("grammarList.dayTitle", { n: scopeUnit })}
              t={t}
            />
          ) : (
          /* 문법 문제 풀이는 학습 모드 그리드로 옮겼다 */
          Array.from({ length: SECTION_COUNT }, (_, i) => i + 1).map((sec) => (
            <SectionBlock
              key={sec}
              section={sec}
              items={bySection.get(sec) ?? []}
              color={SECTION_COLORS[(sec - 1) % SECTION_COLORS.length]}
              expanded={expanded === sec}
              locked={sec > unlocked}
              premiumLocked={sec <= unlocked && sec > freeSections && !isSuper}
              onToggle={() => setExpanded(expanded === sec ? null : sec)}
              onPremium={() => setPremiumVisible(true)}
              t={t}
            />
          )))}
        </ScrollView>
      )}

      <PremiumSheet
        visible={premiumVisible}
        onClose={() => setPremiumVisible(false)}
        bottomInset={insets.bottom}
        t={t}
      />
    </View>
  );
}

const st = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.cream },
  shadow: {
    position: "absolute",
    left: 4,
    top: 5,
    right: -4,
    bottom: -5,
    backgroundColor: C.ink,
    borderRadius: 18,
  },
  cardBase: { borderWidth: 3, borderColor: C.ink, padding: 14 },

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
  crumb: { fontSize: 20, color: C.ink, fontWeight: "800" },
  hero: {
    fontSize: 15,
    color: C.sub,
    fontWeight: "600",
    marginBottom: 20,
    lineHeight: 22,
  },

  secHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 3,
    borderColor: C.ink,
    borderRadius: 18,
    padding: 14,
  },
  secNum: {
    width: 46,
    height: 46,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: C.ink,
    backgroundColor: C.paper,
    alignItems: "center",
    justifyContent: "center",
  },
  secNumT: { fontSize: 22, fontWeight: "800", color: C.ink },
  secTitle: { fontSize: 18, fontWeight: "800", color: C.ink },
  secSub: {
    fontSize: 13,
    fontWeight: "600",
    color: C.ink,
    marginTop: 2,
    opacity: 0.7,
  },

  gCard: { flexDirection: "row", alignItems: "center", gap: 12 },
  patBox: {
    backgroundColor: C.yellow,
    borderWidth: 2,
    borderColor: C.ink,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  pat: { fontSize: 16, fontWeight: "800", color: C.ink },
  gSum: { fontSize: 13.5, fontWeight: "600", color: C.ink, lineHeight: 19 },
  tags: { flexDirection: "row", gap: 6, marginTop: 6, flexWrap: "wrap" },
  tag: {
    backgroundColor: C.mint,
    borderWidth: 1.5,
    borderColor: C.ink,
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  tagT: { fontSize: 11, fontWeight: "700", color: C.ink },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: C.cream,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 3,
    borderColor: C.ink,
    paddingTop: 12,
    paddingHorizontal: 22,
    alignItems: "center",
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: C.ink,
    opacity: 0.2,
    marginBottom: 18,
  },
  crownWrap: {
    width: 72,
    height: 72,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: C.ink,
    backgroundColor: C.goldBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: C.ink,
    textAlign: "center",
    marginBottom: 8,
  },
  sheetDesc: {
    fontSize: 14.5,
    color: C.sub,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 22,
  },
  subBtn: { width: "100%", alignItems: "center", paddingVertical: 16 },
  subBtnT: { fontSize: 17, fontWeight: "800", color: C.ink },
  later: { fontSize: 14, color: C.sub, fontWeight: "600" },
});
