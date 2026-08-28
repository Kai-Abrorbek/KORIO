import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "@/utils/haptics";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import {
  LearnMode,
  learnModePath,
  useSettingsStore,
  type StudyMode,
} from "@/store/settings.store";
import { commitLearnMode, commitStudyMode } from "@/utils/learn-mode";
import {
  TopikLevelModal,
  type TopikLevel,
} from "@/components/topik/TopikLevelModal";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * `guided: true` = 학습 로드 모드에서도 보인다.
 *
 * 학습 로드는 어휘 트랙 위에 하루치(문법 → 단어 → 레슨 → 실전 → 복습 → 마무리)를
 * 순서대로 깔아준다. 그 안에 들어가는 것(어휘·문법·문법문제·실전회화)을 여기서
 * 또 개별로 열게 두면 "오늘 할 일"이 두 갈래가 되어 로드가 의미를 잃는다.
 * 반대로 한글·표현·듣기·토픽·발음·게임·단어카드는 로드가 짜주지 않으므로
 * 어느 모드에서든 들어갈 수 있어야 한다.
 */
const CATEGORIES = [
  // 한글은 맨 앞. 아직 못 읽는 사람은 여기부터 시작해야 한다
  { key: "hangul", category: "hangul", icon: "text", color: "#7E57C2", guided: true },
  { key: "vocab", category: "vocabulary", icon: "book", color: "#FF7043", guided: false },
  { key: "grammar", category: "grammar", icon: "construct", color: "#5C6BC0", guided: false },
  {
    key: "expression",
    category: "expression",
    icon: "chatbubble-ellipses",
    color: "#26A69A",
    guided: true,
  },
  {
    key: "conversation",
    category: "conversation",
    icon: "chatbubbles",
    color: "#EC407A",
    guided: false,
  },
  {
    key: "listening",
    category: "listening",
    icon: "headset",
    color: "#42A5F5",
    guided: true,
  },
  { key: "topik", category: "topik", icon: "ribbon", color: "#AB47BC", guided: true },
  {
    key: "pronunciation",
    category: "pronunciation",
    icon: "mic",
    color: "#FFA726",
    guided: true,
  },
  {
    key: "grammarPractice",
    category: "grammarPractice",
    icon: "barbell",
    color: "#7E57C2",
    guided: false,
  },
  {
    key: "games",
    category: "games",
    icon: "game-controller",
    color: "#5F4FD8",
    guided: true,
  },
  {
    key: "wordCard",
    category: "wordCard",
    icon: "albums",
    color: "#26C6DA",
    guided: true,
  },
];

function CategoryCard({
  c,
  label,
  desc,
  index,
  s,
  onTopikPress,
}: {
  c: (typeof CATEGORIES)[number];
  label: string;
  desc: string;
  index: number;
  s: ReturnType<typeof getStyles>;
  onTopikPress: () => void;
}) {
  const pressed = useSharedValue(0);
  const aStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: pressed.value * 2 },
      { scale: 1 - pressed.value * 0.02 },
    ],
  }));
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 70).duration(420)}
      style={{ width: "48%" }}
    >
      <AnimatedPressable
        onPressIn={() => (pressed.value = withTiming(1, { duration: 80 }))}
        onPressOut={() => (pressed.value = withTiming(0, { duration: 120 }))}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

          // 아래 셋은 로드맵도 메인 페이지도 아닌 단발 바로가기다.
          // 학습 모드로 저장하면 홈의 "이어서 학습하기" 가 갈 곳을 잃는다.
          const SHORTCUTS: Record<string, string> = {
            pronunciation: "/pronunciation-practice",
            hangul: "/hangul",
            games: "/games",
            wordCard: "/word-study",
          };
          if (SHORTCUTS[c.category]) {
            router.push(SHORTCUTS[c.category] as any);
            return;
          }
          // 토픽은 급수를 골라야 해서 모달을 먼저 띄운다 (모드 저장도 거기서)
          if (c.category === "topik") {
            onTopikPress();
            return;
          }

          // 나머지는 전부 학습 모드로 기억하고(계정에 저장),
          // 목적지는 한 곳에서 계산한다.
          const mode = c.category as LearnMode;
          commitLearnMode(mode);
          // 학습 방식(가이드/자율)까지 넘겨야 어휘를 골랐을 때 하루치
          // 로드맵으로 간다. 안 넘기면 늘 자율 로드맵으로 떨어진다.
          router.push(
            learnModePath(mode, "1", useSettingsStore.getState().studyMode),
          );
        }}
        style={[s.catCard, aStyle]}
      >
        <View style={[s.catIcon, { backgroundColor: c.color }]}>
          <Ionicons name={c.icon as any} size={22} color="#fff" />
        </View>
        <Text style={s.catLabel}>{label}</Text>
        <Text style={s.catDesc} numberOfLines={2}>
          {desc}
        </Text>
      </AnimatedPressable>
    </Animated.View>
  );
}

