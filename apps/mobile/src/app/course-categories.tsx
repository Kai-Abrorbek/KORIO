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
import { useSettingsStore, LearnMode } from "@/store/settings.store";
import {
  TopikLevelModal,
  type TopikLevel,
} from "@/components/topik/TopikLevelModal";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CATEGORIES = [
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
  const setLearnMode = useSettingsStore((st) => st.setLearnMode);
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

          // 아래 항목들은 로드맵이 없는 바로가기다. 학습 모드로 저장하면
          // 홈의 "이어서 진행하기" 가 갈 곳을 잃는다.
          if (c.category === "pronunciation") {
            router.push("/pronunciation-practice");
            return;
          }
          // 문법 문제 풀이 — 어휘와 같은 로드맵을 쓰되 문법 트랙 데이터로.
          // 학습 모드로는 저장하지 않는다. 홈이 learnMode 로 경로를 만드는데
          // 이 값은 카테고리 이름과 달라서 엉뚱한 곳으로 간다.
          if (c.category === "grammarPractice") {
            router.push({
              pathname: "/roadmap",
              params: { category: "grammar" },
            });
            return;
          }
          if (c.category === "topik") {
            onTopikPress();
            return;
          }

          setLearnMode(c.category as LearnMode); // 현재 학습 모드 기억
          // 문법(설명)은 로드맵이 아니라 전용 문법 목록으로
          if (c.category === "grammar") {
            router.push("/grammar-list");
            return;
          }
          router.push({
            pathname: "/roadmap",
            params: { category: c.category },
          });
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
  const setLearnMode = useSettingsStore((state) => state.setLearnMode);
  const [topikModalVisible, setTopikModalVisible] = useState(false);
  const { label } = useLocalSearchParams<{ lang?: string; label?: string }>();

  const selectTopikLevel = (level: TopikLevel) => {
    Haptics.selectionAsync();
    setLearnMode("topik");
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
