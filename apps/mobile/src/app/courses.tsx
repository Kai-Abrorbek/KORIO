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
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "@/utils/haptics";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import BoriMascot from "@/components/home/BoriMascot";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const LANGUAGES = [
  {
    code: "ko",
    key: "korean",
    flag: "🇰🇷",
    endonym: "한국어",
    accent: "#4A90D9",
  },
  {
    code: "en",
    key: "english",
    flag: "🇺🇸",
    endonym: "English",
    accent: "#5B8DEF",
  },
];

function LangCard({
  item,
  label,
  count,
  index,
  theme,
  s,
}: {
  item: (typeof LANGUAGES)[number];
  label: string;
  count: string;
  index: number;
  theme: ThemeColors;
  s: ReturnType<typeof getStyles>;
}) {
  const pressed = useSharedValue(0);
  const aStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: pressed.value * 2 },
      { scale: 1 - pressed.value * 0.01 },
    ],
  }));
  return (
    <Animated.View entering={FadeInDown.delay(index * 90).duration(450)}>
      <AnimatedPressable
        onPressIn={() => (pressed.value = withTiming(1, { duration: 80 }))}
        onPressOut={() => (pressed.value = withTiming(0, { duration: 120 }))}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          router.push({
            pathname: "/course-categories",
            params: { lang: item.code, label },
          });
        }}
        style={[s.langCard, aStyle]}
      >
        <View style={[s.flagSq, { backgroundColor: item.accent + "1A" }]}>
          <Text style={s.flag}>{item.flag}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.langName}>{label}</Text>
          <Text style={s.langSub}>
            {item.endonym} · {count}
          </Text>
        </View>
        <View style={[s.goDot, { backgroundColor: item.accent }]}>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
}

export default function CoursesScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const count = t("courses.fieldCount", { count: 6 });

  return (
    <View style={[s.container, { paddingTop: insets.top + 8 }]}>
      <TouchableOpacity
        style={s.closeBtn}
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace("/")
        }
        hitSlop={12}
      >
        <Ionicons name="close" size={28} color={theme.text} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.hero}>
          <BoriMascot size={82} />
          <Text style={s.title}>{t("courses.chooseLanguage")}</Text>
          <Text style={s.subtitle}>{t("courses.chooseLanguageSub")}</Text>
        </View>

        <View style={{ gap: 14 }}>
          {LANGUAGES.map((item, i) => (
            <LangCard
              key={item.code}
              item={item}
              index={i}
              theme={theme}
              s={s}
              label={t(`courses.languages.${item.key}`)}
              count={count}
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
    closeBtn: {
      alignSelf: "flex-start",
      paddingHorizontal: 16,
      paddingVertical: 6,
    },
    scroll: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
    hero: { alignItems: "center", marginBottom: 28, gap: 6 },
    title: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.text,
      marginTop: 8,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 15,
      color: theme.textSecondary,
      fontWeight: "500",
      textAlign: "center",
    },
    langCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 5,
      borderRadius: 22,
      paddingVertical: 18,
      paddingHorizontal: 18,
    },
    flagSq: {
      width: 58,
      height: 58,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    flag: { fontSize: 34 },
    langName: { fontSize: 21, fontWeight: "800", color: theme.text },
    langSub: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 3,
      fontWeight: "500",
    },
    goDot: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
  });
