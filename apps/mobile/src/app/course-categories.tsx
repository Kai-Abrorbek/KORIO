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
} from "@/store/settings.store";
import { commitLearnMode } from "@/utils/learn-mode";
import {
  TopikLevelModal,
  type TopikLevel,
} from "@/components/topik/TopikLevelModal";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CATEGORIES = [
  // 한글은 맨 앞. 아직 못 읽는 사람은 여기부터 시작해야 한다
  { key: "hangul", category: "hangul", icon: "text", color: "#7E57C2" },
  { key: "vocab", category: "vocabulary", icon: "book", color: "#FF7043" },
  { key: "grammar", category: "grammar", icon: "construct", color: "#5C6BC0" },
  {
    key: "expression",
    category: "expression",
    icon: "chatbubble-ellipses",
    color: "#26A69A",
  },
  {
    key: "conversation",
    category: "conversation",
    icon: "chatbubbles",
    color: "#EC407A",
  },
  {
    key: "listening",
    category: "listening",
    icon: "headset",
    color: "#42A5F5",
  },
  { key: "topik", category: "topik", icon: "ribbon", color: "#AB47BC" },
  {
    key: "pronunciation",
    category: "pronunciation",
    icon: "mic",
    color: "#FFA726",
  },
  {
    key: "grammarPractice",
    category: "grammarPractice",
    icon: "barbell",
    color: "#7E57C2",
  },
  {
    key: "games",
    category: "games",
    icon: "game-controller",
    color: "#5F4FD8",
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

export default function CourseCategories() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const [topikModalVisible, setTopikModalVisible] = useState(false);
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
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.lead}>{t("courses.chooseCategory")}</Text>
        <View style={s.grid}>
          {CATEGORIES.map((c, i) => (
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
    scroll: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 40 },
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