/** 학습 로드 ↔ 자율 전환. 여기가 학습 모드를 고르는 화면이라 이 자리가 맞다. */
function ModeSegment({
  mode,
  onChange,
  s,
  theme,
  t,
}: {
  mode: StudyMode;
  onChange: (m: StudyMode) => void;
  s: ReturnType<typeof getStyles>;
  theme: ThemeColors;
  t: (k: string) => string;
}) {
  const OPTIONS: { mode: StudyMode; icon: string; labelKey: string }[] = [
    { mode: "guided", icon: "footsteps", labelKey: "studyMode.guided" },
    { mode: "free", icon: "compass", labelKey: "studyMode.free" },
  ];

  return (
    <View style={s.modeWrap}>
      <Text style={s.modeTitle}>{t("courses.modeTitle")}</Text>

      <View style={s.segment}>
        {OPTIONS.map((o) => {
          const on = o.mode === mode;
          return (
            <Pressable
              key={o.mode}
              onPress={() => onChange(o.mode)}
              style={[s.segmentItem, on && s.segmentItemOn]}
            >
              <Ionicons
                name={o.icon as any}
                size={16}
                color={on ? "#fff" : theme.textSecondary}
              />
              <Text style={[s.segmentText, on && s.segmentTextOn]}>
                {t(o.labelKey)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={s.modeNote}>
        {t(mode === "guided" ? "courses.modeGuidedNote" : "courses.modeFreeNote")}
      </Text>
      <Text style={s.modeHint}>{t("courses.modeHint")}</Text>
    </View>
  );
}

export default function CourseCategories() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const [topikModalVisible, setTopikModalVisible] = useState(false);
  const studyMode = useSettingsStore((st) => st.studyMode);
  // 학습 로드에서는 로드가 안 덮는 것만 남긴다 (CATEGORIES 주석 참고)
  const visible = CATEGORIES.filter(
    (c) => studyMode === "free" || c.guided,
  );
  const { label } = useLocalSearchParams<{ lang?: string; label?: string }>();

  const selectTopikLevel = (level: TopikLevel) => {
    Haptics.selectionAsync();
    // 급수까지 계정에 저장해야 홈에서 그 급수로 바로 들어간다
    commitLearnMode("topik", level);
    setTopikModalVisible(false);
    router.push({ pathname: "/topik-sections", params: { level } });
  };

  return (
    <View style={[s.container, { paddingTop: insets.top + 4 }]}>
      <View style={s.header}>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/courses")
          }
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>
          {label ?? t("courses.chooseCategory")}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[s.scroll, { paddingBottom: insets.bottom + 48 }]}
        showsVerticalScrollIndicator={false}
      >
        <ModeSegment
          mode={studyMode}
          onChange={commitStudyMode}
          s={s}
          theme={theme}
          t={t}
        />

        <Text style={s.lead}>{t("courses.chooseCategory")}</Text>
        <View style={s.grid}>
          {visible.map((c, i) => (
            <CategoryCard
              key={c.key}
              c={c}
              index={i}
              s={s}
              label={t(`courses.categories.${c.key}`)}
              desc={t(`courses.categoryDesc.${c.key}`)}
              onTopikPress={() => setTopikModalVisible(true)}
            />
          ))}
        </View>
      </ScrollView>
      <TopikLevelModal
        visible={topikModalVisible}
        onClose={() => setTopikModalVisible(false)}
        onSelect={selectTopikLevel}
      />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    headerTitle: { fontSize: 22, fontWeight: "700", color: theme.text },
    scroll: { paddingHorizontal: 20, paddingTop: 12 },
    modeWrap: { marginBottom: 22 },
    modeTitle: {
      fontSize: 15,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 10,
    },
    segment: {
      flexDirection: "row",
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 14,
      padding: 4,
      gap: 4,
    },
    segmentItem: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 9,
      borderRadius: 10,
    },
    segmentItemOn: { backgroundColor: theme.primary },
    segmentText: {
      fontSize: 13.5,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    segmentTextOn: { color: "#fff" },
    modeNote: {
      fontSize: 12.5,
      fontWeight: "600",
      color: theme.textSecondary,
      lineHeight: 17,
      marginTop: 10,
    },
    modeHint: {
      fontSize: 11.5,
      fontWeight: "600",
      color: theme.textSecondary,
      opacity: 0.75,
      marginTop: 4,
    },
    lead: {
      fontSize: 15,
      color: theme.textSecondary,
      fontWeight: "500",
      marginBottom: 20,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      justifyContent: "space-between",
    },
    catCard: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 18,
      paddingVertical: 14,
      paddingHorizontal: 13,
      minHeight: 118,
      gap: 7,
    },
    catIcon: {
      width: 42,
      height: 42,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
    },
    catLabel: { fontSize: 15, fontWeight: "800", color: theme.text },
    catDesc: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: "500",
      lineHeight: 16,
    },
  });
