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
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useSettingsStore, LearnMode } from "@/store/settings.store";

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
];

function CategoryCard({
  c,
  label,
  desc,
  index,
  s,
}: {
  c: (typeof CATEGORIES)[number];
  label: string;
  desc: string;
  index: number;
  s: ReturnType<typeof getStyles>;
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
          setLearnMode(c.category as LearnMode); // 현재 학습 모드 기억
          // 문법은 로드맵이 아니라 전용 문법 목록으로
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
          <Ionicons name={c.icon as any} size={26} color="#fff" />
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
  const { label } = useLocalSearchParams<{ lang?: string; label?: string }>();

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
            />
          ))}
        </View>
      </ScrollView>
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
      borderBottomWidth: 5,
      borderRadius: 20,
      paddingVertical: 18,
      paddingHorizontal: 16,
      minHeight: 150,
      gap: 10,
    },
    catIcon: {
      width: 52,
      height: 52,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    catLabel: { fontSize: 17, fontWeight: "800", color: theme.text },
    catDesc: {
      fontSize: 13,
      color: theme.textSecondary,
      fontWeight: "500",
      lineHeight: 18,
    },
  });
